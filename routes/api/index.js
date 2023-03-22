let router = require("express").Router();

router.use("/user", require("./user"));
router.use("/admin", require("./admin"));
router.use("/verify", require("./verification"));
router.use("/vehicle", require("./vehicle"));
router.use("/floor", require("./floor"));
router.use("/booking", require("./booking"));

module.exports = router;
