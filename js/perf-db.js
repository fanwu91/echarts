var perfdb = {};
perfdb.onUploded = function(dbfile) {
        let fileReader = new FileReader();
        fileReader.onload = function(file) {
            let arrayBuffer = file.target.result;
            let uInt8Array = new Uint8Array(arrayBuffer);
            let db = new SQL.Database(uInt8Array);
            let stmt=`SELECT * FROM employees`;
            let resultset = db.exec(stmt);
            let columns = resultset[0]['columns'];
            let values = resultset[0]['values'];
            let jsonOutput = [];
            for(let valArr of values) {
                let obj = {};
                for(let v in valArr) {
                    obj[columns[v]] = valArr[v];
                }
                jsonOutput.push(obj);
            }
            console.log(jsonOutput);
        };
        fileReader.readAsArrayBuffer(dbfile);
};
