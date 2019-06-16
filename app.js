const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectionUrl = "mongodb+srv://nad123:nad123@cluster0-khwxy.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(connectionUrl, {useNewUrlParser: true})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));
 let fullName='';
 let username='';


let faceWash = [
        "None","NeoCutis Exfoliating Skin Cleanser", "Burt's Bees Soap Bark & Chamomile Deep Cleansing Cream", "Neutrogena Oil-Free Acne Wash Pink", "Dermalogica Dermal Clay CleanserGrapefruit Facial Cleanser", "Tatcha The Deep Cleanse", "Shiseido Refreshing Cleansing Water", "Sunday Riley Ceramic Slip Clay Cleanser", "Skinfood Egg White Pore Foam", "Garnier SkinActive Micellar Foaming Cleanser", "La Roche-Posay Micellar Water Ultra No-Rinse Cleansing Water", "Drunk Elephant Beste No. 9 Jelly Cleanser", "Eau Thermale Avène Cleansing Foam", "Boscia Charcoal Jelly Ball Cleanser", "SkinCeuticals Clarifying Exfoliating Cleanser", "No7 Beautiful Skin Foaming Cleanser"
];

let toner = [
        "None","Ole Henriksen Balancing Force Oil Control Toner", "Omorovicza Omoressence", "Fresh Rose Deep Hydration Facial Toner", "Paula's Choice Skin Balancing Pore-Reducing Toner", "Juice Beauty Hydrating Mist", "Origins United State Balancing Tonic", "Mario Badescu Skin Care Seaweed Cleansing Lotion", "Son & Park Beauty Water", "Liz Earle Instant Boost Skin Tonic", "Shiseido Eudermine Revitalizing Essence", "Clarins Extra-Comfort Toning Lotion", "Alcohol-Free Pixi Glow Tonic", "SkinCeuticals Equalizing Toner", "Lancome Tonique Confort", "PCA Skin Hydrating Toner"
];

let serum = [
        "None", "Caudalie Overnight Detox Oil", "Savor Beauty Renew Pumpkin Seed Serum", "Pai Rosehip BioRegenerate Oil", "The Body Shop Vitamin C Skin Booster Instant Smoother", "Be The Skin Botanical Pore Serum", "It’s Skin Power 10 VB Effector", "Sunday Riley Good Genes All-In-One Lactic Acid Treatment", "First Aid Beauty Skin Lab Retinol Serum", "Odacite Gr+G Serum Concentrate", "Kypris Clearing Serum", "Mizon Original Skin Energy Hyaluronic Acid", "Paula’s Choice RESIST Super Antioxidant Concentrate Serum", "Clinique Acne Solutions Acne + Line Correcting Serum" 
];


let moisturizer =[
        "None", "Glow Recipe Watermelon Pink Juice Moisturizer", "Ole Henriksen C-Rush Brightening Gel Crème", "Sunday Riley Tidal Brightening Enzyme Water Cream", "Simple Hydrating Gel Cream", "L'Occitane Aqua Réotier Ultra Thirst-Quenching Gel", "Belif Pore Cleaner Moisturizer", "Too Cool For School Egg Mellow Cream", "Boscia Cactus Water Moisturizer", "Saturday Skin Waterfall Glacier Water Cream", "Sisley Paris Black Rose Skin Infusion Cream", "Tatcha The Water Cream Moisturizer", "Shiseido Pureness Matifying Moisturizer", "Neutrogena Oil-Free Moisture", "Laura Mercier Tinted Moisturizer SPF 20", "Drunk Elephant B-Hydra Intensive Hydration Gel", "Cosrx Natural BHA Skin Returning Emulsion", "Belif True Cream Aqua Bomb", "CeraVe Facial Moisturizing Lotion", "Origins GinZing Energy-Boosting Moisturizer"
];

let spf = [
        "None", "Neutrogena Hydro Boost Gel Lotion Sunscreen SPF 30", "Avene High Protection Tinted Compact SPF 50", "La Roche-Posay Anthelios AOX Daily Antioxidant Serum with Sunscreen SPF 50", "Cetaphil PRO Oil Absorbing Moisturizer SPF 30", "EltaMD UV Clear Broad Spectrum SPF 46", "Clinique Super City Block Oil-Free Daily Face Protector 40 SPF", "Colorescience Sunforgettable Brush-on Sunscreen SPF 50" 
];

let userSchema = new mongoose.Schema({
        fullName: String,
        email: String,
        userName: String,
        faceWash: String,
        toner: String,
        serum: String,
        moisturizer: String
        });
        
        let user = mongoose.model('user', userSchema);

// Port
const PORT = process.env.PORT || 3000;

//Middleware

//include express modules
app.set('view engine', 'ejs');
app.use("/html", express.static('html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//set static page directories
app.use("/js", express.static("js"));
app.use("/css", express.static("css"))

//MAIN ROUTE
app.get('/', (req, res) => {
        res.render('index.ejs');
          });

// MEMBER SIGN UP FORM ROUTE
app.get('/newMember', (req, res)=> {
        res.render('memberSignUp', { 
                faceWash: faceWash,
                toner: toner,
                serum:serum,
                moisturizer: moisturizer,
                spf: spf
        });
});

//  REGISTRATION ROUTE
app.get('/thankYou', (req, res) => {
        res.render('registrationMessage.ejs', {
                username:username,
        })
});


//SINK CARE ROUTINE ROUTES
app.get('/night_routine', (req, res) => {
        res.render('night.ejs')
});
app.post('/newMember', function(req, res){
        console.log(req.body);
        new user({
                        fullName: req.body.fullName,
                        email: req.body.email,
                        userName: req.body.userName,
                        faceWash: req.body.faceWash,
                        toner: req.body.toner,
                        serum: req.body.serum,
                        moisturizer:req.body.moisturizer    
        }).save();
        res.redirect('/thankYou')
        
})

app.get('/day_routine', (req, res) => { 
        //   Get all companies from the database
        user.find({
                username: username,
                faceWash: faceWash,
                toner: toner,
                serum: serum,
                moisturizer: moisturizer,
                spf: spf,
        }, (err, allUsers) => {
          if(err){
            console.log('THERE WAS AN ERROR: ' + err);
          } else {
            res.render('day', {users: allUsers});
          }
        });
      });


      app.get('/day_routine', (req, res) => {
        res.render('day.ejs', { user: user })
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
