$(function () {
  $(document).ready(function () {

  	Highcharts.setOptions(Highcharts.theme);

    $('#pie-browser').highcharts({

    	colors: ["#961010", "#BD2929", "#D94C4C", "#FB7A7A","#FFA7A7"],

        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,//null,
            plotShadow: false
        },
        title: {
            text: "Browser"
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size:'100%',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend:{
            layout: 'vertical'
        },
        exporting: {
                enabled: false
        },
        series: [{
            type: 'pie',
            name: 'Browser',
            data: [
                ['Chrome',   45.0],
                ['Firefox',       26.8],
                ['IE',    8.5],
                ['Safari',     6.9]
            ]
        }]
    });
  });
});
