import { useEffect, useRef, useState, useCallback } from 'react'

import { useField } from '@unform/core'

import { Container } from './styles'

type inputProps = {
  name: string
  placeholder: string
}

const Input = ({ name, placeholder, ...rest }: inputProps) => {
  const inputRef = useRef(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, registerField } = useField(name)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    console.log(`input?`, placeholder)
    setIsFilled(!!inputRef.current)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={inputRef}
        {...rest}
      />
    </Container>
  )
}

export default Input
