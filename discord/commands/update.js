const config = require('../config.json');

const snekfetch = require('snekfetch');

async function update(interaction, user) {
    var { body } = await snekfetch.get(`${config.firebaseURL}/verified/${user.id}.json`)

    if (!body) {
        return interaction.reply({ content: 'You must be verified before running /update! To verify, run /verify.', ephemeral: true });
    }

    var { body } = await snekfetch.get(`https://users.roblox.com/v1/users/${body.linked}`)

    const currentName = interaction.member.displayName
    var displayName

    if (body.displayName === body.name) {
        displayName = body.name;
    } else {
        displayName = body.displayName;
    }

    if (interaction.member.displayName !== displayName) {
        interaction.member.setNickname(`${displayName}`);

        return interaction.reply({ content: `Username updated to ${displayName} from ${currentName}.`, ephemeral: true })
    } else {
        return interaction.reply({ content: 'Your username is already up-to-date.', ephemeral: true })
    }
}

module.exports = {
    name: 'update',
    async execute(interaction) {
        const { options } = interaction
        const user = options.getUser('user')

        if (user) {
            update(interaction, user)
        } else {
            update(interaction, interaction.member.user)
        }
    },
};
