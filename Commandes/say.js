module.exports.run = async (client,message) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('say').help

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
		//on supprime +says pour qu'il ne soit pas dit
		text=message.content.replace('+say  ', '');

		//on utilise l'api google translate qui nous retournera un lien type MP3
		googleTTS(text, 'fr', 1)   
		.then(function (url) {

			console.log(url); 

			let voiceChannel = message.member.voice.channel;
			//on se connecte au channel
			voiceChannel.join().then(connection => {
				//lit le fichier retourné
				const dispatcher = connection.play(url, { volume: 1 }); 
				//on se déconnecte
				dispatcher.on('finish', () => {voiceChannel.leave()});
			})
		})
		.catch(function (err) {
			console.error(err.stack);
		});
		return switch_msg.response(client,message,`Lecture de la phrase ${text}`)
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
};

module.exports.help ={
	name: "say",
	info: `+say une phrase\nLe bot rentrera dans le salon ou vous êtes et dira vocalement votre phrase`,
	admin: true,
	in:"text", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};