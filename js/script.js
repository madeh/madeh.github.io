$(document).ready(function() {
    $("#PCICalc-go").click(function() {
      var newPCI = $("#PCICalc-selecter").val();
      if(newPCI === "Option 1: Calculator w/ 8 Basic Attributes"){
        $("#PCICalc-go").attr("href", "8Basic/index.html");
      }
      else if(newPCI === "Option 2: Calculator w/ 4 Attributes Including Annual Precipitation") {
        $("#PCICalc-go").attr("href", "4P/index.html");
      }
      else if(newPCI === "Option 3: Calculator w/ 4 Attributes Including Type of Maintenance/Rehabilitation") {
        $("#PCICalc-go").attr("href", "4MR/index.html");
      }
      else if(newPCI === "Option 4: Calculator w/ 9 Attributes with GBE and 5 Classes") {
        $("#PCICalc-go").attr("href", "9AGBE5C/index.html");
      }
      else if(newPCI === "Option 5: Calculator w/ 10 Attributes with GBE and Traffic and 5 Classes") {
        $("#PCICalc-go").attr("href", "10AGBET5C/index.html");
      }
      else {
        $("#PCICalc-go").attr("href", "https://madeh.github.io/");
      }
    });
});
