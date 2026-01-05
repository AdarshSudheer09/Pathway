require 'xcodeproj'
project_path = 'ios/PATHWAY.xcodeproj'
project = Xcodeproj::Project.open(project_path)
pods_group = project['Pods']

if pods_group
  pods_group.files.each do |file|
    if file.path.start_with?('Pods/')
      new_path = file.path.sub('Pods/', '')
      puts "Renaming #{file.path} -> #{new_path}"
      file.path = new_path
    end
  end
  project.save
  puts "Project saved."
end
