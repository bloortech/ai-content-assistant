// api/generate.js
const { Configuration, OpenAIApi } = require('openai')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt } = req.body
  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided' })
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // from vercel env
    })
    const openai = new OpenAIApi(configuration)

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful content creation assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
    })

    const content = response.data.choices[0].message.content
    res.status(200).json({ content })
  } catch (error) {
    console.error('Error generating content:', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
