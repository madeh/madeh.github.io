$(document).ready(function(){
  var PCI0;
  var FREEZE_THAW_YR;
  var REMED_TYPE = "";
  var REMED_YEARS;
  var result = $("#result-text");
  var result_string = "";

  //preprocessing
  var main_rehab_cfg =  "1,Crack Sealing\n" +
                        "2,Transverse Joint Sealing\n" +
                        "3,Lane-Shoulder Longitudinal Joint Sealing\n" +
                        "4,Full-Depth Transverse Joint Repair Patch\n" +
                        "5,Full-Depth Patching of PCC Pavement Other Than at Joint\n" +
                        "6,Partial-Depth Patching of PCC Pavement Other Than at Joint\n" +
                        "7,PCC Slab Replacement\n" +
                        "8,PCC Shoulder Restoration\n" +
                        "9,PCC Shoulder Replacement\n" +
                        "10,AC Shoulder Restoration\n" +
                        "11,AC Shoulder Replacement\n" +
                        "12,Grinding Surface\n" +
                        "13,Grooving Surface\n" +
                        "14,Pressure Grout Subsealing\n" +
                        "16,Asphalt Subsealing\n" +
                        "19,AC Overlay\n" +
                        "20,PCC Overlay\n" +
                        "21,Mechanical Premix Patch\n" +
                        "22,Manual Premix Spot Patch\n" +
                        "23,Machine Premix Patch\n" +
                        "24,Full-Depth Patch of AC Pavement\n" +
                        "25,\"Patch Pot Holes: Hand Spread, Compacted With Truck\"\n" +
                        "26,Skin Patching\n" +
                        "27,Strip Patching\n" +
                        "28,\"Surface Treatment, Single Layer\"\n" +
                        "29,\"Surface Treatment, Double Layer\"\n" +
                        "30,\"Surface Treatment, Three or More Layers\"\n" +
                        "31,Aggregate Seal Coat\n" +
                        "32,Sand Seal Coat\n" +
                        "33,Slurry Seal Coat\n" +
                        "34,Fog Seal Coat\n" +
                        "35,Prime Coat\n" +
                        "36,Tack Coat\n" +
                        "37,Dust Layering\n" +
                        "38,Longitudinal Subdrainage\n" +
                        "39,Transverse Subdrainage\n" +
                        "40,Drainage Blankets\n" +
                        "41,Well System\n" +
                        "42,Drainage Blankets With Longitudinal Drains\n" +
                        "43,Hot-Mix Recycled AC\n" +
                        "44,Cold-Mix Recycled AC\n" +
                        "45,\"Heater Scarification, Surface-Recycled AC\"\n" +
                        "46,Crack-and-Seat PCC Pavement as Base for New AC Surface\n" +
                        "47,Crack-and-Seat PCC Pavement as Base for New PPC Surface\n" +
                        "48,Recycled PCC\n" +
                        "49,Pressure Relief Joints in PCC Pavements\n" +
                        "50,Joint Load-Transfer Restoration in PCC Pavements\n" +
                        "51,Mill Off AC and Overlay With AC\n" +
                        "52,Mill Off AC and Overlay With PPC\n" +
                        "53,Other\n" +
                        "54,Partial-Depth Patching of PCC Pavements at Joints\n" +
                        "55,Mill Existing Pavement and Overlay With Hot-Mix AC\n" +
                        "56,Mill Existing Pavement and Overlay With Cold-Mix AC\n";

  var main_rehab_parsed = CSVToArray(main_rehab_cfg, ",");

  $("#go").click(function(){
    result_string = Foo($("#PCI0").val(),$("#FREEZE_THAW_YR").val(),
      DecodeType($("#REMED_TYPE").val(),main_rehab_parsed),$("#REMED_YEARS").val());
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

  function Foo(PCI0,FREEZE_THAW_YR,REMED_TYPE,REMED_YEARS){

    if(PCI0 <= 85.1){
        if(PCI0 <= 57.6){
            if(PCI0 <= 46.4){
                if(PCI0 <= 34.3){
                    console.log("Serious (73%)");
                    return "Serious (73%)";
                }
                if(PCI0 > 34.3){
                    if(FREEZE_THAW_YR <= 103){
                        if(PCI0 <= 44.2){
                            console.log("Very Poor (97%)");
                            return "Very Poor (97%)";
                        }
                        if(PCI0 > 44.2){
                            if(PCI0 <= 45.5){
                                console.log("Serious (100%)");
                                return "Serious (100%)";
                            }
                            if(PCI0 > 45.5){
                                console.log("Very Poor (100%)");
                                return "Very Poor (100%)";
                            }
                        }
                    }
                    if(FREEZE_THAW_YR > 103){
                        if(FREEZE_THAW_YR <= 113){
                            console.log("Serious (75%)");
                            return "Serious (75%)";
                        }
                        if(FREEZE_THAW_YR > 113){
                            console.log("Very Poor (79%)");
                            return "Very Poor (79%)";
                        }
                    }
                }
            }
            if(PCI0 > 46.4){
                if(FREEZE_THAW_YR <= 131){
                    if(PCI0 <= 54.9){
                        if(PCI0 <= 52.3){
                            if(PCI0 <= 51.5){
                                console.log("Very Poor (74%)");
                                return "Very Poor (74%)";
                            }
                            if(PCI0 > 51.5){
                                console.log("Poor (100%)");
                                return "Poor (100%)";
                            }
                        }
                        if(PCI0 > 52.3){
                            if(FREEZE_THAW_YR <= 74){
                                console.log("Very Poor (80%)");
                                return "Very Poor (80%)";
                            }
                            if(FREEZE_THAW_YR > 74){
                                console.log("Serious (67%)");
                                return "Serious (67%)";
                            }
                        }
                    }
                    if(PCI0 > 54.9){
                        if(PCI0 <= 55.4){
                            console.log("Failed (75%)");
                            return "Failed (75%)";
                        }
                        if(PCI0 > 55.4){
                            console.log("Poor (85%)");
                            return "Poor (85%)";
                        }
                    }
                }
                if(FREEZE_THAW_YR > 131){
                    console.log("Poor (91%)");
                    return "Poor (91%)";
                }
            }
        }
        if(PCI0 > 57.6){
            if(PCI0 <= 70.6){
                if(PCI0 <= 64.6){
                    if(FREEZE_THAW_YR <= 130){
                        if(PCI0 <= 63.1){
                            if(FREEZE_THAW_YR <= 56){
                                if(FREEZE_THAW_YR <= 31){
                                    console.log("Poor (79%)");
                                    return "Poor (79%)";
                                }
                                if(FREEZE_THAW_YR > 31){
                                    if(PCI0 <= 60.7){
                                        console.log("Fair (100%)");
                                        return "Fair (100%)";
                                    }
                                    if(PCI0 > 60.7){
                                        console.log("Satisfactory (75%)");
                                        return "Satisfactory (75%)";
                                    }
                                }
                            }
                            if(FREEZE_THAW_YR > 56){
                                if(FREEZE_THAW_YR <= 115){
                                    if(PCI0 <= 62.3){
                                        if(FREEZE_THAW_YR <= 70){
                                            console.log("Serious (75%)");
                                            return "Serious (75%)";
                                        }
                                        if(FREEZE_THAW_YR > 70){
                                            console.log("Poor (68%)");
                                            return "Poor (68%)";
                                        }
                                    }
                                    if(PCI0 > 62.3){
                                        console.log("Fair (75%)");
                                        return "Fair (75%)";
                                    }
                                }
                                if(FREEZE_THAW_YR > 115){
                                    if(PCI0 <= 59.7){
                                        console.log("Fair (75%)");
                                        return "Fair (75%)";
                                    }
                                    if(PCI0 > 59.7){
                                        console.log("Very Poor (100%)");
                                        return "Very Poor (100%)";
                                    }
                                }
                            }
                        }
                        if(PCI0 > 63.1){
                            console.log("Poor (93%)");
                            return "Poor (93%)";
                        }
                    }
                    if(FREEZE_THAW_YR > 130){
                        if(FREEZE_THAW_YR <= 154){
                            if(FREEZE_THAW_YR <= 144){
                                console.log("Fair (100%)");
                                return "Fair (100%)";
                            }
                            if(FREEZE_THAW_YR > 144){
                                if(PCI0 <= 60.7){
                                    console.log("Fair (100%)");
                                    return "Fair (100%)";
                                }
                                if(PCI0 > 60.7){
                                    if(PCI0 <= 62.9){
                                        console.log("Poor (100%)");
                                        return "Poor (100%)";
                                    }
                                    if(PCI0 > 62.9){
                                        console.log("Fair (75%)");
                                        return "Fair (75%)";
                                    }
                                }
                            }
                        }
                        if(FREEZE_THAW_YR > 154){
                            console.log("Very Poor (75%)");
                            return "Very Poor (75%)";
                        }
                    }
                }
                if(PCI0 > 64.6){
                    if(PCI0 <= 68.2){
                        if(FREEZE_THAW_YR <= 43){
                            console.log("Fair (100%)");
                            return "Fair (100%)";
                        }
                        if(FREEZE_THAW_YR > 43){
                            if(FREEZE_THAW_YR <= 57){
                                console.log("Very Poor (100%)");
                                return "Very Poor (100%)";
                            }
                            if(FREEZE_THAW_YR > 57){
                                console.log("Fair (82%)");
                                return "Fair (82%)";
                            }
                        }
                    }
                    if(PCI0 > 68.2){
                        if(REMED_YEARS <= 7.3){
                            if(FREEZE_THAW_YR <= 102){
                                console.log("Poor (100%)");
                                return "Poor (100%)";
                            }
                            if(FREEZE_THAW_YR > 102){
                                if(FREEZE_THAW_YR <= 134){
                                    console.log("Fair (92%)");
                                    return "Fair (92%)";
                                }
                                if(FREEZE_THAW_YR > 134){
                                    console.log("Poor (71%)");
                                    return "Poor (71%)";
                                }
                            }
                        }
                        if(REMED_YEARS > 7.3){
                            if(PCI0 <= 69.2){
                                console.log("Poor (69%)");
                                return "Poor (69%)";
                            }
                            if(PCI0 > 69.2){
                                console.log("Fair (87%)");
                                return "Fair (87%)";
                            }
                        }
                    }
                }
            }
            if(PCI0 > 70.6){
                if(PCI0 <= 84.4){
                    if(FREEZE_THAW_YR <= 5){
                        console.log("Fair (90%)");
                        return "Fair (90%)";
                    }
                    if(FREEZE_THAW_YR > 5){
                        if(REMED_TYPE <= 46){
                            if(REMED_YEARS <= 0.6){
                                console.log("Fair (76%)");
                                return "Fair (76%)";
                            }
                            if(REMED_YEARS > 0.6){
                                if(REMED_YEARS <= 7.8){
                                    if(PCI0 <= 75.6){
                                        console.log("Satisfactory (78%)");
                                        return "Satisfactory (78%)";
                                    }
                                    if(PCI0 > 75.6){
                                        if(REMED_YEARS <= 4.5){
                                            if(PCI0 <= 77.9){
                                                console.log("Fair (78%)");
                                                return "Fair (78%)";
                                            }
                                            if(PCI0 > 77.9){
                                                console.log("Satisfactory (88%)");
                                                return "Satisfactory (88%)";
                                            }
                                        }
                                        if(REMED_YEARS > 4.5){
                                            console.log("Fair (95%)");
                                            return "Fair (95%)";
                                        }
                                    }
                                }
                                if(REMED_YEARS > 7.8){
                                    if(REMED_YEARS <= 8){
                                        console.log("Serious (88%)");
                                        return "Serious (88%)";
                                    }
                                    if(REMED_YEARS > 8){
                                        if(REMED_TYPE <= 12){
                                            console.log("Satisfactory (79%)");
                                            return "Satisfactory (79%)";
                                        }
                                        if(REMED_TYPE > 12){
                                            if(REMED_YEARS <= 13.9){
                                                console.log("Fair (74%)");
                                                return "Fair (74%)";
                                            }
                                            if(REMED_YEARS > 13.9){
                                                console.log("Satisfactory (75%)");
                                                return "Satisfactory (75%)";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(REMED_TYPE > 46){
                            if(REMED_YEARS <= 9.6){
                                console.log("Fair (90%)");
                                return "Fair (90%)";
                            }
                            if(REMED_YEARS > 9.6){
                                console.log("Poor (76%)");
                                return "Poor (76%)";
                            }
                        }
                    }
                }
                if(PCI0 > 84.4){
                    if(PCI0 <= 84.9){
                        console.log("Very Poor (93%)");
                        return "Very Poor (93%)";
                    }
                    if(PCI0 > 84.9){
                        console.log("Fair (75%)");
                        return "Fair (75%)";
                    }
                }
            }
        }
    }
    if(PCI0 > 85.1){
        if(PCI0 <= 95.3){
            if(PCI0 <= 91.6){
                if(REMED_TYPE <= 3){
                    if(FREEZE_THAW_YR <= 125){
                        console.log("Satisfactory (65%)");
                        return "Satisfactory (65%)";
                    }
                    if(FREEZE_THAW_YR > 125){
                        console.log("Good (84%)");
                        return "Good (84%)";
                    }
                }
                if(REMED_TYPE > 3){
                    if(FREEZE_THAW_YR <= 24){
                        if(PCI0 <= 88.4){
                            console.log("Satisfactory (100%)");
                            return "Satisfactory (100%)";
                        }
                        if(PCI0 > 88.4){
                            console.log("Good (83%)");
                            return "Good (83%)";
                        }
                    }
                    if(FREEZE_THAW_YR > 24){
                        console.log("Satisfactory (77%)");
                        return "Satisfactory (77%)";
                    }
                }
            }
            if(PCI0 > 91.6){
                if(PCI0 <= 95.1){
                    if(PCI0 <= 92.3){
                        console.log("Poor (75%)");
                        return "Poor (75%)";
                    }
                    if(PCI0 > 92.3){
                        if(FREEZE_THAW_YR <= 55){
                            console.log("Very Poor (75%)");
                            return "Very Poor (75%)";
                        }
                        if(FREEZE_THAW_YR > 55){
                            console.log("Fair (78%)");
                            return "Fair (78%)";
                        }
                    }
                }
                if(PCI0 > 95.1){
                    console.log("Satisfactory (100%)");
                    return "Satisfactory (100%)";
                }
            }
        }
        if(PCI0 > 95.3){
            if(FREEZE_THAW_YR <= 88){
                if(REMED_YEARS <= 1.3){
                    if(REMED_YEARS <= 1.2){
                        if(REMED_TYPE <= 46){
                            if(FREEZE_THAW_YR <= 85){
                                if(FREEZE_THAW_YR <= 56){
                                    console.log("Good (82%)");
                                    return "Good (82%)";
                                }
                                if(FREEZE_THAW_YR > 56){
                                    if(REMED_YEARS <= 0.1){
                                        console.log("Satisfactory (70%)");
                                        return "Satisfactory (70%)";
                                    }
                                    if(REMED_YEARS > 0.1){
                                        if(FREEZE_THAW_YR <= 67){
                                            console.log("Satisfactory (94%)");
                                            return "Satisfactory (94%)";
                                        }
                                        if(FREEZE_THAW_YR > 67){
                                            console.log("Good (73%)");
                                            return "Good (73%)";
                                        }
                                    }
                                }
                            }
                            if(FREEZE_THAW_YR > 85){
                                console.log("Poor (67%)");
                                return "Poor (67%)";
                            }
                        }
                        if(REMED_TYPE > 46){
                            console.log("Good (88%)");
                            return "Good (88%)";
                        }
                    }
                    if(REMED_YEARS > 1.2){
                        if(FREEZE_THAW_YR <= 40){
                            console.log("Satisfactory (92%)");
                            return "Satisfactory (92%)";
                        }
                        if(FREEZE_THAW_YR > 40){
                            console.log("Good (77%)");
                            return "Good (77%)";
                        }
                    }
                }
                if(REMED_YEARS > 1.3){
                    if(REMED_YEARS <= 6.8){
                        console.log("Good (88%)");
                        return "Good (88%)";
                    }
                    if(REMED_YEARS > 6.8){
                        console.log("Satisfactory (73%)");
                        return "Satisfactory (73%)";
                    }
                }
            }
            if(FREEZE_THAW_YR > 88){
                if(FREEZE_THAW_YR <= 142){
                    if(FREEZE_THAW_YR <= 103){
                        if(PCI0 <= 97.4){
                            console.log("Satisfactory (83%)");
                            return "Satisfactory (83%)";
                        }
                        if(PCI0 > 97.4){
                            if(REMED_YEARS <= 0.9){
                                console.log("Fair (83%)");
                                return "Fair (83%)";
                            }
                            if(REMED_YEARS > 0.9){
                                console.log("Good (73%)");
                                return "Good (73%)";
                            }
                        }
                    }
                    if(FREEZE_THAW_YR > 103){
                        if(PCI0 <= 95.7){
                            console.log("Fair (75%)");
                            return "Fair (75%)";
                        }
                        if(PCI0 > 95.7){
                            if(REMED_YEARS <= 0.2){
                                if(FREEZE_THAW_YR <= 107){
                                    console.log("Good (77%)");
                                    return "Good (77%)";
                                }
                                if(FREEZE_THAW_YR > 107){
                                    console.log("Satisfactory (72%)");
                                    return "Satisfactory (72%)";
                                }
                            }
                            if(REMED_YEARS > 0.2){
                                if(FREEZE_THAW_YR <= 118){
                                    console.log("Good (100%)");
                                    return "Good (100%)";
                                }
                                if(FREEZE_THAW_YR > 118){
                                    if(PCI0 <= 98.6){
                                        console.log("Good (100%)");
                                        return "Good (100%)";
                                    }
                                    if(PCI0 > 98.6){
                                        console.log("Satisfactory (84%)");
                                        return "Satisfactory (84%)";
                                    }
                                }
                            }
                        }
                    }
                }
                if(FREEZE_THAW_YR > 142){
                    console.log("Good (100%)");
                    return "Good (100%)";
                }
            }
        }
    }

    return "";
  }

});
