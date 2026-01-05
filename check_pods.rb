require 'xcodeproj'
project_path = 'ios/PATHWAY.xcodeproj'
project = Xcodeproj::Project.open(project_path)
target = project.targets.find { |t| t.name == 'PATHWAY' }

if target
  puts "Target found: #{target.name}"
  target.build_configurations.each do |config|
    puts "Config: #{config.name}"
    if config.base_configuration_reference
      puts "  Base Config: #{config.base_configuration_reference.name} (Path: #{config.base_configuration_reference.path})"
    else
      puts "  Base Config: NIL"
    end
  end
  
  # Check if Pods group has files
  pods_group = project['Pods']
  if pods_group
    puts "Pods Group Children: #{pods_group.children.map(&:name)}"
  else
    puts "Pods Group not found"
  end
else
  puts "Target PATHWAY not found"
end
