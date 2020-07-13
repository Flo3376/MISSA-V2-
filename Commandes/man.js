module.exports.run = async (client,message,args) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('man').help

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
		
		for (var i = 0; i < man.length; i++)
		{
			var my_embed={
				"embed": {
					"title": `id n°${i}, ${man[i].name}`,
					"url": man[i].links,
					"color": 15179008,
					"description":  `${man[i].links} \n Tapez "+man_id ${i}" pour voir la liste des vaisseaux construit par ${man[i].name}`,
					"thumbnail": {
						"url": man[i].img
					}, 


				} 
			}
			switch_msg.response(client,message,my_embed)
		}
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}


}
module.exports.help ={
	name: "man",//nom de la commande
	info: `+man Retourne la liste des fabricants de vaisseaux`,//texte descriptif de la commande
	admin: false, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};