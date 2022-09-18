var perfdb = {
    stmt: `
        SELECT BillingCity, COUNT(1) AS 'BillingCnt'
        FROM invoices
        GROUP BY BillingCity 
    `,
    chart: null,
    chartElm: document.getElementById('main'),
    chartLoaderElm: document.getElementById('loader'),

    onPreUpload: function() {
        while (this.chartElm.firstChild) {
            this.chartElm.removeChild(this.chartElm.lastChild);
        }
        if (this.chart != null && this.chart != '' && this.chart != undefined) {
            this.chart.dispose();
        }
        this.chart = echarts.init(this.chartElm);
    },

    onUploading: function(dbfile) {
        let self = this;
        this.chartLoaderElm.style.display = 'flex';
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(dbfile);
        fileReader.onload = function(file) {
            let arrayBuffer = file.target.result;
            let uInt8Array = new Uint8Array(arrayBuffer);
            let db = new SQL.Database(uInt8Array);
            let resultset = db.exec(self.stmt);
            let columns = resultset[0]['columns'];
            let values = resultset[0]['values'];

            let chartOption = new ChartOption(columns, values);
            console.log(chartOption);

            self.chartLoaderElm.style.display = 'none';
            self.chart.setOption(chartOption);
        };
    },

    onPostUpload: function() {}
};
