const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const connection =  require('./db');

const graphiqlSchema = require('./graphql/schema/Schema');
const graphqlResolver = require('./graphql/resolver/Resolver');
const isAuth = require('./middleware/auth');

const {graphqlUploadExpress, GraphQLUpload} = require('graphql-upload');

const app = express();

app.use(bodyParser.json({
    limit: '50mb', extended: true
})); 

app.use(bodyParser.urlencoded({
    limit: '50mb', extended: true
}))

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
//     lang: "eng",
//     oem: 1,
//     psm: 3,
// }

// const char_count = (str, letter) => {
//     var letter_Count = 0;
//     for (var position = 0; position < str.length; position++) {
//         if (str.charAt(position) == letter) {
//             letter_Count += 1;
//         }
//     }
//     return letter_Count;
// }

// const tesseract = require("node-tesseract-ocr");
// tesseract.recognize('./images/takers/20-6-2020_14-24-27.png', config)
//     .then(text => {
//         console.log("Result:", text);
//         const PhotoOutput = {
//             ID: "asd",
//             Name: ""
//         };

//         //logic

//         if (text.includes("NIK")) {
//             if (text.includes(">")) {
//                 PhotoOutput.ID = text.substr(text.indexOf('>') + 1, text.indexOf('>') + 17)
//                 PhotoOutput.ID = PhotoOutput.ID.substr(1, 17)

//                 PhotoOutput.ID = PhotoOutput.ID.replace(/e/g, "2")
//                 PhotoOutput.ID = PhotoOutput.ID.replace(/c/g, "2")
//                 PhotoOutput.ID = PhotoOutput.ID.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()

//                 console.log("Hasil id:")
//                 console.log(PhotoOutput.ID)

//                 for (i = 0; i < text.length; i++) {
//                     if (text.charAt(i) == 'N' && text.charAt(i + 1) == 'a' && text.charAt(i + 2) == 'm' && text.charAt(i + 3) == 'a') {
//                         for (j = i + 3; j < text.length; j++) {
//                             if (text.charCodeAt(j) >= 65 && text.charCodeAt(j) <= 90) {
//                                 PhotoOutput.Name = text.substr(j)
//                                 break
//                             }
//                         }
//                     }
//                 }
//                 PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.indexOf('\n'))
//                 PhotoOutput.Name = PhotoOutput.Name.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
//                 console.log("Hasil name:")
//                 console.log(PhotoOutput.Name)
//             } else {
//                 PhotoOutput.ID = text.substr(text.indexOf(':') + 1, text.indexOf('>') + 17)
//                 PhotoOutput.ID = PhotoOutput.ID.substr(1, 17)

//                 PhotoOutput.ID = PhotoOutput.ID.replace(/e/g, "2")
//                 PhotoOutput.ID = PhotoOutput.ID.replace(/c/g, "2")
//                 PhotoOutput.ID = PhotoOutput.ID.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()

//                 console.log("Hasil id:")
//                 console.log(PhotoOutput.ID)

//                 for (i = 0; i < text.length; i++) {
//                     if (text.charAt(i) == 'N' && text.charAt(i + 1) == 'a' && text.charAt(i + 2) == 'm' && text.charAt(i + 3) == 'a') {
//                         for (j = i + 3; j < text.length; j++) {
//                             if (text.charCodeAt(j) >= 65 && text.charCodeAt(j) <= 90) {
//                                 PhotoOutput.Name = text.substr(j)
//                                 break
//                             }
//                         }
//                     }
//                 }
//                 PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.indexOf('\n'))
//                 PhotoOutput.Name = PhotoOutput.Name.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
//                 console.log("Hasil name:")
//                 console.log(PhotoOutput.Name)
//             }
//             // if ()
//         } else if (text.includes("/")) {
//             // NIM
//             if (char_count(text, '/') == 3) {

//                 PhotoOutput.ID = text.substr(text.indexOf("/"))

//                 PhotoOutput.ID = PhotoOutput.ID.substr(PhotoOutput.ID.indexOf("N"))

//                 PhotoOutput.ID = PhotoOutput.ID.substr(12)

//                 PhotoOutput.ID = PhotoOutput.ID.substr(0, 10)
//                 console.log("Hasil id:")
//                 console.log(PhotoOutput.ID)

//                 PhotoOutput.Name = text.substr(text.indexOf('\n'))
//                 PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.indexOf('e'))
//                 PhotoOutput.Name = PhotoOutput.Name.replace(/\n/g, "")
//                 PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.length - 2)
//                 console.log("Hasil Name:")
//                 console.log(PhotoOutput.Name)
//             } else {
//                 PhotoOutput.ID = text.substr(text.indexOf('/'))
//                 PhotoOutput.ID = PhotoOutput.ID.substr(2, 12)
//                 PhotoOutput.ID = PhotoOutput.ID.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()

//                 console.log("Hasil ID:")
//                 console.log(PhotoOutput.ID)

//                 PhotoOutput.Name = text.substr(text.indexOf('\n'))
//                 PhotoOutput.Name = PhotoOutput.Name.replace('\n', "")
//                 PhotoOutput.Name = PhotoOutput.Name.replace('\n', "")
//                 PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.indexOf('\n'))
//                 PhotoOutput.Name = PhotoOutput.Name.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
//                 console.log("Hasil Name:")
//                 console.log(PhotoOutput.Name)
//             }


//         } else {
//             // BN
//             text = text.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
//             console.log(text)
//             for (i = 0; i < text.length; i++) {
//                 if (text.charAt(i) == 'B' && text.charAt(i + 1) == 'N') {
//                     PhotoOutput.Name = text.substr(0, i)
//                     PhotoOutput.ID = text.substr(i, text.length)
//                 }
//             }
//             // PhotoOutput.Name = text.replace(/(\r\n|\n|\r|\t|\f)/gm, "")
//             // PhotoOutput.Name = text.substr(0, text.indexOf('\n'))
//             // PhotoOutput.ID = text.substr(text.indexOf('\n') + 1, text.length)
//             // PhotoOutput.ID = PhotoOutput.ID.replace(/O/g, 0)

//             console.log("Hasil id:")
//             console.log(PhotoOutput.ID)
//             console.log("Hasil name:")
//             console.log(PhotoOutput.Name)
//         }
//     })
//     .catch(error => {
//         console.log(error.message);
//     })