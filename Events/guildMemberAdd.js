//si un event guildMemberAdd arrive (un nouveau membre rejoint le discord)
module.exports = async(member,client,message)=>{
	let  users = member.users.cache;
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
};
