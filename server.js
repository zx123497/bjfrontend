const express = require('express')
const fs = require('fs')
const favicon = require('express-favicon')
const path = require('path')
const https = require('https')
const privateKey = fs.readFileSync('/etc/letsencrypt/live/lbdgame.mgt.ncu.edu.tw/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/lbdgame.mgt.ncu.edu.tw/fullchain.pem', 'utf8')
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: certificate,
}
const port = process.env.PORT || 8000
const app = express()
app.use(favicon(__dirname + '/build/favicon.ico'))
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))
app.get('/ping', function (req, res) {
    return res.send('pong')
})
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

var httpsServer = https.createServer(credentials, app)
httpsServer.listen(port)
