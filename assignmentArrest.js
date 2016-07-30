var readLine = require('readline')
fs= require('fs'),
headerArray=[]
headerRow=0,
objectArray=[],
readStream = fs.createReadStream('../JavascriptAssignment/inputData/crimes2001onwards.csv');
writeStream = fs.createWriteStream('../JavascriptAssignment/outputData/ChicagoCrimeStackByYearArrest.json');
writeStream.write('[');
/*Populate an array with elements to be written to json*/
for(var i=2001; i<=2016; i++) {
 objectArray[i]=
 {
   year:i,
   Arrested:0,
   NotArrested:0
 };
}
var lineStream = readLine.createInterface({
 input: readStream
});

var readLine = lineStream.on('line', function (line) {
 var data = line.toString();
 /*Split the line with the (,) character to obtain an array of elements*/
 var splittedDataArray = data.split(',');
 /*Get the year and description from the splitted array*/
 var year = splittedDataArray.splice(17,1);
 var description = splittedDataArray.splice(8,1);
 /*Loop through each year*/
 for(var i=2001; i<=2016; i++)
 {
   /*Check if the year in current line matches with the current loop  year in  objectArray. Else discard*/
   if(year==objectArray[i].year)
   {
     /*For matching year check description and update the description count by 1*/
     if (description=="true")
     {
       objectArray[i].Arrested=objectArray[i].Arrested+1;
     }
     else if (description =="$false") {
       objectArray[i].NotArrested=objectArray[i].NotArrested+1;
     }
   }
 }
});
/*Callback registered to execute when readStream ends*/
readStream.on('end', function() {
 /*Write to JSON file*/
 for(var i=2001; i<2016; i++){
   writeStream.write(JSON.stringify(objectArray[i])+",");
}
 writeStream.write(JSON.stringify(objectArray[i]));
 writeStream.write(']');
});
/*Callback to handle read error*/
readStream.on('error', function(err) {
 console.log('Error occured while reading.....');
});
/*Callback to handle write error*/
writeStream.on('error', function(err) {
 console.log('Error occured while writing.....');
});
