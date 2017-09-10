$(document).ready(function(){
  var PCI0;
  var AGE;
  var FREEZE_INDEX_YR;
  var FUNC_CLASS;
  var MAX_ANN_TEMP_AVG;
  var MIN_ANN_TEMP_AVG;
  var PAVEMENT_TYPE;
  var TOTAL_ANN_PRECIP;
  var result = $("#result-text");
  var result_string = "";

  //preprocessing
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

  var func_class_cfg =  "1,Rural Principal Arterial - Interstate\n" +
                        "2,Rural Principal Arterial - Other\n" +
                        "6,Rural Minor Arterial\n" +
                        "7,Rural Major Collector\n" +
                        "8,Rural Minor Collector\n" +
                        "9,Rural Local Collector\n" +
                        "11,Urban Principal Arterial - Interstate\n" +
                        "12,Urban Principal Arterial - Other Freeways or Expressways\n" +
                        "14,Urban Other Principal Arterial\n" +
                        "16,Urban Minor Arterial\n" +
                        "17,Urban Collector\n" +
                        "19,Urban Local\n";

  var func_class_parsed = CSVToArray(func_class_cfg,",");

  $("#go").click(function(){
    result_string = Foo($("#PCI0").val(),$("#AGE").val(),
      $("#FREEZE_INDEX_YR").val(),DecodeType($("#FUNC_CLASS").val(),func_class_parsed),
      $("#MAX_ANN_TEMP_AVG").val(),$("#MIN_ANN_TEMP_AVG").val(),
      DecodeType($("#PAVEMENT_TYPE").val(),pav_type_parsed),$("#TOTAL_ANN_PRECIP").val());
    result.text(result_string);
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
    else {
      $("#PCICalc-go").attr("href", "https://michaelweiyuzhao.github.io/PCICalcHub");
    }
  });

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

  function Foo(PCI0,AGE,FREEZE_INDEX_YR,FUNC_CLASS,MAX_ANN_TEMP_AVG,MIN_ANN_TEMP_AVG,PAVEMENT_TYPE,TOTAL_ANN_PRECIP){

    if(PCI0 <= 85.1){
        if(PCI0 <= 57.6){
            if(PCI0 <= 46.4){
                if(PCI0 <= 34.3){
                    if(MIN_ANN_TEMP_AVG <= 14.6){
                        if(PCI0 <= 21.2){
                            if(PAVEMENT_TYPE <= 3){
                                console.log("Failed (100%)");
                                return "Failed (100%)";
                            }
                            if(PAVEMENT_TYPE > 3){
                                if(PCI0 <= 17.6){
                                    console.log("Serious (100%)");
                                    return "Serious (100%)";
                                }
                                if(PCI0 > 17.6){
                                    console.log("Very Poor (75%)");
                                    return "Very Poor (75%)";
                                }
                            }
                        }
                        if(PCI0 > 21.2){
                            if(TOTAL_ANN_PRECIP <= 1180){
                                if(TOTAL_ANN_PRECIP <= 340){
                                    console.log("Very Poor (75%)");
                                    return "Very Poor (75%)";
                                }
                                if(TOTAL_ANN_PRECIP > 340){
                                    console.log("Serious (96%)");
                                    return "Serious (96%)";
                                }
                            }
                            if(TOTAL_ANN_PRECIP > 1180){
                                console.log("Very Poor (71%)");
                                return "Very Poor (71%)";
                            }
                        }
                    }
                    if(MIN_ANN_TEMP_AVG > 14.6){
                        console.log("Very Poor (100%)");
                        return "Very Poor (100%)";
                    }
                }
                if(PCI0 > 34.3){
                    if(PAVEMENT_TYPE <= 2){
                        console.log("Very Poor (92%)");
                        return "Very Poor (92%)";
                    }
                    if(PAVEMENT_TYPE > 2){
                        if(MAX_ANN_TEMP_AVG <= 14.5){
                            console.log("Serious (100%)");
                            return "Serious (100%)";
                        }
                        if(MAX_ANN_TEMP_AVG > 14.5){
                            if(MIN_ANN_TEMP_AVG <= 1.3){
                                console.log("Poor (83%)");
                                return "Poor (83%)";
                            }
                            if(MIN_ANN_TEMP_AVG > 1.3){
                                if(PCI0 <= 44.2){
                                    console.log("Very Poor (90%)");
                                    return "Very Poor (90%)";
                                }
                                if(PCI0 > 44.2){
                                    console.log("Serious (75%)");
                                    return "Serious (75%)";
                                }
                            }
                        }
                    }
                }
            }
            if(PCI0 > 46.4){
                if(PAVEMENT_TYPE <= 7){
                    if(MAX_ANN_TEMP_AVG <= 10.5){
                        console.log("Very Poor (100%)");
                        return "Very Poor (100%)";
                    }
                    if(MAX_ANN_TEMP_AVG > 10.5){
                        if(MIN_ANN_TEMP_AVG <= -0.4){
                            console.log("Poor (100%)");
                            return "Poor (100%)";
                        }
                        if(MIN_ANN_TEMP_AVG > -0.4){
                            if(PCI0 <= 51.5){
                                if(TOTAL_ANN_PRECIP <= 957.7){
                                    if(PAVEMENT_TYPE <= 1){
                                        console.log("Poor (83%)");
                                        return "Poor (83%)";
                                    }
                                    if(PAVEMENT_TYPE > 1){
                                        console.log("Very Poor (75%)");
                                        return "Very Poor (75%)";
                                    }
                                }
                                if(TOTAL_ANN_PRECIP > 957.7){
                                    console.log("Very Poor (100%)");
                                    return "Very Poor (100%)";
                                }
                            }
                            if(PCI0 > 51.5){
                                if(FREEZE_INDEX_YR <= 766){
                                    console.log("Poor (80%)");
                                    return "Poor (80%)";
                                }
                                if(FREEZE_INDEX_YR > 766){
                                    console.log("Very Poor (75%)");
                                    return "Very Poor (75%)";
                                }
                            }
                        }
                    }
                }
                if(PAVEMENT_TYPE > 7){
                    if(AGE <= 35.45){
                        console.log("Serious (100%)");
                        return "Serious (100%)";
                    }
                    if(AGE > 35.45){
                        console.log("Failed (75%)");
                        return "Failed (75%)";
                    }
                }
            }
        }
        if(PCI0 > 57.6){
            if(AGE <= 40.03){
                if(PCI0 <= 70.6){
                    if(MIN_ANN_TEMP_AVG <= 9.9){
                        if(TOTAL_ANN_PRECIP <= 444.6){
                            if(FREEZE_INDEX_YR <= 0){
                                console.log("Very Poor (100%)");
                                return "Very Poor (100%)";
                            }
                            if(FREEZE_INDEX_YR > 0){
                                if(FUNC_CLASS <= 2){
                                    if(AGE <= 7.49){
                                        console.log("Poor (100%)");
                                        return "Poor (100%)";
                                    }
                                    if(AGE > 7.49){
                                        if(MIN_ANN_TEMP_AVG <= 3){
                                            console.log("Fair (87%)");
                                            return "Fair (87%)";
                                        }
                                        if(MIN_ANN_TEMP_AVG > 3){
                                            if(MIN_ANN_TEMP_AVG <= 8){
                                                console.log("Poor (100%)");
                                                return "Poor (100%)";
                                            }
                                            if(MIN_ANN_TEMP_AVG > 8){
                                                console.log("Fair (83%)");
                                                return "Fair (83%)";
                                            }
                                        }
                                    }
                                }
                                if(FUNC_CLASS > 2){
                                    console.log("Fair (82%)");
                                    return "Fair (82%)";
                                }
                            }
                        }
                        if(TOTAL_ANN_PRECIP > 444.6){
                            if(FREEZE_INDEX_YR <= 1012){
                                if(PCI0 <= 59.7){
                                    console.log("Serious (62%)");
                                    return "Serious (62%)";
                                }
                                if(PCI0 > 59.7){
                                    if(MAX_ANN_TEMP_AVG <= 11.7){
                                        console.log("Very Poor (75%)");
                                        return "Very Poor (75%)";
                                    }
                                    if(MAX_ANN_TEMP_AVG > 11.7){
                                        if(PCI0 <= 64.7){
                                            if(PAVEMENT_TYPE <= 23){
                                                if(AGE <= 23.24){
                                                    console.log("Poor (87%)");
                                                    return "Poor (87%)";
                                                }
                                                if(AGE > 23.24){
                                                    if(MAX_ANN_TEMP_AVG <= 15.9){
                                                        console.log("Poor (100%)");
                                                        return "Poor (100%)";
                                                    }
                                                    if(MAX_ANN_TEMP_AVG > 15.9){
                                                        console.log("Very Poor (100%)");
                                                        return "Very Poor (100%)";
                                                    }
                                                }
                                            }
                                            if(PAVEMENT_TYPE > 23){
                                                console.log("Serious (62%)");
                                                return "Serious (62%)";
                                            }
                                        }
                                        if(PCI0 > 64.7){
                                            if(PCI0 <= 68.5){
                                                if(MIN_ANN_TEMP_AVG <= 8.9){
                                                    console.log("Fair (88%)");
                                                    return "Fair (88%)";
                                                }
                                                if(MIN_ANN_TEMP_AVG > 8.9){
                                                    console.log("Poor (75%)");
                                                    return "Poor (75%)";
                                                }
                                            }
                                            if(PCI0 > 68.5){
                                                console.log("Poor (83%)");
                                                return "Poor (83%)";
                                            }
                                        }
                                    }
                                }
                            }
                            if(FREEZE_INDEX_YR > 1012){
                                console.log("Poor (89%)");
                                return "Poor (89%)";
                            }
                        }
                    }
                    if(MIN_ANN_TEMP_AVG > 9.9){
                        if(TOTAL_ANN_PRECIP <= 338){
                            console.log("Poor (100%)");
                            return "Poor (100%)";
                        }
                        if(TOTAL_ANN_PRECIP > 338){
                            if(TOTAL_ANN_PRECIP <= 1644){
                                console.log("Fair (84%)");
                                return "Fair (84%)";
                            }
                            if(TOTAL_ANN_PRECIP > 1644){
                                console.log("Poor (100%)");
                                return "Poor (100%)";
                            }
                        }
                    }
                }
                if(PCI0 > 70.6){
                    if(MAX_ANN_TEMP_AVG <= 28.3){
                        if(FUNC_CLASS <= 6){
                            if(TOTAL_ANN_PRECIP <= 239.6){
                                if(FREEZE_INDEX_YR <= 36){
                                    console.log("Poor (100%)");
                                    return "Poor (100%)";
                                }
                                if(FREEZE_INDEX_YR > 36){
                                    console.log("Fair (100%)");
                                    return "Fair (100%)";
                                }
                            }
                            if(TOTAL_ANN_PRECIP > 239.6){
                                if(MIN_ANN_TEMP_AVG <= -3.1){
                                    console.log("Poor (75%)");
                                    return "Poor (75%)";
                                }
                                if(MIN_ANN_TEMP_AVG > -3.1){
                                    if(AGE <= 13.56){
                                        if(TOTAL_ANN_PRECIP <= 1364.3){
                                            console.log("Fair (71%)");
                                            return "Fair (71%)";
                                        }
                                        if(TOTAL_ANN_PRECIP > 1364.3){
                                            console.log("Satisfactory (86%)");
                                            return "Satisfactory (86%)";
                                        }
                                    }
                                    if(AGE > 13.56){
                                        if(MAX_ANN_TEMP_AVG <= 13.3){
                                            console.log("Fair (71%)");
                                            return "Fair (71%)";
                                        }
                                        if(MAX_ANN_TEMP_AVG > 13.3){
                                            if(PAVEMENT_TYPE <= 17){
                                                if(FUNC_CLASS <= 2){
                                                    if(PCI0 <= 76){
                                                        if(AGE <= 25.29){
                                                            if(AGE <= 23.06){
                                                                if(MAX_ANN_TEMP_AVG <= 19.2){
                                                                    console.log("Fair (75%)");
                                                                    return "Fair (75%)";
                                                                }
                                                                if(MAX_ANN_TEMP_AVG > 19.2){
                                                                    console.log("Satisfactory (100%)");
                                                                    return "Satisfactory (100%)";
                                                                }
                                                            }
                                                            if(AGE > 23.06){
                                                                console.log("Fair (100%)");
                                                                return "Fair (100%)";
                                                            }
                                                        }
                                                        if(AGE > 25.29){
                                                            console.log("Satisfactory (100%)");
                                                            return "Satisfactory (100%)";
                                                        }
                                                    }
                                                    if(PCI0 > 76){
                                                        if(FREEZE_INDEX_YR <= 86){
                                                            console.log("Fair (87%)");
                                                            return "Fair (87%)";
                                                        }
                                                        if(FREEZE_INDEX_YR > 86){
                                                            console.log("Satisfactory (100%)");
                                                            return "Satisfactory (100%)";
                                                        }
                                                    }
                                                }
                                                if(FUNC_CLASS > 2){
                                                    console.log("Satisfactory (80%)");
                                                    return "Satisfactory (80%)";
                                                }
                                            }
                                            if(PAVEMENT_TYPE > 17){
                                                if(FREEZE_INDEX_YR <= 195){
                                                    console.log("Satisfactory (82%)");
                                                    return "Satisfactory (82%)";
                                                }
                                                if(FREEZE_INDEX_YR > 195){
                                                    console.log("Serious (75%)");
                                                    return "Serious (75%)";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(FUNC_CLASS > 6){
                            if(PAVEMENT_TYPE <= 7){
                                console.log("Fair (92%)");
                                return "Fair (92%)";
                            }
                            if(PAVEMENT_TYPE > 7){
                                console.log("Poor (75%)");
                                return "Poor (75%)";
                            }
                        }
                    }
                    if(MAX_ANN_TEMP_AVG > 28.3){
                        console.log("Fair (92%)");
                        return "Fair (92%)";
                    }
                }
            }
            if(AGE > 40.03){
                if(PAVEMENT_TYPE <= 3){
                    if(FREEZE_INDEX_YR <= 42){
                        console.log("Satisfactory (75%)");
                        return "Satisfactory (75%)";
                    }
                    if(FREEZE_INDEX_YR > 42){
                        console.log("Very Poor (100%)");
                        return "Very Poor (100%)";
                    }
                }
                if(PAVEMENT_TYPE > 3){
                    console.log("Fair (100%)");
                    return "Fair (100%)";
                }
            }
        }
    }
    if(PCI0 > 85.1){
        if(TOTAL_ANN_PRECIP <= 322){
            if(MAX_ANN_TEMP_AVG <= 31.5){
                if(PCI0 <= 93.5){
                    if(FUNC_CLASS <= 2){
                        console.log("Satisfactory (100%)");
                        return "Satisfactory (100%)";
                    }
                    if(FUNC_CLASS > 2){
                        console.log("Good (81%)");
                        return "Good (81%)";
                    }
                }
                if(PCI0 > 93.5){
                    console.log("Good (100%)");
                    return "Good (100%)";
                }
            }
            if(MAX_ANN_TEMP_AVG > 31.5){
                if(PCI0 <= 96.5){
                    console.log("Very Poor (100%)");
                    return "Very Poor (100%)";
                }
                if(PCI0 > 96.5){
                    console.log("Satisfactory (75%)");
                    return "Satisfactory (75%)";
                }
            }
        }
        if(TOTAL_ANN_PRECIP > 322){
            if(MAX_ANN_TEMP_AVG <= 29.2){
                if(PCI0 <= 99.3){
                    if(TOTAL_ANN_PRECIP <= 1633.1){
                        if(PCI0 <= 87.2){
                            if(MAX_ANN_TEMP_AVG <= 23.2){
                                if(FREEZE_INDEX_YR <= 99){
                                    console.log("Fair (100%)");
                                    return "Fair (100%)";
                                }
                                if(FREEZE_INDEX_YR > 99){
                                    console.log("Satisfactory (89%)");
                                    return "Satisfactory (89%)";
                                }
                            }
                            if(MAX_ANN_TEMP_AVG > 23.2){
                                console.log("Satisfactory (100%)");
                                return "Satisfactory (100%)";
                            }
                        }
                        if(PCI0 > 87.2){
                            if(MIN_ANN_TEMP_AVG <= -0.5){
                                if(FUNC_CLASS <= 1){
                                    console.log("Good (80%)");
                                    return "Good (80%)";
                                }
                                if(FUNC_CLASS > 1){
                                    console.log("Fair (100%)");
                                    return "Fair (100%)";
                                }
                            }
                            if(MIN_ANN_TEMP_AVG > -0.5){
                                if(AGE <= 29.56){
                                    if(PAVEMENT_TYPE <= 2){
                                        if(PCI0 <= 90.4){
                                            if(TOTAL_ANN_PRECIP <= 1274){
                                                console.log("Fair (71%)");
                                                return "Fair (71%)";
                                            }
                                            if(TOTAL_ANN_PRECIP > 1274){
                                                console.log("Satisfactory (100%)");
                                                return "Satisfactory (100%)";
                                            }
                                        }
                                        if(PCI0 > 90.4){
                                            if(FUNC_CLASS <= 1){
                                                console.log("Satisfactory (100%)");
                                                return "Satisfactory (100%)";
                                            }
                                            if(FUNC_CLASS > 1){
                                                if(FREEZE_INDEX_YR <= 463){
                                                    if(FUNC_CLASS <= 6){
                                                        if(AGE <= 14.84){
                                                            if(MAX_ANN_TEMP_AVG <= 22.8){
                                                                if(PCI0 <= 96.5){
                                                                    console.log("Good (78%)");
                                                                    return "Good (78%)";
                                                                }
                                                                if(PCI0 > 96.5){
                                                                    console.log("Satisfactory (75%)");
                                                                    return "Satisfactory (75%)";
                                                                }
                                                            }
                                                            if(MAX_ANN_TEMP_AVG > 22.8){
                                                                if(PCI0 <= 98){
                                                                    console.log("Fair (75%)");
                                                                    return "Fair (75%)";
                                                                }
                                                                if(PCI0 > 98){
                                                                    console.log("Good (75%)");
                                                                    return "Good (75%)";
                                                                }
                                                            }
                                                        }
                                                        if(AGE > 14.84){
                                                            if(PCI0 <= 95.4){
                                                                console.log("Good (75%)");
                                                                return "Good (75%)";
                                                            }
                                                            if(PCI0 > 95.4){
                                                                console.log("Satisfactory (100%)");
                                                                return "Satisfactory (100%)";
                                                            }
                                                        }
                                                    }
                                                    if(FUNC_CLASS > 6){
                                                        console.log("Satisfactory (100%)");
                                                        return "Satisfactory (100%)";
                                                    }
                                                }
                                                if(FREEZE_INDEX_YR > 463){
                                                    if(AGE <= 22.98){
                                                        console.log("Good (75%)");
                                                        return "Good (75%)";
                                                    }
                                                    if(AGE > 22.98){
                                                        console.log("Poor (75%)");
                                                        return "Poor (75%)";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(PAVEMENT_TYPE > 2){
                                        if(AGE <= 23.06){
                                            console.log("Satisfactory (100%)");
                                            return "Satisfactory (100%)";
                                        }
                                        if(AGE > 23.06){
                                            console.log("Fair (83%)");
                                            return "Fair (83%)";
                                        }
                                    }
                                }
                                if(AGE > 29.56){
                                    console.log("Good (88%)");
                                    return "Good (88%)";
                                }
                            }
                        }
                    }
                    if(TOTAL_ANN_PRECIP > 1633.1){
                        console.log("Good (91%)");
                        return "Good (91%)";
                    }
                }
                if(PCI0 > 99.3){
                    if(AGE <= 30.88){
                        if(FREEZE_INDEX_YR <= 110){
                            if(PAVEMENT_TYPE <= 3){
                                console.log("Good (88%)");
                                return "Good (88%)";
                            }
                            if(PAVEMENT_TYPE > 3){
                                if(FREEZE_INDEX_YR <= 39){
                                    if(FREEZE_INDEX_YR <= 0){
                                        if(AGE <= 23.17){
                                            console.log("Satisfactory (80%)");
                                            return "Satisfactory (80%)";
                                        }
                                        if(AGE > 23.17){
                                            console.log("Good (100%)");
                                            return "Good (100%)";
                                        }
                                    }
                                    if(FREEZE_INDEX_YR > 0){
                                        console.log("Good (100%)");
                                        return "Good (100%)";
                                    }
                                }
                                if(FREEZE_INDEX_YR > 39){
                                    console.log("Satisfactory (100%)");
                                    return "Satisfactory (100%)";
                                }
                            }
                        }
                        if(FREEZE_INDEX_YR > 110){
                            if(AGE <= 11.32){
                                console.log("Poor (83%)");
                                return "Poor (83%)";
                            }
                            if(AGE > 11.32){
                                if(FREEZE_INDEX_YR <= 119){
                                    console.log("Fair (100%)");
                                    return "Fair (100%)";
                                }
                                if(FREEZE_INDEX_YR > 119){
                                    if(AGE <= 15.96){
                                        if(FREEZE_INDEX_YR <= 333){
                                            console.log("Satisfactory (75%)");
                                            return "Satisfactory (75%)";
                                        }
                                        if(FREEZE_INDEX_YR > 333){
                                            console.log("Fair (100%)");
                                            return "Fair (100%)";
                                        }
                                    }
                                    if(AGE > 15.96){
                                        if(FUNC_CLASS <= 2){
                                            if(AGE <= 18.2){
                                                console.log("Good (100%)");
                                                return "Good (100%)";
                                            }
                                            if(AGE > 18.2){
                                                if(MIN_ANN_TEMP_AVG <= 1.9){
                                                    console.log("Good (75%)");
                                                    return "Good (75%)";
                                                }
                                                if(MIN_ANN_TEMP_AVG > 1.9){
                                                    console.log("Satisfactory (90%)");
                                                    return "Satisfactory (90%)";
                                                }
                                            }
                                        }
                                        if(FUNC_CLASS > 2){
                                            console.log("Good (100%)");
                                            return "Good (100%)";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(AGE > 30.88){
                        if(TOTAL_ANN_PRECIP <= 414){
                            if(AGE <= 35.29){
                                console.log("Good (100%)");
                                return "Good (100%)";
                            }
                            if(AGE > 35.29){
                                console.log("Satisfactory (75%)");
                                return "Satisfactory (75%)";
                            }
                        }
                        if(TOTAL_ANN_PRECIP > 414){
                            if(AGE <= 38.8){
                                console.log("Fair (92%)");
                                return "Fair (92%)";
                            }
                            if(AGE > 38.8){
                                if(PAVEMENT_TYPE <= 3){
                                    console.log("Good (100%)");
                                    return "Good (100%)";
                                }
                                if(PAVEMENT_TYPE > 3){
                                    console.log("Fair (75%)");
                                    return "Fair (75%)";
                                }
                            }
                        }
                    }
                }
            }
            if(MAX_ANN_TEMP_AVG > 29.2){
                console.log("Satisfactory (100%)");
                return "Satisfactory (100%)";
            }
        }
    }

    return "";
  }

});
