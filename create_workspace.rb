require 'xcodeproj'
workspace = Xcodeproj::Workspace.new('PATHWAY.xcodeproj', 'Pods/Pods.xcodeproj')
workspace.save_as('ios/PATHWAY.xcworkspace')
puts "Created ios/PATHWAY.xcworkspace"
