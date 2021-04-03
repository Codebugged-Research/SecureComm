const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploaded');
    },
    filename:(req, file, cb) => {
        cb(null, 'chatApp'+'-'+Date.now() + path.extname(file.originalname))
    }
})

let mime = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if(mime.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb('Unsupported File Type', false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 1024*1024*3}
}).single('fileSend');

exports.fileController = (req, res) => {
    upload(req, res, err => {
        if(err){
            if(typeof err === 'string'){
                return res.status(500).json({
                    err: err
                })
            } else if(typeof err === 'object'){
                return res.status(500).json({
                    err: err.message
                })
            } else {
                return res.status(500).json({
                    err:'Something went wrong'
                })
            }
        } else {
            return res.status(200).json({
                sendFile: req.file.filename
            })
        }
    })
}

exports.getFileController = (req, res) => {
    const { original, fileName } = req.body;

    let pathFile = path.join(__dirname, '..' , 'uploaded', `${fileName}`)

    if(fs.existsSync(pathFile)){
        res.download(pathFile, `${original}`)
    } else {
        return res.status(500).json({
            message: "File Not Found"
        })
    }
}