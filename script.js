$(document).ready(function() {
    $("#PCICalc-go").click(function() {
      var newPCI = $("#PCICalc-selecter").val();
      if(newPCI === "Option 1: Calculator w/ 8 Basic Attributes"){
        $("#PCICalc-go").attr("href", "https://michaelweiyuzhao.github.io/PCICalc8Basic/");
      }
      else if(newPCI === "Option 2: Calculator w/ 4 Attributes Including Annual Precipitation") {
        $("#PCICalc-go").attr("href", "https://michaelweiyuzhao.github.io/PCICalc4P/");
      }
      else if(newPCI === "Option 3: Calculator w/ 4 Attributes Including Type of Maintenance/Rehabilitation") {
        $("#PCICalc-go").attr("href", "https://michaelweiyuzhao.github.io/PCICalc4MR/");
      }
      else {
        $("#PCICalc-go").attr("href", "https://michaelweiyuzhao.github.io/PCICalcHub");
      }
    });
});
