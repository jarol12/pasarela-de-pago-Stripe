const Router =  require("express");
const createSession = require("../controllers/payment.controller.js");

const router = Router();



router.post("/create-order", createSession);

router.get("/payment/success",  (req, res) => res.redirect("http://localhost:5173/pay/success"));

router.get("/payment/failure", (req, res) => res.redirect("http://localhost:5173/pay/failure"));

module.exports = router;