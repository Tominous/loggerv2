import { sendToLog } from '../system/modlog'
import { getLastByType } from '../handlers/audit'

module.exports = {
  name: 'role_deleted',
  type: 'GUILD_ROLE_DELETE',
  toggleable: true,
  run: function (bot, raw) {
    let guild = raw.guild
    let obj = {
      guildID: guild.id,
      type: 'Role Deleted',
      changed: `► ID: **${raw.roleId}**`,
      color: 8351671
    }
    getLastByType(guild.id, 32, 1).then((entry) => {
      if (entry[0]) {
      entry = entry[0]
      let user = bot.Users.get(entry.user_id)
      let name = entry.changes.filter(c => c.key === 'name')[0].old_value
      obj = {
        guildID: guild.id,
        type: 'Role Deleted',
        changed: `► Name: **${name}**\n► ID: **${raw.roleId}**`,
        color: 8351671,
        from: user
      }
      sendToLog(bot, obj)
    }
    }).catch(() => {
      obj.footer = {
        text: 'I cannot view audit logs!',
        icon_url: 'http://www.clker.com/cliparts/C/8/4/G/W/o/transparent-red-circle-hi.png'
      }
      sendToLog(bot, obj)
    })
  }
}
