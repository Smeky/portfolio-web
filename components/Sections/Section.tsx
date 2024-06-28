'use client'

interface SectionProps {
  children?: React.ReactNode,
}

export default function Section({ children }: Readonly<SectionProps>): JSX.Element {
  return (
    <div className='container box-border mx-auto py-16 px-8 lg:px-16'>
      { children }
    </div>
  )
}
