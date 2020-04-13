const express = require('express')
const router = express.Router()

const NetworkPolicyController = require('../app/controller/NetworkPolicyController')
const PlanNameController = require('../app/controller/PlanNameController')
const ClusterController = require('../app/controller/ClusterController')
const DcDataController = require('../app/controller/DcDataController')
const HostNameController = require('../app/controller/HostNameController')
const UsersController = require("../app/controller/UsersController");
const { authenticateUser } = require("../app/middlewares/authentication");

router.get('/platform/v1/cluster_list', authenticateUser, ClusterController.list)
router.post('/platform/v1/cluster_list', authenticateUser, ClusterController.create)
router.put('/platform/v1/cluster_list/:id', authenticateUser, ClusterController.update)
router.get('/platform/v1/cluster_list/:id', authenticateUser, ClusterController.show)
router.delete('/platform/v1/cluster_list/:id', authenticateUser, ClusterController.delete)

router.get('/admin/hostname', HostNameController.list)
router.put('/admin/hostname/:id', HostNameController.update)


router.get('/platform/v1/network_policy', NetworkPolicyController.list)


router.get('/platform/v1/plan_name', PlanNameController.list)


router.get('/platform/v1/deploy', DcDataController.list)
router.get('/platform/v1/deploy/:id', DcDataController.show)
router.post('/platform/v1/deploy', DcDataController.create)
router.put('/platform/v1/deploy/:id', DcDataController.update)
router.delete('/platform/v1/deploy/:id', DcDataController.delete)


router.post("/users/register", UsersController.register);
router.post("/users/login", UsersController.login);
router.delete("/users/logout", authenticateUser, UsersController.logout);
router.get("/users/account", authenticateUser, UsersController.account);


module.exports = router