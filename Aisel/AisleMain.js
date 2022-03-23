window.addEventListener('load', () => {
  console.log("On window load");
  var columns = ["", "Description", "Stock"];
  var tableData = {
    aisle1 : [
      ["https://image.smythstoys.com/original/desktop/205156.webp", "Hot Wheels Track Builder Unlimited Corkscrew Twist Kit and Vehicle", "10"],
      ["https://image.smythstoys.com/original/desktop/140525.webp", "Apatou 3 Unit Swing Set", "5"],
      ["https://image.smythstoys.com/original/desktop/205156.webp", "10ft Wavy Slide", "8"],
      ["https://image.smythstoys.com/original/desktop/187671.webp", "12 Inch Tiger Bike", "15"],
      ["https://image.smythstoys.com/original/desktop/204612.webp", "L.O.L. Surprise! OMG Queens Prism", "20"]
    ]
  };
  
  //Create a HTML Table element.
  var table = $("<table />");
  table[0].border = "1";
  var columnCount = columns.length;

  //Add the header row.
  var row = $(table[0].insertRow(-1));
  for (var i = 0; i < columnCount; i++) {
      var headerCell = $("<th />");
      headerCell.html(columns[i]);
      row.append(headerCell);
  }

  //Add the data rows.
  for (var i = 1; i < tableData.aisle1.length; i++) {
      row = $(table[0].insertRow(-1));
      for (var j = 0; j < columnCount; j++) {
          var cell = $("<td />");
          if(j === 0) {
            var image = $("<img/>");
            image[0].src(tableData.aisle1[i][j]);
            image[0].width("75px");
            cell.html(image);
          } else {
            cell.html(tableData.aisle1[i][j]);
          }
          row.append(cell);
      }
  }

  var dvTable = $("#idTableContainer");
  dvTable.html("");
  dvTable.append(table);
});
