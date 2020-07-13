//const sqlite3 = require('sqlite3').verbose()

//récupération de l'objet db
const sqlite = require("./../class/db.js")

module.exports= class monkey {
	id=""
	name=""
	time=""
	salon=""
	game=""
	type=""
	alert=""
	nickname=""
	username=""
	jeton=""

	//à la déclaration on lance la recherche du membre dans la BD
	/*constructor(id) {
		//return this.search_m(id);
	}*/

	/* recherche du membre par son id */
	async search_m(id)
	{
		result= db_sql.select_o("`e107_discord_user`","*","`real_id`="+id).then(
			function()
			{
				console.log("on a recherché : `e107_discord_user`","*","`real_id`="+id);
				if(result.length>0)
				{
					console.log("retour de la recherche")

					console.log (result)
					console.log("fin du retour")
					this.hydrate(result);
					return result
				}
			})
			
			

			
			

		}

		/* crééation d'un membre avec l'id et le username, le reste utilisera des valeurs par défaut */
		async create_m(data)
		{

		//ouverture de la base de donnée
		await sqlite.open('./db/db_bot.sql3');
		if(data['id']!=="")
		{
			var entry = `'','${data['id']}','${escape(data.username)}','${Date.now()}','out','inc','inc','0','5'`
			//var sql = "INSERT INTO members (id, name, time, salon, game , type , alert ,jeton ) VALUES (" + entry + ")"
			//var r = await sqlite.run(sql)
			var result=db_sql.insert_o("e107_discord_user",'id,real_id, name, time, salon, game , type , alert ,jeton',entry)

			return new Promise ((resolve)=>{resolve(result)})
		}

		
	}

	/* mise à jour d'un salon */
	async update_m(data)
	{
		//ouverture de la base de donnée
		await sqlite.open('./db/db_bot.sql3');
		this.hydrate(data)
		
		let entry=`id= '${this.id}'`;
		for (var k in data){entry +=`, ${k} = '${data[k]}'`;}

			var sql = `UPDATE members SET ${entry} WHERE id= '${this.id}'`
		//console.log(sql)

		var r = await sqlite.run(sql)

		return new Promise((resolve) =>{resolve(r)})

	}
	

	/*
	* automatisme de remplissage, chaque information a une clé et une valeur,
	* si une méthode existe avec cette clé dans son nom, la méthode sera utilisé
	* sinon on renvoie la valeur à l'arrache dans l'objet
	* le but de cet méthode hydrate et permettre de faire un traitement sur les donnés si besoin en passant par une méthode
	*/
	hydrate(datas)
	{
		//on parcours les données
		for (var k in datas)
		{
			//pour chaque informations on récupére la clé
			if (datas.hasOwnProperty(k))
			{
				//si la méthode set_? exsite, on utilise cette methode (post traitement)
				if (typeof this['set_'+k]=== "function")
				{ 
					this['set_'+k](datas[k])
				}
				//sinon on l'envoie à l'arrache
				else
				{
					//this[k]=datas[k]
				}
			}
		}
		//console.log(this)
		return;
	}

	set_id (data)
	{
		if (!isNaN(data))
		{
			this.id=data;
			//console.log(this)
		}
		return
	}

	set_name (data)
	{
		if (typeof data === 'string' || data instanceof String)
		{
			this.name=data;
			//console.log(this)
		}
		return
	}

	set_time (data)
	{
		if (!isNaN(data))
		{
			this.time=data;
			//console.log(this)
		}
		return
	}

	set_salon (data)
	{
		if (typeof data === 'string' || data instanceof String)
		{
			this.salon=data;
			//console.log(this)
		}
		return
	}

	set_game (data)
	{
		if (typeof data === 'string' || data instanceof String)
		{
			this.game=data;
			//console.log(this)
		}
		return
	}

	set_type (data)
	{
		if (typeof data === 'string' || data instanceof String)
		{
			this.type=data;
			//console.log(this)
		}
		return
	}

	set_alert (data)
	{
		if (!isNaN(data))
		{
			this.alert=data;
			//console.log(this)
		}
		return
	}

	set_username (data)
	{
		if (typeof data === 'string' || data instanceof String)
		{
			this.username=data;
			//console.log(this)
		}
		return
	}

	set_jeton (data)
	{
		if (!isNaN(data))
		{
			this.jeton = data;
			//console.log(this)
		}
		return
	}
}




