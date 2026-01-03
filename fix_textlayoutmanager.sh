#!/bin/bash

# Target files
FILE_PODS="ios/Pods/Headers/Private/React-FabricComponents/react/renderer/textlayoutmanager/TextLayoutManagerExtended.h"
FILE_NODE="node_modules/react-native/ReactCommon/react/renderer/textlayoutmanager/TextLayoutManagerExtended.h"

# Function to patch a file
patch_file() {
    local file=$1
    if [ -f "$file" ]; then
        echo "Patching $file..."
        perl -i -pe 's/LOG\(FATAL\) << "Platform TextLayoutManager does not support measureLines";/LOG(FATAL) << "Platform TextLayoutManager does not support measureLines"; std::abort();/' "$file"
        perl -i -pe 's/LOG\(FATAL\) << "Platform TextLayoutManager does not support prepareLayout";/LOG(FATAL) << "Platform TextLayoutManager does not support prepareLayout"; std::abort();/' "$file"
        perl -i -pe 's/LOG\(FATAL\) << "Platform TextLayoutManager does not support measurePreparedLayout";/LOG(FATAL) << "Platform TextLayoutManager does not support measurePreparedLayout"; std::abort();/' "$file"
        echo "✅ Patched $file"
    else
        echo "⚠️ File not found: $file"
    fi
}

patch_file "$FILE_PODS"
patch_file "$FILE_NODE"
