const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
const guildID = '711260726181756969';
const token = 'NzExMjU5NjUzNDg4NTA4OTc4.XsAaYA.fTItm3-dpEBpnfmJjHwo_W_GzZU';
var n =0;
var color;




//Ready Event
client.on('ready', () => {
    console.log('Reporting bot ready!')
});


//Message Event
client.on('message', async message => {
  //args
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //commands
  if (command === 'report') {
    //Has to be in DMs
    if (message.channel.type != 'dm') {
        message.delete();
        
      
    

       let appChannel = (await message.author.send("Please fill all the details if you don't want to continue then type cancel")).channel
       
      
      

      //First Question
      while(1){
        await message.author.send('Have you read all the prerequisites for the reporting system');
      let answer = await appChannel.awaitMessages(answer => answer.author.id != client.user.id, {
        max: 1
      });
      const tf = (answer.map(answers => answers.content).join());
      if(tf==='cancel'){
        message.author.send("Request has been cancelled");
        return;
      }
      if(tf==='no'){
        message.author.send("Please read all the prerequisites for the reporting system in #report-here");
        return;
      }

      //Second Question
      await message.author.send('Send message link for the message to be reported');
      answer = await appChannel.awaitMessages(answer => answer.author.id != client.user.id, {
        max: 1
      });
      const msg1 = (answer.map(answers => answers.content).join());
        if(msg1==='cancel'){
        message.author.send("Request has been cancelled");
        return;
      }

      //Third Question
      await message.author.send('Send the message link where you have told them not to insult you');
      answer = await appChannel.awaitMessages(answer => answer.author.id != client.user.id, {
        max: 1
      });
      const msg2 = (answer.map(answers => answers.content).join());
        if(msg2==='cancel'){
        message.author.send("Request has been cancelled");
        return;
      }
        
      message.author.send("Your request has been submitted. Expect message from Mods in case there is extra message required");
        
  
        

      //Embed
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('Accused Message Link', msg1)
        .addField('Warn Message Link', msg2)
        .setTimestamp()
        .setColor("255x#FF0000")
        .addField('userID', message.author.id);

      //Sending Embed
      const guild = client.guilds.cache.get(guildID);
      await guild.channels.cache.find(channel => channel.name === 'reports').send(embed);
        
        return;
      }
      

    }

  }
});

//Log In
client.login(token);
