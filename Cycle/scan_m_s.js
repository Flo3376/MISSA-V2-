//prototype de fonction permettant d'agir si un membre de fait pas le bon jeux dans un salon réservé à un jeu spécifique
setInterval(function() {
	/*for (const property in monkeys_list)
	{
		if (monkeys_list[property].game!=="inc" && monkeys_list[property].salon!=="inc")
		{
			if(monkeys_list[property].salon==="702600937369370624" && monkeys_list[property].game!=="Star Citizen")
			{
				monkeys_list[property].alert++;

				
				let users = client.users.cache;
				console.log(client.users);
				let user=users.get(property);

				if(monkeys_list[property].alert==1)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'est pas actif. Premier avertissement.");
					monkeys_list[property].time = Date.now();
					monkeys_list[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
				if(monkeys_list[property].alert==12)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'est pas actif.");
					monkeys_list[property].time = Date.now();
					monkeys_list[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
				if(monkeys_list[property].alert==24)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'est pas actif. Dernier avertissement.");
					monkeys_list[property].time = Date.now();
					monkeys_list[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
				if(monkeys_list[property].alert==36)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'était pas actif. Expulsion du channel.");
					monkeys_list[property].time = Date.now();
					monkeys_list[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
			}
			if(monkeys_list[property].salon==="702600937369370624" && monkeys_list[property].game==="Star Citizen")
			{
				monkeys_list[property].alert=0;
			}
		}
	}*/
}, 60000);
