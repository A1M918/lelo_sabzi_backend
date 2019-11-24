const moment = require('moment')

let text = "/t 09:25PM"

function extractTimeFromCommand(userInput) {
  const now = new Date();
  
  let data = ((userInput.split('/t'))[1]).trim()
  
  let dateSplit = data.split(':');
  let hours = dateSplit[0]
  let minutes = dateSplit[1].slice(0,2)
  let dayTime = (dateSplit[1]).toString().slice(2)
  let parsedDate = now.setHours(hours,minutes,0,0)

  if (hours < 12 && dayTime.toLowerCase() == 'pm') hours = parseInt(hours) + 12

  return parsedDate;

}

extractTimeFromCommand(text);