import type { ReactNode } from 'react'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'

interface ShellProps {
  editionLabel: string
  selectionsCount: number
  children: ReactNode
}

export default function Shell({ editionLabel, selectionsCount, children }: ShellProps) {
  return (
    <div className="bg-frame p-[14px] min-h-screen font-sans text-ink font-light antialiased" style={{ letterSpacing: '-0.005em' }}>
      <div className="bg-canvas rounded-frame min-h-[calc(100vh-28px)] px-[22px] pt-5 pb-[26px] overflow-hidden">
        <TopNav editionLabel={editionLabel} selectionsCount={selectionsCount} />
        {children}
        <Footer />
      </div>
    </div>
  )
}
