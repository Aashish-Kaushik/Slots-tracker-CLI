const axios = require("axios");
const table = require("tty-table");
const { config, options } = require("./config");
module.exports = (stateid) => {
  axios
    .get(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`,
      config
    )
    .then((response) => {
      let header = [
        {
          value: "district_id",
          headerColor: "cyan",
          color: "white",
          align: "left",
          alias: "DistrictsID",
          width: 20,
        },
        {
          value: "district_name",
          color: "red",
          alias: "District Name",
          width: 60,
        },
      ];
      const out = table(header, response.data.districts, options).render();
      console.log(out);
    })
    .catch((error) => {
      console.log(error);
    });
};
