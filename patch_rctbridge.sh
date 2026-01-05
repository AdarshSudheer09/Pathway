#!/bin/bash

# Patch RCTBridge.m to disable forced New Architecture check
BRIDGE_FILE="ios/Pods/React-Core/React/Base/RCTBridge.m"

if [ -f "$BRIDGE_FILE" ]; then
    echo "Patching RCTBridge.m to allow legacy architecture..."
    
    # Comment out the throwIfOnLegacyArch call
    sed -i '' 's/\[RCTBridge throwIfOnLegacyArch\];/\/\/ [RCTBridge throwIfOnLegacyArch]; \/\/ Patched to allow legacy architecture/' "$BRIDGE_FILE"
    
    echo "✅ RCTBridge.m patched successfully"
else
    echo "⚠️  RCTBridge.m not found at expected location"
    # Try to find it
    BRIDGE_FILE=$(find ios/Pods -name "RCTBridge.m" -type f 2>/dev/null | head -1)
    if [ -n "$BRIDGE_FILE" ]; then
        echo "Found at: $BRIDGE_FILE"
        sed -i '' 's/\[RCTBridge throwIfOnLegacyArch\];/\/\/ [RCTBridge throwIfOnLegacyArch]; \/\/ Patched to allow legacy architecture/' "$BRIDGE_FILE"
        echo "✅ RCTBridge.m patched successfully"
    else
        echo "❌ Could not find RCTBridge.m"
        exit 1
    fi
fi
