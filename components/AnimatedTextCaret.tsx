'use client'

import { useEffect, useState } from 'react'

interface AnimatedTextCaretProps {
  hidden?: boolean
}

export default function AnimatedTextCaret({ hidden }: Readonly<AnimatedTextCaretProps>) {
  const [ visible, setVisible ] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setVisible(!visible), 500)
    return () => clearInterval(interval)
  }, [visible, hidden])

  return (
    <span className={!hidden && visible ? 'hidden' : 'visible'}>_</span>
  )
}
