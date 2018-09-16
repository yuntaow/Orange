const express = require("express");

const home = require("../controller/home.js");
const hello = require("../controller/hello.js");
const mapbox = require("../controller/mapbox.js");

const microViewForm = require("../controller/api/microViewFormApi.js");

const router = express.Router();

router.get('/', home.home);
router.get('/hello', hello.hello);

router.get('/mapbox', mapbox.showMapbox);
router.post('/mapbox', mapbox.microViewForm);

router.post('/api/microViewForm', microViewForm.microViewFormApi);
router.post('/api/getAllStopIdInSuburb', microViewForm.getAllStopIdInSuburb);
router.post('/api/getScanOnStopCount', microViewForm.getScanOnStopCount);

module.exports = router;