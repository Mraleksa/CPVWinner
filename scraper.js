var client = require('http-api-client');
const fs = require('fs');
var sqlite3 = require("sqlite3").verbose();

// Open a database handle
var db = new sqlite3.Database("data.sqlite");

var currentCount =  "2017-05-05T09:59:03.623987+03:00"
var p=0; var p2=0;
 
function piv(){  
p++;
client.request({url: 'https://public.api.openprocurement.org/api/2.3/tenders?offset='+currentCount})
		.then(function (data) {
			var dataset = data.getJSON().data;			
			currentCount = data.getJSON().next_page.offset;			
			console.log(currentCount)			
			return dataset;
		})	

		.then(function (dataset) {			
			dataset.forEach(function(item) {
				client.request({url: 'https://public.api.openprocurement.org/api/2.3/tenders/'+item.id})
					.then(function (data) {
					
					
db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS data (dateModified TEXT,procurementMethod TEXT)");
var statement = db.prepare("INSERT INTO data VALUES (?,?)");

statement.run(item.dateModified,data.getJSON().data.procurementMethod);

statement.finalize();
});
			
					})
					.catch(function  (error) {
						console.log("error_detale")
						
					});  
				});
		
		})
		
		.then(function () {	
		if (p<3){piv ();}		
		else {
			console.log("stop")
				p=0;
				p2++;
				console.log(p2)
			setTimeout(function() {
			
				if (p2 < 2) {
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
