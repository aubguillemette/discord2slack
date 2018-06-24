// ---------------------- How to configure a Discord bot: ----------------------
// 1: Create an app : https://discordapp.com/developers/applications/me
// 2: When app is created, click on "Create a Bot User"
// 3: Name bot, copy the Token + Client ID, paste them in the conf. section below and save changes.
// 4: Go to this URL (replace the Client ID)
//    https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=3072
// 5: Choose the server you want to give your bot access to and click OK (or wtv the button is named)
// 6: Go on Discord and give permission to your bot to read and write msgs
// 7: Copy Channel ID or Channel Name and paste it in the conf. section below.

// ----------------------- How to configure a Slack bot: ------------------------
// 1: Go to https://YOUR_SERVER.slack.com/apps/manage/custom-integrations
// 2: Click on Bots
// 3: Click on Add Integration
// 4: Name your bot, copy the Token and paste it in the conf. section below.
// 5: Invite the bot to the wanted channel (/invite @my-l33t-bot)
// 6: Copy the channel name in the conf. section below.


// -----------------------------Configurable section-----------------------------
const DEBUG = true;

const DISCORD_TOKEN         = '';
const DISCORD_CHANNEL       = '';
const DISCORD_CHANNELID     = '';
const SLACK_TOKEN           = '';
const SLACK_CHANNEL         = '';
const SLACK_CHANNEL_PRIVATE = false;
// ------------------------------------------------------------------------------
var discord_token_not_set = DISCORD_TOKEN === '';
var discord_channel_not_set = DISCORD_CHANNEL === '' && DISCORD_CHANNELID === '';
var slack_token_not_set = SLACK_TOKEN === "";
var slack_channel_not_set = SLACK_CHANNEL === "";

var discord_config_invalid = discord_token_not_set || discord_channel_not_set;
var slack_config_invalid = slack_token_not_set || slack_channel_not_set;

if (discord_config_invalid || slack_config_invalid) {
	console.log ((discord_config_invalid ? "Discord config" : "Slack config") + " is invalid");
	console.log("You need to configure your Discord and Slack tokens and channels" +
	            "in the file discord2slack.js. It's right in the header.");
	process.exit(1);
}

const Discord = require('discord.js');
const discord_client = new Discord.Client();
const SlackBot = require('slackbots');
const slack_client = new SlackBot({token: SLACK_TOKEN, name: 'discord-connector'});

var discord_channel;

function debug(msg) { if (DEBUG) { console.log(msg); } }

//Let's configure events:

discord_client.on('ready', function(){
	//Finding the right channel where to send the messages
	var param = DISCORD_CHANNEL !== "" ? "name" : "id";
	var value = DISCORD_CHANNEL !== "" ? DISCORD_CHANNEL : DISCORD_CHANNELID;
	var potential_channels = discord_client.channels.findAll(param, value);
	if (potential_channels.length === 0) {
		console.log("Error: No Discord channels with " + param + " " + value + " found.");
		process.exit(1);
	}
	if (potential_channels.length > 1) {
		console.log("Warning: More than 1 Discord channel with " + param + " " + value + " found.");
		console.log("Defaulting to first one found");
	}

	discord_channel = potential_channels[0];
	console.log("Discord connected");
});

slack_client.on('start', function() {
	console.log("Slack connected");
});

//Redirect Discord messages to Slack
discord_client.on('message', function(message) {
	//Check if message is from the discord channel configured above
	//(Thanks athyk)
	if (message.channel.id !== DISCORD_CHANNELID && message.channel.name !== DISCORD_CHANNEL) { return; }
	//Avoiding re-sending a message we just received from Slack
	//(event gets triggered even if it's a msg *we* sent to the chat)
	if (message.author.username != discord_client.user.username)
	{
		//Check for atachements (files/images/etc.)
		var content = message.content;
		if (message.attachments != null) {
			var attachments = message.attachments.array();
			attachments.forEach(a => { content += "\n" + a.url; });	
		}
		debug("Discord --> " + message.author.username + ": " + content);
		if (SLACK_CHANNEL_PRIVATE) {
			slack_client.postMessageToGroup(SLACK_CHANNEL, message.author.username + ": " + content);
		} else {
			slack_client.postMessageToChannel(SLACK_CHANNEL, message.author.username + ": " + content);
		}
	}
});

//Redirect Slack client to Discord
slack_client.on('message', function(message) {
	if (message.type == "message")
	{
		//Unlike Discord, event doesn't get triggered if it is a msg we sent

		//We have to find the user name/nickname by ourselves though
		slack_client.getUsers()._value.members.forEach(function(elem){
			if (elem.id == message.user)
			{
				username = elem.name;
				realname = elem.real_name;
				debug("Slack  --> " + realname + " (" + username + ") : " + message.text);
				discord_channel.send(realname + " (" + username + ") : " + message.text);
			}
		});
	}
});

discord_client.login(DISCORD_TOKEN);
