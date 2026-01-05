require 'xcodeproj'
project_path = 'ios/PATHWAY.xcodeproj'
project = Xcodeproj::Project.open(project_path)
pods_group = project['Pods']

if pods_group
  puts "Pods Group Path: #{pods_group.path}"
  puts "Pods Group Source Tree: #{pods_group.source_tree}"
  
  pods_group.files.each do |file|
    puts "File Name: #{file.name}"
    puts "File Path: #{file.path}"
    puts "File Source Tree: #{file.source_tree}"
  end
else
  puts "Pods group not found"
end
