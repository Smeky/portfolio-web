'use client'
import React from 'react'

interface SwiperProps {
  children: React.ReactNode,
  index: number
}

export default function Swiper({ children, index }: Readonly<SwiperProps>) {
  const [ activeIndex, setActiveIndex ] = React.useState(index)
  const indexRef = React.useRef(index)
  indexRef.current = index

  const onLeaveEnd = React.useCallback(() => {
    setActiveIndex(indexRef.current)
  }, [])

  const childrenWithProps = React.useMemo(() => {
    return React.Children.map(children, (child, i) => React.cloneElement(child, { isLeaving: i !== index, onLeaveEnd }))
  }, [children]) as React.ReactElement[]

  const child = React.useMemo(() => childrenWithProps[activeIndex], [index, activeIndex])

  return (
    <>
      {child}
    </>
  )
}