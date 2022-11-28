const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'help',
  description: 'Displays bot commands',
  execute: async interaction => {
    const moduleEmbed = new EmbedBuilder()
      .setColor(0x9e2a2b)
      .setAuthor({
        name: 'MH Weakener Bot',
        iconURL:
          'https://mhworld.kiranico.com/storage/mhw/icon/quest_type_1.png',
      })
      .setTitle('/help')
      .setDescription(
        'MH Weakener Bot is a discord bot that displays monsters featured in Monster Hunter World: Iceborne.'
      )
      .addFields({
        name: 'Available Commands:',
        value: `**__/monsters__** -> Displays all currently available monsters.\n**__!m <monster>__** -> Displays the location, resistances, and weaknesses of the selected monster.`,
        inline: true,
      });

    await interaction.reply({
      embeds: [moduleEmbed],
      ephemeral: true,
    });
  },
};
