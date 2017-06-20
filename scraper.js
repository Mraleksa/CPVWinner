var client = require('http-api-client');
const fs = require('fs');
var sqlite3 = require("sqlite3").verbose();

// Open a database handle
var db = new sqlite3.Database("data.sqlite");

var currentCount =  "2017-00-00T00:00:00.744980+03:00"
var p=0; var p2=0;
 
function piv(){  
p++;
client.request({url: 'https://public.api.openprocurement.org/api/2.3/contracts?offset='+currentCount})
		.then(function (data) {
			var dataset = data.getJSON().data;			
			currentCount = data.getJSON().next_page.offset;			
			console.log(currentCount)			
			return dataset;
		})	
		.then(function (dataset) {			
			dataset.forEach(function(item) {
				client.request({url: 'https://public.api.openprocurement.org/api/2.3/contracts/'+item.id})
					.then(function (data) {
					
var description = data.getJSON().data.items[0].description.toLowerCase();					
db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS data (dateModified TEXT,description TEXT,cpv TEXT,winner TEXT,winnerEdr TEXT,value INT,contactPoint TEXT,contractID TEXT)");
var statement = db.prepare("INSERT INTO data VALUES (?,?,?,?,?,?,?,?)");
statement.run(item.dateModified,description,data.getJSON().data.items[0].classification.id,
data.getJSON().data.suppliers[0].name,data.getJSON().data.suppliers[0].identifier.id,data.getJSON().data.value.amount,data.getJSON().data.suppliers[0].contactPoint.email,data.getJSON().data.contractID);
statement.finalize();
});
			
					})
					.catch(function  (error) {
						console.log("error_detale")
						
					});  
				});
		
		})
		.then(function () {	
		if (p<1){piv ();}		
		else {
			console.log("stop")
				p=0;
				p2++;
				console.log(p2)
			setTimeout(function() {
			
				if (p2 < 1) {
					piv ();
				}
				else {console.log("STOP")}
				}, 5000);
		}		
							
		})
		.catch( function (error) {
		console.log("error")
		piv ();
		});   
		
}

piv ();	
