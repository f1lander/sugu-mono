#!/bin/sh

red=$'\e[1;31m'
end=$'\e[0m'

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install and use .nvmrc node version by default
echo " - Setting up node"
nvm install
nvm use
NODE_VERSION=$(node -v)
printf "Node ${NODE_VERSION} is now being used, please set it everytime you work on this workspace by running:"
printf "\n     ${red}nvm use ${NODE_VERSION}${end}"
printf "\nor make it default by running:"
printf "\n     ${red}nvm alias default ${NODE_VERSION}${end}"


# This will configure Expo to work with yarn workspaces, by being here it will let windows
printf "\n - Configuring Expo to work with yarn workspaces..."
cd ./packages/sugu-mobile && npx expo-yarn-workspaces postinstall