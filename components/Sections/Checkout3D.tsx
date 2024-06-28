'use client'

import Link from 'next/link'
import { Section } from '.'

interface Checkout3DProps {
  
}

export default function Checkout3D({}: Readonly<Checkout3DProps>): JSX.Element {
  return (
    <Section>
      <div className='flex flex-col'>
        <h2 className='text-5xl text-primary opacity-50 mb-16'>3D on the Web can be cool</h2>
        <div className='mt-6'>
          <Link href='/3d' className='rounded p-2 bg-blue-800 text-white font-semibold transition-all duration-300 hover:bg-blue-700'>
            3D World Data
          </Link>
        </div>
        <p className='mt-2 text-xl text-primary opacity-50'>Todo: either full 3d or preview here</p>
      </div>
    </Section>
  )
}