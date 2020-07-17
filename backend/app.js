const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const connection =  require('./db');

const graphiqlSchema = require('./graphql/schema/Schema');
const graphqlResolver = require('./graphql/resolver/Resolver');
const isAuth = require('./middleware/auth');

const {graphqlUploadExpress, GraphQLUpload} = require('graphql-upload');

const app = express();

app.use(bodyParser.json()); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth');
    if(req.method === 'OPTIONS')
        return res.sendStatus(200);
    next();
});

app.use(isAuth);

app.use('/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
    graphqlHttp({
    schema: graphiqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}));

try {
    connection.authenticate();
    console.log('Connection has been established successfully.');
    console.log('Hosted at : http://localhost:' + process.env.PORT);
    app.listen(process.env.PORT);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// const config = {
//   lang: "eng",
//   oem: 1,
//   psm: 3,
// }

// const tesseract = require("node-tesseract-ocr");
// tesseract.recognize('./images/test.jpg', config)
//   .then(text => {
//       console.log("Result:", text);
//       const PhotoOutput = {
//           ID: "",
//           Name: ""
//       };

//       //logic

//       if(args.type === "KTP"){

//       } else if (args.type === "NIM"){

//       } else if (args.type === "BNID"){

//       }
      
//       return PhotoOutput;
//   })
//   .catch(error => {
//       console.log(error.message);
//   })
