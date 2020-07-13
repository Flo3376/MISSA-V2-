module.exports.run = async (client,message,args) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('test').help

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
		return switch_msg.response(client,message,"ok pour test")
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
};
module.exports.help ={
	name: "test",//nom de la commande
	info2: `+test\nProgramme de test`,//texte descriptif de la commande
	admin: true, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "callback", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};