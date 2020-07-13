module.exports.run = async (client,message) =>{
	const args = message.content.split(" ");
	//chargement des paramêtres de cette commande
	const param = client.commands.get('sound_play').help

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
		const membre= message.mentions.members.first() || message.member;
		console.log(message.content)

		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel)
		{
			return message.author.send("Vous devez être dans un salon vocal pour pouvoir joueur de la musique!");

		}
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
		{
			return message.author.send("Je n'ai pas le droit de diffuser de la musique dans ce salon");
		}

		if(isNaN(args[1]))
		{
			return message.author.send("Vous n'avez spécifiez un nombre réelle");
		}
		console.log();

		if(monkeys_list[message.author.id].jeton>0)
		{
			//on prépare l'objet monkeys
			let monkey= new monkeys();

			//on recherche un correspondance avec un utilisateur existant
			let info = await monkey.search_m(message.author.id).then()
			//si le membre n'existe pas, on le créé immédiatement
			if( info === null)
			{
				result = await monkey.create_m(message.author).then()
			}
			//creation du tableau de mise à jour
			let new_data={};
			new_data.jeton=monkeys_list[message.author.id].jeton--;
			new_data.time = Date.now();
			new_data.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

			//mise à jour des donnée du membres
			info = await monkey.update_m(new_data).then()

			monkeys_list[message.author.id]=monkey;

			voiceChannel.join()
			.then(connection => {
				const dispatcher = connection.play(sound_list[args[1]], { volume: 0.5 }); 
				dispatcher.on('finish', () => {
					if(standby===false)
					{
						voiceChannel.leave()
					}
				});
			})
			.catch(console.error);
			
		}
		else
		{
			return switch_msg.response(client,message,"Vous avez épuisez vos 5 jetons pour déconner. Les jetons se régénérent toute les minutes, 1 par minutes.")
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
	name: "sound_play",
	info: `+sound_play [numéro du préset]\nJouera un extrait de film. La liste des extraits est disponible en faisant +sound_list bruitage.., ex: +rh 5`,
	admin: false,
	in:"text", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé

};