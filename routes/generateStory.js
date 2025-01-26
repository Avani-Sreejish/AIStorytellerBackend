import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: ''
    , dangerouslyAllowBrowser: true
  });

import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: prompt,
            },
        ],
        store: true,
    });
    
    console.log(completion.choices[0].message);

    const story = completion.choices[0].message;

    const image = await openai.images.generate({ model: "dall-e-3", prompt: prompt });

    console.log(image);
  const imageUrl = image.data[0].url;
    res.json({ story,image: imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error generating story' });
  }
});

export default router;


