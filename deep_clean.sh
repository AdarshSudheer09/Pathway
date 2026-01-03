
#!/bin/bash
set -e

echo "Killing zombie processes..."
killall node || true
killall watchman || true
killall xcodebuild || true
pkill -f "react-native" || true

echo "Cleaning build artifacts..."
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/Podfile.lock
rm -rf ~/Library/Developer/Xcode/DerivedData/PATHWAY-*
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*

echo "Reinstalling dependencies..."
npm install

echo "Installing Pods..."
cd ios
pod install
cd ..

echo "Deep clean complete."
