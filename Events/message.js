const prefix= config.prefix;

//si un event client.message arrive
module.exports = async(client,message)=>{

	function getDateTime() {

		var date = new Date();

		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;

		var min  = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;

		var sec  = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;

		var year = date.getFullYear();

		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" : "") + month;

		var day  = date.getDate();
		day = (day < 10 ? "0" : "") + day;

		return day + "/" + month + "/" + year  + " à " + hour + ":" + min + ":" + sec;
	}

	//refus des commandes venant d'un autre bot
	if(message.author.bot) return;

	//si c'est un message envoyé en privé
	if(message.channel.type ==="dm")
	{
		//recherche des rôles que le joueur posséde
		let this_guild=client.guilds.cache.get(config.this_guild)
		var this_member=this_guild.members.cache.get(message.author.id)
	}
	else
	{
		//recherche des rôles que le joueur posséde
		var this_member = message.guild.members.cache.get(message.author.id);
	}

	//si le message ne commance pas par +
	if(!message.content.startsWith(prefix)) return;

	let log=getDateTime() +" : "+message.author.id+" => "+ message.channel.type+"_____"+message.content;


	let rawdata = fs.readFileSync('./db/log.txt');
	if(rawdata.length>0)
	{
		log = log+"\n"+rawdata;
	}
	

	fs.writeFileSync('./db/log.txt', log);
	
	//si la personne qui solicite le bot est BM GM JBM
	if(this_member._roles.includes(config.bm_id_role) || this_member._roles.includes(config.gm_id_role) || this_member._roles.includes(config.jgm_id_role))
	{


		const args = message.content.toLowerCase().slice (prefix.length).trim().split(/ +/g);
		const commande = args.shift();

		const cmd = client.commands.get(commande);

		console.log(`L'utilisateur ${monkeys_list[message.author.id].name} à fait appel à la commande : ${commande} , arguments ${args} à ${getDateTime()}`)

		if(!cmd) return message.channel.send("Et encore un qui n'est pas capable de saisir une commande valide, ça me fatigue!, Tapes +help pour avoir les commandes actives");
		if(auto_reload===true)
		{
			if(!client.commands.has(commande)) {
				return message.reply(`La commande '${commande}' ne semble pas exister`);
			}
  			// the path is relative to the *current folder*, so just ./filename.js
  			delete require.cache[require.resolve(`./../Commandes/${commande}.js`)];
 			// We also need to delete and reload the command from the client.commands Enmap
 			client.commands.delete(commande);
 			const props = require(`./../Commandes/${commande}.js`);
 			client.commands.set(commande, props);
 			message.reply(`La commande ${commande} a été récharger avec sa mise à jour`);
		}
 		cmd.run(client,message);
	}
	else
	{
		message.author.send("Vous n'avez pas les droits pour intéragir avec moi");
	}


};