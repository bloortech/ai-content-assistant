// src/components/PromptForm.tsx
import { useState } from 'react'
import { Button, Input, Stack, useToast, Textarea } from '@chakra-ui/react'

interface PromptFormProps {
  onGenerate: (prompt: string) => Promise<void>
}

export default function PromptForm({ onGenerate }: PromptFormProps) {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) {
      toast({ title: 'Please enter a prompt', status: 'warning' })
      return
    }
    setIsLoading(true)
    try {
      await onGenerate(prompt)
    } catch (error) {
      toast({ title: 'Failed to generate content', status: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What would you like to write about?"
          rows={4}
        />
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Generating..."
        >
          Generate
        </Button>
      </Stack>
    </form>
  )
}
