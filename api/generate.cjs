const OpenAI = require("openai");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful content creation assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    const content = completion.choices[0].message.content;
    res.status(200).json({ content });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
