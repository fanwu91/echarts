(function() {
    let config = {locateFile: () => "./sql-wasm.wasm"}
    initSqlJs(config).then(function(SQL){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "./chinook.db", true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            const contents = db.exec("SELECT * FROM AnimationVessel order by Id");
            console.log(JSON.stringify(contents));
        };
        xhr.send();
    });
})();
