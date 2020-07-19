const fs = require('fs');

const imagePath = '../images/'

const saveBase64toFile = (base64String) => {
    var ext = base64.split(';')[0].match(/jpeg|png|gif|jpg/)[0];
    var data = base64.replace(/^data:image\/\w+;base64,/, "");
    var buf = Buffer.from(data, 'base64');
    var date = new Date();
    var name = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"_"+date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds();

    fs.writeFile(imagePath + name + ext, buf, function(err) {
        console.log("Error :" + err);
    });
}