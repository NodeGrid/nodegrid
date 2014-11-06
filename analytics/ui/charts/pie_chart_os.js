$(function () {
  $(document).ready(function () {

  	Highcharts.setOptions(Highcharts.theme);

    $('#pie-os').highcharts({
        colors: ["#A36505", "#CE8514", "#ECA539", "#FFC060","#FFD18A"],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,//null,
            plotShadow: false
        },
        title: {
            text: "OS"
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
            name: 'OS',
            data: [
                ['Unix',       60.0],
                ['Windows',   30.0],
                ['Mac',    10.0],
                ['Other',    0.0]
            ]
        }]
    });
  });
});
