const axios = require("axios");

export const GetList = (size, cb) => {
  const data = JSON.stringify({
    radius: size.radius,
    weight: size.weight,
    height: size.height,
  });

  const config = {
    method: "post",
    url: "https://api.general.tk/truckcrane/list",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response) {
        cb(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
