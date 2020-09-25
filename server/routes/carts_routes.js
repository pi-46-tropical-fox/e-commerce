const router = require("express").Router();
const Controller = require("../controllers/CartController");
const authentication = require("../middlewares/authentication");
const { customer_authorization } = require("../middlewares/authorization");

router.use(authentication);
router.post("/", Controller.create);
router.get("/", Controller.read);
router.put("/:CartId", customer_authorization, Controller.update);
router.delete("/:CartId", customer_authorization, Controller.delete);

module.exports = router;
