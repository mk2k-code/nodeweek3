var express = require('express');
var router = express.Router();
const fetch = require("cross-fetch");

/* GET web server external ip address. */
router.get('/', async function(req, res, next) {
    const url = "https://api.ipify.org?format=json";
    const myHost = "polar-reaches-82211.herokuapp.com";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            res.status(200).json({
                host: myHost,
                ip: data.ip,
              })
        })
        .catch((error) => console.log(error, 2));
  });

module.exports = router;
