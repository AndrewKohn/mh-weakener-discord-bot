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
        // ELEMENT CONDITIONS
        let conditionOutput = '';

        // LOCATIONS
        let locationOutput = '';

        for (const monsterLocations of monster.locations) {
          locationOutput += `${monsterLocations.name}\n`;
        }

        // RESISTANCES
        let resistanceOutput = '';

        if (monster.resistances.length !== 0) {
          for (const monsterResistance of monster.resistances) {
            if (monsterResistance.condition !== null) {
              conditionOutput = monsterResistance.condition;
              resistanceOutput += `${monsterResistance.element}\*\n`;
            } else {
              resistanceOutput += `${monsterResistance.element}\n`;
            }
          }
        } else resistanceOutput = 'No resistances';

        // WEAKNESSES
        let weaknessOutput = '';

        for (const monsterWeakness of monster.weaknesses) {
          let stars = '';

          // if element contains a condition, add to output
          if (monsterWeakness.condition !== null) {
            conditionOutput = monsterWeakness.condition;
          }

          for (let i = 0; i < monsterWeakness.stars; i++) stars += ' ⭐';

          if (monsterWeakness.stars === 3) {
            if (monsterWeakness.condition !== null) {
              conditionOutput = monsterWeakness.condition;
              weaknessOutput +=
                `**__${monsterWeakness.element}__**\*    ` + stars + '\n';
            } else {
              weaknessOutput +=
                `**__${monsterWeakness.element}__**    ` + stars + '\n';
            }
          } else {
            if (monsterWeakness.condition !== null) {
              conditionOutput = monsterWeakness.condition;
              weaknessOutput +=
                `${monsterWeakness.element}\*    ` + stars + '\n';
            } else {
              weaknessOutput += `${monsterWeakness.element}    ` + stars + '\n';
            }
          }
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

        if (conditionOutput !== '') {
          moduleEmbed.addFields({
            name: 'Element Conditions',
            value: `* ${conditionOutput}`,
          });
        }

        await message.channel.send({ embeds: [moduleEmbed] });
      }
    }
  },
};
