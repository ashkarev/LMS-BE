const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        let date = Date.now()
        callback(null, `LMS-${date}-${file.originalname}`)
    }
})

const Filefilter = (req, file, cb) => {
    // Accept images for profile pictures
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
        cb(null, true)
    }
    // Accept PDF and DOC files for resumes
    else if (file.mimetype == 'application/pdf' ||
        file.mimetype == 'application/msword' ||
        file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const multerConfig = multer({ storage, fileFilter: Filefilter })
module.exports = multerConfig