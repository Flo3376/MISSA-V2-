//si un event on ready arrive arrive (le boot a démarré et s'est connecté avec succés)
const mysql = require('mysql');
module.exports =async(client) =>{
	//client.user.setPresence({activity:{name:"By BOB  | +help"}});
	setTimeout(function(){
		let  channels = client.channels.cache;
		var i=0
		var mysql_con_1=[]
		for  (let channel of channels.values())
		{
			if(channel["id"]!=="dm")
			{

				let connect= new Promise((resolve,reject)=>
				{ 
					i++
					mysql_con_1[i] = mysql.createConnection({
						host: config.db_host,
						user: config.db_user,
						password: config.db_password,
						database: config.db_name,
						connectionLimit: 50,
					});resolve(i)
				})
				connect.then((i)=>{

					mysql_con_1[i].query("SELECT * FROM `e107_discord_salon`  WHERE `real_id`="+channel["id"], function (err, result, fields)
					{
						if (err) throw err;

						if(typeof result!==undefined && result)
						{
							//console.log(unescape(result[0].name))
							if(result.length===0)
							{
								var entry = `'','${channel['id']}','${escape(channel.name)}','${channel.type}'`
								var sql="INSERT INTO `e107_discord_salon` (id,real_id, name, type) VALUES ("+entry+")"
								mysql_con_1[i].query(sql, function (err, result, fields) {
									if (err) throw err;
									if(typeof result!==undefined && result)
									{
										console.log("j'ai créé "+channel.name)
										console.log("on m'a répondu ")
										console.log(result)
										console.log(result.insertId)
									}
								});
							}
							//704788656896081990
							//704788656896082000


							else
							{
								if(unescape(result[0].name)!==channel.name || result[0].type!==channel.type )
								{
									var entry = `'${escape(channel.name)}','${channel.type}'`
									var sql="UPDATE `e107_discord_salon` SET `name` ='"+escape(channel.name)+"', `type`='"+channel.type+"' WHERE real_id="+channel['id']
									
									console.log(sql)
									mysql_con_1[i].query(sql, function (err, result, fields) {
										if (err) throw err;
										if(typeof result!==undefined && result)
										{
											console.log("j'ai mis à jour "+channel.name)
											console.log("on m'a répondu ")
											console.log(result)
											console.log(result.insertId)
										}
									});
								}

							}
							mysql_con_1[i].end()
							delete mysql_con_1[i]
						}
					})
				})
				let salon={"real_id":channel['id'], 'name': channel.name, "type":channel.type}
				salon_list[channel['id']]=salon
			}
		}
	}, 5000);
	let  users = client.users.cache;
	var i=0
	var mysql_con_2=[]
	for await(let usr of users.values())
	{
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

			mysql_con_2[i].query("SELECT * FROM `e107_discord_user`  WHERE `real_id`="+usr['id'], function (err, result, fields)
			{
				if (err) throw err;

				if(typeof result!==undefined && result)
				{
					if(result.length===0)
					{
						var entry = `'','${usr['id']}','${escape(usr.username)}','NULL','${Date.now()}','${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}','out','inc','inc','0','5'`
						var sql="INSERT INTO `e107_discord_user` (id,real_id, name,nickname, time,date, salon, game , type , alert ,jeton) VALUES ("+entry+")"
						mysql_con_2[i].query(sql, function (err, result, fields) {
							if (err) throw err;
							if(typeof result!==undefined && result)
							{
								console.log("j'ai créé "+usr.username +"=>"+result.insertId)
							}

						});
					}
					mysql_con_2[i].end()
					delete mysql_con_2[i]
				}
				let monkey={"real_id":usr['id'], 'name': usr.username, "nickname":null}
				monkeys_list[usr.id]=monkey
			})
		})
	}


	//chargement du parseur de page HTML
	const cheerio = require('cheerio'),cheerioTableparser = require('cheerio-tableparser');

	//construction du lien à parser
	const url = 'https://starcitizen.tools/List_of_Ship_and_Vehicle_Prices';

	//index pour la liste des ship
	var id_ships=0;

	//requete HTTP
	request.post(
		url,
		(error, res, data) => {
			if (error) {
				console.error(error)
				return
			}
			//chargement des données de la page appelée pour le parsage
			var $ = cheerio.load(data);

			let table_find = [];
			let table_data = [];

			//rechcerche du tableau à inspecter (il n'y en a qu'un seul)
			$("table").each(function (i, table) {
				//mise en mémoire du tableau
				table_find.push(table)
			});
			//chargement du tableau récupérer pour le parsage
			$ = cheerio.load(table_find[0])

			//parsage du tableau en mod code (en gros ce qui est visible en faisant F12, a ref, class, id ....)
			cheerioTableparser($);
			var data_link = $("table").parsetable();

			//parsage du tableau en mod text (ce que vera un utilsateur sur son écran)
			cheerioTableparser($);
			var datas_text = $("table").parsetable(true, true, true);

		//on parcours le tableau HTML pour le convertir en tableau nodejs (lecture en colone)
		for (var i = 1; i < datas_text[1].length; i++)
		{ 	

			//création d'une variable qui indiquera quelle constructeur évoque un appareil
			let actual_man="";

			//chargment du nom du constructeur se trouvant sur la seconde colone
			$ = cheerio.load(data_link[1][i]);

			//mise en mémoire du constructeur actuellement évoqué
			$("a").each(function (i, link) {
				if(man.find(man => man.name === $(link).attr('title')))
				{
					actual_man=man.find(man => man.name === $(link).attr('title'));
					//console.log(`je ai trouvé ${$(link).attr('title')}`)
				}
			});


			//récupération des liens appareils et nom des appareil via la première colone
			$ = cheerio.load(data_link[0][i]);
			let ship_links=[]
			$("a").each(function (i, link) {
				let ship=[];
				ship['id']=id_ships;
				ship['name']=$(link).attr('title');
				ship['link']=$(link).attr('href');
				ship['logo']=man[actual_man.id].img;
				all_ships.push(ship);

				man[actual_man.id].ships.push(ship);
			});
			id_ships++;
		}

	})
	
	console.log('Ready to fight');
	
};