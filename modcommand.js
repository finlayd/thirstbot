module.exports = {

  hiCommand:function(m){
    console.log('+hi');
    m.channel.send('hello');
  },//end hiCommand

  //TODO: this one also needs to go to another file
  sendMessage:function(userID, messageSend){
    client.fetchUser(userID).then((user) => {
    user.send(messageSend).then(message => console.log(`Sent message: ${message.content}`));
    })
  },//end sendMessage

  //TODO: this cunt needs to go in another file lmao
  counterFuntion:function(c, m, oc, cr){ //counter, member, previouscounterperson, oldcounter, counterrole
    if (c == 1000 - 1){
      c = 0;
      console.log('count reached 1000');
      m.member.addRole(cr);
      var pcp = message.guild.members.get(oc)
      pcp.removeRole(cr);
      oc = m.member.id;
      m.channel.send(message.member.displayName + ' has reached 1000!');
    }//end if
    else if (m.content == c + 1) {
      c = c + 1;
    } //endif
    else {
      m.channel.send('the current number is ' + c);
    };//end else
  },//end counterFunction

  resetlmCommand:function(m, mwr) {
    console.log('+lastmessage')
    mwr = m.guild.roles.get(lastMessageRole).members;
    mwr.forEach(member => {
      member.removeRole(lastMessageRole);
      m.channel.send('last message reset');
    });
   },//end resetlmCommand

  multipledmCommand:function(ca){
    let loopEnd = ca.length;
    let count = 0;
    let userID
    let messageSend = "";
    while (count < (loopEnd)) { //while not every message and mention has been read
      if ((count % 2 === 0) || (count === 0)){ //if the number is even or 0 aka if the number is a mention
        userID = ca[count].replace(/[\\<>@#&!]/g, ""); //userid is the ping which is actually the id with some formatting, and then the formatting removed
        console.log('getting user id'); //just so we know where we are
      }//endif
      else if ((!(count % 2 === 0)) && (count != 0)){    //if the number is odd aka if the number is a message
         //DEBUG:message.channel.send('message:' + commandArguments[count]);
        console.log('sending message'); //just so we know where we are
        messageSend = ca[count]; //was used in testing REMOVE WHEN READY
        sendMessage(userID, messageSend);
      };//endif
      count += 1; //adds one to count
      console.log('count:' + count); //outputs logs to keep track
    };//endwhile
  },//end multipledmCommand

  setPointsCommand:function(ca, con, m, c){
    console.log('+setpoints');
    let user = m.mentions.users.first() || c.users.find("username", ca[0]);
    let userID = user.id
    con.query(`UPDATE userpointstable SET userpoints = '${ca[1]}' WHERE userid = '${userID}' `,(err,result) => {
      if(err) throw err;
      console.log('updated table');
    })
    con.query(`SELECT userpoints FROM userpointstable WHERE userid = '${userID}'`,(err,result) => {
      m.channel.send(`${user} now has **${result[0].userpoints}** points`)
    })
  },//end setPointsCommand

  checkpointsCommand:function(ca, con, m, c){
    console.log('+checkpoints');
    if (ca[0] === undefined){
       con.query(`SELECT userpoints FROM userpointstable WHERE userid = '${m.author.id}'`,(err, result) => {
         if(err) throw err;
       m.channel.send(`you have **${result[0].userpoints}** points`)
      })
     } else {
       let userid
       let user = m.mentions.users.first() || c.users.find("username", ca[0]);
       if (user) {userid = user.id;}
       else {userid = m.author.id}
      con.query(`SELECT userpoints FROM userpointstable WHERE userid = '${userid}'`,(err, result) => {
        if(err) throw err;
        m.channel.send(`${user} has **${result[0].userpoints}** points.`)
      })
     }
  }//end checkpointsCommand
};//end modules.export
