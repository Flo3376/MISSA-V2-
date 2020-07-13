module.exports.run = async (client,message) =>{

	//chargement des paramêtres de cette commande
	const param = client.commands.get('play').help

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
		//+play https://www.youtube.com/watch?v=vb_k04U3pNs
		//+play https://www.youtube.com/watch?v=-ScjucUV8v0
		serverQueue = queue.get(message.guild.id);
		const args = message.content.split(" ");

		//si l'argument vaisseau n'est pas définis
		if(!args[0])
		{
			return switch_msg.response(client,message,"Vous n'avez spécifié pas d'adresse youtube à lire")
		}

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
		monkeys_list[message.author.id].jeton--;


		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel)
		{
			return switch_msg.response(client,message,"Vous devez être dans un salon vocal pour pouvoir joueur de la musique!")
		}
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
		{
			return switch_msg.response(client,message,"Je n'ai pas le droit de diffuser de la musique dans ce salon")
		}

		const songInfo = await ytdl.getInfo(args[1]);
		const song = {
			title: songInfo.title,
			url: songInfo.video_url
		};

		if (!serverQueue) {
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 0.7,
				playing: true
			};

			queue.set(message.guild.id, queueContruct);

			queueContruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueContruct.connection = connection;
				play(message.guild, queueContruct.songs[0]);
			} catch (err) {
				console.log(err);
				queue.delete(message.guild.id);
				return message.reply(err);
			}
		} else {
			serverQueue.songs.push(song);
			return switch_msg.response(client,message,`${song.title} a été rajouté à la file d'attente!`)
		}
		
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}

	

	
	function play(guild, song) {
		const serverQueue = queue.get(guild.id);
		if (!song) {

			if(standby===false)
			{
				serverQueue.voiceChannel.leave();
			}

			
			
			queue.delete(guild.id);
			return;
		}

		const dispatcher = serverQueue.connection
		.play(ytdl(song.url))
		.on("finish", () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on("error", error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 2);
		serverQueue.textChannel.send(`Lecture de : **${song.title}**`);
	}
};

module.exports.help ={
	name: "play",
	info: `+play [lien youtube]\nLancera la lecture **audio** d'un lien youtubre, ex : +play https://www.youtube.com/watch?v=vb_k04U3pNs .Attention Missa ne peux être que sur un salon. Si une musique est déjà en cours, celle que vous proposerez sera mise playlist.`,
	admin: false, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"text", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé

};