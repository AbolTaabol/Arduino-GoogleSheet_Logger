//Variables for determining spread-sheets
var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1iLS0ccUcoyxkN0HGbKOzUpfEBx4j7JRp5QJIE5bmPdg/edit#gid=0");
var sheets = ss.getSheets();
var sheet = sheets[0];

var lastRow = sheet.getLastRow();
var lastCol = sheet.getLastColumn();

//GET request
function doGet(e){
  
  var keyVals = parseValues(e);
  addRow(keyVals);
  return ContentService.createTextOutput('Success!');

}

//Parses the GET request and creates 2 arrays. One for the primary key(column names) and the other for the values. 
function parseValues(e){
  var rawKeyVals = JSON.stringify(e.parameter).split('"');
  var parsedKeys = [];
  var parsedVals = [];

  for(i=1;i<rawKeyVals.length;i=i+4){
    parsedKeys.push(rawKeyVals[i]);
  }

  for(i=3;i<rawKeyVals.length;i=i+4){
    parsedVals.push(rawKeyVals[i]);
  }

  var keyVals = [parsedKeys, parsedVals];
  return keyVals;
}

//Adds values to repective column names by comparing primary key name to column name
function addRow(keyVals){
  
  var keys = keyVals[0];
  var vals = keyVals[1];

  //get column labels (row 1 values)
  var headerVals = sheet.getRange(1,1,1,lastCol).getValues();
  //create correct length array for new row values by cloning headerVals[]
  var newRowVals = headerVals[0].slice(0);
  
  //add new values to newRowVals. add 'no data' if no data
  for(i=0;i<headerVals[0].length;i++){
    var index = keys.indexOf(headerVals[0][i]);
    if(index >= 0){
      newRowVals[i] = vals[index];
    }else{
      //newRowVals[i] = 'no data';
      newRowVals[i] = '';
    }
  }
  
  //add new (blank) row to spreadsheet after the header row, then populate row with new data
  sheet.insertRowAfter(1); //Latest data on top. 
  
  var insertRange = sheet.getRange(2,1,1,newRowVals.length);
  var insertValues = [newRowVals];
  insertRange.setValues(insertValues);

  insertRange = sheet.getRange(2,lastCol);
  insertRange.setValue(new Date()).setNumberFormat("yyyy-MM-dd hh:mm:ss");

}


