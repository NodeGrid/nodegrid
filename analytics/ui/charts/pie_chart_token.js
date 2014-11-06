$(function () {
  $(document).ready(function () {

  	Highcharts.setOptions(Highcharts.theme);

    $('#pie-token').highcharts({
        colors: ["#8105EC", "#A23EF9", "#A23EF9", "#CB94FB"],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,//null,
            plotShadow: false
        },
        title: {
            text: "Auth"
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
        exporting: {
                enabled: false
        },
        legend:{
            layout: 'vertical'
        },
        series: [{
            type: 'pie',
            name: 'token',
            data: [
                ['With Token',       80.0],
                ['WithOut Token',   20.0],
                ['System',   0.0],
                ['Analytics',   0.0]
            ]
        }]
    });
  });
});
