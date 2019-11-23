const Fylakas = require('../../models/Fylakas');

class FylakasFacades {
  static async logAction(data) {
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
    console.log("USER FOUND", userToday);
    if (!userToday) {
      const toInsert = {
        "user_actual_name": user.user_actual_name || "Dummy Name",
        user_name,
        user_id,
        channel_id,
        channel_name,
        "action": command,
        "check_in": (new Date()).getTime(),
        "last_edited": "",
        "deleted": false
      }
      console.log("toInsert", toInsert);
      const newRecord = await Fylakas.insertOne(toInsert);
      return newRecord;
    } else if (userToday) {

      const toUpdate = {
        "user_actual_name": user.user_actual_name || "Dummy Name",
        user_name,
        user_id,
        channel_id,
        channel_name,
        "action": command,
        //"check_in": (new Date()).getTime(), // because we are updating user's check-in time, we need to parse the date from string
        "check_in": await this.extractTimeFromCommand(text), // because we are updating user's check-in time, we need to parse the date from string
        "last_edited": (new Date()).getTime(),
        "deleted": false
      }
      console.log("toUpdate", toUpdate);

      const newRecord = await Fylakas.findAndUpdate(userToday, toUpdate);
      return newRecord;
    }

  }

  static async extractTimeFromCommand(userInput) { 

  }
}

module.exports = FylakasFacades;