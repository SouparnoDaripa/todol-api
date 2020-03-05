const fs = require('fs');
const noOfCPU = require('os').cpus().length;
let readFileSync = (fileName, encoder) => {
    if(fileName){
        let fileData = fs.readFileSync(fileName, encoder);
        console.log(fileData);
    } else{
        console.log("File doesnot exist");
    }
} 

let readFileAsync = (fileName, encoder) => {
    if(fileName){
        let fileData = fs.readFile(fileName, encoder, (err, fileData) => {
            if(err){
                console.log("Error while reading the file: " + err);
            } else{
                console.log("Successfully read the file");
                console.log(fileData);
            }
        });
    }
}

let readDirSync = (dirName) => {
    if(dirName){
        let fileList = fs.readdirSync(dirName);
        console.log(fileList);
    } else{
        console.log("Directory doesnot exist");
    }
}

let readDirAsync = (dirName) => {
    if(dirName){
        let fileList = fs.readdir(dirName, (err, fileList) => {
            if(err){
                console.log("Error while reading the Directory: " + err);
            } else{
                console.log("Successfully read directory!!");
                console.log(fileList);
            }
        });
    }
}

let printCPU = () => {
    console.log(noOfCPU);
    return noOfCPU;
}

module.exports = {
    readFileSync : readFileSync,
    readFileAsync : readFileAsync,
    readDirSync : readDirSync,
    readDirAsync : readDirAsync,
    printCPU : printCPU
}