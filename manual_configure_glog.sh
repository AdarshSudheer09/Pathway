#!/bin/bash
set -e
cd ios/vendor/glog

# 1. Create src/config.h
cat << EOF > src/config.h
/* src/config.h. Manually generated for iOS. */
#define HAVE_DLFCN_H 1
#define HAVE_INTTYPES_H 1
#define HAVE_MEMORY_H 1
#define HAVE_STDINT_H 1
#define HAVE_STDLIB_H 1
#define HAVE_STRINGS_H 1
#define HAVE_STRING_H 1
#define HAVE_SYS_STAT_H 1
#define HAVE_SYS_TYPES_H 1
#define HAVE_UNISTD_H 1
#define HAVE_LIB_GFLAGS 0
#define HAVE_LIB_GFLAGS_DISABLED 1
#define HAVE_SIGACTION 1
#define HAVE_DLADDR 1
#define HAVE_FCNTL 1
#define HAVE_PREAD 1
#define HAVE_PWRITE 1
#define HAVE_SYS_SYSCALL_H 1
#define HAVE_SYSCALL_H 1
#define STDC_HEADERS 1
#define GOOGLE_NAMESPACE google
#define _START_GOOGLE_NAMESPACE_ namespace google {
#define _END_GOOGLE_NAMESPACE_ }

#ifdef __APPLE__
#include <TargetConditionals.h>
#include <Availability.h>
#endif
#if TARGET_OS_TV
#undef HAVE_SYSCALL_H
#undef HAVE_SYS_SYSCALL_H
#undef OS_MACOSX
#define NO_THREADS
#endif
#undef HAVE_UCONTEXT_H
#undef PC_FROM_UCONTEXT
#if defined(__x86_64__)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__rip
#elif defined(__i386__)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__eip
#endif
EOF

# 2. Create src/glog/logging.h from .in
# Perform substitutions that configure usually does
sed -e 's/@ac_cv_have_libgflags@/0/g' \
    -e 's/@ac_google_start_namespace@/namespace google {/g' \
    -e 's/@ac_google_end_namespace@/}/g' \
    -e 's/@ac_google_namespace@/google/g' \
    -e 's/@ac_cv_have_uint16_t@/1/g' \
    -e 's/@ac_cv_have_u_int16_t@/1/g' \
    -e 's/@ac_cv_have___uint16@/0/g' \
    -e 's/@ac_cv_have___builtin_expect@/1/g' \
    -e 's/@ac_cv_have_stdint_h@/1/g' \
    -e 's/@ac_cv_have_systypes_h@/1/g' \
    -e 's/@ac_cv_have_inttypes_h@/1/g' \
    -e 's/@ac_cv_have_unistd_h@/1/g' \
    -e 's/@ac_cv_have_syscall_h@/1/g' \
    -e 's/@ac_cv_have_sys_syscall_h@/1/g' \
    src/glog/logging.h.in > src/glog/logging.h

# 3. Create src/glog/vlog_is_on.h from .in
sed -e 's/@ac_google_start_namespace@/namespace google {/g' \
    -e 's/@ac_google_end_namespace@/}/g' \
    -e 's/@ac_google_namespace@/google/g' \
    -e 's/@ac_cv_have_uint16_t@/1/g' \
    -e 's/@ac_cv_have_u_int16_t@/1/g' \
    -e 's/@ac_cv_have___uint16@/0/g' \
    -e 's/@ac_cv_have___builtin_expect@/1/g' \
    -e 's/@ac_cv_have_stdint_h@/1/g' \
    -e 's/@ac_cv_have_systypes_h@/1/g' \
    -e 's/@ac_cv_have_inttypes_h@/1/g' \
    -e 's/@ac_cv_have_unistd_h@/1/g' \
    -e 's/@ac_cv_have_syscall_h@/1/g' \
    -e 's/@ac_cv_have_sys_syscall_h@/1/g' \
    src/glog/vlog_is_on.h.in > src/glog/vlog_is_on.h

# 4. Create raw_logging.h from .in 
sed -e 's/@ac_google_start_namespace@/namespace google {/g' \
    -e 's/@ac_google_end_namespace@/}/g' \
    -e 's/@ac_google_namespace@/google/g' \
    src/glog/raw_logging.h.in > src/glog/raw_logging.h

# 5. Create stl_logging.h from .in
sed -e 's/@ac_google_start_namespace@/namespace google {/g' \
    -e 's/@ac_google_end_namespace@/}/g' \
    -e 's/@ac_google_namespace@/google/g' \
    src/glog/stl_logging.h.in > src/glog/stl_logging.h


# 6. Export headers
mkdir -p exported/glog
cp -f src/glog/log_severity.h exported/glog/
cp -f src/glog/logging.h exported/glog/
cp -f src/glog/raw_logging.h exported/glog/
cp -f src/glog/stl_logging.h exported/glog/
cp -f src/glog/vlog_is_on.h exported/glog/

echo "✅ Glog manually configured (NO CONFIGURE SCRIPT)."
