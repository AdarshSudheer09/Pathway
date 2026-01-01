#!/bin/bash
# Commands to push PATHWAY to new GitHub repo: PathwayWithFirebase

# 1. Remove old remote
git remote remove origin

# 2. Update .gitignore to exclude backup files
echo "" >> .gitignore
echo "# Backup files" >> .gitignore
echo "*.backup" >> .gitignore
echo "*.bak*" >> .gitignore
echo "Gemfile.lock" >> .gitignore
echo "package-lock.json" >> .gitignore
echo "yarn.lock" >> .gitignore
echo "ios/Podfile.lock" >> .gitignore
echo "ios/*.log" >> .gitignore

# 3. Stage all changes
git add .

# 4. Commit everything
git commit -m "Initial commit: React Native app with Firebase integration

- React Native 0.83 with New Architecture
- Firebase Auth & Firestore
- Google Sign-In
- Apple Intelligence local LLM integration
- Fixed module dependency errors by using static libraries
- Configured for iOS deployment"

# 5. Add new remote (REPLACE with your actual repo URL)
git remote add origin https://github.com/AdarshSudheer09/PathwayWithFirebase.git

# 6. Push to new repo
git branch -M main
git push -u origin main --force

echo "✅ Successfully pushed to PathwayWithFirebase!"
