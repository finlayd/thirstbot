//This is a program to mass dm users unique messages.
//It is a discord bot made to be used on the thirstserv discord.
//https://discord.gg/7A4y2VY
//copyright sygo 2019
//**WARNING** this is a bodge project

require('dotenv').config()
var mc = require('./modcommand.js');
var lm = require('./lastmessage.js');
var sp = require('./setpoints.js');

const Discord = require('discord.js'); //uses discordjs api
const client = new Discord.Client(); //var client is just the bot
const talkedRecently = new Set();
const lastMessageRole = '540823205192138772'; //role to give to last message
const lastMessageChannel = '540823156341080079'; //channel for last message
const counterRole = '529720751335538690';//variable for counterRole
const prefix = '+'; //prefix for the commands
const usrpref = '.';
const botcommandsChannel = '521229818822524929'

var secondLastMessage = '128863550620958721' //saves the last person after restart it starts at me
var secondLastMessagePerson
var counter = 0; //counter for multipledm
var oldCounter = '128863550620958721';
var mysql = require('mysql');
var regex1 = /\w/g;
var regex2 = /[0-9]/g;

var con = mysql.createConnection({
  host: "thirstbotdb.cdfqczhuue7a.us-east-2.rds.amazonaws.com", //host ip
  user: process.env.dbusr, //username (stored in .env)
  password: process.env.dbpw //password ^
});

con.connect(function(err) {
  if (err) throw err;
  console.log("database connected");
});

client.on("ready", () => { //once all startup junk is done aka the bot is ready
  console.log('bot is back online'); //tell me the bot is online again (useful for heroku)
  client.user.setPresence({ //sets the game presence to this stuff
      game: {
      name: 'you...',
        type: 'WATCHING'
      },
     status: 'online' })
  lm.lastmessagefunc();
 })//end client.on

con.query(`USE ${'thirstbot'}`);

client.on('message', message => { //when a message is recieved
      if (message.author == client.user) {
        return
    };

  if((message.content.startsWith(prefix)) && (message.member.roles.some(r=>['540724771747397633','160292661025046528','521228676495310848'].includes(r.id)))){ //this also does mod checks so non mods can do "text binds" but not cmds
    //  message.react(🧡);
      segmentCommand(message);
  }//endif

else if ((message.channel.id === botcommandsChannel) && message.content.startsWith(usrpref)){
  let fullCommand = message.content.substr(1);
  var splitCommand = fullCommand.split(' ');
  let primaryCommand = splitCommand[0];
  let commandArguments = splitCommand.slice(1);
  mc.checkpointsCommand(commandArguments, con, message, client);
  message.react('👌');
}
else if ((message.channel.id === '529401700319100928') && (regex2.test(message.content))) { //COUNTER COMMAND
counterFuntion(counter, message, oldCounter, count)
}//end elseif
else {
  sp.setpoints(message, talkedRecently, con)
}//end else

  //function to run commands, basically the whole program. (I forgot to modularise)
  function segmentCommand(message) {
    let fullCommand = message.content.substr(1); //delete the prefix
    if (fullCommand.startsWith('multipledm')){
      var splitCommand = fullCommand.split("\n*"); //use enters to seperate arguments
    } else {
      var splitCommand = fullCommand.split(' ');
    };//endif
    let primaryCommand = splitCommand[0]; //set the primary command to the first argument
    let commandArguments = splitCommand.slice(1); //del primary command from the rest of the arguments

    switch (primaryCommand){
      case 'hi':
        mc.hiCommand(message);
        message.react('👌');
        break;
      case 'multipledm':
        mc.multipledmCommand(commandArguments);
        message.react('👌');
        break;
      case 'exit':
        message.channel.send('exiting');
        process.exit(0);
        break;
      case 'resetlm':
        mc.resetlmCommand(message, membersWithRole);
        message.react('👌');
        break;
      case 'checkpoints':
        mc.checkpointsCommand(commandArguments, con, message, client);
        message.react('👌');
        break;
      case 'setpoints':
        mc.setPointsCommand(commandArguments, con, message, client);
        message.react('👌');
        break;
      case 'editpoints':
        editPointsCommand(commandArguments, con, message);
        message.react('👌');
        break;
      default:
        message.react('👎');
        }//end switch
          function editPointsCommand(ca, con, m){

          };//end editPointsCommand
    };//end segmentControl
})//end client.on
client.login(process.env.token);
