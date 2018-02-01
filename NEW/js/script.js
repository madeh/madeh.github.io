function addGBE(divName){
  var newbr = document.createElement("br");
  var newdiv = document.createElement('div');
  newdiv.className = "row";
  newdiv.innerHTML = "<div class=\"col-xs-6\">" +
    "<select id=\"GBE_TYPE\" class=\"form-control GBE_TYPE\" onchange=\"gbe_change();\">" +
    "<option>Granular Base</option>" +
    "<option>Granular (Unbound) Subbase</option>" +
    "<option>Treated (Bound) Base</option>" +
    "<option>Treated (Bound) Subbase</option>" +
    "<option>Subgrade (Untreated)</option>" +
    "<option>Portland Cement Concrete</option>" +
    "option>Engineering Fabric</option>" +
    "<option>Asphalt Concrete</option></select></div>" +
    "<div class=\"col-xs-6\">" +
    "<input class=\"form-control GBE_THICK\" type=\"number\"" +
    "id=\"GBE_THICK\" placeholder=\"0\" onchange=\"gbe_change();\"></input></div>";
  document.getElementById(divName).appendChild(newbr);
  document.getElementById(divName).appendChild(newdiv);
}

function findGBE(type_class, thick_class){
  var type_array = new Array();
  $(type_class).each(function(i) {
    console.log($(this).val());
    type_array[i] = DecodeType($(this).val(),gbe_type_parsed);
  });
  var thick_array = new Array();
  $(thick_class).each(function(i) {
    console.log($(this).val());
    thick_array[i] = $(this).val();
  });
  var gbe = 0;
  $.each(type_array,function(i){
    console.log(gbe);
    gbe = gbe + (type_array[i]*thick_array[i]);
  });
  console.log(gbe);
  return gbe;
}

function gbe_click(){
  addGBE('GBE-dynamic-block');
  var gbe_total = findGBE(".GBE_TYPE",".GBE_THICK");
  $("#gbe_result-text").text(parseFloat(gbe_total).toFixed(2));
}

function gbe_change(){
  var gbe_total = findGBE(".GBE_TYPE",".GBE_THICK");
  $("#gbe_result-text").text(parseFloat(gbe_total).toFixed(2));
}

function CSVToArray( strData, strDelimiter ){
     // Check to see if the delimiter is defined. If not,
     // then default to comma.
     strDelimiter = (strDelimiter || ",");

     // Create a regular expression to parse the CSV values.
     var objPattern = new RegExp(
         (
             // Delimiters.
             "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

             // Quoted fields.
             "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

             // Standard fields.
             "([^\"\\" + strDelimiter + "\\r\\n]*))"
         ),
         "gi"
         );


     // Create an array to hold our data. Give the array
     // a default empty first row.
     var arrData = [[]];

     // Create an array to hold our individual pattern
     // matching groups.
     var arrMatches = null;


     // Keep looping over the regular expression matches
     // until we can no longer find a match.
     while (arrMatches = objPattern.exec( strData )){

         // Get the delimiter that was found.
         var strMatchedDelimiter = arrMatches[ 1 ];

         // Check to see if the given delimiter has a length
         // (is not the start of string) and if it matches
         // field delimiter. If id does not, then we know
         // that this delimiter is a row delimiter.
         if (
             strMatchedDelimiter.length &&
             strMatchedDelimiter !== strDelimiter
             ){

             // Since we have reached a new row of data,
             // add an empty row to our data array.
             arrData.push( [] );

         }

         var strMatchedValue;

         // Now that we have our delimiter out of the way,
         // let's check to see which kind of value we
         // captured (quoted or unquoted).
         if (arrMatches[ 2 ]){

             // We found a quoted value. When we capture
             // this value, unescape any double quotes.
             strMatchedValue = arrMatches[ 2 ].replace(
                 new RegExp( "\"\"", "g" ),
                 "\""
                 );

         } else {

             // We found a non-quoted value.
             strMatchedValue = arrMatches[ 3 ];

         }


         // Now that we have our value string, let's add
         // it to the data array.
         arrData[ arrData.length - 1 ].push( strMatchedValue );
     }

     // Return the parsed data.
     return( arrData );
 }

function DecodeType(sel_val, code_array){
  var decoded_val;
  $.each(code_array,function(i,entry){
    if(entry[1] == sel_val){
      decoded_val = entry[0];
    }
  });
  return decoded_val;
}

function tree2(PCI0,AADT_ALL_VEHIC_2WAY,AGE,CONSTRUCTION_NO,FREEZE_INDEX_YR,FREEZE_THAW_YR,GBE,PAVEMENT_TYPE,MAX_ANN_TEMP_AVG,MIN_ANN_TEMP_AVG,REMED_YEARS,TOTAL_ANN_PRECIP){

    if(PCI0 <= 85.1){
        if(PCI0 <= 55.5){
            if(PCI0 <= 42.5){
                console.log("Very Poor (31.0)");
                return "Very Poor (31.0)";
            }
            if(PCI0 > 42.5){
                if(MIN_ANN_TEMP_AVG <= 8.1){
                    if(CONSTRUCTION_NO <= 4){
                        if(AADT_ALL_VEHIC_2WAY <= 1092){
                            console.log("Very Poor (3.0/1.0)");
                            return "Very Poor (3.0/1.0)";
                        }
                        if(AADT_ALL_VEHIC_2WAY > 1092){
                            console.log("Poor (26.0/1.0)");
                            return "Poor (26.0/1.0)";
                        }
                    }
                    if(CONSTRUCTION_NO > 4){
                        console.log("Very Poor (2.0)");
                        return "Very Poor (2.0)";
                    }
                }
                if(MIN_ANN_TEMP_AVG > 8.1){
                    console.log("Very Poor (11.0)");
                    return "Very Poor (11.0)";
                }
            }
        }
        if(PCI0 > 55.5){
            if(CONSTRUCTION_NO <= 3){
                if(PCI0 <= 68.8){
                    if(FREEZE_THAW_YR <= 72){
                        if(TOTAL_ANN_PRECIP <= 1800){
                            if(FREEZE_INDEX_YR <= 36){
                                console.log("Fair (11.0/1.0)");
                                return "Fair (11.0/1.0)";
                            }
                            if(FREEZE_INDEX_YR > 36){
                                console.log("Very Poor (3.0)");
                                return "Very Poor (3.0)";
                            }
                        }
                        if(TOTAL_ANN_PRECIP > 1800){
                            console.log("Very Poor (3.0/1.0)");
                            return "Very Poor (3.0/1.0)";
                        }
                    }
                    if(FREEZE_THAW_YR > 72){
                        if(PAVEMENT_TYPE <= 3){
                            if(AGE <= 26.57){
                                if(PCI0 <= 57.6){
                                    if(AGE <= 20.22){
                                        console.log("Very Poor (2.0/1.0)");
                                        return "Very Poor (2.0/1.0)";
                                    }
                                    if(AGE > 20.22){
                                        console.log("Poor (5.0)");
                                        return "Poor (5.0)";
                                    }
                                }
                                if(PCI0 > 57.6){
                                    if(FREEZE_THAW_YR <= 146){
                                        if(REMED_YEARS <= 1.9){
                                            console.log("Fair (17.0/3.0)");
                                            return "Fair (17.0/3.0)";
                                        }
                                        if(REMED_YEARS > 1.9){
                                            console.log("Poor (3.0/1.0)");
                                            return "Poor (3.0/1.0)";
                                        }
                                    }
                                    if(FREEZE_THAW_YR > 146){
                                        console.log("Poor (3.0)");
                                        return "Poor (3.0)";
                                    }
                                }
                            }
                            if(AGE > 26.57){
                                console.log("Very Poor (2.0)");
                                return "Very Poor (2.0)";
                            }
                        }
                        if(PAVEMENT_TYPE > 3){
                            console.log("Poor (5.0)");
                            return "Poor (5.0)";
                        }
                    }
                }
                if(PCI0 > 68.8){
                    if(FREEZE_INDEX_YR <= 0){
                        console.log("Poor (5.0/1.0)");
                        return "Poor (5.0/1.0)";
                    }
                    if(FREEZE_INDEX_YR > 0){
                        if(GBE <= 126.77){
                            if(PAVEMENT_TYPE <= 7){
                                if(REMED_YEARS <= 5.4){
                                    if(PAVEMENT_TYPE <= 1){
                                        console.log("Satisfactory (15.0/2.0)");
                                        return "Satisfactory (15.0/2.0)";
                                    }
                                    if(PAVEMENT_TYPE > 1){
                                        if(CONSTRUCTION_NO <= 1){
                                            if(PCI0 <= 72.3){
                                                console.log("Fair (5.0/1.0)");
                                                return "Fair (5.0/1.0)";
                                            }
                                            if(PCI0 > 72.3){
                                                console.log("Satisfactory (3.0/1.0)");
                                                return "Satisfactory (3.0/1.0)";
                                            }
                                        }
                                        if(CONSTRUCTION_NO > 1){
                                            console.log("Satisfactory (3.0)");
                                            return "Satisfactory (3.0)";
                                        }
                                    }
                                }
                                if(REMED_YEARS > 5.4){
                                    if(CONSTRUCTION_NO <= 2){
                                        console.log("Fair (7.0)");
                                        return "Fair (7.0)";
                                    }
                                    if(CONSTRUCTION_NO > 2){
                                        console.log("Satisfactory (2.0)");
                                        return "Satisfactory (2.0)";
                                    }
                                }
                            }
                            if(PAVEMENT_TYPE > 7){
                                console.log("Fair (4.0)");
                                return "Fair (4.0)";
                            }
                        }
                        if(GBE > 126.77){
                            console.log("Poor (2.0)");
                            return "Poor (2.0)";
                        }
                    }
                }
            }
            if(CONSTRUCTION_NO > 3){
                if(FREEZE_INDEX_YR <= 81){
                    console.log("Fair (54.0)");
                    return "Fair (54.0)";
                }
                if(FREEZE_INDEX_YR > 81){
                    console.log("Satisfactory (3.0)");
                    return "Satisfactory (3.0)";
                }
            }
        }
    }
    if(PCI0 > 85.1){
        if(PCI0 <= 88.2){
            console.log("Satisfactory (28.0)");
            return "Satisfactory (28.0)";
        }
        if(PCI0 > 88.2){
            if(CONSTRUCTION_NO <= 6){
                if(CONSTRUCTION_NO <= 2){
                    if(CONSTRUCTION_NO <= 1){
                        if(FREEZE_THAW_YR <= 88){
                            if(PCI0 <= 96.4){
                                if(AADT_ALL_VEHIC_2WAY <= 12572){
                                    console.log("Good (11.0/2.0)");
                                    return "Good (11.0/2.0)";
                                }
                                if(AADT_ALL_VEHIC_2WAY > 12572){
                                    console.log("Very Poor (2.0)");
                                    return "Very Poor (2.0)";
                                }
                            }
                            if(PCI0 > 96.4){
                                if(MAX_ANN_TEMP_AVG <= 20.8){
                                    console.log("Satisfactory (2.0)");
                                    return "Satisfactory (2.0)";
                                }
                                if(MAX_ANN_TEMP_AVG > 20.8){
                                    console.log("Good (43.0/5.0)");
                                    return "Good (43.0/5.0)";
                                }
                            }
                        }
                        if(FREEZE_THAW_YR > 88){
                            if(PCI0 <= 91.2){
                                console.log("Fair (4.0)");
                                return "Fair (4.0)";
                            }
                            if(PCI0 > 91.2){
                                console.log("Satisfactory (4.0/1.0)");
                                return "Satisfactory (4.0/1.0)";
                            }
                        }
                    }
                    if(CONSTRUCTION_NO > 1){
                        console.log("Good (35.0/5.0)");
                        return "Good (35.0/5.0)";
                    }
                }
                if(CONSTRUCTION_NO > 2){
                    if(AGE <= 22.5){
                        console.log("Good (9.0/1.0)");
                        return "Good (9.0/1.0)";
                    }
                    if(AGE > 22.5){
                        console.log("Satisfactory (18.0)");
                        return "Satisfactory (18.0)";
                    }
                }
            }
            if(CONSTRUCTION_NO > 6){
                if(AADT_ALL_VEHIC_2WAY <= 13172){
                    console.log("Good (5.0)");
                    return "Good (5.0)";
                }
                if(AADT_ALL_VEHIC_2WAY > 13172){
                    console.log("Fair (5.0)");
                    return "Fair (5.0)";
                }
            }
        }
    }

    return ""
}

function tree5(PCI0,AADT_ALL_VEHIC_2WAY,AGE,CONSTRUCTION_NO,FREEZE_INDEX_YR,FREEZE_THAW_YR,GBE,PAVEMENT_TYPE,MAX_ANN_TEMP_AVG,MIN_ANN_TEMP_AVG,REMED_YEARS,TOTAL_ANN_PRECIP){

    if(PCI0 <= 65.6){
        if(PAVEMENT_TYPE <= 22){
            if(PCI0 <= 40.6){
                console.log("5. Very Poor (29.0)");
                return "5. Very Poor (29.0)";
            }
            if(PCI0 > 40.6){
                if(AADT_ALL_VEHIC_2WAY <= 15229){
                    if(GBE <= 41.36){
                        console.log("4. Poor (15.0/1.0)");
                        return "4. Poor (15.0/1.0)";
                    }
                    if(GBE > 41.36){
                        console.log("5. Very Poor (4.0)");
                        return "5. Very Poor (4.0)";
                    }
                }
                if(AADT_ALL_VEHIC_2WAY > 15229){
                    console.log("5. Very Poor (19.0/1.0)");
                    return "5. Very Poor (19.0/1.0)";
                }
            }
        }
        if(PAVEMENT_TYPE > 22){
            console.log("3. Fair (3.0/1.0)");
            return "3. Fair (3.0/1.0)";
        }
    }
    if(PCI0 > 65.6){
        if(MAX_ANN_TEMP_AVG <= 29.3){
            if(PCI0 <= 96.5){
                if(AGE <= 24.62){
                    if(REMED_YEARS <= 1.1){
                        console.log("5. Very Poor (2.0/1.0)");
                        return "5. Very Poor (2.0/1.0)";
                    }
                    if(REMED_YEARS > 1.1){
                        if(AGE <= 21.53){
                            if(GBE <= 48.4){
                                if(PCI0 <= 86.5){
                                    console.log("3. Fair (18.0)");
                                    return "3. Fair (18.0)";
                                }
                                if(PCI0 > 86.5){
                                    if(AADT_ALL_VEHIC_2WAY <= 1535){
                                        console.log("3. Fair (5.0)");
                                        return "3. Fair (5.0)";
                                    }
                                    if(AADT_ALL_VEHIC_2WAY > 1535){
                                        console.log("2. Satisfactory (5.0/1.0)");
                                        return "2. Satisfactory (5.0/1.0)";
                                    }
                                }
                            }
                            if(GBE > 48.4){
                                console.log("2. Satisfactory (2.0)");
                                return "2. Satisfactory (2.0)";
                            }
                        }
                        if(AGE > 21.53){
                            if(PCI0 <= 73.3){
                                console.log("5. Very Poor (2.0)");
                                return "5. Very Poor (2.0)";
                            }
                            if(PCI0 > 73.3){
                                console.log("2. Satisfactory (8.0/1.0)");
                                return "2. Satisfactory (8.0/1.0)";
                            }
                        }
                    }
                }
                if(AGE > 24.62){
                    if(REMED_YEARS <= 8){
                        if(AGE <= 30.48){
                            console.log("3. Fair (25.0)");
                            return "3. Fair (25.0)";
                        }
                        if(AGE > 30.48){
                            console.log("5. Very Poor (3.0)");
                            return "5. Very Poor (3.0)";
                        }
                    }
                    if(REMED_YEARS > 8){
                        if(PCI0 <= 73.3){
                            console.log("3. Fair (2.0)");
                            return "3. Fair (2.0)";
                        }
                        if(PCI0 > 73.3){
                            console.log("4. Poor (5.0)");
                            return "4. Poor (5.0)";
                        }
                    }
                }
            }
            if(PCI0 > 96.5){
                if(REMED_YEARS <= 5.9){
                    if(FREEZE_INDEX_YR <= 241){
                        if(MAX_ANN_TEMP_AVG <= 28){
                            if(FREEZE_INDEX_YR <= 0){
                                if(AADT_ALL_VEHIC_2WAY <= 15229){
                                    console.log("1. Good (15.0)");
                                    return "1. Good (15.0)";
                                }
                                if(AADT_ALL_VEHIC_2WAY > 15229){
                                    console.log("2. Satisfactory (5.0/1.0)");
                                    return "2. Satisfactory (5.0/1.0)";
                                }
                            }
                            if(FREEZE_INDEX_YR > 0){
                                if(PCI0 <= 97.4){
                                    console.log("2. Satisfactory (4.0)");
                                    return "2. Satisfactory (4.0)";
                                }
                                if(PCI0 > 97.4){
                                    if(PAVEMENT_TYPE <= 1){
                                        if(AGE <= 20.12){
                                            if(AADT_ALL_VEHIC_2WAY <= 12300){
                                                console.log("1. Good (2.0)");
                                                return "1. Good (2.0)";
                                            }
                                            if(AADT_ALL_VEHIC_2WAY > 12300){
                                                console.log("3. Fair (2.0)");
                                                return "3. Fair (2.0)";
                                            }
                                        }
                                        if(AGE > 20.12){
                                            console.log("2. Satisfactory (10.0)");
                                            return "2. Satisfactory (10.0)";
                                        }
                                    }
                                    if(PAVEMENT_TYPE > 1){
                                        if(AADT_ALL_VEHIC_2WAY <= 9132){
                                            if(REMED_YEARS <= 1.4){
                                                console.log("3. Fair (17.0/1.0)");
                                                return "3. Fair (17.0/1.0)";
                                            }
                                            if(REMED_YEARS > 1.4){
                                                if(REMED_YEARS <= 3){
                                                    console.log("1. Good (2.0)");
                                                    return "1. Good (2.0)";
                                                }
                                                if(REMED_YEARS > 3){
                                                    console.log("3. Fair (4.0/2.0)");
                                                    return "3. Fair (4.0/2.0)";
                                                }
                                            }
                                        }
                                        if(AADT_ALL_VEHIC_2WAY > 9132){
                                            if(FREEZE_THAW_YR <= 65){
                                                console.log("1. Good (2.0)");
                                                return "1. Good (2.0)";
                                            }
                                            if(FREEZE_THAW_YR > 65){
                                                console.log("2. Satisfactory (2.0)");
                                                return "2. Satisfactory (2.0)";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(MAX_ANN_TEMP_AVG > 28){
                            console.log("3. Fair (16.0)");
                            return "3. Fair (16.0)";
                        }
                    }
                    if(FREEZE_INDEX_YR > 241){
                        console.log("4. Poor (5.0/1.0)");
                        return "4. Poor (5.0/1.0)";
                    }
                }
                if(REMED_YEARS > 5.9){
                    console.log("4. Poor (5.0)");
                    return "4. Poor (5.0)";
                }
            }
        }
        if(MAX_ANN_TEMP_AVG > 29.3){
            console.log("2. Satisfactory (31.0)");
            return "2. Satisfactory (31.0)";
        }
    }

    return ""
}

function tree6(PCI0,AADT_ALL_VEHIC_2WAY,AGE,CONSTRUCTION_NO,FREEZE_INDEX_YR,FREEZE_THAW_YR,GBE,PAVEMENT_TYPE,MAX_ANN_TEMP_AVG,MIN_ANN_TEMP_AVG,REMED_YEARS,TOTAL_ANN_PRECIP){

    if(PCI0 <= 73.3){
        if(MAX_ANN_TEMP_AVG <= 23.2){
            if(PCI0 <= 57.2){
                console.log("Very Poor (29.0/1.0)");
                return "Very Poor (29.0/1.0)";
            }
            if(PCI0 > 57.2){
                if(GBE <= 56.755){
                    if(REMED_TYPE <= 3){
                        console.log("Very Poor (4.0)");
                        return "Very Poor (4.0)";
                    }
                    if(REMED_TYPE > 3){
                        if(PAVEMENT_TYPE <= 14){
                            if(MAX_ANN_TEMP_AVG <= 21.7){
                                console.log("Poor (18.0)");
                                return "Poor (18.0)";
                            }
                            if(MAX_ANN_TEMP_AVG > 21.7){
                                if(FREEZE_INDEX_YR <= 62){
                                    console.log("Very Poor (2.0)");
                                    return "Very Poor (2.0)";
                                }
                                if(FREEZE_INDEX_YR > 62){
                                    console.log("Fair (2.0/1.0)");
                                    return "Fair (2.0/1.0)";
                                }
                            }
                        }
                        if(PAVEMENT_TYPE > 14){
                            console.log("Fair (2.0)");
                            return "Fair (2.0)";
                        }
                    }
                }
                if(GBE > 56.755){
                    console.log("Very Poor (9.0)");
                    return "Very Poor (9.0)";
                }
            }
        }
        if(MAX_ANN_TEMP_AVG > 23.2){
            if(REMED_YEARS <= 2.4){
                console.log("Very Poor (3.0)");
                return "Very Poor (3.0)";
            }
            if(REMED_YEARS > 2.4){
                if(PAVEMENT_TYPE <= 3){
                    if(FREEZE_INDEX_YR <= 27){
                        if(MAX_ANN_TEMP_AVG <= 25.7){
                            console.log("Fair (12.0)");
                            return "Fair (12.0)";
                        }
                        if(MAX_ANN_TEMP_AVG > 25.7){
                            console.log("Poor (12.0/2.0)");
                            return "Poor (12.0/2.0)";
                        }
                    }
                    if(FREEZE_INDEX_YR > 27){
                        console.log("Poor (2.0)");
                        return "Poor (2.0)";
                    }
                }
                if(PAVEMENT_TYPE > 3){
                    console.log("Poor (3.0)");
                    return "Poor (3.0)";
                }
            }
        }
    }
    if(PCI0 > 73.3){
        if(AADT_ALL_VEHIC_2WAY <= 1690){
            if(GBE <= 31.727){
                if(FREEZE_THAW_YR <= 97){
                    if(REMED_YEARS <= 1.8){
                        console.log("Satisfactory (12.0)");
                        return "Satisfactory (12.0)";
                    }
                    if(REMED_YEARS > 1.8){
                        if(AGE <= 26.45){
                            console.log("Fair (2.0)");
                            return "Fair (2.0)";
                        }
                        if(AGE > 26.45){
                            console.log("Satisfactory (2.0)");
                            return "Satisfactory (2.0)";
                        }
                    }
                }
                if(FREEZE_THAW_YR > 97){
                    console.log("Good (5.0/1.0)");
                    return "Good (5.0/1.0)";
                }
            }
            if(GBE > 31.727){
                console.log("Good (8.0)");
                return "Good (8.0)";
            }
        }
        if(AADT_ALL_VEHIC_2WAY > 1690){
            if(AGE <= 27.37){
                if(FREEZE_THAW_YR <= 86){
                    if(REMED_YEARS <= 0.3){
                        console.log("Fair (19.0/1.0)");
                        return "Fair (19.0/1.0)";
                    }
                    if(REMED_YEARS > 0.3){
                        if(GBE <= 24.682){
                            if(PCI0 <= 93.8){
                                console.log("Fair (8.0/1.0)");
                                return "Fair (8.0/1.0)";
                            }
                            if(PCI0 > 93.8){
                                if(AGE <= 21.01){
                                    console.log("Satisfactory (5.0/1.0)");
                                    return "Satisfactory (5.0/1.0)";
                                }
                                if(AGE > 21.01){
                                    console.log("Fair (3.0)");
                                    return "Fair (3.0)";
                                }
                            }
                        }
                        if(GBE > 24.682){
                            if(TOTAL_ANN_PRECIP <= 1492){
                                if(GBE <= 73.94){
                                    console.log("Satisfactory (28.0/1.0)");
                                    return "Satisfactory (28.0/1.0)";
                                }
                                if(GBE > 73.94){
                                    console.log("Fair (2.0)");
                                    return "Fair (2.0)";
                                }
                            }
                            if(TOTAL_ANN_PRECIP > 1492){
                                if(PAVEMENT_TYPE <= 3){
                                    console.log("Good (4.0)");
                                    return "Good (4.0)";
                                }
                                if(PAVEMENT_TYPE > 3){
                                    console.log("Satisfactory (2.0)");
                                    return "Satisfactory (2.0)";
                                }
                            }
                        }
                    }
                }
                if(FREEZE_THAW_YR > 86){
                    if(MAX_ANN_TEMP_AVG <= 20.4){
                        if(FREEZE_INDEX_YR <= 183){
                            if(AGE <= 19.4){
                                console.log("Satisfactory (2.0)");
                                return "Satisfactory (2.0)";
                            }
                            if(AGE > 19.4){
                                console.log("Poor (7.0)");
                                return "Poor (7.0)";
                            }
                        }
                        if(FREEZE_INDEX_YR > 183){
                            if(PCI0 <= 95.7){
                                if(PCI0 <= 77.3){
                                    if(PCI0 <= 75.3){
                                        console.log("Fair (2.0)");
                                        return "Fair (2.0)";
                                    }
                                    if(PCI0 > 75.3){
                                        console.log("Poor (2.0)");
                                        return "Poor (2.0)";
                                    }
                                }
                                if(PCI0 > 77.3){
                                    console.log("Very Poor (6.0/1.0)");
                                    return "Very Poor (6.0/1.0)";
                                }
                            }
                            if(PCI0 > 95.7){
                                if(PAVEMENT_TYPE <= 1){
                                    console.log("Fair (7.0/3.0)");
                                    return "Fair (7.0/3.0)";
                                }
                                if(PAVEMENT_TYPE > 1){
                                    console.log("Satisfactory (2.0)");
                                    return "Satisfactory (2.0)";
                                }
                            }
                        }
                    }
                    if(MAX_ANN_TEMP_AVG > 20.4){
                        console.log("Good (7.0)");
                        return "Good (7.0)";
                    }
                }
            }
            if(AGE > 27.37){
                if(PAVEMENT_TYPE <= 3){
                    if(FREEZE_INDEX_YR <= 461){
                        console.log("Very Poor (15.0/1.0)");
                        return "Very Poor (15.0/1.0)";
                    }
                    if(FREEZE_INDEX_YR > 461){
                        console.log("Poor (2.0)");
                        return "Poor (2.0)";
                    }
                }
                if(PAVEMENT_TYPE > 3){
                    console.log("Fair (13.0/1.0)");
                    return "Fair (13.0/1.0)";
                }
            }
        }
    }

    return ""
}

//preprocessing
var gbe_type_cfg =  "1,Granular Base\n" +
                    "0.67,Granular (Unbound) Subbase\n" +
                    "1.7,Treated (Bound) Base\n" +
                    "0.67,Treated (Bound) Subbase\n" +
                    "0.67,Subgrade (Untreated)\n" +
                    "1.33,Portland Cement Concrete\n" +
                    "1.67,Engineering Fabric\n" +
                    "2,Asphalt Concrete\n";

var gbe_type_parsed = CSVToArray(gbe_type_cfg,",");

var pav_type_cfg =  "12,JRCP - Placed Directly on Untreated Subgrade\n" +
                    "13,CRCP - Placed Directly on Untreated Subgrade\n" +
                    "14,JPCP - Placed Directly on Treated Subgrade\n" +
                    "15,JRCP - Placed Directly on Treated Subgrade\n" +
                    "16,CRCP - Placed Directly on Treated Subgrade\n" +
                    "1,AC with Granular Base\n" +
                    "2,AC with Bituminous Treated Base\n" +
                    "3,AC Overlay on AC Pavement\n" +
                    "4,JPCP Overlay on AC Pavement\n" +
                    "5,JRCP Overlay on AC Pavement\n" +
                    "6,CRCP Overlay on AC Pavement\n" +
                    "7,AC with Non-Bituminous Treated Base\n" +
                    "10,Other\n" +
                    "11,JPCP - Placed Directly on Untreated Subgrade\n" +
                    "35,JPCP Overlay on CRCP Pavement\n" +
                    "36,JRCP Overlay on CRCP Pavement\n" +
                    "37,CRCP Overlay on CRCP Pavement\n" +
                    "38,CRCP Overlay on JPCP Pavement\n" +
                    "39,CRCP Overlay on JRCP Pavement\n" +
                    "40,Prestressed Concrete Pavement\n" +
                    "51,JPCP with Asphalt Concrete Wearing Surface\n" +
                    "52,JRCP with Asphalt Concrete Wearing Surface\n" +
                    "53,CRCP with Asphalt Concrete Wearing Surface\n" +
                    "17,JPCP - Over Unbound Base\n" +
                    "18,JRCP - Over Unbound Base\n" +
                    "19,CRCP - Over Unbound Base\n" +
                    "20,JPCP Over Bituminous Treated Base\n" +
                    "21,JRCP Over Bituminous Treated Base\n" +
                    "22,CRCP Over Bituminous Treated Base\n" +
                    "23,JPCP Over Non-Bituminous Treated Base\n" +
                    "24,JRCP Over Non-Bituminous Treated Base\n" +
                    "25,CRCP Over Non-Bituminous Treated Base\n" +
                    "28,AC Overlay on JPCP Pavement\n" +
                    "29,AC Overlay on JRCP Pavement\n" +
                    "30,AC Overlay on CRCP Pavement\n" +
                    "31,JPCP Overlay on JPCP Pavement\n" +
                    "32,JRCP Overlay on JPCP Pavement\n" +
                    "33,JPCP Overlay on JRCP Pavement\n" +
                    "34,JRCP Overlay on JRCP Pavement\n";

var pav_type_parsed = CSVToArray(pav_type_cfg,",");

$(document).ready(function(){

  var slider = document.getElementById("PCI-predict-year");
  var output = document.getElementById("PCI-years");
  output.innerHTML = slider.value;

  slider.oninput = function() {
    output.innerHTML = this.value;
  }

  $("#go").click(function(){
    var result_string = "";
    console.log(slider.value+"\n");
    switch(parseInt(slider.value)) {
      case 2:
        console.log("2\n");
        result_string = tree2(
          $("#PCI0").val(),
          $("#AADT").val(),
          $("#AGE").val(),
          $("#CONSTRUCTION_NO").val(),
          $("#FREEZE_INDEX_YR").val(),
          $("#FREEZE_THAW_YR").val(),
          findGBE(".GBE_TYPE",".GBE_THICK"),
          DecodeType($("#PAVEMENT_TYPE").val(),pav_type_parsed),
          $("#MAX_ANN_TEMP_AVG").val(),
          $("#MIN_ANN_TEMP_AVG").val(),
          $("#REMED_YEARS").val(),
          $("#TOTAL_ANN_PRECIP").val()
        );
        break;
      case 5:
        console.log("5\n");
        result_string = tree2(
          $("#PCI0").val(),
          $("#AADT").val(),
          $("#AGE").val(),
          $("#CONSTRUCTION_NO").val(),
          $("#FREEZE_INDEX_YR").val(),
          $("#FREEZE_THAW_YR").val(),
          findGBE(".GBE_TYPE",".GBE_THICK"),
          DecodeType($("#PAVEMENT_TYPE").val(),pav_type_parsed),
          $("#MAX_ANN_TEMP_AVG").val(),
          $("#MIN_ANN_TEMP_AVG").val(),
          $("#REMED_YEARS").val(),
          $("#TOTAL_ANN_PRECIP").val()
        );
        break;
      case 6:
        console.log("6\n");
        result_string = tree2(
          $("#PCI0").val(),
          $("#AADT").val(),
          $("#AGE").val(),
          $("#CONSTRUCTION_NO").val(),
          $("#FREEZE_INDEX_YR").val(),
          $("#FREEZE_THAW_YR").val(),
          findGBE(".GBE_TYPE",".GBE_THICK"),
          DecodeType($("#PAVEMENT_TYPE").val(),pav_type_parsed),
          $("#MAX_ANN_TEMP_AVG").val(),
          $("#MIN_ANN_TEMP_AVG").val(),
          $("#REMED_YEARS").val(),
          $("#TOTAL_ANN_PRECIP").val()
        );
        break;
      default:
        console.log("default:2\n");
        result_string = tree2(
          $("#PCI0").val(),
          $("#AADT").val(),
          $("#AGE").val(),
          $("#CONSTRUCTION_NO").val(),
          $("#FREEZE_INDEX_YR").val(),
          $("#FREEZE_THAW_YR").val(),
          findGBE(".GBE_TYPE",".GBE_THICK"),
          DecodeType($("#PAVEMENT_TYPE").val(),pav_type_parsed),
          $("#MAX_ANN_TEMP_AVG").val(),
          $("#MIN_ANN_TEMP_AVG").val(),
          $("#REMED_YEARS").val(),
          $("#TOTAL_ANN_PRECIP").val()
        );
        break;
    }
    $("#result-text").text(result_string);
  });

  $("#PCICalc-go").click(function() {
    var newPCI = $("#PCICalc-selecter").val();
    if(newPCI === "Option 1: Calculator w/ 8 Basic Attributes"){
      $("#PCICalc-go").attr("href", "../8Basic/index.html");
    }
    else if(newPCI === "Option 2: Calculator w/ 4 Attributes Including Annual Precipitation") {
      $("#PCICalc-go").attr("href", "../4P/index.html");
    }
    else if(newPCI === "Option 3: Calculator w/ 4 Attributes Including Type of Maintenance/Rehabilitation") {
      $("#PCICalc-go").attr("href", "../4MR/index.html");
    }
    else if(newPCI === "Option 4: Calculator w/ 9 Attributes with GBE and 5 Classes") {
      $("#PCICalc-go").attr("href", "../9AGBE5C/index.html");
    }
    else if(newPCI === "Option 5: Calculator w/ 10 Attributes with GBE and Traffic and 5 Classes") {
      $("#PCICalc-go").attr("href", "../10AGBET5C/index.html");
    }
    else {
      $("#PCICalc-go").attr("href", "https://madeh.github.io/");
    }
  });

});
