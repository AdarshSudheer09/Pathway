#!/usr/bin/env node
console.log('1. Script started');
console.log('2. Node version:', process.version);
console.log('3. CWD:', process.cwd());

try {
    console.log('4. Loading Metro config...');
    const { getDefaultConfig } = require('@react-native/metro-config');
    console.log('5. Metro config loaded successfully');

    console.log('6. Getting default config...');
    const config = getDefaultConfig(__dirname);
    console.log('7. Config obtained:', typeof config);

    console.log('8. Loading Metro server...');
    const Metro = require('metro');
    console.log('9. Metro loaded');

    console.log('10. Starting Metro server...');
    Metro.runMetro(config).then(() => {
        console.log('11. Metro started successfully!');
    }).catch(err => {
        console.error('ERROR starting Metro:', err);
        process.exit(1);
    });
} catch (err) {
    console.error('FATAL ERROR:', err);
    process.exit(1);
}
