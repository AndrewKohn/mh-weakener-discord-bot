# Monster Hunter Weakener Discord Bot

### Andrew Kohn

This is a discord bot that quickly displays a monster's location, resistances, and elemental/status weaknesses for all hunters in the channel. It allows everyone in the party to easily view an upcoming monster's stats without fiddling with google and wikia sites.

Note: This is only for Monster Hunter World & MHW: Iceborne. Monsters also available in other games may have undergone stat changes that may not match this bot's data.

#

## Running

First, fork repo and copy .env.example to .env, and set DISCORD_TOKEN & GUILD_ID. Instructions on how to set these variables are inside the .env.example file. Consider .gitignore the .env file if saving this repo for later.

Then, create a bot on Discord with the send messages permission.

<p>To run the bot, run <code>node index.js</code></p>

To deploy the bot:

- Sign-up/sign-in to heroku and upload repo via github.
- On the Settings tab, go to Config Vars and Reveal Config Vars. Add .env constants to each respective line.
- Underneath Config Vars, add the Node.js Buildpack.
- On the Deploy tab, enable automatic deploys and go to Manual Deploy and manually deploy branch. Check to see if deployment contains all checkmarks.
- On the Resources tab, edit the web line and disable it. Edit the worker line and enable it.
- On the top-right section of the heroku page, select the More dropdown and click the View Logs. Let the log complete before using bot.

You're bot is up and running if the status below matches with your log. If not, then an error on the log will help direct what went wrong.

```
heroku[worker.1]: State changed from starting to up
app[worker.1]: MH Weakener is online!
```

#

## Commands

- /help : Displays commands in discord. Will only show to user.
- /monsters : Displays all available and accepted monster names.
- !m {monsterName} : Displays selected monster stats. Will show to channel.

#

## To-do

- [ ] Adjust receiving user input to ignore " ' " & " - " characters (or replace with a space).
- [x] Have Resistances label elements in column rather than row.
- [ ] Assign a monster icon to the thumbnail of embeds
- [ ] Format stars so they all start at the same position down the column.
