# css-to-guidelines
Simple way to convert your scss styles to guideline just an another awesome tool.

## Instalation
To install via Git, simply run the following line in your terminal:

`git clone https://github.com/johnny04501/css-to-guidelines.git`

## Basic usage
  
#### Note! Please skip step 1 and 2. (Not needed in beta version)     

1. We need to create a config file for our project. Create `config` file by using: `gulp start`

2. Let's create our first page by running: `gulp create-page`
  * Did you make a mistake ? No worries just run `gulp update-page` for updating your pages or `gulp remove-page` for remove pages you choose. 

3. In terminal run command `npm install` or shorter version if you like `npm i` 

4. Location path of scss files are in `./scss/styles/`
  * Please do not change the path and files structure 
  * Please check the `sample.scss` file in `./scss/styles/sample.scss` to understand the templating language

5. Let's run `gulp create-guideline` to check the sample guideline in action
  * The exported guideline location is `./build/prod/docs/`
  * Scss files are automatically compressed and minified in `./build/prod/css/`

6. Now let's try to do our own styles. Create a new scss file in `./scss/styles/` don't forget to add the new scss file path and name to `import.scss` in  `./scss/` folder.
  * Don't forget to use templating language (step 4)

7. If you are done with your new own scss file then simply run again `gulp create-guideline`

 

### Additional tasks list
coming soon
