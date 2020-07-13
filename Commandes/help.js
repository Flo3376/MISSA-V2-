module.exports.run = async (client,message, args) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('help').help

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
		let fields=[];
		for (var i = 0; i < helps.length; i++)
		{
			let one_field=[]
			one_field["name"]=helps[i]["name"]
			one_field["inline"]=false
			one_field["value"]=helps[i]["info"]
			if(helps[i]["info"]!=undefined)
			{fields.push(one_field)}
			
		}

		var my_embed={
			"embed": {
				"title": "Aide sur les commandes actives",
				"color": 15179008,
				"thumbnail": {
					"url": "https://www.icone-png.com/png/54/53908.png"
				}, 
				"fields": [
				fields
				]

			} 
		}
		switch_msg.response(client,message,my_embed)
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}
	/*message.author.send({
		embed:{
			color: 3447003,
			title:`**Commandes fonctionnelles**`,
			fields: [
			{
				name:"+clear [un nombre]",
				value : "Supprime X message dans le salon textuel en cours, ex: +clear 50"
			},
			{
				name:"+fc [id_ de l'appareil][argent disponible]",
				value : "Vous retourner les produits les plus rentables à tradder avec les conditions que vous avez indiqué.\n ex +fc 8 5000\n les id sont disponibles en tapant la commande +ship_list"
			},
			{
				name:"+help : ",
				value : "c'est ce que tu lis :)"
			},
			{
				name:"+jeton : ",
				value : "Vous indique le nombre de jetons restants pour mettre de l'ambiance"
			},
			{
				name:"+kick [utilisateur][raison (optinnelle)]",
				value : "Déconnecte un utilisateur ex: +kick @un_joueur tu me casses les couilles"
			},
			{
				name:"+kill [utilisateur][raison (optionelle)]",
				value : "Envoie un utilisateur dans le salon AFK, ex: +kill @un_joueur 'va te calmer 30 secondes'"
			}
			,
			{
				name:"+play [lien youtube]",
				value : "Lancera la lecture **audio** d'un lien youtubre, ex : +play https://www.youtube.com/watch?v=vb_k04U3pNs .Attention Missa ne peux être que sur un salon. Si une musique est déjà en cours, celle que vous proposerez sera mis playlist."
			}
			,
			{
				name:"+ping ",
				value : "Test son ping (pas sur de la justesse du résultat)"
			}
			,
			{
				name:"+prison ",
				value : "Retournera les informations connues sur les prisons"
			},
			{
				name:"+rh [numéro du préset]",
				value : "Jouera un extrait de film. La liste des extraits est disponible en faisant +sound_list bruitage.., ex: +rh 5"
			}
			,
			
			{
				name:"+ship ",
				value : "Vous donnera la liste des vaisseaux avec leur id unique pris en charge par le site https://mysctools.ovh/"
			}
			,
			{
				name:"+skip ",
				value : "Lancera la musique suivante de la playlist"
			}
			,
			{
				name:"+sound_list",
				value : "Vous donnera la liste compléte des extraits utilisable avec la commande +rh"
			}
			,
			{
				name:"+stats ",
				value : "Connaitre les informations de quelqu'un"
			}
			,
						{
				name:"+stop ",
				value : "Coupe la lecture de fichier audio youtube et effacera la playlist"
			}
			,
			
			],
			footer: {
				text:`informations demandé par  l'utilisateur ${message.author.username}`
			}
		}
	})*/

};

module.exports.help ={
	name: "help",//nom de la commande
	info: `+ Help, Vous retourne toutes les commandes actives de ce Bot`,//texte descriptif de la commande
	admin: false, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};