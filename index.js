
const express = require('express');

const app = express();

app.get('/',  (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const { Client, Intents, EmbedBuilder,Partials,GatewayIntentBits } = require("discord.js");
const client = new Client({  intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,

  ]});

const db = require("pro.db")
const perfix = "$"//حط البيرفكس

client.on("ready", (hi) => {

  console.log(`Ready! Logged in as ${client.user.tag}`);
})













client.on("messageCreate", msg => {
  if (msg.content.startsWith(perfix + "add")) {

    if (!msg.member.permissions.has("ADMINISTRATOR")) return
    const args = msg.content.split(" ").slice(2).join("") ||Number()
    const mentionn = msg.mentions.users.first();


    if (!args) return msg.reply(`**type the point**`)
    const point = db.get(`point_${msg.member.id}`)
  
    if (isNaN(args)) {
      msg.channel.send("Invalid input. Please enter a valid number.");
    }
    if (!mentionn) {
        db.add(`point_${message.user.id}`, args)
    msg.reply("**Done Added point**")
    }

    db.add(`point_${mentionn.id}`, Number(args))
    msg.reply("**Done Added point**")

  }
});







client.on("messageCreate", message => {
  if (message.content.startsWith(perfix + "rem")) {

    if (!message.member.permissions.has("ADMINISTRATOR")) return
    const args = message.content.split(" ").slice(2).join("") 
    const mentionn = message.mentions.users.first() 


    if (!args) return message.reply(`**type the point**`)
    const point = db.get(`point_${message.member.id}`)
  
    if (isNaN(args)) {
      message.channel.send("Invalid input. Please enter a valid number.");
    }
    if (!mentionn){
       db.set(`point_${message.user.id}`,poin)
    message.reply("**Done delete point**")
    }
   const poin = point - args|| Number()
    db.set(`point_${mentionn.id}`,poin)
    message.reply("**Done delete point**")
  }
});

client.on("messageCreate",async(message)=>{
  if(message.content.startsWith(perfix + "points")){

  const points = await db.get(`point_${message.author.id}`);
await message.reply(`**You have ${points || 0} points.**`);
  }
});

client.on("messageCreate",message=>{
  if(message.content.startsWith(perfix + "help")){
    let embed = new EmbedBuilder()
    .setTitle(`${client.user.username}, commands`)
    .setDescription(`
    **${perfix}help : for show commands bot**
   ** ${perfix}add : for add point user**
    **${perfix}rem : for remove point user**
    **${perfix}points : for show your points**
    **${perfix}top : for show a top 10 in points**`)
    .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) });
    message.reply({embeds:[embed]})
  }
})


client.on("messageCreate", async message => {
    if (message.content.startsWith(perfix + "top")) {
      let data = db.all()
        .filter((data) => data[0].includes("point"))
        .map((data) => [data[0].split("_")[1], parseInt(data[1].split(" ")[2])])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .filter((data) => data[1] > 0)
        .map(async (data) => {
          let user = await client.users.fetch(data[0]);
          return {
            user: user ? (user.id === data[0] ? user.toString() : user.username) : "Unknown User#0000",
            points: data[1],
          };
        });

      let userData = await Promise.all(data);

     let embed = new EmbedBuilder() 
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setTitle("Top 10 Members with Point")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setDescription(userData.map((data) => `**${data.user}** | **__${data.points}__**`).join("\n") || "No Body Have point right now")
    .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) });
await message.reply({ embeds: [embed], allowedMentions: { repliedUser: true, parse: ["users"] } });
    }
});









process.on('uncaughtException', async (Error) => {
  return console.log(Error)
})
process.on('unhandledRejection', async (Error) => {
  return console.log(Error)
})









client.login(process.env.token)
