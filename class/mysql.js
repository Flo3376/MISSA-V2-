//const mysql = require('mysql');

//console.log(mysql_con);

/*global.mysql_con = mysql.createPool({
	host: config.db_host,
	user: config.db_user,
	password: config.db_password,
	database: config.db_name,
	connectionLimit: 20,
});
/*
//console.log(mysql_con);

//mysql_con.end();
//console.log(mysql_con);

var db
exports.db = db

//script de test de connection à la bd
exports.exec=function(query,mod)
{
	// Ping database to check for common exception errors.
	mysql_con.getConnection((err, connection) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		}

		if (connection)
		{
			console.error('Connexion établie')
			console.error(query)
			if (query !==undefined)
			{
				mysql_con.query(query, function (err, result, fields) {
					if (err) throw err;
					console.log(result);
					connection.release()
					return result
				});
			}
		} 
		return 
	})

}

//script d'insertion mono dans la bd
exports.insert_o=function(table, colum,data)
{
	var result=this.exec("INSERT INTO "+table+"  ("+colum+") VALUES ("+data+")")
}

//script de recherche
exports.select_o=function(table, data,where)
{
	//return new Promise((succes,echec) =>
	//{

		// Ping database to check for common exception errors.
		mysql_con.getConnection((err, connection) => {
			if (err) {
				if (err.code === 'PROTOCOL_CONNECTION_LOST') {
					console.log('Database connection was closed.')
				}
				if (err.code === 'ER_CON_COUNT_ERROR') {
					console.log('Database has too many connections.')
				}
				if (err.code === 'ECONNREFUSED') {
					console.log('Database connection was refused.')
				}
			}

			if (connection)
			{
				//console.error('Connexion établie')
				console.log("query = SELECT "+data+" FROM "+table+"  WHERE "+where)
				mysql_con.query("SELECT "+data+" FROM "+table+"  WHERE "+where, function (err, result, fields) {
					if (err) throw err;
					//console.log("select : "+result);
					//console.log(result);
					//console.log("select fin");
					connection.release()
					if(typeof result!==undefined && result)
						{
							//console.log("réussite de la requête");
							return result
							//succes(result)
						}
					//else {echec(null);}
				});

			} 

		//})
		
	})
	
}
*/

