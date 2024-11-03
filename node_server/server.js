const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log('Received message:', data);  // Log received messages for debugging

        if (data.event === 'open-in-desktop') {
            console.log(data);
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ event: 'open-in-desktop', message: data.message }));
                }
            });
        }
        if (data.event === 'next-item') {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ event: 'customer-next-item', message: data.message }));
                }
            });
        }
        if (data.event === 'chat-message') {
            const chatMessage = JSON.stringify({ event: 'chat-message', data: data.message });
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(chatMessage);
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
