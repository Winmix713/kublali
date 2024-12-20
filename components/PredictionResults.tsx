'use client'

import { motion } from 'framer-motion'
import { TEAMS } from '@/lib/constants'

interface PredictionResultsProps {
  prediction: any
  teamAnalysis: any
}

export default function PredictionResults({ prediction, teamAnalysis }: PredictionResultsProps) {
  if (!prediction || !teamAnalysis) {
    return null
  }

  const homeTeam = TEAMS.find(team => team.name === teamAnalysis.home_team)
  const awayTeam = TEAMS.find(team => team.name === teamAnalysis.away_team)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#CCFF00]">Predikciók eredménye</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-2xl p-6 card-hover"
        >
          <h3 className="text-xl font-semibold mb-4">Mérkőzés elemzés</h3>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img src={homeTeam?.logoUrl} alt={homeTeam?.name} className="w-12 h-12" />
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {prediction.modelPredictions.poisson.homeGoals} - {prediction.modelPredictions.poisson.awayGoals}
                </div>
                <div className="text-sm text-gray-400">Prediktált eredmény</div>
              </div>
              <img src={awayTeam?.logoUrl} alt={awayTeam?.name} className="w-12 h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Várható gólok (Hazai):</span>
              <span className="font-semibold">{prediction.homeExpectedGoals.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Várható gólok (Vendég):</span>
              <span className="font-semibold">{prediction.awayExpectedGoals.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Mindkét csapat gól esélye:</span>
              <span className="font-semibold">{prediction.bothTeamsToScoreProb.toFixed(2)}%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6 card-hover"
        >
          <h3 className="text-xl font-semibold mb-4">Győzelmi esélyek</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{homeTeam?.name}</span>
              <span className="font-semibold">{(prediction.modelPredictions.elo.homeWinProb * 100).toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Döntetlen</span>
              <span className="font-semibold">{(prediction.modelPredictions.elo.drawProb * 100).toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{awayTeam?.name}</span>
              <span className="font-semibold">{(prediction.modelPredictions.elo.awayWinProb * 100).toFixed(2)}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Csapatok elemzése</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2">{homeTeam?.name}</h4>
            <p>Forma index: {teamAnalysis.home_form_index.toFixed(2)}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">{awayTeam?.name}</h4>
            <p>Forma index: {teamAnalysis.away_form_index.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium mb-2">Egymás elleni statisztika</h4>
          <p>Mérkőzések száma: {teamAnalysis.matches_count}</p>
          <p>Hazai győzelmek: {teamAnalysis.head_to_head_stats.home_wins} ({teamAnalysis.head_to_head_stats.home_win_percentage.toFixed(2)}%)</p>
          <p>Vendég győzelmek: {teamAnalysis.head_to_head_stats.away_wins} ({teamAnalysis.head_to_head_stats.away_win_percentage.toFixed(2)}%)</p>
          <p>Döntetlenek: {teamAnalysis.head_to_head_stats.draws} ({teamAnalysis.head_to_head_stats.draw_percentage.toFixed(2)}%)</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

