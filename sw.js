let alarmTimeoutId = null;

// Dengar mesej dari aplikasi utama
self.addEventListener('message', event => {
    const { type, duration } = event.data;

    if (type === 'START_TIMER') {
        // Tetapkan penggera
        alarmTimeoutId = setTimeout(() => {
            self.registration.showNotification('Masa Tamat!', {
                body: 'Timer yang anda tetapkan telah tamat.',
                icon: 'data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>⏰</text></svg>',
                tag: 'timer-alarm',
                requireInteraction: true // Notifikasi tidak akan hilang sendiri
            });
        }, duration);
    }

    if (type === 'STOP_TIMER') {
        clearTimeout(alarmTimeoutId);
        // Hapuskan notifikasi sedia ada
        self.registration.getNotifications().then(notifications => {
            notifications.forEach(notification => notification.close());
        });
    }

    // Baharu: Fungsi untuk mengendalikan ujian notifikasi
    if (type === 'TEST_NOTIFICATION') {
        self.registration.showNotification('Uji Notifikasi', {
            body: 'Ini adalah ujian. Notifikasi berfungsi dengan baik!',
            icon: 'data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>✅</text></svg>',
            tag: 'test-notification'
        });
    }
});