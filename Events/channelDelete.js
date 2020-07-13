const mysql = require('mysql');
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
		mysql_con_1[i].query("DELETE FROM `e107_discord_salon` WHERE `real_id`="+channel.id, function (err, result, fields)
		{
			if (err) throw err;

			if(typeof result!==undefined && result)
			{
				console.log('supression du salon'+channel.id )
				mysql_con_1[i].end()
				delete salon_list[channel.id]
				delete mysql_con_1[i]
			}
		})
	})


}