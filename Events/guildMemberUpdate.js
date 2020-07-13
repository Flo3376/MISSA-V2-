module.exports = async(client,oldMember, newMember)=>{
	// Si les rôles sont présents sur l'ancien objet membre mais plus sur le nouveau (c'est-à-dire que les rôles ont été supprimés)
	/*const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
	if (removedRoles.size > 0)
	{
		let role_id= removedRoles.map(r => r.id)[0];
		if(role_id ==="711134205270032404")
		{
			oldMember.send("adieux")
		}
		
	}
	console.log(`The roles ${removedRoles.map(r => r.id)} were removed from ${oldMember.displayName}.`);
	*/
	// Si le ou les rôles sont présents sur le nouvel objet membre mais ne le sont pas sur l'ancien (c'est-à-dire que les rôles ont été ajoutés)
	const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
	if (addedRoles.size > 0)
	{
		let role_id= addedRoles.map(r => r.id)[0];
		if(role_id ===config.bm_id_role)
		{
			//newMember.send("bienvenue")

			//chargement du template (méthode provisoire car dangereuse avec l'utilisation de la méthode eval())
			fs.readFile("./embed/to_bm.js", "utf-8", (err, data) => {
				//interprétation du template
				eval(data)
				//envoie du message privée avec la réponse
				newMember.send(my_embed)
			});

			
		}
		if(role_id ===config.gm_id_role)
		{
			//newMember.send("bienvenue")

			//chargement du template (méthode provisoire car dangereuse avec l'utilisation de la méthode eval())
			fs.readFile("./embed/to_gm.js", "utf-8", (err, data) => {
				//interprétation du template
				eval(data)
				//envoie du message privée avec la réponse
				newMember.send(my_embed)
			});

			
		}
		console.log(`Le rôle ${addedRoles.map(r => r.name)} id:'${addedRoles.map(r => r.id)}' a été ajouté à ${oldMember.displayName}.`);
	} 
	

};