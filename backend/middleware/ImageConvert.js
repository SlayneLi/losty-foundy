const fs = require('fs');
const path = require('path');

const imagePath = path.resolve(__dirname,"../images/")

const saveBase64toFile = async (base64String, imageType) => {
    var ext = base64String.split(';')[0].match(/jpeg|png|gif|jpg/)[0];
    var data = base64String.replace(/^data:image\/\w+;base64,/, "");
    var buf = Buffer.from(data, 'base64');
    var date = new Date();
    var name = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"_"+date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds();

    var finalPath = await path.join(imagePath, imageType, name + "." +ext);
    await fs.writeFile(finalPath, buf, function(err) {
        console.log("Error :" + err);
    });
    return await imageType+"/"+name + "." +ext;
}

const imageToBase64 = async (filepath) => {
    var finalPath = await path.join(imagePath, filepath);
    var ext = filepath.split(".")[1];
    var buffer = await fs.readFileSync(finalPath,'Base64');
    // console.log(buffer)
    return "data:image/"+ext+";base64,"+ buffer;
}

module.exports = {
    saveBase64toFile,
    imageToBase64
}