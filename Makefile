.PHONY: install run publish

install:
	./setup_11.x.sh
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
	apt-get update
	apt-get install -y nodejs yarn
	yarn global add @vue/cli @aws-amplify/cli

run:
	vue ui --host 0.0.0.0 

publish:
	cd ./vue ; amplify publish
