process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = function crawler() {
    var Crawler = require("crawler");
    var c = new Crawler({
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                let tableInfection = $("div[style='height:530px;overflow-y: auto;border: 1px dotted #666;padding: 5px;']").text();
                console.log(tableInfection);
                // console.log(tableInfection.indexOf("BN124"));
                // console.log(tableInfection.slice(0, tableInfection.indexOf("BN124")-3));
            }
            done();
        }
    });
    c.queue('https://ncov.moh.gov.vn/');
}