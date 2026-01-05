require 'xcodeproj'
project_path = 'ios/PATHWAY.xcodeproj'
project = Xcodeproj::Project.open(project_path)
target = project.targets.find { |t| t.name == 'PATHWAY' }

if target
  puts "Fixing integration for #{target.name}..."
  
  # Find or Create Pods group
  pods_group = project.main_group.find_subpath('Pods', true)
  pods_group.set_source_tree('<group>')
  
  # Add xcconfigs
  debug_xcconfig_path = 'Pods/Target Support Files/Pods-PATHWAY/Pods-PATHWAY.debug.xcconfig'
  release_xcconfig_path = 'Pods/Target Support Files/Pods-PATHWAY/Pods-PATHWAY.release.xcconfig'
  
  debug_ref = pods_group.new_reference(debug_xcconfig_path)
  release_ref = pods_group.new_reference(release_xcconfig_path)
  
  target.build_configurations.each do |config|
    if config.name == 'Debug'
      config.base_configuration_reference = debug_ref
      puts "Linked Debug to #{debug_xcconfig_path}"
    elsif config.name == 'Release'
      config.base_configuration_reference = release_ref
      puts "Linked Release to #{release_xcconfig_path}"
    end
  end
  
  project.save
  puts "Project saved."
else
  puts "Target PATHWAY not found"
end
