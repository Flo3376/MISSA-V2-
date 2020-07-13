//si la commande kill arrive, (kick un peu plus soft, déplace avers un salon AFK)
module.exports.run = async(client,message) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('kill').help

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
		
		if (!message.member.hasPermission("KICK_MEMBERS"))
		{
			return switch_msg.response(client,message,"Vous n'avez pas la permisssion")
		}

		var member= message.mentions.members.first();

		if(message.mentions.users.size===0) 
		{
			return switch_msg.response(client,message,"Vous devez mentionner un utulisateur")
		}

		let kill = message.guild.member(message.mentions.users.first());

		if(!kill)
		{
			return switch_msg.response(client,message,"Je n'ai pas trouvé l'utilisateur")
		}

		raison = message.content.replace('+kill', '');
		raison = raison.replace(message.mentions.users.first(), '');

		//on déplace le membre vers le salon afk définis par salon_kill
		kill.voice.setChannel(config.kill_id_salon)

		message.mentions.users.first().send(`${member.user.username}, Vous avez été sortie du salon **${message.guild.name} par ${message.author.username}, pour la raison suivante '${raison}'`);
		return switch_msg.response(client,message,`${member.user.username} est sortie par ${message.author.username}, pour la raison suivante ${raison}`)
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}


};

module.exports.help ={
	name: "kill",//nom de la commande
	info2: `+kill [utilisateur][raison (optionelle)]\nEnvoie un utilisateur dans le salon AFK, ex: +kill @un_joueur 'va te calmer 30 secondes'`,//texte descriptif de la commande
	admin: true, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"text", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "text", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};