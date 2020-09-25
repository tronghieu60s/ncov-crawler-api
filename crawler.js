process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var Crawler = require("crawler");
let covid19Model = require("./models/covid19");

module.exports = function crawler() {
  vietnam();
  world();
};

const vietnam = () => {
  const vietnam = new Crawler({
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const cases = $(".font24").eq(0).text();
        const treatment = $(".font24").eq(1).text();
        const recovered = $(".font24").eq(2).text();
        const deaths = $(".font24").eq(3).text();
        const vietnam = { cases, treatment, deaths, recovered };
        if (cases !== "")
          covid19Model.findOneAndUpdate(
            { success: true },
            { vietnam },
            (err) => {
              if (err) console.log(err);
            }
          );
      }
      done();
    },
  });
  vietnam.queue("https://ncov.moh.gov.vn/");
};

const world = () => {
  const world = new Crawler({
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const data = $("div[class='maincounter-number'] > span");
        const cases = $(data[0]).text().trim();
        const deaths = $(data[1]).text().trim();
        const recovered = $(data[2]).text().trim();
        const global = { cases, deaths, recovered };

        if (cases !== "")
          covid19Model.findOneAndUpdate(
            { success: true },
            { global },
            (err) => {
              if (err) console.log(err);
            }
          );
      }
      done();
    },
  });
  world.queue("https://www.worldometers.info/coronavirus/");
};
