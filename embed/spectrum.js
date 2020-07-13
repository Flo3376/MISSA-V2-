var my_embed={
  "embed": {
    "title": "ChekHandle",
    "description": `Voici le rapport concernant ${args[0]}`,
    "url": "https://gmonkeys.org/",
    "color": 15179008,
    "footer": {
      "text": "Bonne fin de journée à toi,\n\n[GM] Le vieux singe des archives"
  },
  "thumbnail": {
      "url": `https://robertsspaceindustries.com/${images[0]}`
  },
  
  "fields": [
  {
      "name": "Handle RSI/ Pseudo",
      "value": `> ${output[2]}`,
      "inline": true,     
  },
  {
      "name": "Inscrit le:",
      "value": `> ${output[7]}`,
      "inline": true,     
  },
  {
      "name": "\u200b",
      "value": "\u200b",
      
  },
  {
      "name": "Nom du compte",
      "value": `> ${output[1]}`,
      "inline": true,
      
  },
  {
      "name": "Id du compte",
      "value": `> ${output[0]}`,
      "inline": true,
      
  },
  {
      "name": "\u200b",
      "value": "\u200b",
      
  },
  {
      "name": "Localisation",
      "value": `> ${output[8].replace(/  /g,' ')}`,
      "inline": true,
      
  }, 
  {
      "name": "Langue",
      "value": `> ${output[9]}`,
      "inline": true,
      
  },
   {
      "name": "\u200b",
      "value": "\u200b",
      
  },
   {
      "name": "Fonction:",
      "value": `> ${output[6]}`,
      "inline": true,
      
  },
  ,
   {
      "name": "Rôle:",
      "value": `> ${output[3]}`,
      "inline": true,
      
  },
   {
      "name": "\u200b",
      "value": `${url}`,
      
  },
  {
      "name": "\u200b",
      "value": "\u200b",
  },
  {
      "name": "Appartenance au groupe",
      "value": `> ${output[4]}`,
  },
  {
      "name": "\u200b",
      "value": `> https://robertsspaceindustries.com${links[0]['url']}`,
  },

   
  ],"image": {
               "url": `https://robertsspaceindustries.com/${images[2]}`,
                }
}
}
