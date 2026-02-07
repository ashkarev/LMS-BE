const express = require('express')
const userAuthController = require('./Controller/userAuthController')
const jwtMiddleware = require('./middleware/jwtMiddleware')

const jwtAdminMiddleware = require('./middleware/jwtAdminMiddleware')
const userController = require('./Controller/userController')
const multerConfig = require('./middleware/multerMidlleware')
const jobController = require('./Controller/jobController')
const applicationController = require('./Controller/applicationController')
const courseController = require('./Controller/courseController')



const router = new express.Router()

router.post('/register', userAuthController.registerUser)
router.post('/login', userAuthController.loginUser)
router.post('/googleLogin', userAuthController.googleLogin)


router.get('/userDetails', jwtMiddleware, userController.getUserDetails)
router.get('/userDetails/:id', jwtMiddleware, userController.getUserDetails)


router.patch('/editProfile/:id', jwtMiddleware, multerConfig.single('proPic'), userController.updateUser)

//admin
router.get('/AllUsers', jwtAdminMiddleware, userController.getAllUsers)

router.post('/addJob', jwtAdminMiddleware, jobController.addjob)
router.get('/getAllJobs', jobController.getJobs)


router.delete('/:id/deleteJob', jwtAdminMiddleware, jobController.deleteJob)

//application routes
router.post('/applyJob', multerConfig.single('resume'), applicationController.ApplyJob)
router.get('/getAllApplication', jwtAdminMiddleware, applicationController.getJob)
router.delete('/:id/deleteApplication', jwtAdminMiddleware, applicationController.deleteApplication)

// Course routes
router.post('/addCourse', jwtAdminMiddleware, multerConfig.single('img'), courseController.addCourse)
router.get('/getAllCourses', courseController.getAllCourses)
router.delete('/:id/deleteCourse', jwtAdminMiddleware, courseController.deleteCourse)

module.exports = router
