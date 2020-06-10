const redis = require('redis');

//Create Redis client
let client = redis.createClient();

//Listening on connection
client.on('connect', ()=>{
     console.log("Connected to redis...");
});
client.on('error', () => {
    console.log(error);
});

const getInvites = (req, res, next)=>{
    
    client.hgetall(invites, async (err, data) => {

        if(err){

            res.status(500).json({"error": err});

        }else{

            let data = req.params.invites;
            let result = [];

            data.foreach(async(email, username, inviteCode)=>{

                await result.push({Email:email, Username: username, InviteCode:inviteCode});

            });
            res.status(200).json.stringify(result);


        }


    });

};

module.exports = getInvites;