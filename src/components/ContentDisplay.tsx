// src/components/ContentDisplay.tsx
import { Box, Button, Code} from '@chakra-ui/react'
// import { FiCopy } from 'react-icons/fi'


interface ContentDisplayProps {
  content: string
}

export default function ContentDisplay({ content }: ContentDisplayProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
  }

  return (
    <Box mt={6} position="relative">
      {content && (
        <Button
          size="sm"
          position="absolute"
          right={4}
          top={4}
          onClick={copyToClipboard}
        //   leftIcon={<Icon as={FiCopy} />}
        >
          Copy
        </Button>
      )}
      <Code
        p={4}
        display="block"
        whiteSpace="pre-wrap"
        borderRadius="md"
        bg="gray.50"
        w="100%"
      >
        {content || 'Your generated content will appear here.'}
      </Code>
    </Box>
  )
}
