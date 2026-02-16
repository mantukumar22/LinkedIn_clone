import { Router } from "express";
import multer from "multer";
import { acceptConnectionRequest, DownloadProfile, getAllUserProfile, getMyConnectionsRequests, getUserAndProfile, getUserProfileAndUserBasedOnUsername, login, register, sendConnectionRequest, updateUserProfile, updatteProfileData, whatAreMyConnections } from "../controllers/user.controller.js";
import { uploadProfilePicture } from "../controllers/user.controller.js";
const router = Router();

const storage = multer.diskStorage({
    distination: (req, file, cb) => {
        cd(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({storage: storage})

router.route("/update_profile_picture")
      .post(upload.single('profile_picture'), uploadProfilePicture)

router.route('/register').post(register)
router.route('/login').post(login)
router.route("/user_updatess").post(updateUserProfile)
router.route("/get_user_and_profile").get(getUserAndProfile)
router.route("/update_profile_data").post(updatteProfileData)
router.route("/user/get_all_users").get(getAllUserProfile)
router.route("/user/download_resume").get(DownloadProfile)
router.route("/user/send_connection_request").post(sendConnectionRequest)
router.route("/user/getConnectionRequests").get(getMyConnectionsRequests);
router.route("/user/user_connection_request").get(whatAreMyConnections)
router.route("/user/accept_connection_request").post(acceptConnectionRequest);
router.route("/user/get_profile_based_on_username").get(getUserProfileAndUserBasedOnUsername);


export default router ;