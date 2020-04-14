process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var Crawler = require("crawler");
let covid19Model = require('./models/covid19');

module.exports = function crawler() {
    vietnam();
    world();
}

function vietnam() {
    var vietnam = new Crawler({
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                let cases = $(".box-tke .fivecolumns:nth-child(1) div:nth-child(2) span").text();
                let deaths = $(".box-tke .fivecolumns:nth-child(1) div:nth-child(5) span").text();
                let recovered = $(".box-tke .fivecolumns:nth-child(1) div:nth-child(4) span").text();
                let vietnam = { cases, deaths, recovered };
                if (cases !== "") {
                    covid19Model.findOneAndUpdate({ success: true }, { vietnam }, (err) => {
                        if (err) console.log(err);
                    })
                }
            }
            done();
        }
    });
    vietnam.queue('https://ncov.moh.gov.vn/');
}

function world() {
    var world = new Crawler({
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                let data = $("div[class='maincounter-number'] > span");
                let cases = $(data[0]).text().trim();
                let deaths = $(data[1]).text().trim();
                let recovered = $(data[2]).text().trim();
                let global = { cases, deaths, recovered };

                let countries = [];
                let countryNumber = 5;
                for (let i = 1; i <= countryNumber; i++) {
                    let c_name = $(`#main_table_countries_today tbody:nth-child(even) tr:nth-child(${i}) td:nth-child(1)`).text();
                    let c_cases = $(`#main_table_countries_today tbody:nth-child(even) tr:nth-child(${i}) td:nth-child(2)`).text();
                    let c_deaths = $(`#main_table_countries_today tbody:nth-child(even) tr:nth-child(${i}) td:nth-child(4)`).text();
                    let country = {c_name, c_cases, c_deaths}
                    countries.push(country);
                }

                if (cases !== "") {
                    covid19Model.findOneAndUpdate({ success: true }, { global, countries }, (err) => {
                        if (err) console.log(err);
                    })
                }
            }
            done();
        }
    });
    world.queue('https://www.worldometers.info/coronavirus/');
}