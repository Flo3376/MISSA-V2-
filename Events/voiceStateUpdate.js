//lorsque qu'un membre rentre dans salon
module.exports = async(client,oldMember, newMember)=>{
	let last_channel_id="";
	//si l'on détecte un mouvement de sortie de salon
	if(oldMember)
	{
		//on vérifie que le channel id exsite, sinon le joueur vient de faire une connection au serveur
		if(oldMember.channel!==null)
		{
			/*
			if(oldMember.member.nickname !== null && monkeys_list[oldMember.id].salon!=="out")
			{
				console.log(oldMember.member.nickname+" est sortie du  salon : "+salon_list[monkeys_list[oldMember.id].salon].name);
			}

			else
			{
				if (monkeys_list[oldMember.id].salon!== "out")
				{
					console.log(oldMember.member.user.username+" est sortie du  salon : "+salon_list[monkeys_list[oldMember.id].salon].name);
				}
			}
			*/
			//on mémorise d'ou vient de partir le membre
			last_channel_id=oldMember.channel.id;
		}
	}

	//si l'on détecte un mouvement de rentré de salon
	if(newMember)
	{
		//on vérifie que le channel id exsite, sinon le joueur vient de faire une déconnection du serveur
		if(newMember.channel!==null)
		{
			//si l'id de lancien channel et bien différent du nouveau, c'est qu'il s'agit d'un mouvement réelle
			if(last_channel_id !== newMember.channel.id)
			{
				/*
				//on prépare l'objet monkeys
				let monkey= new monkeys();

				//on recherche un correspondance avec un utilisateur existant
				let info = await monkey.search_m(newMember.id).then()
				//si le membre n'existe pas, on le créé immédiatement
				if( info === null)
				{
					result = await monkey.create_m(usr).then()
					//console.log(`création du membre ${usr['username']}`)
				}


				//creation du tableau de mise à jour
				let new_data={};
				new_data.salon=newMember.channel.id;
				new_data.time = Date.now();
				new_data.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

				//mise à jour des donnée du membres
				info = await monkey.update_m(new_data).then()

				monkeys_list[newMember.id]=monkey;
				*/
				let i=2400
				var mysql_con_2=[]
				let connect= new Promise((resolve,reject)=>
				{ 
					i++
					mysql_con_2[i] = mysql.createConnection({
						host: config.db_host,
						user: config.db_user,
						password: config.db_password,
						database: config.db_name,
						connectionLimit: 50,
					});resolve(i)
				})
				connect.then((i)=>{

					mysql_con_2[i].query("SELECT * FROM `e107_discord_user`  WHERE `real_id`="+newMember.id, function (err, result, fields)
					{
						if (err) throw err;

						if(typeof result!==undefined && result)
						{
							if(result.length===0)
							{
								var entry = `'','${newMember.id}','${escape(usr.username)}','NULL','${Date.now()}','${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}','${newMember.channel.id}','inc','inc','0','5'`
								var sql="INSERT INTO `e107_discord_user` (id,real_id, name,nickname, time,date, salon, game , type , alert ,jeton) VALUES ("+entry+")"
								mysql_con_2[i].query(sql, function (err, result, fields) {
									if (err) throw err;
									if(typeof result!==undefined && result)
									{
										console.log("j'ai créé "+newMember.member.user.username +"=>"+result.insertId)
									}

								});
							}
							else
							{
								var sql="UPDATE `e107_discord_user` SET `time` ='"+Date.now()+"',`date` = '"+new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')+"', `salon` = '"+newMember.channel.id+"' WHERE real_id="+newMember.id
								mysql_con_2[i].query(sql, function (err, result, fields) {
									if (err) throw err;
									if(typeof result!==undefined && result)
									{
										console.log("j'ai mis à jour "+newMember.member.user.username +"=>"+result.insertId)
									}
								});
							}
							mysql_con_2[i].end()
							delete mysql_con_2[i]
						}
						let monkey={"real_id":newMember.id, 'name': newMember.member.user.username, "nickname":null, "time":Date.now(), "date" :new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),"salon":newMember.channel.id}
						monkeys_list[newMember.id]=monkey
					})
				})

				/*
				//si le joueur avait définis un pseudo
				if(newMember.member.nickname !== null)
				{
					console.log(newMember.member.nickname+" est entré dans le du  salon : "+salon_list[monkeys_list[newMember.id].salon].name)
				}

				else
				{
					console.log(newMember.member.user.username+" est entré dans le du  salon : "+salon_list[monkeys_list[newMember.id].salon].name)
				}
				*/

				//si le membre rentre dans un salon vocal où il doit être accueillit pas une musique
				if(config.salon_auto_play.includes(newMember.channel.id))
				{
					let voiceChannel = client.channels.cache.get(newMember.channel.id);
					voiceChannel.join().then(connection => {
						const dispatcher = connection.play('./mp3/Thème_musicaux/Avenger-style.mp3', { volume: 0.2 }); 
						dispatcher.on('finish', () => {voiceChannel.leave()});
					});
				}

				
				//si le membre est un jgm
				let this_member = newMember.guild.members.cache.get(newMember.id)
				if(this_member._roles.includes(config.jgm_id_role))
				{
					let voiceChannel = client.channels.cache.get(newMember.channel.id);
					voiceChannel.join().then(connection => {
						const dispatcher = connection.play('./mp3/Cultisime/club_dorothé.mp3', { volume: 0.5 }); 
						dispatcher.on('finish', () => {voiceChannel.leave()});
					});
				}



				//si le membre rentre dans un salon vocal où il doit être accueillit pas un message vocal de bienvenue
				if(config.salon_auto_says.includes(newMember.channel.id))
				{
					if(newMember.member.user.username!="missa")
					{
						text="Bonjour.... Sois le bienvenue"+newMember.member.user.username+"dans ce serveur. Pour connaître mes possibilité utilises la commande   +help";
						googleTTS(text, 'fr', 1)   
						.then(function (url) {

							//console.log(url); 
							let voiceChannel = client.channels.cache.get(newMember.channel.id);
							voiceChannel.join().then(connection => {
								const dispatcher = connection.play(url, { volume: 1 }); 
								dispatcher.on('finish', () => {voiceChannel.leave()});
							})


						})
						.catch(function (err) {
							console.error(err.stack);
						});
					}
					
				}
			}
		}
		else
		{ 
			let i=2400
			var mysql_con_2=[]
			let connect= new Promise((resolve,reject)=>
			{ 
				i++
				mysql_con_2[i] = mysql.createConnection({
					host: config.db_host,
					user: config.db_user,
					password: config.db_password,
					database: config.db_name,
					connectionLimit: 50,
				});resolve(i)
			})
			connect.then((i)=>{

				mysql_con_2[i].query("SELECT * FROM `e107_discord_user`  WHERE `real_id`="+newMember.id, function (err, result, fields)
				{
					if (err) throw err;

					if(typeof result!==undefined && result)
					{
						if(result.length===0)
						{
							var entry = `'','${newMember.id}','${escape(usr.username)}','NULL','${Date.now()}','${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}','${newMember.channel.id}','inc','inc','0','5'`
							var sql="INSERT INTO `e107_discord_user` (id,real_id, name,nickname, time,date, salon, game , type , alert ,jeton) VALUES ("+entry+")"
							mysql_con_2[i].query(sql, function (err, result, fields) {
								if (err) throw err;
								if(typeof result!==undefined && result)
								{
									console.log("j'ai créé "+newMember.member.user.username +"=>"+result.insertId)
								}

							});
						}
						else
						{
							var sql="UPDATE `e107_discord_user` SET `time` ='"+Date.now()+"',`date` = '"+new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')+"', `salon` = 'out' WHERE real_id="+newMember.id
							mysql_con_2[i].query(sql, function (err, result, fields) {
								if (err) throw err;
								if(typeof result!==undefined && result)
								{
									console.log("j'ai mis à jour "+newMember.member.user.username +"=>"+result.insertId)
								}
							});
						}
						mysql_con_2[i].end()
						delete mysql_con_2[i]
					}
					let monkey={"real_id":newMember.id, 'name': newMember.member.user.username, "nickname":null, "time":Date.now(), "date" :new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),"salon": "out"}
					monkeys_list[newMember.id]=monkey
				})
			})
			//on prépare l'objet monkeys
			/*let monkey= new monkeys();

			//on recherche un correspondance avec un utilisateur existant
			let info = await monkey.search_m(newMember.id).then()
			//si le membre n'existe pas, on le créé immédiatement
			if( info === null)
			{
				result = await monkey.create_m(usr).then()
				console.log(`création du membre ${usr['username']}`)
			}


			//creation du tableau de mise à jour
			let new_data={};
			new_data.salon="out";
			new_data.time = Date.now();
			new_data.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

			//mise à jour des donnée du membres
			info = await monkey.update_m(new_data).then()



			monkeys_list[newMember.id]=monkey;*/


			//si le joueur avait définis un pseudo
			if(newMember.member.nickname !== null)
			{
				console.log("Le joueur "+newMember.member.nickname+" s'est déconnecté.")
			}

			else
			{
				console.log("Le joueur "+newMember.member.user.username+" s'est déconnecté.")
			}

		}
	}
};