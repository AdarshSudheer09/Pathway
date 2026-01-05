#!/usr/bin/env ruby
require 'xcodeproj'

project_path = 'ios/PATHWAY.xcodeproj'
project = Xcodeproj::Project.open(project_path)

target = project.targets.find { |t| t.name == 'PATHWAY' }

if target.nil?
  puts "❌ Target 'PATHWAY' not found"
  exit 1
end

# Check if Embed Frameworks phase exists
embed_phase = target.build_phases.find { |phase| 
  phase.is_a?(Xcodeproj::Project::Object::PBXCopyFilesBuildPhase) && 
  phase.name == 'Embed Frameworks'
}

if embed_phase.nil?
  puts "📦 Creating 'Embed Frameworks' build phase..."
  embed_phase = target.new_copy_files_build_phase('Embed Frameworks')
  embed_phase.symbol_dst_subfolder_spec = :frameworks
  embed_phase.dst_path = ''
else
  puts "✅ 'Embed Frameworks' phase already exists"
end

# Find hermesvm.xcframework
hermes_ref = project.files.find { |file| file.path.include?('hermesvm.xcframework') }

if hermes_ref
  puts "✅ Found hermesvm.xcframework"
  
  # Check if already in embed phase
  already_embedded = embed_phase.files.any? { |f| f.file_ref&.path&.include?('hermesvm') }
  
  if already_embedded
    puts "✅ hermesvm.xcframework already embedded"
  else
    puts "📦 Adding hermesvm.xcframework to Embed Frameworks..."
    build_file = embed_phase.add_file_reference(hermes_ref)
    build_file.settings = { 'ATTRIBUTES' => ['CodeSignOnCopy', 'RemoveHeadersOnCopy'] }
    puts "✅ hermesvm.xcframework added to Embed Frameworks!"
  end
else
  puts "⚠️  hermesvm.xcframework not found in project references"
  puts "   Looking for it in Pods..."
  
  # Add it if it exists in Pods
  if File.exist?('ios/Pods/hermes-engine/destroot/Library/Frameworks/universal/hermesvm.xcframework')
    puts "✅ Found in Pods, adding reference..."
    hermes_file = project.new_file('Pods/hermes-engine/destroot/Library/Frameworks/universal/hermesvm.xcframework')
    build_file = embed_phase.add_file_reference(hermes_file)
    build_file.settings = { 'ATTRIBUTES' => ['CodeSignOnCopy', 'RemoveHeadersOnCopy'] }
    puts "✅ hermesvm.xcframework added!"
  else
    puts "❌ hermesvm.xcframework not found in Pods either"
    exit 1
  end
end

project.save
puts "💾 Project saved successfully!"
puts ""
puts "✅ Hermes framework embedding configured!"
puts "   Now rebuild in Xcode (Clean + Build)"
