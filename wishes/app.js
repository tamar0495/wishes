const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');

const OpenAIAPI = require('openai');
const openai = new OpenAIAPI({ apiKey:process.env.OPENAI_API_KEY })

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
const runPrompt = async (req,res) => {
    console.log("000000000",req.body);
    const userInput =req.body;
    const prompt =
        `hi, please write me   a ${userInput.mood} ${userInput.wishType} for ${userInput.person}'s ${userInput.event},
      
        `;
    console.log("prompt is:",prompt);

    const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 400,
        n: 3 
        });
        console.log(response);
    const opt1 = response.choices[0].text;
    const opt2 = response.choices[1].text;
    const opt3 = response.choices[2].text;

    res.send({"opt1":opt1,
              "opt2":opt2,
              "opt3":opt3})


    }
app.use(cors());
app.post('/prompts', (req, res) => {
  
    console.log(req.body);
    runPrompt(req,res)

})
app.listen(8989, (req, res) => {
    console.log('app running')
});
