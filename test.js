const moment = require('moment')

let text = "/t 09:25AM"

function extractTimeFromCommand(userInput) {
  const now = new Date();
  
  
  console.log(userInput);
  console.log(now);
  
  let data = ((userInput.split('/t'))[1]).trim()
  
  let dateSplit = data.split(':');
  let hours = dateSplit[0]
  let minutes = dateSplit[1].slice(0,2)
  let dayTime = (dateSplit[1]).toString().slice(2)
  let parsedDate = now.setHours(hours,minutes,0,0)
  console.log("split", `${hours}-${minutes}-${dayTime}`)
  console.log("split", `${hours}:${minutes}:00`)
  console.log("DateSplit ", parsedDate);




}

extractTimeFromCommand(text);