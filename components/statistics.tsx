'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, BarChart } from '@/components/ui/chart'

interface StatisticsData {
  monthlyPerformance: {
    month: string
    profit: number
  }[]
  leaguePerformance: {
    league: string
    winRate: number
  }[]
}

export function Statistics() {
  const [data, setData] = useState<StatisticsData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/statistics')
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Error fetching statistics:', error)
      }
    }

    fetchData()
  }, [])

  if (!data) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={data.monthlyPerformance}
            xField="month"
            yField="profit"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>League Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={data.leaguePerformance}
            xField="league"
            yField="winRate"
          />
        </CardContent>
      </Card>
    </div>
  )
}

