'use client'
import React from 'react'

interface SwiperProps {
  children: React.ReactNode,
}

export interface SwiperRef extends React.RefObject<HTMLDivElement> {
  nextSlide: () => void,
  prevSlide: () => void,
}

const Swiper = React.forwardRef<SwiperRef, SwiperProps>(({ children }, ref) => {
  const [index, setIndex] = React.useState(0)
  const [activeIndex, setActiveIndex] = React.useState(index)
  const indexRef = React.useRef(index)
  indexRef.current = index

  const onLeaveEnd = React.useCallback(() => {
    setActiveIndex(indexRef.current)
  }, [])

  const childrenWithProps = React.useMemo(() => {
    return React.Children.map(children, (child, i) =>
      React.cloneElement(child as React.ReactElement, { isLeaving: i !== index, onLeaveEnd })
    )
  }, [children, index, onLeaveEnd]) as React.ReactElement[]

  const child = React.useMemo(() => childrenWithProps[activeIndex], [childrenWithProps, activeIndex])

  const nextSlide = React.useCallback(() => {
    setIndex(prev => (prev + 1) % childrenWithProps.length)
  }, [index])

  const prevSlide = React.useCallback(() => {
    setIndex(prev => (prev - 1 + childrenWithProps.length) % childrenWithProps.length)
  }, [index])

  // Todo: fix type here
  React.useImperativeHandle(ref, (): any => ({
    nextSlide,
    prevSlide
  }), [nextSlide, prevSlide])

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {child}
    </div>
  )
})

export default Swiper
