const { EmbedBuilder } = require('@discordjs/builders');
const monsters = require('../monsters.json');

module.exports = {
  name: 'm',
  description: 'Displays a monsters locations, resistances, and weaknesses.',
  execute: async (message, args) => {
    if (args.length === 0) return;

    for (const monster of monsters) {
      const argsString = args.join(' ').toLowerCase();
      if (argsString === monster.name.toLowerCase()) {
        //LOCATIONS
        let locationOutput = '';

        for (const monsterLocations of monster.locations) {
          locationOutput += `${monsterLocations.name}\n`;
        }

        // RESISTANCES
        let resistanceOutput = '';

        if (monster.resistances.length !== 0) {
          for (const monsterResistance of monster.resistances) {
            resistanceOutput += `${monsterResistance.element}\n`;
          }
        } else resistanceOutput = 'No resistances';

        // WEAKNESSES
        let weaknessOutput = '';

        for (const monsterWeakness of monster.weaknesses) {
          let stars = '';

          for (let i = 0; i < monsterWeakness.stars; i++) stars += ' ⭐';

          monsterWeakness.stars === 3
            ? (weaknessOutput +=
                `**__${monsterWeakness.element}__**    ` + stars + '\n')
            : (weaknessOutput +=
                `${monsterWeakness.element}    ` + stars + '\n');
        }

        // Embed Message
        const moduleEmbed = new EmbedBuilder()
          .setColor(0x9e2a2b)
          .setAuthor({
            name: 'MH Weakener Bot',
            iconURL:
              'https://mhworld.kiranico.com/storage/mhw/icon/quest_type_1.png',
          })
          .setTitle(monster.name)
          .addFields(
            { name: 'Locations', value: `${locationOutput}`, inline: true },
            { name: 'Resistances', value: `${resistanceOutput}`, inline: true },
            { name: 'Weaknesses', value: `${weaknessOutput}`, inline: true }
          );

        await message.channel.send({ embeds: [moduleEmbed] });
      }
    }
  },
};
