document.addEventListener("DOMContentLoaded", function() {
    var table = document.getElementById("myTable");
    var tableHead = document.getElementById("tableHead");
  
    table.addEventListener("scroll", function() {
      tableHead.style.transform = "translate(0, " + table.scrollTop + "px)";
    });
  });
  