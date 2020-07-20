const tesseract = require("node-tesseract-ocr");
const {saveBase64toFile} = require('../../middleware/ImageConvert');
const path = require('path');

const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
}

const char_count = (str, letter) => {
    var letter_Count = 0;
    for (var position = 0; position < str.length; position++) {
        if (str.charAt(position) == letter) {
            letter_Count += 1;
        }
    }
    return letter_Count;
}

module.exports = {
    readPhoto : async (args) => {
        const basePath = path.resolve(__dirname,"../../images/");
        const filename =await saveBase64toFile(args.photo,'takers');
        const finalPath = path.join(basePath,filename);
        return tesseract.recognize(finalPath, config)
            .then(text => {
                // console.log("Result:", text);
                const PhotoOutput = {
                    ID: "",
                    Name: ""
                };
                //logic

                if (text.includes("NIK")) {
                    if (text.includes(">")) {
                        PhotoOutput.ID = text.substr(text.indexOf('>') + 1, text.indexOf('>') + 17)
                        PhotoOutput.ID = PhotoOutput.ID.substr(1, 17)
        
                        PhotoOutput.ID = PhotoOutput.ID.replace(/e/g, "2")
                        PhotoOutput.ID = PhotoOutput.ID.replace(/c/g, "2")
                        PhotoOutput.ID = PhotoOutput.ID.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
        
                        console.log("Hasil id:")
                        console.log(PhotoOutput.ID)
        
                        for (i = 0; i < text.length; i++) {
                            if (text.charAt(i) == 'N' && text.charAt(i + 1) == 'a' && text.charAt(i + 2) == 'm' && text.charAt(i + 3) == 'a') {
                                for (j = i + 3; j < text.length; j++) {
                                    if (text.charCodeAt(j) >= 65 && text.charCodeAt(j) <= 90) {
                                        PhotoOutput.Name = text.substr(j)
                                        break
                                    }
                                }
                            }
                        }
                        PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.indexOf('\n'))
                        PhotoOutput.Name = PhotoOutput.Name.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
                        console.log("Hasil name:")
                        console.log(PhotoOutput.Name)
                    } else if (text.includes("+")) {
                        PhotoOutput.ID = text.substr(text.indexOf('+') + 1, text.indexOf('+') + 17)
                        PhotoOutput.ID = PhotoOutput.ID.substr(1, 17)
        
                        PhotoOutput.ID = PhotoOutput.ID.replace(/e/g, "2")
                        PhotoOutput.ID = PhotoOutput.ID.replace(/c/g, "2")
                        PhotoOutput.ID = PhotoOutput.ID.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
        
                        console.log("Hasil id:")
                        console.log(PhotoOutput.ID)
        
                        for (i = 0; i < text.length; i++) {
                            if (text.charAt(i) == 'N' && text.charAt(i + 1) == 'a' && text.charAt(i + 2) == 'm' && text.charAt(i + 3) == 'a') {
                                for (j = i + 3; j < text.length; j++) {
                                    if (text.charCodeAt(j) >= 65 && text.charCodeAt(j) <= 90) {
                                        PhotoOutput.Name = text.substr(j)
                                        break
                                    }
                                }
                            }
                        }
                        PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.indexOf('\n'))
                        PhotoOutput.Name = PhotoOutput.Name.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
                        console.log("Hasil name:")
                        console.log(PhotoOutput.Name)
                    } else {
                        PhotoOutput.ID = text.substr(text.indexOf(':') + 1, text.indexOf('>') + 17)
                        PhotoOutput.ID = PhotoOutput.ID.substr(1, 17)
        
                        PhotoOutput.ID = PhotoOutput.ID.replace(/e/g, "2")
                        PhotoOutput.ID = PhotoOutput.ID.replace(/c/g, "2")
                        PhotoOutput.ID = PhotoOutput.ID.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
        
                        console.log("Hasil id:")
                        console.log(PhotoOutput.ID)
        
                        for (i = 0; i < text.length; i++) {
                            if (text.charAt(i) == 'N' && text.charAt(i + 1) == 'a' && text.charAt(i + 2) == 'm' && text.charAt(i + 3) == 'a') {
                                for (j = i + 3; j < text.length; j++) {
                                    if (text.charCodeAt(j) >= 65 && text.charCodeAt(j) <= 90) {
                                        PhotoOutput.Name = text.substr(j)
                                        break
                                    }
                                }
                            }
                        }
                        PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.indexOf('\n'))
                        PhotoOutput.Name = PhotoOutput.Name.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
                        console.log("Hasil name:")
                        console.log(PhotoOutput.Name)
                    }
                    // if ()
                } else if (text.includes("/")) {
                    // NIM
                    if (char_count(text, '/') == 3) {
        
                        PhotoOutput.ID = text.substr(text.indexOf("/"))
        
                        PhotoOutput.ID = PhotoOutput.ID.substr(PhotoOutput.ID.indexOf("N"))
        
                        PhotoOutput.ID = PhotoOutput.ID.substr(12)
        
                        PhotoOutput.ID = PhotoOutput.ID.substr(0, 10)
                        console.log("Hasil id:")
                        console.log(PhotoOutput.ID)
        
                        PhotoOutput.Name = text.substr(text.indexOf('\n'))
                        PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.indexOf('e'))
                        PhotoOutput.Name = PhotoOutput.Name.replace(/\n/g, "")
                        PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.length - 2)
                        console.log("Hasil Name:")
                        console.log(PhotoOutput.Name)
                    } else {
                        PhotoOutput.ID = text.substr(text.indexOf('/'))
                        PhotoOutput.ID = PhotoOutput.ID.substr(2, 12)
                        PhotoOutput.ID = PhotoOutput.ID.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
        
                        console.log("Hasil ID:")
                        console.log(PhotoOutput.ID)
        
                        PhotoOutput.Name = text.substr(text.indexOf('\n'))
                        PhotoOutput.Name = PhotoOutput.Name.replace('\n', "")
                        PhotoOutput.Name = PhotoOutput.Name.replace('\n', "")
                        PhotoOutput.Name = PhotoOutput.Name.substr(0, PhotoOutput.Name.indexOf('\n'))
                        PhotoOutput.Name = PhotoOutput.Name.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
                        console.log("Hasil Name:")
                        console.log(PhotoOutput.Name)
                    }
        
        
                } else {
                    // BN
                    text = text.replace(/(\r\n|\n|\r|\t|\f)/gm, "").trim()
                    console.log(text)
                    for (i = 0; i < text.length; i++) {
                        if (text.charAt(i) == 'B' && text.charAt(i + 1) == 'N') {
                            PhotoOutput.Name = text.substr(0, i)
                            PhotoOutput.ID = text.substr(i, text.length)
                        }
                    }
                    // PhotoOutput.Name = text.replace(/(\r\n|\n|\r|\t|\f)/gm, "")
                    // PhotoOutput.Name = text.substr(0, text.indexOf('\n'))
                    // PhotoOutput.ID = text.substr(text.indexOf('\n') + 1, text.length)
                    // PhotoOutput.ID = PhotoOutput.ID.replace(/O/g, 0)
        
                    console.log("Hasil id:")
                    console.log(PhotoOutput.ID)
                    console.log("Hasil name:")
                    console.log(PhotoOutput.Name)
                }
                return PhotoOutput;
            })
            .catch(error => {
                console.log(error.message);
            })
    }
}
