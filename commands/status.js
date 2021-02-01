
const Discord = require('discord.js');
const {randomColor} = require('randomcolor');
const util = require('minecraft-server-util');

module.exports = {
    name: 'status',
    description: 'Latencia del bot y de Discord',
    aliases: ['estado'],
    usage: '',
    module: 'Minecraft',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        embed
            .setTitle(process.env.IP)
            .setFooter(message.member.displayName, message.author.avatarURL());

        util.status(process.env.IP).then((result) => {
            let players = [];
            result.samplePlayers.forEach(player => players.push(player.name));

            embed.setColor('#2ecc40')
            embed.addFields(
                { name: 'Estado', value: 'ON', inline: true },
                { name: 'Personas en línea', value: result.onlinePlayers + ' / ' + result.maxPlayers, inline: true },
                { name: 'Jugadores', value: `\`${players.join(', ')}...\``, inline: false },
            )
        })
        .catch((error) => {
            console.error(error);
        })
        .then(() => message.channel.send(embed));
    }
}