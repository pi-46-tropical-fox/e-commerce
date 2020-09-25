const router = require("express").Router();
const Controller = require("../controllers/ProductController");
const authentication = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

router.post("/", authentication, authorization, Controller.create);
router.get("/", authentication, Controller.read);
router.put("/:ProductId", authentication, Controller.update);
router.delete("/:ProductId", authentication, authorization, Controller.delete);

module.exports = router;
