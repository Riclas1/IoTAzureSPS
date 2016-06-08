var APP = require('./app.js')
var nodes7 = require('nodes7');
var S = require('string');
var Q = require('q');
var conn = null; 
var doneReading = false;
var doneWriting;
var zähler = 0;
var value = false;


var variables = {TEST2: 'M308.4'};      // Bit at M32.2

//conn.dropConnection();

//conn.initiateConnection({port: 102, host: '192.168.10.2', rack: 0, slot: 1}, connected);

exports.Call = function Connection(){
if (conn == null){
conn = new nodes7;
conn.initiateConnection({port: 102, host: '192.168.10.2', rack: 0, slot: 1}, connected);
}
else{
  allreadyconnected();
}
zähler ++;
}

exports.Close = function(){
  conn.dropConnection();  
}


function connected(err) {
    if (typeof(err) !== "undefined") {
        // We have an error.  Maybe the PLC is not reachable.  
        console.log(err);
        conn == null;
        //process.exit();
    }
        conn.setTranslationCB(function(tag) {return variables[tag];});  // This sets the "translation" to allow us to work with object names
        conn.addItems(['TEST2']);
	    //conn.readAllItems(valuesReady);
       
}

function allreadyconnected(){
   conn.readAllItems(valuesReady);
}


function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); conn == null }
    console.log(values);
    if (!S(values).isEmpty()) {
       if (S(values.TEST2).contains('true')) {
        value = true;
       
        } else {
        value = false;
        
        } 
       
    }
 exports.Values =  value;  

}



//conn.dropConnection();