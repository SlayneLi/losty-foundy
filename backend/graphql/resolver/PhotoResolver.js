const fs = require('fs');
const tesseract = require("node-tesseract-ocr");
const {GraphQLUpload} = require('graphql-upload');

const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
}

module.exports = {
    Upload: GraphQLUpload,
    storeFS : ({ stream, filename }) => {
        const uploadDir = '../../images';
        const path = `${uploadDir}/${filename}`;
        return new Promise((resolve, reject) =>
            stream
                .on('error', error => {
                    if (stream.truncated)
                        fs.unlinkSync(path);
                    reject(error);
                })
                .pipe(fs.createWriteStream(path))
                .on('error', error => reject(error))
                .on('finish', () => resolve({ path }))
    )},
    readPhoto : async (args) => {
        const { filename, mimetype, createReadStream } = await args.file;
        const stream = createReadStream();
        const pathObj = await storeFS({ stream, filename });
        const fileLocation = pathObj.path;

        return tesseract.recognize(fileLocation + filename, config)
            .then(text => {
                console.log("Result:", text);
                const PhotoOutput = {
                    ID: "",
                    Name: ""
                };

                //logic

                if(args.type === "KTP"){

                } else if (args.type === "NIM"){

                } else if (args.type === "BNID"){

                }
                
                return PhotoOutput;
            })
            .catch(error => {
                console.log(error.message);
            })
    }
}
