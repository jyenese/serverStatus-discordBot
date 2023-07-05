const { Client, IntentsBitField } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});
const serverId = '22298100'; // Replace with your server ID
const channelId = '1125916044926656525'; // Replace with your desired channel ID
const apiKey = process.env.METRICS_TOKEN; // Replace with your BattleMetrics API key

// Function to fetch server information from BattleMetrics API
async function fetchServerInfo() {
  try {
    const response = await axios.get(`https://api.battlemetrics.com/servers/${serverId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const server = response.data.data;
    
    const serverStatus = server.attributes.status;
    const playersOnline = server.attributes.players;
    const serverName = server.attributes.name;
    
    return { serverStatus, playersOnline, serverName };
  } catch (error) {
    console.error('Error occurred while fetching server information:', error);
    return { serverStatus: 'Error', playersOnline: 'Unknown', serverName: 'Unknown' };
  }
}

// Function to send status updates to the specified channel
async function sendStatusUpdates() {
  const channel = client.channels.cache.get(channelId);
  
  if (!channel) {
    console.error(`Channel with ID ${channelId} not found.`);
    return;
  }
  
  const { serverStatus, playersOnline } = await fetchServerInfo();
  function statusOnline() {
    if (serverStatus === 'online') {
      channel.send(`Server Status: [${serverStatus}] with ${playersOnline} players online.`);
      channel.send('https://www.battlemetrics.com/servers/arma3/22298100');
      channel.send(`Time: ${new Date().toLocaleTimeString()}`);
    }
  }
  
  function statusOffline() {
    if (serverStatus !== 'online') {
      channel.send(`Server Status: [${serverStatus}] with ${playersOnline} players online.`);
      channel.send('https://www.battlemetrics.com/servers/arma3/22298100');
      channel.send(`Time: ${new Date().toLocaleTimeString()}`);
    }
  }
  
  statusOnline();
  statusOffline();
}
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  // Send status updates every 15 seconds
    setInterval(sendStatusUpdates, 5000);
//     setInterval(statusOffline, 1000);
});

// Replace 'YOUR-BOT-TOKEN' with your actual bot token
client.login(process.env.DISCORD_TOKEN);
