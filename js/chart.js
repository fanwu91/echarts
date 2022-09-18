function ChartOption(columns, values) {
    this.title = {};
    this.legend = {};
    this.xAxis = {};
    this.yAxis = {};
    this.series = [];

    this.title.text = 'Billing Cnt by City';
    this.xAxis.data = [];
    this.series.push({
        name: 'billing',
        type: 'bar',
        data: []
    });
    for (let value of values) {
        this.xAxis.data.push(value[0]);
        this.series[0].data.push(value[1]);
    }
}
