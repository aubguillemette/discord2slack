# discord2slack
Send messages to Slack using Discord and vice versa.

Tested with Node v9.9.0.

## Install
```sh
git clone https://github.com/aubguillemette/discord2slack.git && cd discord2slack
npm install
# Configure your stuff (see Config section)
npm start
```

## Config
You have to set the following values in discord2slack.js
```javascript
const DISCORD_TOKEN         = '';
const DISCORD_CHANNEL     = '';
const DISCORD_CHANNELID     = '';
const SLACK_TOKEN           = '';
const SLACK_CHANNEL         = '';
const SLACK_CHANNEL_PRIVATE = false;
```
...where
- `DISCORD_TOKEN` is your Discord bot token
- `DISCORD_CHANNEL` is the name of your Discord channel (configure this or DISCORD_CHANNELID)
- `DISCORD_CHANNELID` is the ID of your Discord channel (configure this or DISCORD_CHANNEL)
- `SLACK_TOKEN` is your Slack bot token
- `SLACK_CHANNEL` is the name of your Slack channel
- `SLACK_CHANNEL_PRIVATE` represents whether or not your Slack channel is private

## How does one create Discord and Slack bots?
I've included instructions in the source code, I'll put them here too.

#### How to configure a Discord bot
1. Go here: [https://discordapp.com/developers/applications/me](https://discordapp.com/developers/applications/me)
2. Create an app
3. When the app is created, click on "Create a Bot User"
4. Name bot, copy the Token, paste it in the conf. section of the source code and save changes.
5. Go here (but replace "YOUR_CLIENT_ID" in the URL) [https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=3072](https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=3072)
6. Choose the server you want to give your bot access to and click OK (or wtv the submit button is named)
7. Go on Discord and configure your channel to give msg read and msg write permissions to your bot.
8. Copy your Channel ID or your Channel Name and paste it in the conf. section of the source code.

#### How to configure a Slack bot
1. Go to https://my.slack.com/services/new/bot
2. Configure the name of the bot
3. Copy-Paste the Token into the conf. section of the source code and save changes.
4. Invite the bot to the desired channel (/invite @my-l33t-bot)
5. Copy the channel name in the conf. section of the source code.
6. If the channel is private, set SLACK_CHANNEL_PRIVATE to true.

## TODO
- Add support for DMs
- Add support for multiple channels
