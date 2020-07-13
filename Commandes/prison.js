module.exports.run = async (client,message) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('prison').help

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
		var my_embed={
			"embed":{
				"color": 3447003,
				"title":`**Informations sur les prisons**`,
				"fields": [
				{
					name:"Durée par crimestat",
					value : "40 minutes par crimestat"
				},
				{
					name:"Diminution de la peine de prison en minant de Dolivine",
					value : "1 minute / pierre vendue"
				},

				{
					name:"Diminution de la peine de prison en minant de l'aphorite",
					value : "6 minute / pierre vendue (estimation)"
				},
				{
					name:"Diminution de la peine de prison en minant de l'Hadanite",
					value : "20 minute / pierre vendue (estimation)"
				}
				,
				{
					name:"Arme dispo",
					value : "Aucune, combats à mains nues possible hors de la zone de vie"
				}
				,
				{
					name:"Outils",
					value : "MultiTools fourni avec sa tête de minage, fonctionnel hors de la zone de vie"
				}
				,
				{
					name:"Oxygène",
					value : "limité à une trentaine de minutes"
				}
				,
				{
					name:"Conseil avant arrestation",
					value : "Tous l'équipement que vous porterez sera perdu, pensez à vous déséquiper si vous pouvez."
				}
				,
				],
				footer: {
					text:`informations demandées par  l'utilisateur ${message.author.username}`
				}
			}
		}
		return switch_msg.response(client,message,my_embed)
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
	

};

module.exports.help ={
	name: "prison",
	info: `+prison\nRetournera les informations connues sur les prisons`,
	admin: false, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "callback", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};