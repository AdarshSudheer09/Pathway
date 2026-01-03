
#!/bin/bash
set -e

echo "Retrying npm install with --legacy-peer-deps..."
npm install --legacy-peer-deps

echo "Installing Pods..."
cd ios
pod install
cd ..

echo "Dependency restoration complete."
