const express = require('express');
const router = express.Router();
const randnumController = require('../../controller/Hrand');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(randnumController.getrand)

router.route('/get')
    .get(randnumController.setrand)

router.route('/all')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), randnumController.getAll);

router.route('/check')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), randnumController.checkDupilcate);

router.route('/giveBy')
    .get(randnumController.giveBy);

module.exports = router;