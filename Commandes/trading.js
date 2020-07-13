module.exports.run = async (client,message) =>{
	const args = message.content.split(" ");
	
	//chargement des paramêtres de cette commande
	const param = client.commands.get('fc').help

	/*
	*	initialisation d'un routeur entrant/sortant
	*
	*	@param: paramétre des droits entrants et sortant du message indiqués dans le help de la commande
	*/
	var switch_msg=new msg_sw(param,client,message)
	//envoie des données concernant le message entrant
	switch_msg.init(client,message)
	//console.log(switch_msg)

	//si dans le processus de vérification des entrés tout est ok, on peux envoyer la réponse
	if(switch_msg.error.length==0)
	{
		//si l'argument vaisseau n'est pas définis
		if(!args[1])
		{
			return switch_msg.response(client,message,"Vous n'avez spécifiez l'id du vaisseaux")
		}

		//si l'argument vaisseau n'est pas un chiffre
		if(isNaN(args[1]))
		{
			return switch_msg.response(client,message,"Vous n'avez spécifiez un nombre réelle pour l'id du vaisseaux")
		}

		//si l'argument argent n'est pas définis
		if(!args[2])
		{
			return switch_msg.response(client,message,"Vous n'avez spécifiez l'argent disponible")
		}
		//si l'argument argent n'est pas un chiffre
		if(isNaN(args[2]))
		{
			return switch_msg.response(client,message,"Vous n'avez spécifiez un nombre réelle pour l'argent disponible")
		}

		//on charge la methode request pour faire une demande post
		const request = require('request')
		let text=[];
		let mes_test=0;
		console.log(args)
		console.log('https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_fc.php?ship='+args[1]+'&balance='+args[2])
		request.post(
			'https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_fc.php?ship='+args[1]+'&balance='+args[2],
			(error, res, data) => {
				if (error) {
					console.error(error)
					return
				}
					//on parse le json reçu
					json_data=JSON.parse(data);

					let list_ship="";

					//on parcours le json
					json_data.forEach((product)=>{
						let new_line="Produit: "+product.product_name+"\n"+"> **Quantité achetable** :"+product.scu+" SCU\n > **Prix d'achat** :    "+product.achat+" aUEC\n > **Bénéfice** :    "+product.benef+" aUEC\n\n";

						//si le contenaire du bloc réponse est remplie de moin de 2000 caractére on continue à le remplir
						if((new_line.length+list_ship.length)<2000)
						{
							list_ship=list_ship+""+new_line;
							text[mes_test]=list_ship;
						}
						//sinon on ouvre un autre contenaire
						else
						{
							list_ship="";
							mes_test++;
							list_ship=list_ship+""+new_line;
							text[mes_test]=list_ship;
						}
					})
					//on envoie les contenaires les uns aprés les autres
					text.forEach((bloc)=>{
						switch_msg.response(client,message,bloc)
					})
				})
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
};
module.exports.help ={
	name: "trading",//nom de la commande
	info: `+trading [id_ de l'appareil] [argent disponible]\n Vous retourner les produits les plus rentables à tradder avec les conditions que vous avez indiqué.\n ex +fc 8 5000\n les id sont disponibles en tapant la commande +ship_list`,//texte descriptif de la commande
	admin: false, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "callback", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};
