const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

// Upload Endpoint and 400 is bad request
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }

    const file = req.files.file;
    console.log(file)
   
    // mv is a function to move the file elsewhere on our server and 500 is Internal server error .if path doesnot exist the this error will occur
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    });
});


app.listen(5000, () => console.log("Server Started..."));