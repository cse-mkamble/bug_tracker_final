const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path")
const Bugs = require('./bugsModel')
require('dotenv').config()
const sendMail = require('./sendEmail')


const app = express()
app.use(express.json())
app.use(cors())

app.get("/api/bugs/", (request, response) => {
    var filter = {}
    if (request.query.priority) {
        filter.priority = request.query.priority
    }
    if (request.query.status) {
        filter.status = request.query.status
    }
    Bugs.find(filter).exec((err, result) => {
        if (err) return response.status(400).json({ err })
        if (result) return response.json(result)
    })
})

app.get("/api/bugs/filter/:status&&:priority", (request, response) => {
    var filter = {}
    if (request.params.priority) {
        filter.priority = request.params.priority
    }
    if (request.params.status) {
        filter.status = request.params.status
    }
    Bugs.find(filter).exec((err, result) => {
        if (err) return response.status(400).json({ err })
        if (result) return response.json(result)
    })
})

app.get("/api/bugs/:id", (request, response) => {
    Bugs.findOne({ _id: request.params.id }).exec((err, result) => {
        if (err) return response.status(400).json({ err })
        if (result) return response.json(result)
    })
})

app.post("/api/bugs", async (request, response) => {
    const { owner, title, status, priority, email, readme } = request.body
    const newBugs = new Bugs({
        owner, title, status, priority, email, readme
    })
    const txt = 'Bug Tracker'
    const message = `
        <div style=" color: #323232; ">
            <div style=" max-width: 600px; margin:auto; font-size: 110%; background: #eaeaea87; padding: 10px; ">
                <div style=" text-align: center; ">
                <img style=" width: 64px; height: 64px; " src="https://res.cloudinary.com/mayurkamble/image/upload/v1626768172/icon/ipd4gsdswurp4qbjcqww.png" />
                    <h2 style="margin: 0 0 10px 0;" >Bug Tracker</h2>
                </div>
                <div style=" padding: 10px; background: #fff; border-radius: 10px; ">
                    <div>
                        <table>
                            <tr>
                                <td><h4 style="margin: 0 20px;">Owner </h4></td>
                                <td>:</td>
                                <td>${owner}</td>
                            </tr>
                            <tr>
                                <td><h4 style="margin: 0 20px;">Title </h4></td>
                                <td>:</td>
                                <td>${title}</td>
                            </tr>
                            <tr>
                                <td><h4 style="margin: 0 20px;">Status </h4></td>
                                <td>:</td>
                                <td>${status}</td>
                            </tr>
                            <tr>
                                <td><h4 style="margin: 0 20px;">Priority </h4></td>
                                <td>:</td>
                                <td>${priority}</td>
                            </tr>
                        </table>
                        <h4 style="margin: 0 20px;">Read Me </h4>
                        <textarea style="width: 100%;
                        height: 40vh;" readonly>
                        ${readme}</textarea>
                    </div>
                </div>
            </div>
        </div>
    `
    sendMail({ to: email, subject: txt, text: message })
    await newBugs.save()
    response.json({ msg: "New Bugs Add!" })
})

app.put('/api/bugs/:id', async function (req, res) {
    var bug = req.body
    var _id = req.params.id
    const updatedBugs = await Bugs.findOneAndUpdate({ _id }, bug, { new: true })
    return res.status(201).json({ updatedBugs })
})

mongoose.connect("mongodb+srv://root:root@cluster0.a0xhf.mongodb.net/bugtracker?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Connected to mongodb")
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Server is running on port', port)
})