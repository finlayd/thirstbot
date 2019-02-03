//This is a program to mass dm users unique messages.
//It is a discord bot made to be used on the thirstserv discord.
//https://discord.gg/7A4y2VY
//copyright Declan Finlay 2019
//**WARNING** this is a bodge project

const Discord = require('discord.js'); //uses discordjs api
const client = new Discord.Client();
const talkedRecently = new Set();
const lastMessageRole = '540823205192138772'
const lastMessageChannel = '540823156341080079'
var secondLastMessage = '128863550620958721'
var secondLastMessagePerson
var counter = 0;
var oldCounter = '128863550620958721';
const prefix = '+'; //prefix for the commands
 //logs into the client using the token
client.on("ready", () => {
  console.log('bot is back online');
  client.user.setPresence({
      game: { 
      name: 'you...',
        type: 'WATCHING'
      },
     status: 'online' })
  .catch(console.error);
  
  let channel = client.channels.get('540823156341080079');
  function lastmessagefunc(){
  channel.fetchMessages({ limit: 1 }).then(messages => {
  let lastMessage = messages.first();
  //console.log(lastMessage.content)
  if ((lastMessage.channel.id === lastMessageChannel) && !(lastMessage.member.roles.has(lastMessageRole))){
    lastMessage.member.addRole(lastMessageRole)

    secondLastMessagePerson = lastMessage.guild.members.get(secondLastMessage)//.then((member) =>{
      secondLastMessagePerson.removeRole(lastMessageRole)

    secondLastMessage = lastMessage.member.id
  };//endif
})
.catch(console.error);
    setTimeout(lastmessagefunc, 1000);
  }//endfunction
  lastmessagefunc();
});//end client.on

client.on('message', message => { //when a message is recieved
      if (message.author == client.user) {
        return
    };
  

  let myRole = message.guild.roles.find(role => role.name === "Moderators");


var regex1 = /\w/g;
var regex2 = /[0-9]/g;

const counterRole = '529720751335538690';
  if((message.content.startsWith(prefix)) && (message.member.roles.some(r=>['540724771747397633','160292661025046528','521228676495310848'].includes(r.id)))){ //this also does mod checks so non mods can do "text binds" but not cmds
      segmentCommand(message);
  }//endif
  else if ((message.content.startsWith('.'))&& (regex1.test(message.content))){
    let fullCommand = message.content.substr(1).toLowerCase();
    if (talkedRecently.has(message.author.id)){
      console.log(message.author.id + 'sent a message to quickly')
  return;
    }
    function commandTimeout(){
    talkedRecently.add(message.author.id);
setTimeout(() => {
  // Removes the user from the set after 2.5 seconds
  talkedRecently.delete(message.author.id);
}, 30000); //30 seconds
};//end commandTimeout
    commandTimeout()

    switch(fullCommand){

      case 'awh fuck yeah':
        console.log('.awh fuck yeah');
        message.channel.send('awh fuck yeah my mums made homemade snag rolls cunt');
        break;
      case 'cryo':
        console.log('.cryo');
        message.channel.send('all hail cryo');
        break;
      case 'let ya':
        console.log('.letya');
        message.channel.send('let ya nuts hang');
        letYaCommand();
        break;
      default:
        message.channel.send('unknown command ' + fullCommand);
        break;

           };//endcase
  }

//   else if ((message.channel.id === lastMessageChannel) && !(message.member.roles.has(lastMessageRole))){
//     message.member.addRole(lastMessageRole)

//     secondLastMessagePerson = message.guild.members.get(secondLastMessage)//.then((member) =>{
//       secondLastMessagePerson.removeRole(lastMessageRole)

//     secondLastMessage = message.member.id


// }//end elseif
else if ((message.channel.id === '529401700319100928') && (regex2.test(message.content))) {

  if (counter == 1000 - 1){

    counter = 0;
    console.log('count reached 1000');
    message.member.addRole(counterRole);
    var prevCounterPerson = message.guild.members.get(oldCounter)
    prevCounterPerson.removeRole(counterRole);
    oldCounter = message.member.id;

    message.channel.send(message.member.displayName + ' has reached 1000!');
  }//end if
  else if (message.content == counter + 1) {
    counter = counter + 1;

  } //endif
  else {
    message.channel.send('the current number is ' + counter);
  };//end else
};//end elseif


  //function to send a message. bc of the way messages are sent this is required to create multiple instances so they can send with the appropritate variables
  function sendMessage(userID, messageSend){
    client.fetchUser(userID).then((user) => {
    user.send(messageSend).then(message => console.log(`Sent message: ${message.content}`));
    });
  };

  //function to run commands, basically the whole program. (I forgot to modularise)
  function segmentCommand(message) {
    let fullCommand = message.content.substr(1); //delete the prefix
    let splitCommand = fullCommand.split("\n"); //use enters to seperate arguments
    let primaryCommand = splitCommand[0]; //set the primary command to the first argument
    let commandArguments = splitCommand.slice(1); //del primary command from the rest of the arguments

    //command to see if the bot is alive basically
    if (primaryCommand == "hi"){
      console.log('skrrt');
      message.channel.send('hello');

    }//endif

    //testing command to dm user *broken*
    else if (primaryCommand == "dm"){

      //var productString
      //message.member.send('skrrt')
       commandArguments.forEach((value) => {
         //productString = productString + value
       message.member.send(value);
       });//endforeach
    }//endif

    //testing command to message someone mentioned, doesnt do multiple in one command tho
    else if (primaryCommand == "mentiondm"){
    message.channel.send(commandArguments[0]);
      var user = message.mentions.users.first();
      var text = "";
      commandArguments.forEach((value) => {
        text = text + " " + value
      });//endforeach
      user.send(text);
    }//endif



    //the actual command structured is +multipledm *enter* mention name *enter* message *enter* mention name again
    else if (primaryCommand == "multipledm") { //if the command is executed
      //DEBUG: message.channel.send(message.mentions.users.size);
      var loopEnd = message.mentions.users.size * 2; //number of mentions * 2 (for the messages that go with them)
      var count = 0;
      var userID
      var messageSend = "";
      //DEBUG: message.channel.send('first arg' + commandArguments[0])
      while (count < (loopEnd)) { //while not every message and mention has been read
        if ((count % 2 === 0) || (count === 0)){ //if the number is even or 0 aka if the number is a mention
          userID = commandArguments[count].replace(/[\\<>@#&!]/g, ""); //userid is the ping which is actually the id with some formatting, and then the formatting removed
          console.log('getting user id'); //just so we know where we are
          //DEBUG:message.channel.send(userID);
        }//endif

        else if ((!(count % 2 === 0)) && (count != 0)){    //if the number is odd aka if the number is a message
          //DEBUG:message.channel.send('message:' + commandArguments[count]);
          console.log('sending message'); //just so we know where we are
          messageSend = commandArguments[count]; //was used in testing REMOVE WHEN READY
          sendMessage(userID, messageSend);
        };//endif

        count += 1; //adds one to count
        console.log('count:' + count); //outputs logs to keep track
      };//endwhile
    }//endif

  };//end segmentControl

});//end client.on

client.login(process.env.token);
