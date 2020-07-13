//si la commande diag est appelé
module.exports.run = async(client,message,args) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('diag').help

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
		//on revnoie les données dans la console du robot
		console.log(salon_list);
		console.log(monkeys_list);
		switch_msg.response(client,message,"Le résultat du diag à été envoyé sur la console")
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
};
module.exports.help ={
	name: "diag",//nom de la commande
	info2: `+diag\n Retourne dans les consoles les tableaux monkeys_list et salon_list`,//texte descriptif de la commande
	admin: true, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"dm", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};