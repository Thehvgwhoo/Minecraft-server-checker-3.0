const serverIP = 'sjc1.us.blare.host'; // Replace with your Minecraft server IP
const serverPort = 25939; // Default Minecraft port

async function fetchServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`);
        const data = await response.json();

        if (data.online) {
            document.getElementById('server-status').innerText = 'Server is online';
            document.getElementById('server-description').innerText = data.motd.clean.join(' ');
            document.getElementById('player-count').innerText = `Players online: ${data.players.online}/${data.players.max}`;
        } else {
            document.getElementById('server-status').innerText = 'Server is offline';
            document.getElementById('server-description').innerText = '';
            document.getElementById('player-count').innerText = '';
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        document.getElementById('server-status').innerText = 'Error fetching server status';
        document.getElementById('server-description').innerText = '';
        document.getElementById('player-count').innerText = '';
    }
}

// Fetch server status on load
fetchServerStatus();

// Refresh server status every 60 seconds
setInterval(fetchServerStatus, 5000);
