const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const hiscores = require('osrs-json-hiscores');

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
// App
const app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}));

var playerName = "TSM Draven";
var c_data = "";

const accountTypes = [
    {name: "main",          label: "Main",              active: true},
    {name: "ironman",       label: "Ironman",           active: true},
    {name: "ultimate",      label: "Ultimate Ironman",  active: true},
    {name: "hardcore",      label: "Hardcore Ironman",  active: true},
    {name: "deadman",       label: "Deadman",           active: false},
    {name: "tournament",    label: "Tournament",        active: false},
    {name: "seasonal",      label: "Seasonal",          active: false}
]

const posts = [
    {title: 'Title 1', body: 'Body 1' },
    {title: 'Title 2', body: 'Body 2' },
    {title: 'Title 3', body: 'Body 3' },
    {title: 'Title 4', body: 'Body 4' },
]


const user = {
    firstName: 'Tim',
    lastName: 'Cook',
    admin: true,
}





app.get('/contact', (req, res) => {
    res.render('pages/contact', {
        articles: posts,
        title: "Contact"
    })
})


app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: "About"
    })
})

app.get('/', (req, res) => {

    res.render('pages/index', {
        user,
        accountMode: accountTypes,
        playerDetails: "",
        totalEXPRemain: "",
        expToMax: "",
        percentToMax: "",
        title: "Home Page"
    })
    
})



app.post('/', (req, res) => {

    var playerName = String(req.body.inputName);
    //console.log(req.body.playerName);

    console.log(playerName);


    var accType = String(req.body.accType);
    console.log(accType);

    var levelXP = 13034431;
    var expToMax = 299791913;
    var percentToMax = "";
    var c_data = "";
    var totalEXPRemain = 0;
    
 
    
    hiscores.getStatsByGamemode(playerName, accType).then(data => {
        
        debugger;
        console.log(data);
        c_data = data.skills;

        if(data == "undefined"){
            console.log("no player found");

        }

        console.log(data);
        totalEXPRemain = 0;
        delete c_data.overall;
        for (i in c_data){
            if(c_data[i].level == 99){
                c_data[i].xpLeft = 0;
            }else{
                c_data[i].xpLeft = 13034431 - c_data[i].xp;
                totalEXPRemain = totalEXPRemain + c_data[i].xpLeft;
            }
        }
        percentToMax = (totalEXPRemain/expToMax) * 100;
        percentToMax = 100-percentToMax;

        var d = percentToMax.toLocaleString("en-US");
        percentToMax = d;


        res.render('pages/player', {
            playerDetails: c_data,
            totalEXPRemain,
            expToMax,
            percentToMax,
            user,
            title: "Home Page"
        })
        
    })
    
})





app.get('/*', (req, res) => {
    var playerName = String(req.body.rsnName);
    playerName = req.body.rsnName;
    
    console.log(playerName);
    var accType = req.body.accType;
    console.log(accType);
    console.log("inside of star")
    /*
    var levelXP = 13034431;
    var expToMax = 299791913;
    var percentToMax = "";
    var c_data = "";
    var totalEXPRemain = 0;
    
    hiscores.getStatsByGamemode(req.params[0], ironman).then(data => {c_data = data.main.skills;
        totalEXPRemain = 0;
        delete c_data.overall;
        for (i in c_data){
            if(c_data[i].level == 99){
                c_data[i].xpLeft = 0;
            }else{
                c_data[i].xpLeft = 13034431 - c_data[i].xp;
                totalEXPRemain = totalEXPRemain + c_data[i].xpLeft;
            }
        }
        percentToMax = (totalEXPRemain/expToMax) * 100;
        percentToMax = 100-percentToMax;

        var d = percentToMax.toLocaleString("en-US");
        percentToMax = d;


        res.render('pages/index', {
            playerDetails: c_data,
            totalEXPRemain,
            expToMax,
            percentToMax,
            user,
            title: "Home Page"
        })
        
    })
    */
    
})




app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
