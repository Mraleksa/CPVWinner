var client = require('http-api-client');
const fs = require('fs');
var sqlite3 = require("sqlite3").verbose();

// Open a database handle
var db = new sqlite3.Database("data.sqlite");

var currentCount =  "2017-05-05T09:59:03.623987+03:00"
var p=0; var p2=0;
 
function piv(){  
p++;
/*client.request({url: 'https://public.api.openprocurement.org/api/2.3/tenders?offset='+currentCount})
		.then(function (data) {
			var dataset = data.getJSON().data;			
			currentCount = data.getJSON().next_page.offset;			
			console.log(currentCount)			
			return dataset;
		})	

		.then(function (dataset) {			
			dataset.forEach(function(item) {
			*/	
			//client.request({url: 'https://public.api.openprocurement.org/api/2.3/tenders/'+item.id})
			client.request({url: 'https://public.api.openprocurement.org/api/2.3/tenders/f5fc672c3d034d1bbee42e8bfca41e4b'})
					.then(function (data) {
					
	
//1. Закупівлі з дискваліфікаціями всіх учасників, крім останнього
var awards = data.getJSON().data.awards;
var awardsLength = data.getJSON().data.awards.length;
console.log(awards)
console.log(awardsLength)

var disqualification;
	for (var p = 0; p < awardsLength; p++) {
			//t = t + item.values[p].value.count;
		if(awards[p].status=="unsuccessful"&&awards[awardsLength-1].status=="active"){
			disqualification = "yes";
		}
		else {
			disqualification = "no";
		}
	}
//Закупівлі з дискваліфікаціями всіх учасників, крім останнього	
				
			
			
db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS data (dateModified TEXT,procurementMethod TEXT,numberOfBids INT)");
var statement = db.prepare("INSERT INTO data VALUES (?,?,?)");

statement.run(item.dateModified,data.getJSON().data.procurementMethod,data.getJSON().data.numberOfBids);

statement.finalize();
});
	
			
					})
					/*
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
		*/
}

piv ();	
