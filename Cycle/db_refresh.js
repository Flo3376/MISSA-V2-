//mise à jours de la base de données des salons et membres
setInterval(async function() {
	//console.log("bip-bip")
	/*
	//parcours des salons
	let channels = client.channels.cache;
	for(let channel of channels.values())
	{
		//on prépare l'objet monkeys
		let salon= new salons_m();
		//console.log("channel : "+channel)
		if(channel["id"]!=="dm")
		{

			//on recherche un correspondance avec un salon existant
			let info = await salon.search_s(channel["id"]).then()
			//si le salon n'exsite pas on le créé
			if( info === null){result = await salon.create_s(channel).then();}
			//sinon on le met à jours si besoin
			else
			{
				if(channel["name"]!==salon.name || channel["type"]!==salon.type || channel["id"]!==salon.id)
				{
					result = await salon.update_s(channel).then();
					salon_list[channel["id"]]=salon;
				}
			}
		}

		

		//console.log(salon[channel["id"]]);
	}

	let users = client.users.cache;
	for(let usr of users.values())
	{
		if(monkeys_list[usr.id].jeton<5)
		{
			//on prépare l'objet monkeys
			let monkey= new monkeys();

			//on recherche un correspondance avec un utilisateur existant
			let info = await monkey.search_m(usr.id).then()
			//si le membre n'existe pas, on le créé immédiatement
			if( info === null)
			{
				result = await monkey.create_m(usr).then()
				console.log(`création du membre ${usr.id}`)
			}
			//creation du tableau de mise à jour
			let new_data={};
			let jeton=monkeys_list[usr.id].jeton+1;
			new_data.jeton=jeton;
			new_data.time = Date.now();
			new_data.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

			//mise à jour des donnée du membres
			info = await monkey.update_m(new_data).then()
			monkeys_list[usr.id]=monkey;
			
			
			
		}
	}*/
	console.log(monkeys_list);
	console.log(salon_list)
}, 60000);
