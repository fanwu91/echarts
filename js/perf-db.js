const queryStmt = `
    SELECT BillingCity, COUNT(1) AS 'BillingCnt'
    FROM invoices
    GROUP BY BillingCity 
`;

var perfdb = {};
perfdb.onUpload = function(dbfile) {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(dbfile);
    fileReader.onload = function(file) {
        let arrayBuffer = file.target.result;
        let uInt8Array = new Uint8Array(arrayBuffer);
        let db = new SQL.Database(uInt8Array);
        let resultset = db.exec(queryStmt);
        let columns = resultset[0]['columns'];
        let values = resultset[0]['values'];

        let chartOption = new ChartOption(columns, values);
        console.log(chartOption);

        let chart = echarts.init(document.getElementById('main'));
        chart.setOption(chartOption);
    };
};
