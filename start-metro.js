#!/usr/bin/env node
/**
 * Metro Bundler with Interactive CLI
 * 
 * This provides the full React Native dev experience including:
 * - Interactive commands (r to reload, d to open dev menu)
 * - Colored output and bundle progress
 * - Connection logs when devices connect
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const Metro = require('metro');
const { Terminal } = require('metro-core');
const path = require('path');

const projectRoot = __dirname;

// Get Metro config
const defaultConfig = getDefaultConfig(projectRoot);
const customConfig = {};
const config = mergeConfig(defaultConfig, customConfig);

// Start Metro with interactive terminal
const terminal = new Terminal(process.stdout);

Metro.runServer(config, {
    host: '0.0.0.0',
    port: 8081,
    resetCache: process.argv.includes('--reset-cache'),
}).then(async (server) => {
    terminal.log('Metro bundler is ready!');
    terminal.log('');
    terminal.log('To reload the app press "r"');
    terminal.log('To open developer menu press "d"');
    terminal.log('');

    // Get message socket for device communication
    let messageSocket = null;
    try {
        // Access messageSocket directly from server instance
        messageSocket = server.messageSocket;
    } catch (err) {
        terminal.log('Note: Interactive commands (r/d) require device connection');
    }

    // Enable interactive mode
    if (process.stdin.setRawMode) {
        process.stdin.setRawMode(true);
    }
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (key) => {
        if (key === '\u0003') { // Ctrl+C
            process.exit();
        } else if (key === 'r' || key === 'R') {
            terminal.log('Reloading app...');
            if (messageSocket) {
                messageSocket.broadcast('reload', null);
            }
        } else if (key === 'd' || key === 'D') {
            terminal.log('Opening developer menu...');
            if (messageSocket) {
                messageSocket.broadcast('devMenu', null);
            }
        }
    });

}).catch(error => {
    console.error('Metro failed to start:', error);
    process.exit(1);
});
