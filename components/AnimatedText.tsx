'use client'
import { useEffect, useState } from 'react'
import styles from './AnimatedText.module.css'
import AnimatedTextCaret from './AnimatedTextCaret'

interface AnimatedTextProps {
  strings: string[],
  duration: number,
  delay: number,
  inversed?: boolean
}

export default function AnimatedText({ strings, duration, delay }: Readonly<AnimatedTextProps>) {
  const [index, setIndex] = useState(0)
  const [animatedString, setAnimatedString] = useState('')
  const [reversed, setReversed] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  /**
   * Can be improved by:
   *  - Randomly change the typing and backspace speed
   *  - Add pretext that can sometimes be deleted as well "by accident" 
   */
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!reversed) {
        if (animatedString.length < strings[index].length) {
          setAnimatedString(strings[index].slice(0, animatedString.length + 1))
        }
        else {
          clearInterval(interval)
          setIsWaiting(true)
          setTimeout(() => {
            setIsWaiting(false)
            setReversed(true)
          }, delay)
        }
      }
      else {
        if (animatedString.length > 0) {
          setAnimatedString(strings[index].slice(0, animatedString.length - 1))
        }
        else {
          clearInterval(interval)
          setReversed(false)
          setIndex((index + 1) % strings.length)
        }
      }
    }, reversed ? duration / 3 : duration)
    
    return () => clearInterval(interval)
  }, [animatedString, index, reversed, isWaiting])
  
  return (
    <span className={styles.empty}>{ animatedString }<AnimatedTextCaret hidden={!isWaiting} /></span>
  )
}
