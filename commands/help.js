const config = require('../config.json');

const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'help',
    async execute(interaction) {
        const { commandName, options } = interaction

        const commands = [
            "**/help** - Shows this command list",
            "\n**Permissions:** Everyone\n",
            "\n**/verify** *{userid:required}* - Links a Roblox account to your Discord account",
            "\n**Permissions:** Everyone\n",
            "\n**/update** *{user:optional}* - Updates the users Discord username if their Roblox username changed",
            "\n**Permissions:** Everyone\n",
            "\n**/view** *{user:optional}* - Shows information about the user",
            "\n**Permissions:** Everyone\n",
        ];

        var commandString = commands.join('')

        const response1 = new MessageEmbed()
            .setTitle('Commands')
            .setDescription(`${commandString}`)
            .setColor('0x5d65f3');

        return interaction.reply({ embeds: [response1], ephemeral: true  });
    },
};
