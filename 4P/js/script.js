$(document).ready(function(){
  var PCI0;
  var TOTAL_ANN_PRECIP;
  var FREEZE_THAW_YR;
  var REMED_YEARS;
  var result = $("#result-text");
  var result_string = "";

  $("#go").click(function(){
    result_string = PCITree($("#PCI0").val(),$("#TOTAL_ANN_PRECIP").val(),
      $("#FREEZE_THAW_YR").val(),$("#REMED_YEARS").val());
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

  var PCITree = function(PCI0,TOTAL_ANN_PRECIP,FREEZE_THAW_YR,REMED_YEARS){

    if(PCI0 <= 85.1){
        if(PCI0 <= 57.6){
            if(PCI0 <= 46.4){
                if(PCI0 <= 34.3){
                    console.log("Serious (73%)");
                    return "Serious (73%)";
                }
                if(PCI0 > 34.3){
                    if(TOTAL_ANN_PRECIP <= 375.6){
                        console.log("Very Poor (88%)");
                        return "Very Poor (88%)";
                    }
                    if(TOTAL_ANN_PRECIP > 375.6){
                        if(TOTAL_ANN_PRECIP <= 601.4){
                            console.log("Serious (83%)");
                            return "Serious (83%)";
                        }
                        if(TOTAL_ANN_PRECIP > 601.4){
                            console.log("Very Poor (85%)");
                            return "Very Poor (85%)";
                        }
                    }
                }
            }
            if(PCI0 > 46.4){
                if(TOTAL_ANN_PRECIP <= 683){
                    console.log("Poor (92%)");
                    return "Poor (92%)";
                }
                if(TOTAL_ANN_PRECIP > 683){
                    if(TOTAL_ANN_PRECIP <= 920){
                        console.log("Very Poor (71%)");
                        return "Very Poor (71%)";
                    }
                    if(TOTAL_ANN_PRECIP > 920){
                        if(PCI0 <= 55.1){
                            if(FREEZE_THAW_YR <= 32){
                                console.log("Poor (83%)");
                                return "Poor (83%)";
                            }
                            if(FREEZE_THAW_YR > 32){
                                if(PCI0 <= 51.5){
                                    console.log("Very Poor (82%)");
                                    return "Very Poor (82%)";
                                }
                                if(PCI0 > 51.5){
                                    if(PCI0 <= 53.7){
                                        console.log("Serious (83%)");
                                        return "Serious (83%)";
                                    }
                                    if(PCI0 > 53.7){
                                        console.log("Very Poor (83%)");
                                        return "Very Poor (83%)";
                                    }
                                }
                            }
                        }
                        if(PCI0 > 55.1){
                            console.log("Poor (100%)");
                            return "Poor (100%)";
                        }
                    }
                }
            }
        }
        if(PCI0 > 57.6){
            if(PCI0 <= 70.6){
                if(PCI0 <= 64.6){
                    if(FREEZE_THAW_YR <= 130){
                        if(PCI0 <= 63.1){
                            if(FREEZE_THAW_YR <= 56){
                                if(TOTAL_ANN_PRECIP <= 799){
                                    console.log("Poor (100%)");
                                    return "Poor (100%)";
                                }
                                if(TOTAL_ANN_PRECIP > 799){
                                    if(TOTAL_ANN_PRECIP <= 1154){
                                        console.log("Fair (82%)");
                                        return "Fair (82%)";
                                    }
                                    if(TOTAL_ANN_PRECIP > 1154){
                                        console.log("Poor (75%)");
                                        return "Poor (75%)";
                                    }
                                }
                            }
                            if(FREEZE_THAW_YR > 56){
                                if(FREEZE_THAW_YR <= 115){
                                    if(PCI0 <= 62.3){
                                        console.log("Poor (65%)");
                                        return "Poor (65%)";
                                    }
                                    if(PCI0 > 62.3){
                                        console.log("Fair (75%)");
                                        return "Fair (75%)";
                                    }
                                }
                                if(FREEZE_THAW_YR > 115){
                                    console.log("Very Poor (85%)");
                                    return "Very Poor (85%)";
                                }
                            }
                        }
                        if(PCI0 > 63.1){
                            console.log("Poor (93%)");
                            return "Poor (93%)";
                        }
                    }
                    if(FREEZE_THAW_YR > 130){
                        if(FREEZE_THAW_YR <= 144){
                            console.log("Fair (100%)");
                            return "Fair (100%)";
                        }
                        if(FREEZE_THAW_YR > 144){
                            if(PCI0 <= 60.9){
                                console.log("Fair (71%)");
                                return "Fair (71%)";
                            }
                            if(PCI0 > 60.9){
                                console.log("Poor (70%)");
                                return "Poor (70%)";
                            }
                        }
                    }
                }
                if(PCI0 > 64.6){
                    if(PCI0 <= 68.2){
                        if(TOTAL_ANN_PRECIP <= 239.6){
                            console.log("Very Poor (83%)");
                            return "Very Poor (83%)";
                        }
                        if(TOTAL_ANN_PRECIP > 239.6){
                            console.log("Fair (86%)");
                            return "Fair (86%)";
                        }
                    }
                    if(PCI0 > 68.2){
                        if(FREEZE_THAW_YR <= 102){
                            console.log("Poor (79%)");
                            return "Poor (79%)";
                        }
                        if(FREEZE_THAW_YR > 102){
                            console.log("Fair (71%)");
                            return "Fair (71%)";
                        }
                    }
                }
            }
            if(PCI0 > 70.6){
                if(PCI0 <= 84.4){
                    if(FREEZE_THAW_YR <= 19){
                        if(FREEZE_THAW_YR <= 10){
                            console.log("Fair (85%)");
                            return "Fair (85%)";
                        }
                        if(FREEZE_THAW_YR > 10){
                            console.log("Satisfactory (94%)");
                            return "Satisfactory (94%)";
                        }
                    }
                    if(FREEZE_THAW_YR > 19){
                        if(FREEZE_THAW_YR <= 74){
                            if(FREEZE_THAW_YR <= 39){
                                if(REMED_YEARS <= 5.3){
                                    console.log("Satisfactory (76%)");
                                    return "Satisfactory (76%)";
                                }
                                if(REMED_YEARS > 5.3){
                                    console.log("Fair (93%)");
                                    return "Fair (93%)";
                                }
                            }
                            if(FREEZE_THAW_YR > 39){
                                if(TOTAL_ANN_PRECIP <= 1002){
                                    if(FREEZE_THAW_YR <= 58){
                                        console.log("Poor (83%)");
                                        return "Poor (83%)";
                                    }
                                    if(FREEZE_THAW_YR > 58){
                                        console.log("Fair (64%)");
                                        return "Fair (64%)";
                                    }
                                }
                                if(TOTAL_ANN_PRECIP > 1002){
                                    if(REMED_YEARS <= 3.6){
                                        console.log("Satisfactory (71%)");
                                        return "Satisfactory (71%)";
                                    }
                                    if(REMED_YEARS > 3.6){
                                        console.log("Fair (94%)");
                                        return "Fair (94%)";
                                    }
                                }
                            }
                        }
                        if(FREEZE_THAW_YR > 74){
                            if(TOTAL_ANN_PRECIP <= 239.6){
                                console.log("Fair (100%)");
                                return "Fair (100%)";
                            }
                            if(TOTAL_ANN_PRECIP > 239.6){
                                if(TOTAL_ANN_PRECIP <= 400.2){
                                    console.log("Satisfactory (77%)");
                                    return "Satisfactory (77%)";
                                }
                                if(TOTAL_ANN_PRECIP > 400.2){
                                    if(FREEZE_THAW_YR <= 101){
                                        console.log("Satisfactory (66%)");
                                        return "Satisfactory (66%)";
                                    }
                                    if(FREEZE_THAW_YR > 101){
                                        console.log("Fair (73%)");
                                        return "Fair (73%)";
                                    }
                                }
                            }
                        }
                    }
                }
                if(PCI0 > 84.4){
                    console.log("Very Poor (84%)");
                    return "Very Poor (84%)";
                }
            }
        }
    }
    if(PCI0 > 85.1){
        if(TOTAL_ANN_PRECIP <= 322){
            if(PCI0 <= 94.8){
                if(FREEZE_THAW_YR <= 81){
                    console.log("Very Poor (83%)");
                    return "Very Poor (83%)";
                }
                if(FREEZE_THAW_YR > 81){
                    console.log("Good (75%)");
                    return "Good (75%)";
                }
            }
            if(PCI0 > 94.8){
                console.log("Good (96%)");
                return "Good (96%)";
            }
        }
        if(TOTAL_ANN_PRECIP > 322){
            if(TOTAL_ANN_PRECIP <= 325){
                console.log("Satisfactory (100%)");
                return "Satisfactory (100%)";
            }
            if(TOTAL_ANN_PRECIP > 325){
                if(PCI0 <= 99.3){
                    if(TOTAL_ANN_PRECIP <= 1633.1){
                        if(PCI0 <= 87.2){
                            console.log("Satisfactory (85%)");
                            return "Satisfactory (85%)";
                        }
                        if(PCI0 > 87.2){
                            if(TOTAL_ANN_PRECIP <= 1063.5){
                                if(REMED_YEARS <= 5){
                                    if(REMED_YEARS <= 2.8){
                                        if(FREEZE_THAW_YR <= 83){
                                            console.log("Good (84%)");
                                            return "Good (84%)";
                                        }
                                        if(FREEZE_THAW_YR > 83){
                                            if(REMED_YEARS <= 1.9){
                                                console.log("Fair (62%)");
                                                return "Fair (62%)";
                                            }
                                            if(REMED_YEARS > 1.9){
                                                console.log("Satisfactory (76%)");
                                                return "Satisfactory (76%)";
                                            }
                                        }
                                    }
                                    if(REMED_YEARS > 2.8){
                                        console.log("Good (77%)");
                                        return "Good (77%)";
                                    }
                                }
                                if(REMED_YEARS > 5){
                                    if(FREEZE_THAW_YR <= 85){
                                        console.log("Satisfactory (73%)");
                                        return "Satisfactory (73%)";
                                    }
                                    if(FREEZE_THAW_YR > 85){
                                        console.log("Fair (74%)");
                                        return "Fair (74%)";
                                    }
                                }
                            }
                            if(TOTAL_ANN_PRECIP > 1063.5){
                                if(FREEZE_THAW_YR <= 101){
                                    if(REMED_YEARS <= 3.6){
                                        console.log("Fair (71%)");
                                        return "Fair (71%)";
                                    }
                                    if(REMED_YEARS > 3.6){
                                        console.log("Satisfactory (86%)");
                                        return "Satisfactory (86%)";
                                    }
                                }
                                if(FREEZE_THAW_YR > 101){
                                    console.log("Poor (71%)");
                                    return "Poor (71%)";
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
                    if(FREEZE_THAW_YR <= 88){
                        if(FREEZE_THAW_YR <= 85){
                            if(FREEZE_THAW_YR <= 56){
                                console.log("Good (86%)");
                                return "Good (86%)";
                            }
                            if(FREEZE_THAW_YR > 56){
                                if(REMED_YEARS <= 0.5){
                                    console.log("Satisfactory (68%)");
                                    return "Satisfactory (68%)";
                                }
                                if(REMED_YEARS > 0.5){
                                    console.log("Good (79%)");
                                    return "Good (79%)";
                                }
                            }
                        }
                        if(FREEZE_THAW_YR > 85){
                            if(TOTAL_ANN_PRECIP <= 754){
                                console.log("Poor (75%)");
                                return "Poor (75%)";
                            }
                            if(TOTAL_ANN_PRECIP > 754){
                                console.log("Good (100%)");
                                return "Good (100%)";
                            }
                        }
                    }
                    if(FREEZE_THAW_YR > 88){
                        if(REMED_YEARS <= 0.2){
                            console.log("Satisfactory (73%)");
                            return "Satisfactory (73%)";
                        }
                        if(REMED_YEARS > 0.2){
                            if(FREEZE_THAW_YR <= 103){
                                console.log("Fair (78%)");
                                return "Fair (78%)";
                            }
                            if(FREEZE_THAW_YR > 103){
                                console.log("Good (94%)");
                                return "Good (94%)";
                            }
                        }
                    }
                }
            }
        }
    }

    return "";
  }

});
