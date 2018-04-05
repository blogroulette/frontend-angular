#/bin/bash

echo "Building the Project using 'yarn run build'"
yarn run build

echo "Extracting version number from package.json"
# Found at https://gist.github.com/DarrenN/8c6a5b969481725a4413
#PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
PACKAGE_VERSION=$(node -pe "require('./package.json').version")

echo "Building container :latest and :$PACKAGE_VERSION"
docker build \
	-t blogroulette/blogroulette-frontend:latest \
	-t blogroulette/blogroulette-frontend:$PACKAGE_VERSION \
	.

