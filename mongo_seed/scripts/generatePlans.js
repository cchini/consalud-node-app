const requestApi = require("request");
const fs = require("fs");
require("dotenv").config();

const generatePlans = async () => {
  await requestApi.get(process.env.URL_GET_PLAN || "", (error, __, body) => {
    if (error) console.log(error);
    if (body) {
      const data = JSON.parse(body).map((item) => {
        const objectData = {
          name: item.Nombre,
          price: item.precio,
          code: item.CodigoPlan,
        };
        return objectData;
      });
      const jsonObj = JSON.stringify(data);
      fs.writeFileSync("plansdata.json", jsonObj);
      console.log("GENERATE PLANS : OK");
    }
  });
};

module.exports = {
  generatePlans,
};
