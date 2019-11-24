const moment = require('moment')

let text = "/t 10:25PM"
let dateOut = "/date 23/11/2019 /t 09:25PM"

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


function extractDateAndTime(userInput) {
  let date = (userInput.split('/date')[1].split('/t'))[0].trim()
  let [day, month, year] = date.split('/')
  month = parseInt(month)
  console.log(`${day}-${month}-${year}`)
  
  let data = (userInput.split('/t')[1]).trim()
  let dateSplit = data.split(':');
  let hours = dateSplit[0]
  let minutes = dateSplit[1].slice(0, 2)
  let dayTime = (dateSplit[1]).toString().slice(2)
  // if (hours < 12 && dayTime.toLowerCase() == 'pm') hours = parseInt(hours) + 12

  parsedTime = new Date(`${month}/${day}/${year} ${hours}:${minutes}:00 ${dayTime.toUpperCase()} GMT +5`)
 
  return parsedTime;
}

extractDateAndTime(dateOut)

extractTimeFromCommand(text);