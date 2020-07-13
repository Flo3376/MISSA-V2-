//auto require renseigné dans le fichier require.json
global.req_files  =  require ( "./require.json" ) ;
for(let req_mod in req_files)
	{
		eval(req_files[req_mod].type+"."+req_files[req_mod].name+" = require('"+req_files[req_mod].path+"');")
	}
fs.readFile("intro.js", "utf-8", (err, data) => {eval(data)});
console.log("======================")	

//connexion à discord central et répercution sur les serveurs autorisé
global.client = new Discord.Client()

//état de l'initialisation du bot
var ready=false;

//création des variable de la lib youtube
global.queue = new Map();
global.serverQueue ;

//initialisation du bot sur les serveurs abonné
client.login(config.token)

//variable permettant ou pas à missa de rester dans un salon à la fin d'une lecture
global.standby=false;

//variable permettant ou pas de purger le cache des commandes apellées
global.auto_reload=false;

//tableau qui contiendra tous les salons
global.salon_list={};

//tableau qui contiendra tous les son de la commande rh
global.sound_list=[];

//tableau qui contiendra tous les membres
global.monkeys_list={};

//tableau du createur d'aide
global.helps=[];

//tableau de tous les vaisseaux
global.all_ships=[];

//construction du tableau des constructeurs
global.man=[
{"id":"0","name":"Aegis Dynamics","ships":[], "links":"https://starcitizen.tools/Aegis_Dynamics","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Aegis_Dynamics.png"},
{"id":"1","name":"Anvil Aerospace","ships":[], "links":"https://starcitizen.tools/Anvil_Aerospace","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Anvil_Aerospace.png"},
{"id":"2","name":"Aopoa","ships":[], "links":"https://starcitizen.tools/AopoA","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/AopoA.png"},
{"id":"3","name":"Argo Astronautics","ships":[], "links":"https://starcitizen.tools/ARGO_Astronautics","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/ARGO_Astronautics.png"},
{"id":"4","name":"Banu Souli","ships":[], "links":"https://starcitizen.tools/Banu_Souli","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Banu_Souli.png"},
{"id":"5","name":"Consolidated Outland","ships":[], "links":"https://starcitizen.tools/Consolidated_Outland","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Consolidated_Outland.png"},
{"id":"6","name":"Crusader Industries","ships":[], "links":"https://starcitizen.tools/Crusader_Industries","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Crusader_Industries.png"},
{"id":"7","name":"Drake Interplanetary","ships":[], "links":"https://starcitizen.tools/Drake_Interplanetary","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Drake_Interplanetary.png"},
{"id":"8","name":"Esperia","ships":[], "links":"https://starcitizen.tools/Esperia_Inc.","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Esperia_Inc..png"},
{"id":"9","name":"Greycat Industrial","ships":[], "links":"https://starcitizen.tools/Greycat_Industrial","img" : "https://starcitizen.tools/images/thumb/1/15/Greycat.jpg/450px-Greycat.jpg"},
{"id":"10","name":"Kruger Intergalactic","ships":[], "links":"https://starcitizen.tools/Kruger_Intergalactic","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Kruger_Intergalactic.png"},
{"id":"11","name":"Musashi Industrial and Starflight Concern","ships":[], "links":"https://starcitizen.tools/Musashi_Industrial_and_Starflight_Concern","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Musashi_Industrial_and_Starflight_Concern.png"},
{"id":"12","name":"Origin Jumpworks","ships":[], "links":"https://starcitizen.tools/Origin_Jumpworks_GmbH","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Origin.png"},
{"id":"13","name":"Roberts Space Industries","ships":[], "links":"https://starcitizen.tools/Roberts_Space_Industries","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Roberts_Space_Industries.png"},
{"id":"14","name":"Tumbril Land Systems","ships":[], "links":"https://starcitizen.tools/Tumbril_Land_Systems","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Tumbril_logo.png"},
{"id":"15","name":"Vanduul Clans","ships":[], "links":"https://starcitizen.tools/Vanduul_Clans","img" : "https://mysctools.ovh/e107_plugins/sc_trad/img/Vanduul.png"},
]

client.commands = new Discord.Collection();
//chargement des fichiers commandes js
fs.readdir("./Commandes/",(error,f)=>{
	if(error) console.log(error);

	let commandes=f.filter(f=>f.split(".").pop()==="js");
	if(commandes.length<=0)return console.log("Aucune commande trouvée !")

		commandes.forEach((f) => {
			let commande = require(`./Commandes/${f}`);
			console.log(`${f} commande chargée!`);
			client.commands.set(commande.help.name, commande);
			let help_command=[];
			help_command["name"]=commande.help.name;
			help_command["info"]=commande.help.info;
			help_command["admin"]=commande.help.admin;
			helps.push(help_command);

		});
	console.log("======================")
})



//chargement des fichiers Events js
fs.readdir("./Events/",(error,f)=>{
	if(error) console.log(error);
	

	f.forEach((f)=>{
		console.log(`${f} events chargée!`);
		const events = require(`./Events/${f}`);
		const event = f.split(".")[0]

		client.on(event,events.bind(null,client))

	});
	console.log("======================")
})

//chargement des fichiers MP3
count=0;
let rep_mp3 = fs.readdirSync("./mp3/");
rep_mp3.forEach((rep)=>{
	let list_mp3=fs.readdirSync("./mp3/"+rep+"/");

	list_mp3.forEach((sound)=>{
		
		sound_list[count]="./mp3/"+rep+"/"+sound;
		count++;
	})
})

//chargement des fichiers pour les commandes cycliques
fs.readdir("./Cycle/",(error,f)=>{
	if(error) console.log(error);

	let cycles=f.filter(f=>f.split(".").pop()==="js");
	if(cycles.length<=0)return console.log("Aucune commande cycliques trouvée !")

		cycles.forEach((f) => {
			let cycle = require(`./Cycle/${f}`);
			console.log(`${f} commande cycliques chargée!`);
		});
	console.log("======================")
})
