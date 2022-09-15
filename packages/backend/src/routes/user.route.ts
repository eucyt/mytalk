import express from "express";
const router = express.Router();
const userController = require('../controllers/user.controller');
module.exports = router;

router.get('/', userController.getOne);

module.exports = router;