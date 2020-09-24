const router = require("express").Router();
const Controller = require("../controllers/CartController");

router.post("/", Controller.create);
router.get("/", Controller.read);
router.put("/:CartId", Controller.update);
router.delete("/:CartId", Controller.delete);

module.exports = router;
