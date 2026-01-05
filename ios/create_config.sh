#!/bin/bash
# create_config.sh
# Manually ensures glog headers are in the correct location for Pods

set -e

echo "Creating glog config headers..."

# Source directory (vendored glog)
SRC_DIR="vendor/glog/src"
EXPORTED_DIR="vendor/glog/exported/glog"

# Destination directory (Pods glog)
DEST_DIR="Pods/glog/src"
DEST_GLOG_DIR="Pods/glog/src/glog"

# Ensure destination directories exist
mkdir -p "$DEST_DIR"
mkdir -p "$DEST_GLOG_DIR"

# Copy config.h
if [ -f "$SRC_DIR/config.h" ]; then
    cp "$SRC_DIR/config.h" "$DEST_DIR/config.h"
    echo "Copied config.h to $DEST_DIR/config.h"
else
    echo "ERROR: $SRC_DIR/config.h not found!"
    exit 1
fi

# Copy logging.h (if needed)
# demangle.h expects "glog/logging.h", which resolves to src/glog/logging.h
if [ -f "$EXPORTED_DIR/logging.h" ]; then
    cp "$EXPORTED_DIR/logging.h" "$DEST_GLOG_DIR/logging.h"
    echo "Copied exported/logging.h to $DEST_GLOG_DIR/logging.h"
elif [ -f "$SRC_DIR/glog/logging.h" ]; then
    cp "$SRC_DIR/glog/logging.h" "$DEST_GLOG_DIR/logging.h"
    # Patch autoconf placeholders
    sed -i '' 's/@ac_cv___attribute___noinline@/__attribute__((noinline))/g' "$DEST_GLOG_DIR/logging.h"
    sed -i '' 's/@ac_cv___attribute___noreturn@/__attribute__((noreturn))/g' "$DEST_GLOG_DIR/logging.h"
    sed -i '' 's/@ac_cv___attribute___printf_4_5@/__attribute__((format(printf, 4, 5)))/g' "$DEST_GLOG_DIR/logging.h"
    echo "Copied src/glog/logging.h to $DEST_GLOG_DIR/logging.h"
elif [ -f "vendor/glog/src/glog/logging.h" ]; then
    cp "vendor/glog/src/glog/logging.h" "$DEST_GLOG_DIR/logging.h"
    # Patch autoconf placeholders
    sed -i '' 's/@ac_cv___attribute___noinline@/__attribute__((noinline))/g' "$DEST_GLOG_DIR/logging.h"
    sed -i '' 's/@ac_cv___attribute___noreturn@/__attribute__((noreturn))/g' "$DEST_GLOG_DIR/logging.h"
    sed -i '' 's/@ac_cv___attribute___printf_4_5@/__attribute__((format(printf, 4, 5)))/g' "$DEST_GLOG_DIR/logging.h"
    echo "Copied vendor/glog/src/glog/logging.h to $DEST_GLOG_DIR/logging.h"
else
  echo "WARNING: logging.h not found in vendor, using stub"
  # Create a stub logging.h if all else fails
  echo "#include <iostream>" > "$DEST_GLOG_DIR/logging.h"
fi

# Copy raw_logging.h/stl_logging.h etc if they are in exported
cp vendor/glog/exported/glog/*.h "$DEST_GLOG_DIR/" 2>/dev/null || true

# Also copy from src/glog if not in exported (raw_logging.h is in src/glog typically)
if [ -f "$SRC_DIR/glog/raw_logging.h" ]; then
    cp "$SRC_DIR/glog/raw_logging.h" "$DEST_GLOG_DIR/raw_logging.h"
    sed -i '' 's/@ac_cv___attribute___printf_4_5@/__attribute__((format(printf, 4, 5)))/g' "$DEST_GLOG_DIR/raw_logging.h"
fi

echo "Glog headers configured successfully."
