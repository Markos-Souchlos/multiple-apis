import express, { application } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

app.get("/", (req,res) => {
    res.render("index.ejs");
});


//url shortener
app.post("/url-shortener", (req,res) => {
    res.render("url-shortener.ejs");
});

app.post("/post-url",async (req,res) => {
    const url = req.body.url;
    try {
        const response = await axios.post(`https://cleanuri.com/api/v1/shorten`,{
            url: url
        });
        res.render("url-shortener.ejs", {content: JSON.stringify(response.data.result_url)});
    } catch (error) {
        res.render("url-shortener.ejs", {content: "Your url is not valid"});
    }
});


//fetch dad joke
app.post("/dad-joke", async (req,res) => {
    
    try {
        const response = await axios.get("https://icanhazdadjoke.com",{
            headers: {
                Accept: 'application/json'
            }
        });
        console.log(response.data.joke)
        res.render("dad-jokes.ejs", {content: JSON.stringify(response.data.joke)});
    } catch (error) {
        res.render("dad-jokes.ejs", {content: JSON.stringify(response.data.joke)});
    }

});