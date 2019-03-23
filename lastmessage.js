//function to assign the last message role and to ensure only 1 person has the role at a time
exports.lastmessagefunc = function(){
       let channel = client.channels.get('540823156341080079');
       channel.fetchMessages({ limit: 1 }).then(messages => {
       let lastMessage = messages.first();
       let membersWithRole = lastMessage.guild.roles.get(lastMessageRole).members;
       //console.log(lastMessage.content)
       if ((lastMessage.channel.id === lastMessageChannel) && !(lastMessage.member.roles.has(lastMessageRole))){

         secondLastMessagePerson = lastMessage.guild.members.get(secondLastMessage)//.then((member) =>{
           secondLastMessagePerson.removeRole(lastMessageRole);
         lastMessage.member.addRole(lastMessageRole);
         secondLastMessage = lastMessage.member.id;
         console.log(membersWithRole.size);
         //checks if multiple people have role (MOVE TO FUNC)
         if(membersWithRole.size > 1){

           membersWithRole.forEach(member => {
             member.removeRole(lastMessageRole);
             console.log('multiple last messages!!');
           })
            };//endif
       };//endif
     })
         setTimeout(lastmessagefunc, 2000);//runs the function every second
     };//end lastmessagefunc
