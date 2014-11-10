$(function () {
  $(document).ready(function () {

  	Highcharts.setOptions(Highcharts.theme);

    $('#pie-method').highcharts({

        colors: ["#0A88AC", "#2C9FC0", "#4CB4D2", "#73CAE2","#A6E1F1"],

        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,//null,
            plotShadow: false
        },
        title: {
            text: "REQ Type"
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
            name: 'Req Type',
            data: [
                ['GET',       40.0],
                ['POST',   25.0],
                ['PUT',    20.0],
                ['DELETE',    15.0]
            ]
        }]
    });
  });
});
