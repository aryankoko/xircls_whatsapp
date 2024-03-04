import React, { useState, useRef } from 'react'

const ResizableTextarea = ({ onChange, initialContent = '', maxLength = 99999999, placeholder = '', minHeight = '70px', name = '' }) => {
  const [content, setContent] = useState(initialContent)
  const textareaRef = useRef()
  const characterCountRef = useRef()

  const updateHeight = () => {
    const textarea = textareaRef.current
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.max(textarea.scrollHeight, parseInt(minHeight, 10))}px`
  }

  const handleChange = (event) => {
    const newContent = event.target.value
    setContent(newContent)

    // Call the passed onChange function
    if (onChange) {
      onChange(event)
    }

    updateHeight()

    // Update character count
    const characterCount = characterCountRef.current
    if (characterCount) {
      characterCount.textContent = `${newContent.length}/${maxLength}`
      characterCount.style.color = newContent.length > maxLength ? 'red' : 'inherit'
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        ref={textareaRef}
        style={{ minHeight, resize: 'none', overflow: 'hidden' }}
        value={content}
        className="form-control form-control-lg rounded-3"
        placeholder={placeholder}
        onChange={handleChange}
        wrap="hard"
        maxLength={maxLength}
        name={name}
      />
      <small
        ref={characterCountRef}
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          color: content.length > maxLength ? 'red' : 'inherit'
        }}
      >
        {content.length}/{maxLength}
      </small>
    </div>
  )
}

export default ResizableTextarea
