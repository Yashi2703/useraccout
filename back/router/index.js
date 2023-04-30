const router = require("express").Router();
const beforeLogin =  require("../controllers/index");
const middleware = require("../Middleware/index")
router.post("/registration",beforeLogin.registration);
router.post("/login",beforeLogin.login);
router.post("/createtask",beforeLogin.createTask);
router.post("/assigntask",beforeLogin.assignTask);
router.delete("/deletuser",beforeLogin.deletUser)
router.put("/activeuser",beforeLogin.activeUser);
router.get("/checkassigntask",beforeLogin.checkUserAssignTask);
router.get("/alltask",beforeLogin.checkAllTask)
router.get("/getalluser",beforeLogin.getAllUser);
router.get("/search",beforeLogin.search);
module.exports = router
