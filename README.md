<div align="center"><h1>Monster Hunter Weakener Discord Bot</h1></div>

<div align="center"><h3>Andrew Kohn</h3></div>

<div align="center"><img src="./assets/bot_example.png" /></div>

#

This is a discord bot that quickly displays a monster's location, resistances, and elemental/status weaknesses for all hunters in the channel. It allows everyone in the party to easily view an upcoming monster's stats without fiddling with google and wikia sites.

Note: This is only for Monster Hunter World & MHW: Iceborne. Monsters also available in other games may have undergone stat changes that may not match this bot's data.

## Running

First, fork repo and copy .env.example to .env, and set DISCORD_TOKEN & GUILD_ID. Instructions on how to set these variables are inside the .env.example file. Consider .gitignore the .env file if saving this repo for later.

Then, create a bot on Discord with the send messages permission.

<p>To run the bot, run <code>node index.js</code></p>

Note on deploying:
- heroku introduced a very limiting free-tier for users that allows use for about one week until you add a payment plan, use railway.app instead...

## Commands

- /help : Displays commands in discord. Will only show to user.
- /monsters : Displays all available and accepted monster names.
- !m {monsterName} : Displays selected monster stats. Will show to channel.

## To-do

- [x] Have Resistances label elements in column rather than row.
- [ ] Assign a monster icon to the thumbnail of embeds
- [ ] Format stars so they all start at the same position down the column.
- [x] Add \* to element if it contains a condition. Display condition in a new addField at the bottom of the embed.
