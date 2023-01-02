const config = require('../config.json');

const { MessageEmbed} = require("discord.js");

const snekfetch = require('snekfetch');
const moment = require('moment');

async function view(interaction, user) {
    var { body } = await snekfetch.get(`${config.firebaseURL}/verified/${user.id}.json`)

    var isVerified = false

    if (body) {
        isVerified = true
    }

    const currentName = user.username

    var embedString = `**Discord**\nUsername: **${currentName}**\nAccount Created: **${moment(user.createdAt).format('MM/DD/YY')}**\n\n**Roblox**\n`

    if (isVerified) {
        var { body } = await snekfetch.get(`https://users.roblox.com/v1/users/${body.linked}`)

        const createdISO = body.created

        const createdDate = new Date(createdISO);
        const currentDate = new Date();

        const createdTimestamp = Math.floor(createdDate.getTime() / 1000);
        const currentTimestamp = Math.floor(currentDate.getTime() / 1000);

        const accountAge = Math.round((currentTimestamp - createdTimestamp) / 86400)

        embedString = embedString + `Username: **${body.name}**\nDisplayName: **${body.displayName}**\nAccount Age: **${accountAge} days**`
    } else {
        embedString = embedString + '[ERR] User is not verified with a Roblox account.'
    }

    const response = new MessageEmbed()
        .setTitle(`Viewing ${currentName}#${user.discriminator}`)
        .setDescription(embedString)
        .setThumbnail(user.displayAvatarURL())
        .setColor('0x5d65f3');

    return interaction.reply({ embeds: [response], ephemeral: true });
}

module.exports = {
    name: 'view',
    async execute(interaction) {
        const { options } = interaction
        const user = options.getUser('user')

        if (user) {
            view(interaction, user)
        } else {
            view(interaction, interaction.member.user)
        }
    },
};
