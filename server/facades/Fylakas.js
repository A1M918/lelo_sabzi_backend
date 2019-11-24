const Fylakas = require('../../models/Fylakas');

class FylakasFacades {
  static async logCheckIn(data) {
    const {
      user_id,
      user_name,
      command,
      text,
      channel_name,
      channel_id,
      team_domain
    } = data;
    // const user = await Fylakas.find({});
    const user = await Fylakas.findByUserId(user_id)
    let parsedTime;
    if (!user) throw new Error("User Not Found, Please contact HR.");

    // const userToday = await this.find({
    //     $where: function () {
    //         today = new Date(); //
    //         today.setHours(0, 0, 0, 0);
    //         return (this._id.getTimestamp() >= today)
    //     },
    //     $eq: { user_id}
    // });

    const userToday = await Fylakas.findInToday(user_id)
    if (!userToday) {
      const toInsert = {
        "user_actual_name": user.user_actual_name || "Dummy Name",
        user_name,
        user_id,
        channel_id,
        channel_name,
        "action": command,
        "log_time": (new Date()).getTime(),
        "last_edited": "",
        "deleted": false
      }
      const newRecord = await Fylakas.insertOne(toInsert);
      return newRecord;
    } else if (userToday) {
      if (!text) throw new Error("You have already checked-in today, Please specify time to edit. i.e /in /t 09:00AM")
      else if (text) {
        const t = await this.extractTimeFromCommand(text)
          .then(t => {
            if (!t && typeof t !== 'object') {
              throw new Error("Please specify time in correct format to edit. i.e `/in /t 09:00AM`")
            } else {
              parsedTime = t;
            }
          })
          .catch(err => { throw new Error("Please specify time in correct format to edit. i.e `/in /t 09:00AM`") })

      }
      const toUpdate = {
        "user_actual_name": user.user_actual_name || "Dummy Name",
        user_name,
        user_id,
        channel_id,
        channel_name,
        "action": command,
        //"log_time": (new Date()).getTime(), // because we are updating user's check-in time, we need to parse the date from string
        "log_time": parsedTime, // because we are updating user's check-in time, we need to parse the date from string
        "last_edited": (new Date()).getTime(),
        "deleted": false
      }

      const newRecord = await Fylakas.findAndUpdate(userToday, toUpdate);
      return newRecord;
    }

  }

  static async logCheckOut(data) {
    const {
      user_id,
      user_name,
      command,
      text,
      channel_name,
      channel_id,
      team_domain
    } = data;
    // const user = await Fylakas.find({});
    const user = await Fylakas.findByUserId(user_id)
    let parsedTime;
    let toUpdate;
    if (!user) throw new Error("User Not Found, Please contact HR.");

    const userToday = await Fylakas.findInToday(user_id)
    if (!userToday) {
      throw new Error('Did you checked-in today? I didn\'t find your check-in. Please check-in first.');
    } else if (userToday) {

      if (!text) {
        const toInsert = {
          "user_actual_name": user.user_actual_name || "Dummy Name",
          user_name,
          user_id,
          channel_id,
          channel_name,
          "action": command,
          "log_time": (new Date()).getTime(),
          "last_edited": "",
          "deleted": false
        }
        const newRecord = await Fylakas.insertOne(toInsert);
        return newRecord;
      }// throw new Error("You have already checked-in today, Please specify time to edit. i.e /in /t 09:00AM")
      else if (text) {
        if (!text.includes('/date') && text.includes('/t')) { // If user has specified the time. but not date. then we insert a new record

          const userToday = await Fylakas.findOutToday(user_id)
          if (!userToday) {
            await this.extractTimeFromCommand(text)
              .then(t => {
                if (!t && typeof t !== 'object') {
                  throw new Error("Please specify time in correct format to edit. i.e `/in /t 09:00AM`")
                } else {
                  parsedTime = t;
                }
              })
              .catch(err => { throw new Error("Please specify time in correct format to edit. i.e `/in /t 09:00AM`") })
            let toInsert = {
              "user_actual_name": user.user_actual_name || "Dummy Name",
              user_name,
              user_id,
              channel_id,
              channel_name,
              "action": command,
              //"log_time": (new Date()).getTime(), // because we are updating user's check-in time, we need to parse the date from string
              "log_time": parsedTime, // because we are updating user's check-in time, we need to parse the date from string
              "last_edited": (new Date()).getTime(),
              "deleted": false
            }

            const newRecord = await Fylakas.insertOne(toInsert);
            return newRecord
          } else {
            await this.extractTimeFromCommand(text)
              .then(t => {
                if (!t && typeof t !== 'object') {
                  throw new Error("Please specify time in correct format to edit. i.e `/in /t 09:00AM`")
                } else {
                  parsedTime = t;
                }
              })
              .catch(err => { throw new Error("Please specify time in correct format to edit. i.e `/in /t 09:00AM`") })
            toUpdate = {
              "user_actual_name": user.user_actual_name || "Dummy Name",
              user_name,
              user_id,
              channel_id,
              channel_name,
              "action": command,
              //"log_time": (new Date()).getTime(), // because we are updating user's check-in time, we need to parse the date from string
              "log_time": parsedTime, // because we are updating user's check-in time, we need to parse the date from string
              "last_edited": (new Date()).getTime(),
              "deleted": false
            }

            const newRecord = await Fylakas.findAndUpdate(userToday, toUpdate);
            return newRecord
          }
        } else {
          await this.extractDateAndTime(text)
            .then(t => {
              if (!t && typeof t !== 'object') {
                throw new Error("Please specify date & time in correct format to edit. i.e `/out /date 23/11/2019 /t 09:25PM`")
              } else {
                parsedTime = t;
              }
            })
            .catch(err => { throw new Error("Please specify date & time in correct format to edit. i.e `/out /date 23/11/2019 /t 09:25PM`") })

          toUpdate = {
            "user_actual_name": user.user_actual_name || "Dummy Name",
            user_name,
            user_id,
            channel_id,
            channel_name,
            "action": command,
            //"log_time": (new Date()).getTime(), // because we are updating user's check-in time, we need to parse the date from string
            "log_time": parsedTime, // because we are updating user's check-in time, we need to parse the date from string
            "last_edited": (new Date()).getTime(),
            "deleted": false
          }

          const newRecord = await Fylakas.findAndUpdate(userToday, toUpdate);
          return newRecord;
        }
      }

    }
  }

  static async extractDateAndTime(userInput) {
    let date = (userInput.split('/date')[1].split('/t'))[0].trim()
    let [day, month, year] = date.split('/')
    month = parseInt(month)

    let data = (userInput.split('/t')[1]).trim()
    let dateSplit = data.split(':');
    let hours = dateSplit[0]
    let minutes = dateSplit[1].slice(0, 2)
    let dayTime = (dateSplit[1]).toString().slice(2)
    // if (hours < 12 && dayTime.toLowerCase() == 'pm') hours = parseInt(hours) + 12

    let parsedTime = new Date(`${month}/${day}/${year} ${hours}:${minutes}:00 ${dayTime.toUpperCase()} GMT +5`).getTime()

    return parsedTime;
  }

  static async extractTimeFromCommand(userInput) {
    const now = new Date();

    let data = ((userInput.split('/t'))[1]).trim()

    let dateSplit = data.split(':');
    let hours = dateSplit[0]
    let minutes = dateSplit[1].slice(0, 2)
    let dayTime = (dateSplit[1]).toString().slice(2)
    if (hours < 12 && dayTime.toLowerCase() == 'pm') hours = parseInt(hours) + 12
    let parsedDate = now.setHours(hours, minutes, 0, 0)


    return parsedDate;

  }
}

module.exports = FylakasFacades;