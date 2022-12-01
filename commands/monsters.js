'use strict';

const { EmbedBuilder } = require('@discordjs/builders');
const monsters = require('../monsters.json');

module.exports = {
  name: 'monsters',
  description: 'Displays all currently available monsters',
  execute: async interaction => {
    let monsterNames = '';

    for (let i = 0; i < monsters.length; i++) {
      if (i % 6 !== 0 || i === 0) {
        monsterNames += `${monsters[i].name} | `;
      } else monsterNames += `${monsters[i].name}\n`;
    }

    const moduleEmbed = new EmbedBuilder()
      .setColor(0x9e2a2b)
      .setAuthor({
        name: 'MH Weakener Bot',
        iconURL:
          'https://mhworld.kiranico.com/storage/mhw/icon/quest_type_1.png',
      })
      .setTitle('Monsters')
      .setDescription('Displays all currently available monsters.')
      .addFields({
        name: 'Monsters',
        value: `${monsterNames}`,
        inline: true,
      });

    await interaction.reply({
      embeds: [moduleEmbed],
      ephemeral: true,
    });
  },
};
