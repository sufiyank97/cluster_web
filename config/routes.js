const express = require('express')
const router = express.Router()

const NetworkPolicyController = require('../app/controller/NetworkPolicyController')
const PlanNameController = require('../app/controller/PlanNameController')
const ClusterController = require('../app/controller/ClusterController')
const DcDataController = require('../app/controller/DcDataController')
const HostNameController = require('../app/controller/HostNameController')

router.get('/platform/v1/cluster_list', ClusterController.list)
router.post('/platform/v1/cluster_list', ClusterController.create)
router.put('/platform/v1/cluster_list/:id', ClusterController.update)
router.get('/platform/v1/cluster_list/:id', ClusterController.show)
router.delete('/platform/v1/cluster_list/:id', ClusterController.delete)

router.get('/admin/hostname', HostNameController.list)
router.post('/admin/hostname', HostNameController.create)
router.put('/admin/hostname/:id', HostNameController.update)

router.get('/platform/v1/network_policy', NetworkPolicyController.list)
router.post('/platform/v1/network_policy', NetworkPolicyController.create)

router.get('/platform/v1/plan_name', PlanNameController.list)
router.post('/platform/v1/plan_name', PlanNameController.create)

router.get('/platform/v1/deploy', DcDataController.list)
router.get('/platform/v1/deploy/:id', DcDataController.show)
router.post('/platform/v1/deploy', DcDataController.create)
router.put('/platform/v1/deploy/:id', DcDataController.update)
router.delete('/platform/v1/deploy/:id', DcDataController.delete)

module.exports = router