$(function () {
  $(document).ready(function () {

  	Highcharts.setOptions(Highcharts.theme);

    $('#pie-device').highcharts({
        colors: ["#077807", "#199619", "#33AF33", "#53C653","#80DB80"],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,//null,
            plotShadow: false
        },
        title: {
            text: "Device"
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
            name: 'Device',
            data: [
                ['Android',       40.0],
                ['IOS',   35.0],
                ['Windows',    20.0],
                ['Other',    5.0]
            ]
        }]
    });
  });
});
