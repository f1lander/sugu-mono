#!/bin/sh

# This will configure Expo to work with yarn workspaces, by being here it will let windows
printf "\n - Configuring Expo to work with yarn workspaces..."
cd ./packages/sugu-mobile && npx expo-yarn-workspaces postinstall