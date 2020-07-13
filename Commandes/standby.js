const Discord = require ("discord.js");

module.exports.run = async(client,message,args) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('standby').help

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
		if(standby===false)
		{
			standby=true;
			return switch_msg.response(client,message,"Je resterai en attente dans les salons vocaux");
		}
		if(standby===true)
		{
			standby=false;
			return switch_msg.response(client,message,"Je quitterai les salons vocaux à la fin de la lecture");
		}

	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
};

module.exports.help ={
	name: "standby",
	info2: `+standby\nPermet au bot de rester ou non dans un salon aprés son action sonore`,
	admin: true,
	in:"dm", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};