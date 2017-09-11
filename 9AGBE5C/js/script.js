$(document).ready(function(){
  var PCI0;
  var AADT_ALL_VEHIC_2WAY;
  var AGE;
  var FREEZE_INDEX_YR;
  var FREEZE_THAW_YR;
  var GBE;
  var PAVEMENT_TYPE = "";
  var REMED_YEARS;
  var REMED_TYPE = "";
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
    result_string = Foo($("#PCI0").val(),$("#AADT_ALL_VEHIC_2WAY").val(),
      $("#AGE").val(),$("#FREEZE_INDEX_YR").val(),$("#FREEZE_THAW_YR").val(),
      $("#GBE").val(),DecodeType($("PAVEMENT_TYPE").val(),pav_type_parsed),
      $("#REMED_YEARS").val(),DecodeType($("#REMED_TYPE").val(),main_rehab_parsed));
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

  function Foo(PCI0,AADT_ALL_VEHIC_2WAY,AGE,FREEZE_INDEX_YR,FREEZE_THAW_YR,GBE,PAVEMENT_TYPE,REMED_YEARS,REMED_TYPE){

      if(PCI0 <= 84.9){
          if(PCI0 <= 57.6){
              if(PCI0 <= 46.7){
                  console.log("Very Poor (94%)");
                  return "Very Poor (94%)";
              }
              if(PCI0 > 46.7){
                  if(PAVEMENT_TYPE <= 7){
                      if(FREEZE_INDEX_YR <= 463){
                          console.log("Poor (95%)");
                          return "Poor (95%)";
                      }
                      if(FREEZE_INDEX_YR > 463){
                          if(FREEZE_THAW_YR <= 89){
                              console.log("Very Poor (100%)");
                              return "Very Poor (100%)";
                          }
                          if(FREEZE_THAW_YR > 89){
                              console.log("Poor (100%)");
                              return "Poor (100%)";
                          }
                      }
                  }
                  if(PAVEMENT_TYPE > 7){
                      console.log("Very Poor (100%)");
                      return "Very Poor (100%)";
                  }
              }
          }
          if(PCI0 > 57.6){
              if(PCI0 <= 84.4){
                  if(PCI0 <= 70.6){
                      if(PCI0 <= 64.9){
                          if(REMED_TYPE <= 32){
                              if(FREEZE_THAW_YR <= 39){
                                  console.log("Satisfactory (67%)");
                                  return "Satisfactory (67%)";
                              }
                              if(FREEZE_THAW_YR > 39){
                                  if(PAVEMENT_TYPE <= 2){
                                      if(PAVEMENT_TYPE <= 1){
                                          if(FREEZE_INDEX_YR <= 31){
                                              console.log("Fair (100%)");
                                              return "Fair (100%)";
                                          }
                                          if(FREEZE_INDEX_YR > 31){
                                              console.log("Very Poor (80%)");
                                              return "Very Poor (80%)";
                                          }
                                      }
                                      if(PAVEMENT_TYPE > 1){
                                          console.log("Fair (100%)");
                                          return "Fair (100%)";
                                      }
                                  }
                                  if(PAVEMENT_TYPE > 2){
                                      if(REMED_TYPE <= 12){
                                          console.log("Fair (71%)");
                                          return "Fair (71%)";
                                      }
                                      if(REMED_TYPE > 12){
                                          console.log("Very Poor (83%)");
                                          return "Very Poor (83%)";
                                      }
                                  }
                              }
                          }
                          if(REMED_TYPE > 32){
                              if(AADT_ALL_VEHIC_2WAY <= 14960){
                                  if(REMED_TYPE <= 38){
                                      console.log("Fair (75%)");
                                      return "Fair (75%)";
                                  }
                                  if(REMED_TYPE > 38){
                                      console.log("Poor (100%)");
                                      return "Poor (100%)";
                                  }
                              }
                              if(AADT_ALL_VEHIC_2WAY > 14960){
                                  console.log("Fair (75%)");
                                  return "Fair (75%)";
                              }
                          }
                      }
                      if(PCI0 > 64.9){
                          if(REMED_TYPE <= 12){
                              if(PCI0 <= 68.4){
                                  console.log("Fair (100%)");
                                  return "Fair (100%)";
                              }
                              if(PCI0 > 68.4){
                                  console.log("Poor (75%)");
                                  return "Poor (75%)";
                              }
                          }
                          if(REMED_TYPE > 12){
                              console.log("Fair (95%)");
                              return "Fair (95%)";
                          }
                      }
                  }
                  if(PCI0 > 70.6){
                      if(FREEZE_INDEX_YR <= 1074){
                          if(AADT_ALL_VEHIC_2WAY <= 48410){
                              if(REMED_YEARS <= 12.4){
                                  if(GBE <= 24.1){
                                      if(GBE <= 16.391){
                                          console.log("Satisfactory (75%)");
                                          return "Satisfactory (75%)";
                                      }
                                      if(GBE > 16.391){
                                          console.log("Fair (84%)");
                                          return "Fair (84%)";
                                      }
                                  }
                                  if(GBE > 24.1){
                                      if(PCI0 <= 76){
                                          console.log("Satisfactory (100%)");
                                          return "Satisfactory (100%)";
                                      }
                                      if(PCI0 > 76){
                                          if(PAVEMENT_TYPE <= 3){
                                              console.log("Fair (100%)");
                                              return "Fair (100%)";
                                          }
                                          if(PAVEMENT_TYPE > 3){
                                              console.log("Satisfactory (100%)");
                                              return "Satisfactory (100%)";
                                          }
                                      }
                                  }
                              }
                              if(REMED_YEARS > 12.4){
                                  console.log("Fair (100%)");
                                  return "Fair (100%)";
                              }
                          }
                          if(AADT_ALL_VEHIC_2WAY > 48410){
                              console.log("Satisfactory (67%)");
                              return "Satisfactory (67%)";
                          }
                      }
                      if(FREEZE_INDEX_YR > 1074){
                          console.log("Poor (67%)");
                          return "Poor (67%)";
                      }
                  }
              }
              if(PCI0 > 84.4){
                  console.log("Very Poor (100%)");
                  return "Very Poor (100%)";
              }
          }
      }
      if(PCI0 > 84.9){
          if(GBE <= 25.51){
              if(REMED_TYPE <= 3){
                  console.log("Good (79%)");
                  return "Good (79%)";
              }
              if(REMED_TYPE > 3){
                  if(FREEZE_INDEX_YR <= 187){
                      if(AGE <= 25.89){
                          console.log("Satisfactory (92%)");
                          return "Satisfactory (92%)";
                      }
                      if(AGE > 25.89){
                          console.log("Fair (60%)");
                          return "Fair (60%)";
                      }
                  }
                  if(FREEZE_INDEX_YR > 187){
                      console.log("Poor (75%)");
                      return "Poor (75%)";
                  }
              }
          }
          if(GBE > 25.51){
              if(PCI0 <= 95.2){
                  if(REMED_YEARS <= 3.9){
                      if(AADT_ALL_VEHIC_2WAY <= 4400){
                          if(AADT_ALL_VEHIC_2WAY <= 2260){
                              console.log("Fair (100%)");
                              return "Fair (100%)";
                          }
                          if(AADT_ALL_VEHIC_2WAY > 2260){
                              console.log("Poor (75%)");
                              return "Poor (75%)";
                          }
                      }
                      if(AADT_ALL_VEHIC_2WAY > 4400){
                          console.log("Good (75%)");
                          return "Good (75%)";
                      }
                  }
                  if(REMED_YEARS > 3.9){
                      console.log("Satisfactory (95%)");
                      return "Satisfactory (95%)";
                  }
              }
              if(PCI0 > 95.2){
                  if(FREEZE_INDEX_YR <= 36){
                      console.log("Good (96%)");
                      return "Good (96%)";
                  }
                  if(FREEZE_INDEX_YR > 36){
                      if(REMED_YEARS <= 0.1){
                          console.log("Satisfactory (88%)");
                          return "Satisfactory (88%)";
                      }
                      if(REMED_YEARS > 0.1){
                          if(AGE <= 35.74){
                              if(GBE <= 64.313){
                                  if(REMED_TYPE <= 46){
                                      console.log("Good (83%)");
                                      return "Good (83%)";
                                  }
                                  if(REMED_TYPE > 46){
                                      if(PAVEMENT_TYPE <= 2){
                                          console.log("Good (100%)");
                                          return "Good (100%)";
                                      }
                                      if(PAVEMENT_TYPE > 2){
                                          console.log("Fair (100%)");
                                          return "Fair (100%)";
                                      }
                                  }
                              }
                              if(GBE > 64.313){
                                  console.log("Fair (100%)");
                                  return "Fair (100%)";
                              }
                          }
                          if(AGE > 35.74){
                              console.log("Fair (100%)");
                              return "Fair (100%)";
                          }
                      }
                  }
              }
          }
      }

      return "";
  }

});
