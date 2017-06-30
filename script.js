$(document).ready(function() {
    $("#PCICalc-go").click(function() {
      var newPCI = $("#PCICalc-selecter").val();
      if(newPCI === "4 Attributes with Precipitation") {
        $("#PCICalc-go").attr("href", "https://michaelweiyuzhao.github.io/PCICalc4P/");
      }
      else if(newPCI === "4 Attributes with M & R") {
        $("#PCICalc-go").attr("href", "https://michaelweiyuzhao.github.io/PCICalc4MR/");
      }
      else if(newPCI === "8 Basic Attributes"){
        $("#PCICalc-go").attr("href", "https://michaelweiyuzhao.github.io/PCICalc8Basic/");
      }
      else {
        $("#PCICalc-go").attr("href", "https://michaelweiyuzhao.github.io/PCICalcHub");
      }
    });
});
