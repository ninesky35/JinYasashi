const Hmfull = require('hmfull');
module.exports = {
  name: 'wallpaper',
  aliases: ['wp'],
  desc: 'Get a Wallpaper of Anime',
  cat: 'anime',
  cooldown: 10,
  run: (bot, msg, args) => {
    let res = Hmfull.HMtai.sfw.wallpaper();
    msg.channel.createMessage({ embed: {
      color: bot.color,
      author: { name: msg.author.tag, icon_url: msg.author.avatarURL },
      description: "Here's your Wallpaper!",
      image: { url: res.url },
      timestamp: new Date()
    }})
  }
}