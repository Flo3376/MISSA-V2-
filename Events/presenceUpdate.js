const mysql = require('mysql');

//si un event presence update arrive (le joueur à fait quelque chose)
module.exports = async(client,oldPresence, newPresence)=>{
	
/*
	let last_activity_type="";
	let last_activity_name="";

	//si l'on détecte un arrêt d'activité
	if(oldPresence)
	{
		let last_user_activity = oldPresence.activities;

		for(let activity of last_user_activity.values())
		{
			//si les information type d'activité et nom du jeux sont exploitable
			if(activity.hasOwnProperty('type') && activity.hasOwnProperty('name') )
			{
				//si l'activité concerne bien un jeux
				if (activity.type==="PLAYING")
				{
					let old_users_data = client.users.cache;
					old_users_data=old_users_data.get(oldPresence.userID);

					//si le joueur n'as pas changé son peudo, nickname n'exsite pas, il faut utilisé username					
					//if(oldPresence.member.nickname !== null && monkeys_list[oldPresence.userID].game!=="inc")
					//{
					//	console.log(oldPresence.member.nickname+" a quité l'activitée : "+activity.name);
					//}
					//else
					//{
					//	if (monkeys_list[oldPresence.userID].game!== "inc")
					//	{
					//		console.log(old_users_data.username+" a quité l'activitée : "+activity.name);
					//	}
					//}

					last_activity_type="activity.type";
					last_activity_name="activity.name";
				}

			}
		}
	}
	//si l'on détecte un debut d'activité
	if(newPresence)
	{
		let new_user_activity = newPresence.activities;

		for(let activity of new_user_activity.values())
		{
			//si les information type d'activité et nom du jeux sont exploitable
			if(activity.hasOwnProperty('type') && activity.hasOwnProperty('name') )
			{
				//si l'activité concerne bien un jeux
				if (activity.type==="PLAYING" && last_activity_type !== activity.type && last_activity_name !== activity.name)
				{
					let new_users_data = client.users.cache;
					new_users_data=new_users_data.get(newPresence.userID);

					
					//if(newPresence.member.nickname !== null && monkeys_list[newPresence.userID].game!=="inc")
					//{
					//	console.log(newPresence.member.nickname+" a commencé l'activitée : "+activity.name);
					//}
					//else
					//{
					//	if (monkeys_list[newPresence.userID].game!== "inc")
					//	{
					//		console.log(new_users_data.username+" a commencé l'activitée : "+activity.name);
					//	}
					//}
					
					//on prépare l'objet monkeys
					let monkey= new monkeys();

					//on recherche un correspondance avec un utilisateur existant
					let info = await monkey.search_m(newPresence.userID).then()
					//si le membre n'existe pas, on le créé immédiatement
					if( info === null)
					{
						result = await monkey.create_m(usr).then()
						//console.log(`création du membre ${usr['username']}`)
					}


					//creation du tableau de mise à jour
					let new_data={};
					new_data.type=activity.type;
					new_data.game=activity.name;
					new_data.time = Date.now();
					new_data.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

					//mise à jour des donnée du membres
					info = await monkey.update_m(new_data).then()

					monkeys_list[newPresence.userID]=monkey;

				}
			}
		}

	}*/
};