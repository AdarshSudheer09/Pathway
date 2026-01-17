#!/usr/bin/env node
/**
 * Patch for React Native 0.76 Metro "Cannot read properties of undefined (reading 'handle')" error
 * This patches the runServer.js to filter out undefined middleware from unstable_extraMiddleware array
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(
    __dirname,
    'node_modules/@react-native/community-cli-plugin/dist/commands/start/runServer.js'
);

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Find and replace the unstable_extraMiddleware array to filter undefined values
    const searchPattern = /unstable_extraMiddleware:\s*\[\s*communityMiddleware,\s*_cliServerApi\.indexPageMiddleware,\s*middleware,\s*\]/;

    const replacement = `unstable_extraMiddleware: [
      communityMiddleware,
      _cliServerApi.indexPageMiddleware,
      middleware,
    ].filter(Boolean)`;

    if (content.match(searchPattern)) {
        content = content.replace(searchPattern, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('✅ Successfully patched Metro runServer.js to filter undefined middleware');
    } else {
        console.log('⚠️  Pattern not found - file may already be patched or structure has changed');
    }
} catch (error) {
    console.error('❌ Error patching file:', error.message);
    process.exit(1);
}
