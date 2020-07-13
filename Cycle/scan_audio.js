//mise à jours des fichier MP3 toutes les 2 minutes
setInterval(async function() {
	sound_list=[];
	count=0;
	
	let rep_mp3 = fs.readdirSync("./mp3/");
	rep_mp3.forEach((rep)=>{
		let list_mp3=fs.readdirSync("./mp3/"+rep+"/");

		list_mp3.forEach((sound)=>{

			sound_list[count]="./mp3/"+rep+"/"+sound;
			count++;
		})
	})

}, 120000);
