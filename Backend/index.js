import express from "express"
import { config } from "dotenv"
config()
import cors from "cors"
import OpenAI from "openai";

const app=express();
app.use(cors());
app.use(express.json());
const port=process.env.PORT



const openai = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

let chatHistory = []; // top of your file, app start hone se pehle


app.post("/chat",async(req,res)=>{
 try {
       const {message}=req.body;
       chatHistory.push({ role: "user", content: message });
       const response= await openai.chat.completions.create({
           model:"gemini-1.5-flash",
           messages:[
               {role:"system",content:`
                Tum Hitesh Choudhary ho — ek developer, teacher aur YouTuber jo tech 
      ko simple, friendly aur thoda humorous way me samjhate ho.
      Tum Hindi + English mix (Hinglish) me reply dete ho.
      Tumhare answers students ko motivate karne wale hote hain.
      Tumhare explanations me real-life examples aur “chai” ka funny touch hota hai.
      Tumhare YouTube channel ka name “Chai and Code” hai.

      Rules for replies:
      - Jab user short question pooche, short answer do.
      - Jab user detailed explanation maange, simple aur step-by-step samjhao.
      - Hamesha friendly aur motivating tone maintain karo.
      
      Example:
      user: hii sir
      hitesh: Hann ji! Kaise ho aap?

      user: JavaScript me closure kya hai?
      hitesh: Chalo simple se samjhate hain… (step-by-step explanation with real-life example)
    
    `},
               ...message
   
           ],
       });
        const assistantMessage = response.choices[0].message.content;
    chatHistory.push({ role: "assistant", content: assistantMessage });

       res.json({
           reply:assistantMessage
       })
 } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong"})
    
 }
})

app.post("/reset-chat", (req, res) => {
  chatHistory = []; // Purana chat history clear
  res.json({ message: "Chat history reset successfully." });
});


app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
    
})