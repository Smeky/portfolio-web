'use client'
import { useEffect, useState } from 'react'
import styles from './AnimatedText.module.css'
import AnimatedTextCaret from './AnimatedTextCaret'
import clsx from 'clsx'

interface AnimatedTextProps {
  strings: string[]
  speed?: number
  pause?: number
  delay?: number
  loop?: boolean
  onEnd?: () => void
  className?: string
}

export default function AnimatedText({ strings, speed = 50, pause = 2000, delay = 0, loop = true, onEnd = () => {}, className }: Readonly<AnimatedTextProps>) {
  const [index, setIndex] = useState(0)
  const [animatedString, setAnimatedString] = useState('')
  const [backspace, setBackspace] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [initial, setInitial] = useState(true)

  /**
   * Can be improved by:
   *  - Randomly change the typing and backspace speed
   *  - Add pretext that can sometimes be deleted as well "by accident" 
   */

  useEffect(() => {
    let interval: NodeJS.Timeout

    const startAnimation = () => {
      interval = setInterval(() => {
        if (!backspace) {
          if (animatedString.length < strings[index].length) {
            setAnimatedString(strings[index].slice(0, animatedString.length + 1))
          }
          else {
            clearInterval(interval)
            setIsWaiting(true)

            if (!loop && index === strings.length - 1) return onEnd()

            setTimeout(() => {
              setIsWaiting(false)
              setBackspace(true)
            }, pause)
          }
        }
        else {
          if (animatedString.length > 0) {
            setAnimatedString(strings[index].slice(0, animatedString.length - 1))
          }
          else {
            clearInterval(interval)
            setBackspace(false)
            setIndex((index + 1) % strings.length)
          }
        }
      }, backspace ? speed / 3 : speed)
    }

    // Initial start delay
    let timeout: NodeJS.Timeout
    if (initial) {
      timeout = setTimeout(() => {
        setInitial(false)
        startAnimation()
      }, delay)
    }
    else {
      startAnimation()
    }
    
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [animatedString, index, backspace, isWaiting])
  
  return (
    <span className={clsx(className, styles.empty)}>{ animatedString }<AnimatedTextCaret hidden={!isWaiting} /></span>
  )
}
