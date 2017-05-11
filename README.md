# discord2slack
Send messages to Slack using Discord and vice versa.

## Install
```sh
curl https://raw.githubusercontent.com/aubguillemette/discord2slack/master/discord2slack.js -o discord2slack.js
npm install discord.js
npm install slackbots
# Configure your stuff (see Config section)
node discord2slack.js
```

## Config
You have to set the following values in discord2slack.js (or main.js if you cloned the repo)
```javascript
const DISCORD_TOKEN     = '';
const DISCORD_CHANNELID = '';
const SLACK_TOKEN       = '';
const SLACK_CHANNEL     = '';
```
...where
- `DISCORD_TOKEN` is your Discord bot token
- `DISCORD_CHANNELID` is the ID of your Discord channel
- `SLACK_TOKEN` is your Slack bot token
- `SLACK_CHANNEL` is the name of your Slack channel

## How does one create Discord and Slack bots?
I've included instructions in the source code, I'll put them here too.

#### How to configure a Discord bot
1. Go here: [https://discordapp.com/developers/applications/me](https://discordapp.com/developers/applications/me)
2. Create an app
3. When the app is created, click on "Create a Bot User"
4. Name bot, copy the Token + Client ID, paste them in the conf. section of the source code and save changes.
5. Go here (but replace "YOUR_CLIENT_ID" in the URL) [https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=3072](https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=3072)
6. Choose the server you want to give your bot access to and click OK (or wtv the submit button is named)
7. Go on Discord and configure your channel to give msg read and msg write permissions to your bot.
8. Copy your Channel ID and paste it in the conf. section of the source code.

#### How to configure a Slack bot
1. Go here (but replace "YOUR_SERVER" ine the URL): [https://YOUR_SERVER.slack.com/apps/manage/custom-integrations](https://YOUR_SERVER.slack.com/apps/manage/custom-integrations)
2. Click on Bots
3. Click on Add Integration
4. Name your bot, copy the Token and paste it in the conf. section of the source code.
5. Invite the bot to the wanted channel (/invite @my-l33t-bot)
6. Copy the channel name in the conf. section of the source code.

## TODO
- Add support for file/image upload/exchange
