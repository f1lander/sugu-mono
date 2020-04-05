
# Codename Sugu

This is a monorepo for the Sugu Marketplace. It contains the codebase for all the projects which are sugu-services (backend), sugu-mobile (mobile app) and sugu-ui (web app).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. For the time being, setup instructions are aimed for MacOS, if you make it work on Windows, please update the corresponding sections. See deployment for notes on how to deploy the projects to the different environments.

### Prerequisites

You will need to have `NodeJS` **v10.x** running in your development environment, we suggest you also setup `nvm` to manage different `nodejs` versions. Also this monorepo was created by using `lerna` and relying on `yarn` to handle workspaces.

 - Installing `node`
	 - Please follow these [instructions](https://github.com/nvm-sh/nvm#install--update-script) (do not use `brew`).

### Installing  

 - Installing `lerna`
```
npm install --global lerna
```
 - Installing yarn (you must have brew)
```
brew update && brew install yarn
```
#### For ReactJS `sugu-ui` project
	-
#### For `sugu-services` project
	-
#### For React Native (Expo) `sugu-mobile` project
 - Installing `expo` - _you might also need to open an account in expo.io._
```
npm install -g expo-cli
```
 - Install `watchman`
```
brew install watchman
```

>For reference purpose, initial setup was made following this [Medium post](https://medium.com/habilelabs/react-native-react-web-and-expo-together-in-one-monorepo-5b8f9a0fca00).


## Running the tests

All projects have tests setup with `jest`, hopefully we will have unit tests on most of our projects.
To run tests on all projects you can use
```
lerna --scope=sugu-mobile run test
```
To limit it to an specific project
```
lerna --scope=sugu-mobile run test
```
However, using yarn directly will give you more detail
```
yarn workspace sugu-mobile run test
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Edax Uclés** - *Founder* - [f1lander](https://github.com/f1lander)
* **Oscar Soriano** - *Founder* - [sorioinc](https://github.com/sorioinc)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
