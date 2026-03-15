#!/bin/bash

# Initialize git if not already done
if [ ! -d .git ]; then
  git init
  echo "Initialized empty Git repository."
else
  echo "Git repository already initialized."
fi

# Add all files
git add .

# Commit changes
git commit -m "Upload all worked code" || echo "Nothing to commit"

# Rename branch to main
git branch -M main

# Configure remote
if git remote | grep -q "^origin$"; then
  git remote set-url origin https://github.com/devLibrarian/vibe-practice.git
else
  git remote add origin https://github.com/devLibrarian/vibe-practice.git
fi

# Push to remote
echo "Pushing to https://github.com/devLibrarian/vibe-practice.git..."
git push -u origin main
