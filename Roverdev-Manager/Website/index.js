const express = require("express");
const url = require("url");
const path = require("path");
const Discord = require("discord.js");
const ejs = require("ejs");
const passort = require("passport");
const bodyParser = require("body-parser");
const Strategy = require("passport-discord").Strategy;
const passport = require("passport");
const { chownSync } = require("fs");
const layout = require('express-layout');
const { config } = require("process");
const { Console } = require("console");
const GuildStats = require("../Databases/Schema/TicketSystem/GuildStats");

module.exports = async client => {
    //WEBSITE CONFIG BACKEND
    const app = express();
    const session = require("express-session");
    const MemoryStore = require("memorystore")(session);


    //Initalize the Discord Login
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((obj, done) => done(null, obj))
    passport.use(new Strategy({
        clientID: "1051175913016004669",
        clientSecret: "",
        callbackURL: "",
        scope: ["identify"]
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(()=>done(null, profile))
    }
    ))

    app.use(session({
        store: new MemoryStore({checkPeriod: 86400000 }),
        secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
        resave: false,
        saveUninitialized: false
    }))


    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "./views"));


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    //Loading css files

    app.get('/scripts.js', function(req, res) {
        res.redirect(`https://roverdev.xyz`);
       });

       app.get('/styles.css', function(req, res) {
        res.redirect(`https://roverdev.xyz`);
       });

    //LOAD THE ASSETS
    app.use(express.static(path.join(__dirname, './public')));

    app.get("/", (req, res) => {
        res.render("index")
    })

    app.get("/ticketlogs", async (req, res) => {
        let ticket = req.query
        if (ticket['ticket']) {
        ticket = ticket['ticket']

        if (typeof ticket === 'array') {
          ticket = ticket[0]
        } else if (typeof ticket === 'string') {
          ticket = ticket
        }

        const data = await GuildStats.findOne({ Guild: "1081700920993259550" })

        if (!data) {
               return res.json({ error: true, message: 'ERROR | Invalid Ticket' })
        }

        if (data.ClosedTickets < 1) return res.json({ error: true, message: 'No Ticket Transcript Found' })

        if (!data?.ClosedTickets[ticket]) return res.json({ error: true, message: 'No Ticket Transcript Found' })


        if (data) {
            if (data.ClosedTickets) {

                let arrayLength = data.ClosedTickets[ticket].content.message.length


              res.render('transcript', {
                data: data,
                TranscriptNumber: ticket,
                cssdata: require("fs").readFileSync(`/home/Roverdev-Manager/Website/public/TicketTranscript.css`, 'utf8')
              })
            } else {
              res.json({ error: true, message: 'ERROR | This transcript is empty' })
            }
          } else {
            return res.json({ error: true, message: 'ERROR | Invalid Ticket' })
          }
        } else
        return res.json({ error: true, message: 'ERROR | Invalid Transcript' })
      })





    // const checkAuth = (req, res, next) => {
    //     if(req.isAuthenticated()) return next();
    //     req.session.backURL = req.url;
    //     res.redirect("/login");
    // }
    // app.get("/login", (req, res, next) => {
    //     if(req.session.backURL){
    //         req.session.backURL = req.session.backURL
    //     } else if(req.headers.referer){
    //         const parsed = url.parse(req.headers.referer);
    //         if(parsed.hostname == app.locals.domain){
    //             req.session.backURL = parsed.path
    //         }
    //     } else {
    //         req.session.backURL = "/"
    //     }
    //     next();
    //     }, passport.authenticate("discord", { prompt: "none"})
    // );

    // app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), async (req, res) => {
    //     const request = require('request');
    //     request({
    //         url: `https://discordapp.com/api/v8/guilds/1081700920993259550/members/${req.user.id}`,
    //         method: "PUT",
    //         json: {
    //             access_token: req.user.accessToken
    //         },
    //         headers: {
    //             "Authorization": `Bot ${client.token}`
    //         }
    //     });
    //     res.redirect("/")

    // });

    // app.get("/logout", function(req, res) {
    //     req.session.destroy(()=>{
    //         res.redirect("/");
    //     })
    // })


    const http = require("http").createServer(app);
    http.listen(1234, () => {
        console.log(`Website is online on the Port: 1234`);
    });

}