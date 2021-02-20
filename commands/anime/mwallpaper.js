const Hmfull = require('hmfull');
module.exports = {
  name: 'mwallpaper',
  aliases: ['mwp'],
  desc: 'Get a Mobile Wallpaper of Anime',
  cat: 'anime',
  cooldown: 10,
  run: (bot, msg, args) => {
    let res = Hmfull.HMtai.sfw.mobileWallpaper();
    msg.channel.createMessage({ embed: {
      color: bot.color,
      author: { name: msg.author.tag, icon_url: msg.author.avatarURL },
      description: "Here's your Mobile Wallpaper!",
      image: { url: res.url },
      timestamp: new Date()
    }})
  }
}