const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser');
// const mailer = require("./services/mail") // send email
const sendHandler = require("../controllers/send");
const verifyHandler = require("../controllers/verify");
const router = express.Router({ automatic405: true });
const app = express();
app.use(bodyparser.json())
app.use(cors());
app.use(express.json());

router.get('/',async (req, res)=>{
    console.log('Invites home');
    res.send('Invites Home reached')
})
router.post("/send", async (req, res) => {
    await sendHandler(req,res)
    res.json({
        msg: 'why now'
    })
}
);
// app.post("/verify", verifyHandler);

app.use((err, req, res, next) =>
  res.status(500).json({
    message: "an error occured while processing your request",
  })
);



module.exports =  router; 