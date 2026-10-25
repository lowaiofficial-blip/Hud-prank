const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Statik dosyaları sun (HTML dosyalarımız public klasöründe olacak)
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Bir cihaz bağlandı:', socket.id);

    // Senin iPad'den "Canı Azaldı" komutu gelince
    socket.on('can-azaldi', () => {
        console.log('🚨 TEHLİKE! Hasan için alarm tetiklendi!');
        // Bağlı olan herkese (annenin telefonuna) sinyali fırlat
        io.emit('uyari-goster');
    });

    // "Durum Güvenli" komutu gelince
    socket.on('can-normal', () => {
        console.log('✅ Durum güvenli, alarm kapatılıyor.');
        io.emit('uyari-kapat');
    });

    socket.on('disconnect', () => {
        console.log('Bir cihaz bağlantıyı kesti:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başarıyla çalışıyor!`);
});
