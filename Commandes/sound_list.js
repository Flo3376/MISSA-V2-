module.exports.run = async (client,message,args) =>{

	let text=[];
	let mes_test=0;
	
	let list_sound="En utilisant la commande +sound_play [x] ou x correspond au numéro d'un des sons, Missa vous jouera votre extrait\n\n";

	count=0;
	let rep_mp3 = fs.readdirSync("./mp3/");
	rep_mp3.forEach((rep)=>{
		new_rep="\n**__"+rep+"__**\n";

		//si le message fait moins de 2000 caractére
		if((list_sound.length+new_rep.length)<2000)
		{
			list_sound=list_sound+""+new_rep;
			text[mes_test]=list_sound;
		}
		//sinon on prépare un nouveau bloc message
		else
		{
			list_sound="";
			mes_test++;
			list_sound=list_sound+""+new_rep;
			text[mes_test]=list_sound;
		}

		let list_mp3=fs.readdirSync("./mp3/"+rep+"/");

		list_mp3.forEach((sound)=>{
			text_sound=sound.replace('.mp3', '');
			text_sound=text_sound.split('-').join(' ');
			text_sound=text_sound.split('_').join(' ');
			new_mp3="> "+count+"     "+text_sound+"\n";

			//si le message fait moins de 2000 caractére
			if((list_sound.length+new_mp3.length)<2000)
			{
				list_sound=list_sound+""+new_mp3;
				text[mes_test]=list_sound;
			}
			//sinon on prépare un nouveau bloc message
			else
			{
				list_sound="";
				mes_test++;
				text_sound=list_sound+""+new_mp3;
				text[mes_test]=list_sound;
			}

			sound_list[count]="./mp3/"+rep+"/"+sound;
			count++;
		})

		console.log(list_mp3);
	})
	text.forEach((bloc)=>{
		message.reply(bloc);

	})
};

module.exports.help ={
	name: "sound_list",
	info: `+sound_list\nVous donnera la liste compléte des extraits utilisable avec la commande +sound_play`,
	admin: false,
	channel: "both",
};