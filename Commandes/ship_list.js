module.exports.run = async(client,message,args) =>{
	//chargement des paramêtres de cette commande
	const param = client.commands.get('test').help

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
		let text=[];
		let mes_test=0;

		request.post(
			'https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_ship.php',
			(error, res, data) => {
				if (error) {
					console.error(error)
					return
				}
				json_data=JSON.parse(data);

				let list_ship="";
				let fields=[];
				json_data.forEach((ship)=>{
					//let new_line="ID: "+ship.id+"\n"+"> *Marque* :"+ship.man+"\n > *Nom* :    "+ship.name+"\n > *Emport* :    "+ship.emport+"\n\n";

					let one_field=[]
					//création du field
					one_field["name"]="*Marque* :"+ship.man
					one_field["inline"]=false
					one_field["value"]="ID: "+ship.id+"\n > *Nom* :    "+ship.name+"\n > *Emport* :    "+ship.emport+"\n\n"
					fields.push(one_field)
					/*//si le message fait moins de 2000 caractére
					if((new_line.length+list_ship.length)<2000)
					{
						list_ship=list_ship+""+new_line;
						text[mes_test]=list_ship;
					}
					//sinon on prépare un nouveau bloc message
					else
					{
						list_ship="";
						mes_test++;
						list_ship=list_ship+""+new_line;
						text[mes_test]=list_ship;
					}*/
				})

				/*text.forEach((bloc)=>{
					console.log(bloc.length)
					switch_msg.response(client,message,bloc)

				})*/
				var my_embed={
					"embed": {
						"title": "Liste des vaisseaux pris en charge par MySCtools",
						"url": "https://mysctools.ovh/",
						"color": 15179008,
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

};

module.exports.help ={
	name: "ship_list",
	info: `+ship_list\nVous donnera la liste des vaisseaux avec leur id unique pris en charge par le site https://mysctools.ovh/`,
	admin: false,
	in:"both", //text/dm/both la commande peu être appellé dans un salon textuel / en MP / les deux
	out: "callback", //text/dm/callback la réponse à cette commande arrivera sur le salon / en MP / sur la source d'arrivé

};