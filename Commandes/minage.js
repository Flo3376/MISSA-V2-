module.exports.run = async (client,message) =>{
	const args = message.content.split(" ");
	
	//chargement des paramêtres de cette commande
	const param = client.commands.get('minage').help

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
		
		

		//on charge la methode request pour faire une demande post
		const request = require('request')
		let text=[];
		let mes_test=0;
		//console.log('https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_minage.php')
		request.post(
			'https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_minage.php',
			(error, res, data) => {
				if (error) {
					console.error(error)
					return
				}
					//on parse le json reçu
					json_data=JSON.parse(data);

					let min_info="";
					//console.log(json_data)
					let fields=[];
					//on parcours le json
					json_data.forEach((Minage)=>{
						let one_field=[]
						//création du field
						one_field["name"]="***Nom :"+Minage.name+"*** (" +Minage.n_text+")"
						one_field["inline"]=false
						one_field["value"]="***\u200bPrix de base : " +Minage.b_price+" aUEC/SCU***\n"+Minage.text+"\u200b";
						fields.push(one_field)
					})
					var my_embed={
						"embed": {
							"title": "Voici les cours de la bourse concernant les produits de minages:",
							"url": "https://mysctools.ovh/",
							"color": 15179008,
							"fields": [
							fields
							]
						} 
					}
					switch_msg.response(client,message,my_embed)
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
	name: "minage",//nom de la commande
	info: `+minage vous retournera les cours boursiers des différentes ressources minables`,//texte descriptif de la commande
	admin: false, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};
