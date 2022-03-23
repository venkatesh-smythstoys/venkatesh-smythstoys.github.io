window.addEventListener('load', () => {
    console.log("On window load");
    var defaultColumns = ["", "Description", "Stock"];
    var searchResultCols = ["", "Description", "Stock", "Aisle"];
    var tableData = {
        aisle1: [
            ["https://image.smythstoys.com/original/desktop/205156.webp", "Hot Wheels Track Builder Unlimited Corkscrew Twist Kit and Vehicle", "10"],
            ["https://image.smythstoys.com/original/desktop/140525.webp", "Apatou 3 Unit Swing Set", "0"],
            ["https://image.smythstoys.com/original/desktop/205156.webp", "10ft Wavy Slide", "8"],
            ["https://image.smythstoys.com/original/desktop/187671.webp", "12 Inch Tiger Bike", "15"],
            ["https://image.smythstoys.com/original/desktop/204612.webp", "L.O.L. Surprise! OMG Queens Prism", "20"]
        ],
        aisle2: [
            ["https://image.smythstoys.com/original/desktop/203535.webp", "Bluey's Ultimate Caravan Adventures", "10"],
            ["https://image.smythstoys.com/original/desktop/604870.webp", "Mario Kart 8 Deluxe Booster Course Pass DLC (Digital Download)", "5"],
            ["https://image.smythstoys.com/original/desktop/202557.webp", "Barbie Holiday Fun Doll and Accessories", "0"],
            ["https://image.smythstoys.com/original/desktop/800530.webp", "Logitech G29 Driving Force Racing Wheel for PlayStation and PC + Force Shifter", "15"],
            ["https://image.smythstoys.com/original/desktop/204013.webp", "LEGO 76397 Harry Potter Hogwarts Moment: Defence Class Set", "20"]
        ],
        aisle3: [
            ["https://image.smythstoys.com/original/desktop/170479.webp", "ClevaMama ClevaFoam Toddler Pillow", "10"],
            ["https://image.smythstoys.com/original/desktop/170482.webp", "ClevaMama Tencel Fitted Cot Bed Mattress Protector 70x140x25cm", "5"],
            ["https://image.smythstoys.com/original/desktop/170476.webp", "ClevaMama ClevaFeed Baby Feeder with Extra Teat", "108"],
            ["https://image.smythstoys.com/original/desktop/200125.webp", "ClevaMama ClevaPure Salt Lamp", "15"],
            ["https://image.smythstoys.com/original/desktop/206281.webp", "ClevaMama Blackout Blinds", "20"]
        ]
    };

    function buildTable(tableTitle, dataForBinding, fromSearch) {
        //Create a HTML Table element.
        var table = $("<table />");
        table[0].width = "100%";
        var columns = fromSearch ? searchResultCols : defaultColumns;
        var columnCount = columns.length;

        //Add the header row.
        var row = $(table[0].insertRow(-1));
        for (var i = 0; i < columnCount; i++) {
            var headerCell = $("<th />");
            headerCell.html(columns[i]);
            row.append(headerCell);
        }

        //Add the data rows.
        for (var i = 0; i < dataForBinding.length; i++) {
            row = $(table[0].insertRow(-1));
            for (var j = 0; j < columnCount; j++) {
                var cell = $("<td />");
                if (j === 0) {
                    var image = $("<img/>");
                    image[0].src = dataForBinding[i][j];
                    image[0].width = 60;
                    image[0].className = "rounded";
                    cell.html(image[0]);
                } else {
                    cell.html(dataForBinding[i][j]);
                }
                row.append(cell);
            }
        }

        $("#aisleTitle").html(tableTitle);
        var dvTable = $("#idTableContainer");
        dvTable.html("");
        dvTable.append(table);
    };

    $("#searchBtn").click(function() {
        var searchVal = $("#searchInput").val();
        if (!searchVal) {
            $("#aisle1").click();
            return;
        }
        searchVal = searchVal.toLowerCase();
        var results = [],
            isNoStock;
        for (var aisle in tableData) {
            var aisleData = jQuery.extend(true, [], tableData[aisle]);
            for (var idx in aisleData) {
                if (aisleData[idx][1].toLowerCase().indexOf(searchVal) > -1) {
                    if (~~aisleData[idx][2] <= 0) {
                        isNoStock = "X";
                    }
                    var aisleNo = aisle.substr(-1);
                    aisleData[idx].push(aisleNo);
                    results.push(aisleData[idx]);
                }
            }
        }

        if (results.length === 0) {
            swal({
                title: "",
                text: "Sorry, your query didn't match with our list",
                icon: "info"
            });
            $("#aisleTitle").html("");
            $("#idTableContainer").html("");
        } else {
            buildTable("Search result", results, "X");
            if (isNoStock) {
                swal({
                    title: "",
                    text: "Currently this item is unavailable, Would you like to place a home delivery order for this item?",
                    icon: "warning",
                    buttons: ["No", "Yes"]
                }).then(function(isYes) {
                    if (isYes) {
                        swal({
                            title: "",
                            text: "Thanks! your order has been placed successfully",
                            icon: "success",
                            timer: 2000
                        });
                    }
                });
            }
        }
    });
	
	$("#searchInput").keypress(function(event){
	  var keycode = (event.keyCode ? event.keyCode : event.which);
	  if(keycode == '13'){
		$("#searchBtn").click();
	  }
	});

    $("#clearBtn").click(function() {
        $("#aisle1").click();
    });

    $("#aisle1").click(function() {
        $("#searchInput").val("");
        buildTable("Aisel 1", tableData.aisle1);
    });

    $("#aisle2").click(function() {
        $("#searchInput").val("");
        buildTable("Aisel 2", tableData.aisle2);
    });

    $("#aisle3").click(function() {
        $("#searchInput").val("");
        buildTable("Aisel 3", tableData.aisle3);
    });

    $("#aisle1").click();
});
