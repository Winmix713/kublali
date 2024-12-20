'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Dashboard() {
  const [weights, setWeights] = useState({
    recentForm: 50,
    headToHead: 50,
    homeAdvantage: 50,
    teamStrength: 50,
  })

  const handleWeightChange = (name: keyof typeof weights) => (value: number[]) => {
    setWeights(prev => ({
      ...prev,
      [name]: value[0]
    }))
  }

  const handleSave = async () => {
    try {
      await fetch('/api/weights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(weights),
      })
      // Show success toast
    } catch (error) {
      // Show error toast
      console.error('Error saving weights:', error)
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Prediction Weights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Recent Form</label>
            <Slider
              value={[weights.recentForm]}
              onValueChange={handleWeightChange('recentForm')}
              min={0}
              max={100}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Head to Head</label>
            <Slider
              value={[weights.headToHead]}
              onValueChange={handleWeightChange('headToHead')}
              min={0}
              max={100}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Home Advantage</label>
            <Slider
              value={[weights.homeAdvantage]}
              onValueChange={handleWeightChange('homeAdvantage')}
              min={0}
              max={100}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Team Strength</label>
            <Slider
              value={[weights.teamStrength]}
              onValueChange={handleWeightChange('teamStrength')}
              min={0}
              max={100}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Weights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

