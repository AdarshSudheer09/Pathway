
Pod::Spec.new do |spec|
  spec.name = 'glog'
  spec.version = '0.3.5'
  spec.license = { :type => 'MIT' }
  spec.homepage = 'https://github.com/google/glog'
  spec.summary = 'Stubbed Google logging module for React Native'
  spec.authors = 'Antigravity'
  spec.source = { :git => 'https://github.com/google/glog.git' } # Fake
  spec.module_name = 'glog'
  spec.header_dir = 'glog'
  spec.source_files = 'glog/*.h'
  spec.pod_target_xcconfig = {
    "USE_HEADERMAP" => "NO",
    "DEFINES_MODULE" => "YES",
    "GCC_WARN_INHIBIT_ALL_WARNINGS" => "YES"
  }
end
