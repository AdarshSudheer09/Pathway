#!/usr/bin/env ruby
require 'xcodeproj'

puts "🔧 Applying comprehensive iOS build fixes..."
puts ""

# ===== FIX 1: Glog Headers =====
puts "📦 Step 1: Fixing glog headers..."

# Ensure directories exist
system("mkdir -p ios/Pods/glog/src/glog")
system("mkdir -p ios/Pods/Headers/Public/glog")

# Copy config.h
if File.exist?('ios/vendor/glog/src/config.h')
  system("cp ios/vendor/glog/src/config.h ios/Pods/glog/src/config.h")
  puts "  ✅ config.h copied"
else
  puts "  ❌ vendor config.h not found"
  exit 1
end

# Copy and sanitize all glog headers
if Dir.exist?('ios/vendor/glog/exported/glog')
  system("cp ios/vendor/glog/exported/glog/*.h ios/Pods/glog/src/glog/")
  system("cp ios/vendor/glog/exported/glog/*.h ios/Pods/Headers/Public/glog/")
  
  # Sanitize logging.h in both locations
  ['ios/Pods/glog/src/glog/logging.h', 'ios/Pods/Headers/Public/glog/logging.h'].each do |file|
    if File.exist?(file)
      content = File.read(file)
      content.gsub!(/@ac_cv___attribute___noinline@/, '__attribute__((noinline))')
      content.gsub!(/@ac_cv___attribute___noreturn@/, '__attribute__((noreturn))')
      content.gsub!(/@ac_cv___attribute___printf_4_5@/, '__attribute__((format(printf, 4, 5)))')
      File.write(file, content)
    end
  end
  
  # Sanitize raw_logging.h
  if File.exist?('ios/Pods/glog/src/glog/raw_logging.h')
    content = File.read('ios/Pods/glog/src/glog/raw_logging.h')
    content.gsub!(/@ac_cv___attribute___printf_4_5@/, '__attribute__((format(printf, 4, 5)))')
    File.write('ios/Pods/glog/src/glog/raw_logging.h', content)
  end
  
  puts "  ✅ All glog headers copied and sanitized"
else
  puts "  ❌ vendor glog/exported not found"
  exit 1
end

puts ""

# ===== FIX 2: Hermes Framework Embedding =====
puts "📦 Step 2: Configuring Hermes framework embedding..."

project_path = 'ios/PATHWAY.xcodeproj'
project = Xcodeproj::Project.open(project_path)

target = project.targets.find { |t| t.name == 'PATHWAY' }

if target.nil?
  puts "  ❌ Target 'PATHWAY' not found"
  exit 1
end

# Find or create Embed Frameworks phase
embed_phase = target.build_phases.find { |phase| 
  phase.is_a?(Xcodeproj::Project::Object::PBXCopyFilesBuildPhase) && 
  phase.name == 'Embed Frameworks'
}

if embed_phase.nil?
  puts "  📦 Creating 'Embed Frameworks' build phase..."
  embed_phase = target.new_copy_files_build_phase('Embed Frameworks')
  embed_phase.symbol_dst_subfolder_spec = :frameworks
  embed_phase.dst_path = ''
else
  puts "  ✅ 'Embed Frameworks' phase exists"
end

# Add hermesvm.xcframework if needed
hermes_ref = project.files.find { |file| file.path.include?('hermesvm.xcframework') }

if hermes_ref
  puts "  ✅ Found hermesvm.xcframework reference"
  already_embedded = embed_phase.files.any? { |f| f.file_ref&.path&.include?('hermesvm') }
  
  if already_embedded
    puts "  ✅ hermesvm.xcframework already embedded"
  else
    puts "  📦 Adding hermesvm.xcframework..."
    build_file = embed_phase.add_file_reference(hermes_ref)
    build_file.settings = { 'ATTRIBUTES' => ['CodeSignOnCopy', 'RemoveHeadersOnCopy'] }
    puts "  ✅ hermesvm.xcframework added!"
  end
else
  puts "  ⚠️  hermesvm.xcframework not in project, adding..."
  if File.exist?('ios/Pods/hermes-engine/destroot/Library/Frameworks/universal/hermesvm.xcframework')
    hermes_file = project.new_file('Pods/hermes-engine/destroot/Library/Frameworks/universal/hermesvm.xcframework')
    build_file = embed_phase.add_file_reference(hermes_file)
    build_file.settings = { 'ATTRIBUTES' => ['CodeSignOnCopy', 'RemoveHeadersOnCopy'] }
    puts "  ✅ hermesvm.xcframework added!"
  else
    puts "  ❌ hermesvm.xcframework not found in Pods"
    exit 1
  end
end

project.save
puts "  💾 Project saved"

puts ""
puts "✅ ALL FIXES APPLIED SUCCESSFULLY!"
puts ""
puts "Next steps:"
puts "1. Keep Metro running: npm run metro"
puts "2. In Xcode: Clean Build Folder (Shift+Cmd+K)"
puts "3. In Xcode: Build and Run (Cmd+R)"
