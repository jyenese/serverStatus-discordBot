# Discord Server Status Bot

This is a Discord bot that fetches server information from BattleMetrics API and sends status updates to a specified channel in your Discord server.

## Prerequisites

Before running the bot, make sure you have the following:

- Node.js installed
- Discord.js library installed (`npm install discord.js`)
- Axios library installed (`npm install axios`)
- BattleMetrics API key
- Discord bot token

## Setup

1. Clone the repository or create a new folder for your project.
2. Open a terminal and navigate to the project folder.
3. Install the required dependencies using the following command:
```
npm install discord.js axios dotenv
```

4. Create a new file named `.env` in the project folder and add the following content:

METRICS_TOKEN=YOUR_BATTLEMETRICS_API_KEY
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN


Replace `YOUR_BATTLEMETRICS_API_KEY` with your BattleMetrics API key and `YOUR_DISCORD_BOT_TOKEN` with your Discord bot token.

5. Create a new file named `index.js` and paste the following code:

```javascript
const { Client, IntentsBitField } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

// Rest of the code...

// Replace 'YOUR-BOT-TOKEN' with your actual bot token
client.login(process.env.DISCORD_TOKEN);
```
Make sure to replace 'YOUR-BOT-TOKEN' with your actual Discord bot token.

Save the file.
Configuration
Open the index.js file and update the following variables according to your setup:

serverId: Replace with your server ID from BattleMetrics.
channelId: Replace with the ID of the Discord channel where you want to send status updates.
Usage
To start the bot, run the following command in the terminal:
```
node index.js
```