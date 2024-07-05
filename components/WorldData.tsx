'use client'

import WorldDataApp from '@/3d/WorldDataApp'
import { useEffect, useRef } from 'react'

interface WorldDataProps {
  
}

export default function WorldData({}: Readonly<WorldDataProps>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<WorldDataApp | null>(null)

  useEffect(() => {
    if (containerRef.current === null) return
    
    const app = new WorldDataApp({ container: containerRef.current })
    appRef.current = app

    app.init().then(() => app.start())

    return () => app.destroy()
  }, [containerRef])

  useEffect(() => {
    if (module.hot) {
      module.hot.accept('@/3d/WorldDataApp', () => {
        appRef.current?.destroy()
        const WorldDataApp = require('@/3d/WorldDataApp').default
        const app = new WorldDataApp({ container: containerRef.current as HTMLDivElement })
        appRef.current = app
        app.init().then(() => app.start())
      })
    }
  }, [])

  return (
    <div ref={containerRef} className='w-screen h-screen'></div>
  )
}
