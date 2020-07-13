module.exports.run = async (client,message) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('acc').help

	/*
	*	initialisation d'un routeur entrant/sortant
	*
	*	@param: paramétre des droits entrants et sortant du message indiqués dans le help de la commande
	*/
	var switch_msg=new msg_sw(param,client,message)
	//envoie des données concernant le message entrant
	switch_msg.init(client,message)
	//console.log(switch_msg)

	//si dans le processus de vérification des entrés tout est ok, on peux envoyer la réponse
	if(switch_msg.error.length==0)
	{
		
		
		if(message.mentions.members===null)
		{
			var usr=[]
			usr['name']=message.author.username
			
		}
		else
		{
			var usr=[]
			console.log(message.author)
			usr['name']=message.mentions.members.first()
		}
		console.log(usr)
		//const member= message.mentions.members.first() || message.member;
		let data="";

		fs.readFile("./embed/bienvenue.js", "utf-8", (err, data) => {
			//console.log(data)
			eval(data)
			switch_msg.response(client,message,my_embed)
		});

		
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
};



module.exports.help ={
	name: "acc",//nom de la commande
	info2: `+acc\nSimule l'arrivé d'un joueur`,//texte descriptif de la commande
	admin: true, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"text", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "text", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé

};