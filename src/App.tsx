// src/App.tsx
import { useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import PromptForm from './components/PromptForm'
import ContentDisplay from './components/ContentDisplay'

function App() {
  const [content, setContent] = useState('')

  // We'll call our serverless function at /api/generate
  const handleGenerate = async (prompt: string) => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    if (!res.ok) {
      throw new Error('Failed to generate content')
    }

    const data = await res.json()
    setContent(data.content)
  }

  return (
    <Box p={8} maxW="600px" mx="auto">
      <Heading mb={6} textAlign="center">
        AI Content Assistant
      </Heading>
      <PromptForm onGenerate={handleGenerate} />
      <ContentDisplay content={content} />
    </Box>
  )
}

export default App
