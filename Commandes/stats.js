//const Discord = require ("discord.js");
//const moment = require ("moment")

module.exports.run = async (client,message, args) =>{

	//si une correspondance est trouvé
	if(message.mentions.members.first() !== undefined)
	{
		const membre= message.mentions.members.first()
		
		let current_salon="";
		
		//si l'information salon stocké dans la bd n'est pas un chiffre, c'est que l'on vient de le créé, ou qu'il c'est déconnecté (inc/out)
		if (isNaN(monkeys_list[membre.id].salon))
		{
			current_salon="Inconnu ou non conecté(e)"
		}
		else
		{
			current_salon=salon_list[monkeys_list[membre.id].salon].name
		}

		message.author.send({
			embed:{
				color: 3447003,
				title:`Statistique de l'utilisateur **${membre.user.username}**`,
				thumbnail:{
					url : membre.user.displayAvatarURL()
				},
				fields: [
				{
					name:">ID : ",
					value : membre.id
				},
				{
					name:"Dans le salon : ",
					value : `${current_salon}`
				}
				,
				{
					name:"Jeu / activitée: ",
					value : `${monkeys_list[membre.id].game}`
				}
				,
				{
					name:"Nombre de jetons : ",
					value : `${monkeys_list[membre.id].jeton}`
				}
				,
				{
					name:"Niveau d'alerte : ",
					value : `${monkeys_list[membre.id].alert}`
				}
				],
				footer: {
					text:`Fin du rapport`
				}
			}
		})
	}
	//sinon c'est que le membre cité n'existe pas ou est mal orthographié
	else
	{
		message.author.send("Aucun membre ne correspond à votre demande.")
		return
	}
};

module.exports.help ={
	name: "stats",
	info2: `+stats\nVous permettra de connaitre les informations de membre sur discord`,
	admin: false,
	channel: "in_serv"
};