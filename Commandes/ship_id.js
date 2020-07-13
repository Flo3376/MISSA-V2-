module.exports.run = async (client,message) =>{
	const args = message.content.split(" ");
	//chargement des paramêtres de cette commande
	const param = client.commands.get('ship_id').help
	var switch_msg=new msg_sw(param,client,message)
	//envoie des données concernant le message entrant
	switch_msg.init(client,message)

	//si dans le processus de vérification des entrés tout est ok, on peux envoyer la réponse
	if(switch_msg.error.length==0)
	{
		//si l'argument n'est pas donnée
		if(!args[1])
		{	console.log(args)
			return switch_msg.response(client,message,"Vous n'avez spécifiez l'id d'un vaisseau")
		}

		//si l'argument n'est pas un chiffre
		if(isNaN(args[1]))
		{
			return switch_msg.response(client,message,"Vous n'avez spécifiez un nombre réelle")
		}

		//si l'id n'est pas dans le tableau, si 200 vaisseaux, le vaisseau 203 ne peux pas exister
		if(args[1]>all_ships.length)
		{
			return switch_msg.response(client,message,"L'id que vous fournissez n'est pas disponible")
		}

		//construction du lien à parser
		const url = 'https://starcitizen.tools'+all_ships[args[1]].link;
		console.log(url)

		//requete HTTP
		request.post(
			url,
			(error, res, data) => {
				if (error) {
					console.error(error)
					return
				}

				//chargement du parseur de page HTML
				const cheerio = require('cheerio'),cheerioTableparser = require('cheerio-tableparser');

				//chargement des données de la page appelée pour le parsage
				var $ = cheerio.load(data);

				let table_find = [];
				let table_data = {};

				//rechcerche du tableau à inspecter (il n'y en a qu'un seul)
				$("table").each(function (i, table) {
					console.log(`tableau : ${i}`)
					//mise en mémoire du tableau
					table_find.push(table)
				});
				//console.log(table_find[0])

				//chargement du tableau récupérer pour le parsage
				$ = cheerio.load(table_find[0])

				//parsage du tableau en mod code (en gros ce qui est visible en faisant F12, a ref, class, id ....)
				cheerioTableparser($);
				var data_link = $("table").parsetable();

				//parsage du tableau en mod text (ce que vera un utilsateur sur son écran)
				var datas_text = $("table").parsetable(true, true, true);

				let list_img=[]

				$("img").each(function (i, img) {
					list_img.push($(img).attr('data-src'))
				});
				//console.log(list_img)
				let fields=[];

				//liste des élément du tableau que l'on veut afficher
				var data_s=["Role","Size","Crew","Series","Cargo capacity","Production state","Buy","Rent (1 day)",
				"Claim time","Expedite","Expedite fee","Cost","Original",
				"Availability","Length","Beam","Height","Combat speed","Max speed"]

				var data_s_title={"Role":"Role","Size":"Taille","Crew":"Equipage","Series":"Série",
				"Cargo capacity":"Capacitée du cargo","Production state":"Avancement","Buy":"Achat IG","Rent (1 day)":"Location/jour",
				"Claim time":"Temps de Claim","Expedite":"Temps de Claim Expedite","Expedite fee":"Coût d'un expedite","Cost":"Prix IRL",
				"Original":"Prix à sa sortie","Availability":"Disponibilité à l'achat","Length":"Longueur","Beam":"Largeur",
				"Height":"Hauteur","Combat speed":"Vitesse en combat","Max speed":"Vitesse maximale",}
				for (var i = 0; i < datas_text[0].length; i++)
				{
					if(data_s.includes(datas_text[0][i]))
					{
						let one_field=[]
						if(datas_text[0][i] in data_s_title)
						{
							one_field["name"]=data_s_title[datas_text[0][i]]
						}
						else
						{
							one_field["name"]=datas_text[0][i]
						}

						//création du field
						one_field["inline"]=true
						one_field["value"]=datas_text[1][i]
						fields.push(one_field)
					}

				}
				
				var my_embed={
					"embed": {
						"title": `${datas_text[0][1]} par ${datas_text[1][2]} (id:${args[1]})`,
						"color": 15179008,
						"description": `[${datas_text[0][1]}](${url})`,
						"footer": {"text": "Généré grace à starcitizen.tools\n\nBonne fin de journée à toi de la part du vieux singe au hangar"},
						"thumbnail": {"url": all_ships[args[1]].logo},
						"image": {"url": 'https://starcitizen.tools'+list_img[0]}, 
						"fields": [
						fields
						]
					} 
				}
				return switch_msg.response(client,message,my_embed)
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
	name: "ship_id",
	info: `+ship_id\n Retourne la fiche de l'appareil, "+ship_id [x], ex "+ship_id 2"`,
	admin: false,
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "callback", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé

};