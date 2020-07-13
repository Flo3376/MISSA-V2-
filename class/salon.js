
//récupération de l'objet db
const sqlite = require("./../class/db.js")

module.exports= class salon {
	id="";
	name=""
	type=""
	
	/* recherche du salon par son id */
	async search_s(id)
	{
		//ouverture de la base de donnée
		await sqlite.open('./db/db_bot.sql3');

		var sql = "SELECT * FROM salons WHERE id=?"
		var r = await sqlite.all(sql, id)

		return new Promise((resolve) =>
		{
			//si la réponse n'est pas vide, le membre existe,on doit remplir les données de l'objet, sinon on retourne null
			if(r.length>0){this.hydrate(r[0]);resolve(this)}
			else {resolve(null);}
		})
	}

	/* création d'un salon */
	async create_s(data)
	{
		//ouverture de la base de donnée
			await sqlite.open('./db/db_bot.sql3');

			var entry = `'${data['id']}','${data.name}','${data.type}'`
			var sql = "INSERT INTO salons (id, name, type ) VALUES (" + entry + ")"
			var r = await sqlite.run(sql)

			return new Promise ((resolve)=>{resolve(r)})
		
	}

	/* mise à jour d'un salon */
	async update_s(data)
	{
			
			//ouverture de la base de donnée
			await sqlite.open('./db/db_bot.sql3');
			this.hydrate(data)
			var entry = `'${data['id']}','${encodeURI(data.name)}','${data.type}'`
			var sql = `UPDATE salons SET name ='${this.name}', type='${this.type}' WHERE id= '${this.id}'`
			var r = await sqlite.run(sql)

			return new Promise((resolve) =>
			{
				
				
				resolve(r)
			})
		
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

	set_type (data)
	{
		if (typeof data === 'string' || data instanceof String)
		{
			this.type=data;
			//console.log(this)
		}
		return
	}
}




