const axios = require("axios");
const table = require("tty-table");
const chalk = require("chalk");
const { config, options } = require("./config");
module.exports = (id) => {
  const date = new Date();
  const todaysDate = `${date.getDate()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${date.getFullYear()}`;
  axios
    .get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${todaysDate}`,
      config
    )
    .then((response) => {
      // console.table(response.data);
      let header = [
        {
          value: "center",
          headerColor: "cyan",
          color: "white",
          align: "left",
          alias: "Center Name",
          width: 20,
        },
        { value: "address", color: "red", alias: "Center Address", width: 50 },
        {
          value: "available",
          color: "red",
          alias: "Capacity",
          width: 50,
        },
        {
          value: "age",
          color: "red",
          alias: "Age",
          width: 50,
        },
      ];
      const finalData = [];

      response.data.centers.forEach((item) => {
        item.sessions.forEach((session) => {
          let ourData = {
            center: item.name,
            address: item.address,
            available: session.available_capacity,
            age: session.min_age_limit,
          };
          finalData.push(ourData);
        });
      });
      console.log(chalk.blue(` Day=${todaysDate}`));

      const out = table(header, finalData, options).render();
      console.log(out);
    })
    .catch((error) => {
      console.log(error);
    });
};
