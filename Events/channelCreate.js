
module.exports = async ( client , channel ) => {
	let i=2200
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

		mysql_con_1[i].query("SELECT * FROM `e107_discord_salon`  WHERE `real_id`="+channel.id, function (err, result, fields)
		{
			if (err) throw err;

			if(typeof result!==undefined && result)
			{
				if(result.length===0)
				{
					var entry = `'','${channel.id}','${escape(channel.name)}','${channel.type}'`
					var sql="INSERT INTO `e107_discord_salon` (id,real_id, name, type) VALUES ("+entry+")"
					mysql_con_1[i].query(sql, function (err, result, fields) {
						if (err) throw err;
						if(typeof result!==undefined && result)
						{
							console.log("j'ai créé "+channel.name +"=>"+result.insertId)
						}
					});
				}
				
				mysql_con_1[i].end()
				delete mysql_con_1[i]
			}
		})
	})
	let salon={"real_id":channel.id, 'name': channel.name, "type":channel.type}
	salon_list[channel.id]=salon
}