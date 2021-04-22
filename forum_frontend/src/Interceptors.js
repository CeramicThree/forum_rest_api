var axios = require("axios");

export const jwtToken = localStorage.getItem("authorization");

axios.interceptors.request.use(
  function(config) {
    if (jwtToken) {
      config.headers["authorization"] = "Bearer " + jwtToken;
    }
    return config;
  },
  function(err) {
    console.log("Bearer token not found");
    return Promise.reject(err);
  }
);