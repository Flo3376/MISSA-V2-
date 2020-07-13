module.exports= class msg_sw {

	name;
	info;
	admin;
	in;
	out;
	input;
	error=[]

	/*
	*	automatisme de remplissage, chaque information a une clé et une valeur,
	*	si une méthode existe avec cette clé dans son nom, la méthode sera utilisé
	*	sinon on renvoie la valeur à l'arrache dans l'objet
	*	le but de cet méthode hydrate et permettre de faire un traitement sur les donnés si besoin en passant par une méthode
	*/
	constructor(param,message,client) {
		for (var k in param)
		{
			//pour chaque informations on récupére la clé
			if (param.hasOwnProperty(k))
			{
				//si la méthode set_? exsite, on utilise cette methode (post traitement)
				if (typeof this['set_'+k]=== "function")
				{ 
					this['set_'+k](datas[k])
				}
				//sinon on l'envoie à l'arrache
				else
				{
					this[k]=param[k]
				}
			}
		}
	}

	/*
	*	On vérifie que les données qui arrive viennent bien du bon type de channel,
	*	sinon on retourne une erreur
	*/
	init(client,message)
	{
		//console.log(message.channel.type)
		/*
		*	on détermine si le message viens d'un MP ou pas
		*/
		if(message.channel.type ==="dm" )
		{
			this.input=message.channel.type
		}
		else if (message.channel.type ==="text" )
		{
			this.input=message.channel.type
			message.delete();
		}
		else
		{
			this.error.push(`Le routeur n'arrive pas à déterminer la source du message, source : ${message.channel.type}`)
			//return "le routeur n'arrive pas à déterminer la source du message"
		}

		
		/*
		*	on détermine si la source du message est accepté par ce programme
		*	si la source ne correspond pas à celle requise et que le multi-source n'est pas autorisé (both)
		*/
		if(this.input !== this.in && this.in!=="both")
		{
			this.error.push(`La source du message n'est pas celle attendu, in: ${this.in} source : ${message.channel.type}`)

			if(message.channel.type ==="dm" )
			{
				message.author.send(`Cette commande ne peut pas être utilisée en message privé.`)
			}
			else if(message.channel.type ==="text" )
			{
				message.author.send(`Cette commande ne peut pas être utilisée dans un salon texte.`)
			}
			else{
				message.author.send(`Je ne sais pas où je dois vous lire.\n Les consignes de mon concepteur sont flous.\n "bah ici connasse" n'est pas une réponse que je peux interpréter`)
			}
		}
	}

	/*
	*	On renvoie un message par le type de channel prévue.
	*	Si le programme a besoin de renvoyer un message hors contexte, on peux shunter, les vérifications
	*/
	response(client,message,msg,force_output=null)
	{
		if(force_output===null)
		{
			if(this.out === "dm")
			{
				message.author.send(msg)
			}
			else if(this.out === "text")
			{
				message.reply(msg)
			}
			else if(this.out === "callback")
			{
				message.reply(msg)
			}
			else
			{
				message.author.send(`Je ne sais pas où je dois vous répondre.\n Les consignes de mon concepteur sont flous.\n "bah ici connasse" n'est pas une réponse que je peux interpréter`)
			}
		}
		else if(force_output==="forced")
		{
			message.author.send(msg)
		}

	}
}
