# Bud

Bud - CSC307 Final Project

Welcome to BUD, the ultimate budgeting solution tailored for college students! Built on a robust tech stack comprising React.js, Express.js, and MongoDB Atlas, this intuitive app empowers users to effortlessly track recent transactions and account balances. With personalized user accounts that persist across logins, Bud ensures seamless monitoring of financial activities. Its user-friendly interface streamlines budget management, providing an invaluable tool for maintaining financial health while navigating the college experience.  

## Installation:
### Prerequisites:
- Node.js
- npm
- MongoDB 

### Steps:
1. Clone the repository
2. Navigate to the root directory
3. Run `npm install` to install dependencies in both budapp/client and budapp/server
3a. In budapp/server, create a .env file with the following contents:
```
MONGODB_URI=<"mongodb+srv://dbadmin:CPRootPassword@budcluster.lzrkphl.mongodb.net/mongo?retryWrites=true">
TOKEN_SECRET = "19327938817e9cc59ccc0d36de5716c17a46bf4a5550b3aa620f64ac2aa66b0d"
```

4. Run `npm start` in both budapp/client and budapp/server to start app
5. Navigate to `localhost:3000` in your browser

## Documentation:  
  
Sprint review number 1:  
https://docs.google.com/presentation/d/1pOhvlyagDvyr5cH4Ga9UeViihRFMPen0U3c08EJMDZQ/edit#slide=id.p  

Sprint review number 2:  
https://docs.google.com/presentation/d/1crz1LeMwJ-25ufks6WxZ2pATU5bvl7xVoej3Xsr_GDk/edit#slide=id.p  

Final presentation:  
https://docs.google.com/presentation/d/1ZlrUnnZ418R0V4xtH1L9Pw546HfLjs3I3KcFOyQatv0/edit?usp=sharing  

Github Project link:  
https://github.com/users/jackherberger/projects/1/views/1  

UI Prototype:  
https://www.figma.com/file/koZqmnbps47vXaa8O4EiMM/Bud---Draft?type=design&node-id=0-1&mode=design  


# Contributing

## Coding Standards

ESLint is used to enforce coding standards. To run the linter, run `npm run lint`. To automatically fix some of the errors, run `npm run lint:fix`.
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard
✔ What format do you want your config file to be in? · JavaScript

Prettier is used to enforce code formatting. Have it installed as an extension in your editor.

# Demo Video Link
https://youtu.be/GjaKc4YCfr4

## Contributing

ESLint is using the latest ECMAScript version.
Some rules we disable are: quotes, semi, comma-dangle, space-before-function-paren
