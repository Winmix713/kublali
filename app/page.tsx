import { MatchSelection } from '@/components/match-selection'
import { Statistics } from '@/components/statistics'
import { Dashboard } from '@/components/Dashboard'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MatchSelection />
      <Statistics />
      <Dashboard />
    </div>
  )
}

