//récupération de la configuration
global.config  =  require ( "./config.json" ) ;

const mysql = require('mysql');

var con = mysql.createPool({
	host: config.db_host,
	user: config.db_user,
	password: config.db_password,
	database: config.db_name,
	connectionLimit: 100,

});





//console.log(con)
var i=0
setInterval(async function() {
	i=i+1
	con.getConnection(function(err) {
	if (err) {
		//console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + con.threadId);

	var sql="INSERT INTO `test` (champ1,champ2,champ3) VALUES ("+i+","+i+","+i+")"
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});
});
	console.log(i)
}, 150);