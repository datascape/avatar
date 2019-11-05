function SearchFormTextCheck(t, dirn) {
	if (dirn == 1 && t.value == "") {
		t.value = "";
		$(".fieldSelector").show();
		console.log('boo');
	}
	//return false;
	event.stopPropagation();
}
function SearchEnter(event1) {
	var kCode = String.fromCharCode(event1.keyCode);
	//if (kCode == "\n" || kCode == "\r") {
        $("#goSearch").click();
	//	return false;
	//}
}
function isInt(value) {
  var x;
  return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}
String.prototype.split2 = function(separator) {
    return this == "" ? [] : this.split(separator); // Avoid returning 1 when null.
}
function clickClearButton(){
  	$("#clearButton").click();
}
function displayResults() {
	console.log("displayResults");
	$("#resultsPanel").hide();
	$("#eTable_alert").hide();
	$("#nomatchPanel").hide();
	var productMatchFound = 0;
	var dataMatchCount = 0;
	// Keyword Search
	var keyword = $("#keywordsTB").val().toLowerCase();
	var products = $("#keywordsTB").val().replace(";",",");
	// For each product ID
	var productcodes = $("#productCodes").val().replace(";",",");

	//$(".eTable > table > tr").hide(); // Hide all rows
	//$(".eTable > table > tr:first-child").show(); // Show the header row

	//var products_array = products.split(/\s*,\s*/);
	var products_array = products.split2(/\s*,\s*/);
	var productcode_array = productcodes.split2(/\s*,\s*/); // Removes space when splitting on comma

	// Display DataList
	var foundMatch = 0;
	$("#resultsHeader").html("");
	$("#dataList").html("");
	for(var i = 0; i < dataSet.length; i++) {
		foundMatch = 0;
		if (keyword.length > 0 || products_array.length > 0 || productcode_array.length > 0) {

			//$("#dataList").html("");
			if (keyword.length > 0) {

				console.log("Search for " + keyword);

				if ($("#findKeywords").is(":checked") > 0 && dataSet[i][5].toString().toLowerCase().indexOf(keyword) >= 0) {
					console.log("foundMatch keywords");
					foundMatch++;
				}

				//if ($(dataSet[i][0].length > 0)) {
					if ($("#findCompany").is(":checked") > 0 && dataSet[i][0].toString().toLowerCase().indexOf(keyword) >= 0) {
						console.log("foundMatch A");
						foundMatch++;
					}
				//}
				if ($("#findAddress").is(":checked") > 0 && dataSet[i][1].toString().toLowerCase().indexOf(keyword) >= 0) {
					console.log("foundMatch B");
					foundMatch++;
				}
				if ($("#findDetails").is(":checked") > 0 && dataSet[i][2].toString().toLowerCase().indexOf(keyword) >= 0) {
					console.log("foundMatch C");
					foundMatch++;
				}
				if ($("#findProduct").is(":checked") > 0 && dataSet[i][3].toString().toLowerCase().indexOf(keyword) >= 0) {
					console.log("foundMatch D");
					foundMatch++;
				}
				if ($("#findProduct").is(":checked") > 0 && dataSet[i][4].toString().toLowerCase().indexOf(keyword) >= 0) { // Description
					console.log("foundMatch E");
					foundMatch++;
				}
			}

			for(var p = 0; p < products_array.length; p++) {
				if (products_array[p].length > 0) {
					//if (isInt(products_array[p])) { // Int
						// Column 0


						//console.log("Does " + codesArray[j] + " start with " + productcode_array[p]);
						if (dataSet[i][0].toString().toLowerCase().startsWith(products_array[p])) { // If columns values start with search values.

							productMatchFound++;
							//console.log("productMatchFound " + productMatchFound);

							console.log("foundMatch: " + dataSet[i][0] + " startsWith: " + products_array[p]);
							//foundMatch++;
							//$(this).show();
						}
					
					//} else {
					//	console.log("Not int")
					//	productMatchFound++;
					//}
				}
			}

			console.log("Check if listing's product HS codes match.");
			for(var pc = 0; pc < productcode_array.length; pc++) { 
				if (productcode_array[pc].length > 0) {
					if (isInt(productcode_array[pc])) { // Int
						//var codesArray = $(this.childNodes[3]).text().replace(";",",").split(/\s*,\s*/);
						var codesArray = dataSet[i][5].toString().replace(";",",").split2(/\s*,\s*/);
						for(var j = 0; j < codesArray.length; j++) {
							if (isInt(codesArray[j])) {
								if (codesArray[j].startsWith(productcode_array[pc])) { // If columns values start with search values.
									console.log("codesArray " + j + " " + codesArray[j] + " starts with " + productcode_array[pc]);
								
									console.log("foundMatch D");
									productMatchFound++; // Might not be needed here
									foundMatch++;
									//$(this).show();
								}
							}
						}
					} else {
						console.log("productcode not int")
						// TO DO: Match the product description instead.

							//productMatchFound++;

					}
				}
			}

		} else {
			// Automatically find match since there are no filters
			//console.log("foundMatch E");
			foundMatch++;
		}

      	if (i > 0) { // BUGBUG Skip the header row
      		//if (entry[0] > (startRange*100) && entry[0] < (endRange*100+99)) {

      		if (foundMatch > 0) { // keyword match.  Not product match.
      			dataMatchCount++;
      			//console.log("foundMatch: " + i + " column 0: " + dataSet[i][0]);
		    	//console.log(entry[0]);
		    	//displayRow(dataSet[i]); // Works, but copy the following there. More bold lables:

		    	if (dataSet[i][0].length > 0) {
			    	//console.log("display the row: " + dataSet[i][0]);
			    	var dataRow = ("<div style='position:relative'><div class='localonlyX' style='float:left;min-width:28px;margin-top:2px'><input name='contact' type='checkbox' value='" + dataSet[i][0] + "'></div><div style='overflow:auto'><div><div class='localonly showItemMenu' style='float:right'>&mldr;</div> " + dataSet[i][0] + "</div>");
			    	if (dataSet[i][1].length > 0) {
			    		if (!dataSet[i][1].toLowerCase().startsWith('http')) {
			    			dataSet[i][1] = "http://" + dataSet[i][1]; // Since not all are https
			    		}

		    			dataRow += "<a href='" + dataSet[i][1] + "' target='_blank'>" + dataSet[i][1].replace("https://","").replace("http://","").replace("wwww.","").replace(/^\/|\/$/g, '') + "</a>";
		    		}

			    		dataRow += ("<div><b class='exporter'>Export Categories: </b><span class='exporter'> ");
			    		 
			    		if (dataSet[i][2]) {
			    			dataRow += (dataSet[i][2]);
			    		}
			    		if (dataSet[i][2] && dataSet[i][3]) {
			    			dataRow += ("; ");
			    		}
			    		if (dataSet[i][3]) {
			    			dataRow += (dataSet[i][3] + " ");
			    		}    
			    		// registered: u00ae and u2122
			    		// copyright: u00a9 and u0174
			    		// Need to replace before converted to "?" symbol to tell if it was a tm or reg symbol.
			    		dataRow += ("</span></div><div><b>Description: </b>" + dataSet[i][4].replace("�","") + "</div>");

			    	// <div><b>Hidden: </b>" + dataSet[i][5] + "</div>");
			    	if (dataSet[i][5].length > 0) {
			    		dataRow += ("<div>");
			    		if (1==1) {
							dataRow += ("<b>Product HS Code: </b>");
				    		dataRow += (dataSet[i][5].replace(".",""));
			    		} else if (dataSet[i][5].includes(",")) { 
				    		dataRow += ("<b>Product HS Codes: </b>"); // HS Codes
				    			var hs_array = dataSet[i][5].split2(/\s*,\s*/); // Removes space when splitting on comma
				    			// To do: Add comma split here for multiple HS codes
				    			for(var m = 0; m < hs_array.length; m++) {
				    				dataRow += ("<a href='#hs=" + hs_array[m].substr(0,4) + "'>" + hs_array[m] + "</a>");
				    				if (m < hs_array.length -1) {
				    					dataRow += ", ";
				    				}
				    			}
				    	} else {
				    		dataRow += ("<b>Product HS Code: </b>");
				    		dataRow += ("<a href='#hs=" + dataSet[i][5].substr(0,4) + "'>" + dataSet[i][5].replace(".","") + "</a>");
				    	}
			    		dataRow += ("</div>");
			    	}
			    	
			    	dataRow += ("</div></div>");

			    	$("#dataList").append(dataRow);
			    		//<div>" + dataSet[i][6] + "</div><div>" + dataSet[i][7] + "</div>
			    }
			}
      	}
    }
	$('.showItemMenu').click(function () {
		//alert("click")
		$("#itemMenu").show();

		$("#itemMenu").appendTo($(this).parent().parent());

		event.stopPropagation();
		//$("#map").show();
		// $(this).css('border', 'solid 1px #aaa');
	});
	$('#showLocalNews').click(function () {
		mainframe.location='https://georgiadata.github.io/explorer/news/'
		// mainframe.location='map/leaflet/#columns=' + columns;
		$("#mainframe").show();
	});

	

    if (dataMatchCount > 0) {
    	//alert("show") // was twice BUGBUG
    	$("#dataList").prepend(dataMatchCount + " results displayed from " + (dataSet.length - 1) + " records.<br><br>");
  		$("#resultsPanel").show();
  		$("#dataList").show();
  	} else {
  		// href='javascript:;' onclick='return false;'
  		
		var noMatch = "<div>No match found in " + (dataSet.length - 1) + " records. <a href='#' onclick='clickClearButton();return false;'>Clear filters</a>.</div>"
		$("#nomatchText").html(noMatch);
		$("#nomatchPanel").show();
	}

	console.log("productMatchFound: " + productMatchFound);

	// products_array.length > 0
	if (productMatchFound > 0) {
		if ($("#keywordsTB").val().length > 0 && $("#productCodes").val().length > 0) {
			var resultsHeader = "";
			if ($("#keywordsTB").val().length > 0) {
				resultsHeader += $("#keywordsTB").val() + " OR ";
			}
			resultsHeader += "product code contains " + $("#productCodes").val() + ".";
			$("#resultsHeader").text(resultsHeader);
		}
		//$("#productSubcats > div:first-child").show(); // Show the header row
		$('#productSubcats > div').each(function(index) {
			for(var i = 0; i < productcode_array.length; i++) {
				if (productcode_array[i].length > 0) {
					if ($(this.childNodes[1]).length > 0) {
						if ($(this.childNodes[1]).text().toLowerCase().indexOf(productcode_array[i].toLowerCase()) >= 0) {
							//matchFound++;
							$(this).show();
						}
					}
				}
			}
		});
	} else {
		//$(".eTable > table > tr").hide();
		//$("#resultsPanel").hide();
		//$("#eTable_alert").text("No matching records."); 
		//$("#eTable_alert").show();
	}
	//console.log("displayResults done.");
	//SearchProductCodes(event);
}
function displayRow(rowArray) {
	// NOT USED?
	// <input name='contact' type='checkbox' value='" + rowArray[0] + "'> 
	$("#dataList").append( "<div><div><div style='float:right'>Add</div>" + rowArray[0] + "</div><div><b class='exporter'>Export Categories: </b><span class='exporter'> " + rowArray[2] + "</span></div><div>" + rowArray[3] + "</div><div>" + rowArray[4] + "</div><div><b>Product HS Codes: </b>" + rowArray[5] + "</div></div>");
	//<div>" + rowArray[6] + "</div><div>" + rowArray[7] + "</div>
}
var dataSet = [];
function loadHtmlTable(applyFilter) {
	//d3.text("exporters/export.csv", function(data) {
	d3.text("exporters/export.csv").then(function(data) {
      //dataSet = d3.csv.parseRows(data);
      dataSet = d3.csvParseRows(data);
      var listHeader = [];
      console.log("loadHtmlTable - dataSet row count: " + dataSet.length);
      
      for(var i = 0; i < dataSet.length; i++) {
      	/*
      	if (i == 0) { // Header row
      		// Possible https://www.papaparse.com/demo - Keys data by field name rather than an array.
      		for(var j = 0; j < dataSet.length; j++) {
				console.log(dataSet[i][j]) // Header values
				listHeader.push(dataSet[i][j])
			}
      	}
      	*/
      	       	
      }
      //displayResults();
      displayGrid(applyFilter);
    }); 	
}
function displayListX() {
	console.log("displayList");
	var matchCount = 0;

	$("#dataList").html("");
	for(var i = 0; i < dataSet.length; i++) {
      	if (i > 2) {
      		//if (entry[0] > (startRange*100) && entry[0] < (endRange*100+99)) {
		    	matchCount++;
		    	// <input name='contact' type='checkbox' value='" + dataSet[i][0] + "'> 
		    	$("#dataList").append( "<div><div style='float:right'>Add<div></div>" + dataSet[i][0] + "</div><div><b class='exporter'>Export Categories: </b><span class='exporter'> " + dataSet[i][2] + "</span></div><div><b>Description: </b>" + dataSet[i][3] + "</div>");
		    	$("#dataList").append( "<div><b>Product HS Codes: </b>" + dataSet[i][5] + "</div></div>");
		    		//<div>" + dataSet[i][6] + "</div><div>" + dataSet[i][7] + "</div>
			//}
      	}
      	if (matchCount > 0) {
      		$("#resultsPanel").show();
      	}
     }
     if (matchCount > 0) {
  		$("#resultsPanel").show();
  	}
}
function displayGrid(applyFilter) {
	var container = d3.select("#d3div")
      .html('').append("table") // Empty the div to clear previous before appending

      .selectAll("tr")
          .data(dataSet).enter()
          .append("tr")

      .selectAll("td")
          .data(function(d) { return d; }).enter()
          .append("td")
          .text(function(d) { return d; });

    if (applyFilter) {
  		// initial load for URL hash params
		displayResults();
	}
}
function SearchProductCodes(event1) {
	console.log("SearchProductCodes")
	var kCode = String.fromCharCode(event1.keyCode);
	//alert($("#productCodes").val())
	
	//if ($("#productCodes").val().length==0) {
		loadHtmlTable(true);
	//} else {
		//if (kCode == "\n" || kCode == "\r") {
			//alert("SearchProductCodes")
	        
			//return false;
		//}
	//}
	event.stopPropagation();
}