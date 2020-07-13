//si un event guildMemberAdd arrive (un nouveau membre rejoint le discord)
const mysql = require('mysql');
module.exports = async(client,oldChannel, newChannel)=>{
	let i=2500
	var mysql_con_1=[]
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

		mysql_con_1[i].query("SELECT * FROM `e107_discord_salon`  WHERE `real_id`="+newChannel.id, function (err, result, fields)
		{
			if (err) throw err;

			if(typeof result!==undefined && result)
			{
				//console.log(unescape(result[0].name))
				if(result.length===0)
				{
					var entry = `'','${newChannel.id}','${escape(newChannel.name)}','${newChannel.type}'`
					var sql="INSERT INTO `e107_discord_salon` (id,real_id, name, type) VALUES ("+entry+")"
					mysql_con_1[i].query(sql, function (err, result, fields) {
						if (err) throw err;
						if(typeof result!==undefined && result)
						{
							console.log("j'ai créé "+newChannel.name)
							console.log("on m'a répondu ")
							console.log(result)
							console.log(result.insertId)
						}
					});
				}
				else
				{
					if(unescape(result[0].name)!==newChannel.name || result[0].type!==newChannel.type )
					{
						var entry = `'${escape(newChannel.name)}','${newChannel.type}'`
						var sql="UPDATE `e107_discord_salon` SET `name` ='"+escape(newChannel.name)+"', `type`='"+newChannel.type+"' WHERE real_id="+newChannel.id

						console.log(sql)
						mysql_con_1[i].query(sql, function (err, result, fields) {
							if (err) throw err;
							if(typeof result!==undefined && result)
							{
								console.log("j'ai mis à jour "+newChannel.name)
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
	let salon={"real_id":newChannel.id, 'name': newChannel.name, "type":newChannel.type}
	salon_list[newChannel.id]=salon
	//salon_list[newChannel.id]=salon;

};