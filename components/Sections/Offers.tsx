'use client'

import { Section } from '@/components/Sections'
import AnimatedText from '@/components/AnimatedText'

export default function SectionOffers() {
  return (
    <Section>
      <div className='flex flex-col'>
        <AnimatedText
          strings={['How I can help you']}
          delay={500}
          loop={false}
          className='text-5xl text-primary opacity-50 select-none'
        />

        <div>
          <div className='my-16 flex flex-col gap-1'>
            <h3 className='mb-3 text-primary text-2xl'>Web Development</h3>
            <p className='ml-4 text-xl text-primary font-light'>• Crafting dynamic and responsive websites</p>
            <p className='ml-4 text-xl text-primary font-light'>• Seamless integration and user-friendly design</p>
          </div>
          <div className='my-16 flex flex-col gap-1'>
            <h3 className='mb-3 text-primary text-2xl'>Front-End Development in Vue or React</h3>
            <p className='ml-4 text-xl text-primary font-light'>• Building modern, reactive interfaces with Vue and React</p>
            <p className='ml-4 text-xl text-primary font-light'>• Optimize performance for smooth user experience</p>
            <p className='ml-4 text-xl text-primary font-light'>• Expert in creating SPAs (Single Page Applications)</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
