module.exports.run = async (client,message) =>{
	const args = message.content.split(" ");
	//chargement des paramêtres de cette commande
	const param = client.commands.get('man_id').help

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
		//si l'argument n'est pas donnée
		if(!args[1])
		{	console.log(args)
			return switch_msg.response(client,message,"Vous n'avez spécifiez l'id d'un constructeur")
		}

		//si l'argument n'est pas un chiffre
		if(isNaN(args[1]))
		{
			return switch_msg.response(client,message,"Vous n'avez spécifiez un nombre réelle")
		}

		//index pour la liste des ship
		var id_ships=0;

		//purge du tableau des ships
		all_ships=[]

		//chargement du parseur de page HTML
		const cheerio = require('cheerio'),cheerioTableparser = require('cheerio-tableparser');

		//construction du lien à parser
		const url = 'https://starcitizen.tools/List_of_Ship_and_Vehicle_Prices';

		//requete HTTP
		request.post(
			url,
			(error, res, data) => {
				if (error) {
					console.error(error)
					return
				}
				//chargement des données de la page appelée pour le parsage
				var $ = cheerio.load(data);

				let table_find = [];
				let table_data = [];

				//rechcerche du tableau à inspecter (il n'y en a qu'un seul)
				$("table").each(function (i, table) {
					//mise en mémoire du tableau
					table_find.push(table)
				});
				//chargement du tableau récupérer pour le parsage
				$ = cheerio.load(table_find[0])

				//parsage du tableau en mod code (en gros ce qui est visible en faisant F12, a ref, class, id ....)
				cheerioTableparser($);
				var data_link = $("table").parsetable();

				//parsage du tableau en mod text (ce que vera un utilsateur sur son écran)
				cheerioTableparser($);
				var datas_text = $("table").parsetable(true, true, true);

			//on parcours le tableau HTML pour le convertir en tableau nodejs (lecture en colone)
			for (var i = 1; i < datas_text[1].length; i++)
			{ 	

					//création d'une variable qui indiquera quelle constructeur évoque un appareil
					let actual_man="";

					//chargment du nom du constructeur se trouvant sur la seconde colone
					$ = cheerio.load(data_link[1][i]);

					//mise en mémoire du constructeur actuellement évoqué
					$("a").each(function (i, link) {
						if(man.find(man => man.name === $(link).attr('title')))
						{
							actual_man=man.find(man => man.name === $(link).attr('title'));
							//console.log(`je ai trouvé ${$(link).attr('title')}`)
						}
					});


					//récupération des liens appareils et nom des appareil via la première colone
					$ = cheerio.load(data_link[0][i]);
					let ship_links=[]
					$("a").each(function (i, link) {
						let ship=[];
						ship['id']=id_ships;
						ship['name']=$(link).attr('title');
						ship['link']=$(link).attr('href');
						ship['logo']=man[actual_man.id].img;
						all_ships.push(ship);

						man[actual_man.id].ships.push(ship);
					});
					id_ships++;
				}

				let fields=[];
				for (var i2 = 0; i2 < man[args[1]].ships.length; i2++)
				{
					let one_field=[]
					//création du field
					one_field["name"]="\u200b"
					one_field["inline"]=false
					one_field["value"]="[id n°"+man[args[1]].ships[i2]["id"] +" => "+man[args[1]].ships[i2]["name"]+"\n https://starcitizen.tools"+man[args[1]].ships[i2]["link"]+"](https://starcitizen.tools"+man[args[1]].ships[i2]["link"]+")"
					fields.push(one_field)

				}

				console.log(fields)

				var my_embed={
					"embed": {
						"title": man[args[1]].name,
						"url": man[args[1]].links,
						"color": 15179008,
						"description": man[args[1]].links,
						"thumbnail": {
							"url": man[args[1]].img
						}, 
						"fields": [
						fields
						]
					} 
				}
				switch_msg.response(client,message,my_embed)

			})
	}
	else
	{
		console.log(`Nombre d'erreur : ${switch_msg.error.length}`)
		console.log(`Erreur(s) : ${switch_msg.error}`)
		return
	}


}
module.exports.help ={
	name: "man_id",//nom de la commande
	info: `Retourne la liste des appareils construits par le fabricant, "+man_id [x]", ex "+man_id 2"`,//texte descriptif de la commande
	admin: false, //true/false cette commande ne peut être utilisé que par un administrateur
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "dm", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé
};
