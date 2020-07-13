//si la commande clear est appelé
module.exports.run = async(client,message) =>{
	const args = message.content.split(" ");
	//chargement des paramêtres de cette commande
	const param = client.commands.get('clear').help

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
		//si l'utilisateur n'a pas les droits de gérer les messages
		if (!message.member.hasPermission("MANAGE_MESSAGES"))
		{
			return switch_msg.response(client,message,"Vous n'avez pas la permisssion")
		}

		//si l'argument n'est pas donnée
		if(!args[1])
		{
			return switch_msg.response(client,message,"Vous n'avez spécifiez le nombre de messages à supprimer")
		}

		//si l'argument n'est pas un chiffre
		if(isNaN(args[1]))
		{
			return switch_msg.response(client,message,"Vous n'avez spécifiez un nombre réelle")
		}
		//si l'argument n'est pas un chiffre
		if(args[1]>100)
		{
			args[1]=100;
		}
		//destruction de x message
		message.channel.bulkDelete(args[1])
		
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
};
module.exports.help ={
	name: "clear",//nom de la commande
	info2: `+clear [un nombre]\n Supprime X (maximum 100) messages dans le salon textuel en cours, ex: +clear 50`,//texte descriptif de la commande
	admin: true, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"text", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};