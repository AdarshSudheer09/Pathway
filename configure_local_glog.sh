#!/bin/bash
set -e

cd ios/vendor/glog

PLATFORM_NAME="${PLATFORM_NAME:-iphoneos}"
CURRENT_ARCH="${CURRENT_ARCH}"

if [ -z "$CURRENT_ARCH" ] || [ "$CURRENT_ARCH" == "undefined_arch" ]; then
    if [[ "$PLATFORM_NAME" == *"simulator"* ]]; then
        CURRENT_ARCH="x86_64"
    else
        CURRENT_ARCH="arm64"
    fi
fi

if [ "$CURRENT_ARCH" == "arm64" ]; then
    cat <<\EOF >fix_glog_0.3.5_apple_silicon.patch
diff --git a/config.sub b/config.sub
index 1761d8b..43fa2e8 100755
--- a/config.sub
+++ b/config.sub
@@ -1096,6 +1096,9 @@ case $basic_machine in
 		basic_machine=z8k-unknown
 		os=-sim
 		;;
+	arm64-*)
+		basic_machine=$(echo $basic_machine | sed 's/arm64/aarch64/')
+		;;
 	none)
 		basic_machine=none-none
 		os=-none
EOF
    # Apply patch if not already applied
    if ! grep -q "aarch64" config.sub; then
        patch -p1 config.sub fix_glog_0.3.5_apple_silicon.patch
    fi
fi

# Manually disable gflags include
sed -i.bak -e 's/\@ac_cv_have_libgflags\@/0/' src/glog/logging.h.in && rm src/glog/logging.h.in.bak || true
sed -i.bak -e 's/HAVE_LIB_GFLAGS/HAVE_LIB_GFLAGS_DISABLED/' src/config.h.in && rm src/config.h.in.bak || true

# Run Configure
./configure --host arm-apple-darwin || true

# Append Apple configuration to config.h
cat << EOF >> src/config.h
/* Add in so we have Apple Target Conditionals */
#ifdef __APPLE__
#include <TargetConditionals.h>
#include <Availability.h>
#endif

/* Special configuration for AppleTVOS */
#if TARGET_OS_TV
#undef HAVE_SYSCALL_H
#undef HAVE_SYS_SYSCALL_H
#undef OS_MACOSX
/* NO_THREADS needed right now for Xcode 16 */
#define NO_THREADS
#endif

/* Special configuration for ucontext */
#undef HAVE_UCONTEXT_H
#undef PC_FROM_UCONTEXT
#if defined(__x86_64__)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__rip
#elif defined(__i386__)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__eip
#endif
EOF

# Prepare exported header include
mkdir -p exported/glog
cp -f src/glog/log_severity.h exported/glog/
cp -f src/glog/logging.h exported/glog/
cp -f src/glog/raw_logging.h exported/glog/
cp -f src/glog/stl_logging.h exported/glog/
cp -f src/glog/vlog_is_on.h exported/glog/

echo "✅ Glog manually configured."
