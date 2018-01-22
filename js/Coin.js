$(document).ready(function() {
    var v = getUrlVars();
	
	var oBody= {
	    coin:v.coin
	};   
	$.ajax({
		type: "POST",
		url: Get_Path_Coin(),
		processData: false,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(oBody),
		success: function(r) {
			if (r.success === true) {
			    $("#CoinName").text(r.data.NAME);
			    if($.cookie("Currency")=="EUR"){
    			    $("#quote_price").text(r.data.PRICE_EUR);
    			    $("#quote_currency").text("€");
                }else{
    			    $("#quote_price").text(r.data.PRICE_USD);
    			    $("#quote_currency").text("$");
    			    
                }
    			$("#quote_currency_change").text("(" + r.data.PERCENT_CHANGE_24H + ")");
			    
			    $("#quote_btc").text(r.data.PRICE_BTC);
			    $("#quote_btccurrency").text("BTC");
    			    
			    
			    Highcharts.chart('container2', {

                    title: {
                        text: 'Solar Employment Growth by Sector, 2010-2016'
                    },
                
                    subtitle: {
                        text: 'Source: thesolarfoundation.com'
                    },
                
                    yAxis: {
                        title: {
                            text: 'Number of Employees'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            pointStart: 2010
                        }
                    },
                
                    series: [{
                        name: 'Installation',
                        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                    }, {
                        name: 'Manufacturing',
                        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                    }, {
                        name: 'Sales & Distribution',
                        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                    }, {
                        name: 'Project Development',
                        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                    }, {
                        name: 'Other',
                        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                    }],
                
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                
                });
			} else {  
				alert(r.Msg);
			}
		},
		error: function(r) { 
			alert(r.responseText);
		}
	});
	
});