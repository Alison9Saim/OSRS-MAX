const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hiscores = require('osrs-json-hiscores');

// Constants
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';
// App
const app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')))

var playerName = "TSM Draven";
var c_data = "";

const accountTypes = accountTypes2 = [
    {name: "main",          label: "Main",              active: true},
    {name: "ironman",       label: "Ironman",           active: true},
    {name: "ultimate",      label: "Ultimate Ironman",  active: true},
    {name: "hardcore",      label: "Hardcore Ironman",  active: true},
    {name: "deadman",       label: "Deadman",           active: false},
    {name: "tournament",    label: "Tournament",        active: false},
    {name: "seasonal",      label: "Seasonal",          active: false}
]


const user = {
    firstName: 'Tim',
    lastName: 'Cook',
    admin: true,
}


app.get('/', (req, res) => {
    res.render('pages/index', {
        user,
        a: "",
        accountMode: accountTypes,
        accountMode2: accountTypes2,
        playerDetails: "",
        totalEXPRemain: "",
        expToMax: "",
        percentToMax: "",
        title: "Home Page"
    })
    
})


app.get('/support', (req, res) => {
    res.render('pages/support', {
        title: "Support",
        accountMode2: accountTypes2
    })
})


app.get('/contact', (req, res) => {
    res.render('pages/contact', {
        articles: posts,
        accountMode2: accountTypes2,
        title: "Contact"
    })
})


app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: "About",
        accountMode2: accountTypes2
    })
})





app.post('/', (req, res) => {

    var playerName = String(req.body.inputName);
    var accType = String(req.body.accType);

    var accType2 = String(req.body.accType2);

    var levelXP = 13034431;
    var expToMax = 299791913;
    var percentToMax = "";
    var c_data = "";
    var totalEXPRemain = 0;

    //const address = fetch("https://jsonplaceholder.typicode.com/users/1")
    const playerStats = hiscores.getStatsByGamemode(playerName, accType)
    //.then((response) => response)
    .then((data) => {
        return data;
    })
    .catch(error => {
        //console.log("error");
        return "error";
    });

    const DisplayPlayerInfo = async () => {
        const a = await playerStats;
        debugger;
        console.log(a);

        if(a == "error"){
            res.render('pages/index', {
                user,
                a: "error",
                accountMode: accountTypes,
                accountMode2: accountTypes2,
                playerDetails: "",
                totalEXPRemain: "",
                expToMax: "",
                percentToMax: "",
                title: "Home Page"
            })
        }else{

            c_data = a.skills;
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

            expToMax = new Intl.NumberFormat().format(expToMax)
            totalEXPRemain = new Intl.NumberFormat().format(totalEXPRemain)

            //formate object model for rendering
            debugger;

            for (s in c_data){
                //add commas to numbers
                c_data[s].xp = new Intl.NumberFormat().format(c_data[s].xp);
                c_data[s].xpLeft = new Intl.NumberFormat().format(c_data[s].xpLeft);
                c_data[s].rank = new Intl.NumberFormat().format(c_data[s].rank);


                //to cap first letter of skill
                if (c_data.hasOwnProperty(s)) {
                    c_data[s.charAt(0).toUpperCase() + s.slice(1)] = c_data[s];
                    delete c_data[s];
                }

            }
            
            res.render('pages/player', {
                a: "",
                playerDetails: c_data,
                accountMode2: accountTypes2,
                totalEXPRemain,
                expToMax,
                percentToMax,
                user,
                title: "Player Page"
            })
        }
    };

    DisplayPlayerInfo();
    
})




/*
app.get('/', (req, res) => {
    var playerName = String(req.body.rsnName);
    playerName = req.body.rsnName;
    
    //console.log(playerName);
    var accType = req.body.accType;
    //console.log(accType);
    console.log("inside of star")
    
    var levelXP = 13034431;
    var expToMax = 299791913;
    var percentToMax = "";
    var c_data = "";
    var totalEXPRemain = 0;
    
    hiscores.getStatsByGamemode(req.params[0], ironman).then(data => {c_data = data.main.skills;
        c_data = a.skills;
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

        expToMax = new Intl.NumberFormat().format(expToMax)
        totalEXPRemain = new Intl.NumberFormat().format(totalEXPRemain)

        //formate object model for rendering
        debugger;

        for (s in c_data){
            //add commas to numbers
            c_data[s].xp = new Intl.NumberFormat().format(c_data[s].xp);
            c_data[s].xpLeft = new Intl.NumberFormat().format(c_data[s].xpLeft);
            c_data[s].rank = new Intl.NumberFormat().format(c_data[s].rank);


            //to cap first letter of skill
            if (c_data.hasOwnProperty(s)) {
                c_data[s.charAt(0).toUpperCase() + s.slice(1)] = c_data[s];
                delete c_data[s];
            }

        }


        res.render('pages/index', {
            a: "",
            playerDetails: c_data,
            accountMode2: accountTypes2,
            totalEXPRemain,
            expToMax,
            percentToMax,
            user,
            title: "Player Page"
        })
        
    })
    
    
})
*/



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
