$(document).ready(function() {
    var curr = "USD";
    var symb1 = "$ ";
    var symb2 = "";
    if($.cookie("Currency")=="EUR"){
        curr = "EUR";
        symb1 = "";
        symb2 = " €";
    }else{
        if($.cookie("Currency")=="BTC"){
            curr = "BTC";
            symb1 = "";
            symb2 = " BTC";
        }
    }
	$('#example').DataTable({
		ajax: Get_Path_Currencys(),
		"lengthMenu": [[100, 250, 500, -1], [100, 250, 500, "All"]],
		"rowCallback": function(row, data, index) {
			if (data.PERCENT_CHANGE_1H > 0) {
				$("td:eq(8)", row).css("color", "Green"); // Assuming The first cell (0) is the Color_Applied column
			} else {
				$("td:eq(8)", row).css("color", "Red"); // Assuming The first cell (0) is the Color_Applied column
			}
			if (data.PERCENT_CHANGE_24H > 0) {
				$("td:eq(9)", row).css("color", "Green"); // Assuming The first cell (0) is the Color_Applied column
			} else {
				$("td:eq(9)", row).css("color", "Red"); // Assuming The first cell (0) is the Color_Applied column
			}
			if (data.PERCENT_CHANGE_7D > 0) {
				$("td:eq(10)", row).css("color", "Green"); // Assuming The first cell (0) is the Color_Applied column
			} else {
				$("td:eq(10)", row).css("color", "Red"); // Assuming The first cell (0) is the Color_Applied column
			}
		},
		columns: [
			{
				title: "#",
				data: "LIN"
			},
			{
				title: "Currency",
				data: "CURRENCY",
				"render": function(data, type, full, meta) {
					return '<a style="color:#55a6de" href="Coin.html?coin=' + data + '">' + data + '</a>';
				}
			},
			{
				title: "Name",
				data: "NAME"
			},
			{
				title: "Price(BTC)",
				data: "PRICE_BTC"
			},
			{
				title: "Price",
				data: "PRICE_" + curr,
				render: $.fn.dataTable.render.number(',', '.', 6, symb1, symb2)
			},
			{
				title: "Supply",
				data: "AVAILABLE_SUPPLY"
			},
			{
				title: "Volume",
				data: "MARKET_CAP_" + curr,
				render: $.fn.dataTable.render.number(',', '.', 2, symb1, symb2)
			},
			{
				title: "Volume(24h)",
				data: "VOLUME_" + curr + "_24H",
				render: $.fn.dataTable.render.number(',', '.', 2, symb1, symb2)
			},
			{
				title: "Change(1H)",
				data: "PERCENT_CHANGE_1H",
				render: $.fn.dataTable.render.number(',', '.', 2, '', ' %') //,
			},
			{
				title: "Change(24h)",
				data: "PERCENT_CHANGE_24H",
				render: $.fn.dataTable.render.number(',', '.', 2, '', ' %') //,
			},
			{
				title: "Change(7D)",
				data: "PERCENT_CHANGE_7D",
				render: $.fn.dataTable.render.number(',', '.', 2, '', ' %') //,
			}
        ],
		"columnDefs": [
			{
				className: "dt-right",
				"targets": [3, 4, 5, 6, 7]
			},
			{
				className: "dt-nowrap",
				"targets": [0, 1, 2]
			}
    ]
	});
});