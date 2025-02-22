'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { fetchApi } from '@/lib/api'
import { TEAMS } from '@/lib/constants'
import { toast } from "@/components/ui/use-toast"

interface Match {
  homeTeam: string | null
  awayTeam: string | null
}

interface MatchSelectionProps {
  onPredictionsGenerated: (predictions: any) => void
  timeLeft: number
}

export default function MatchSelection({ onPredictionsGenerated, timeLeft }: MatchSelectionProps) {
  const [matches, setMatches] = useState<Match[]>(Array(8).fill({ homeTeam: null, awayTeam: null }))
  const [isGenerating, setIsGenerating] = useState(false)

  const handleTeamSelect = (index: number, side: 'homeTeam' | 'awayTeam', teamId: string) => {
    const newMatches = [...matches]
    newMatches[index] = { ...newMatches[index], [side]: teamId }
    setMatches(newMatches)
  }

  const runPredictions = async () => {
    setIsGenerating(true)
    const validMatch = matches.find(match => match.homeTeam && match.awayTeam)

    if (!validMatch) {
      toast({
        title: "Hiba",
        description: "Kérjük, válasszon ki legalább egy teljes mérkőzést!",
        variant: "destructive",
      })
      setIsGenerating(false)
      return
    }

    try {
      const homeTeam = TEAMS.find(team => team.id === validMatch.homeTeam)?.name
      const awayTeam = TEAMS.find(team => team.id === validMatch.awayTeam)?.name

      if (!homeTeam || !awayTeam) {
        throw new Error("Invalid team selection")
      }

      const response = await fetchApi(`https://winmix.hu/api/2/fullapi.php?home_team=${encodeURIComponent(homeTeam)}&away_team=${encodeURIComponent(awayTeam)}`)
      
      onPredictionsGenerated(response)
      toast({
        title: "Siker",
        description: "A predikciók sikeresen elkészültek!",
      })
    } catch (error) {
      console.error('Error generating predictions:', error)
      toast({
        title: "Hiba",
        description: "Hiba történt a predikciók generálása során. Kérjük, próbálja újra később.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const sortedTeams = [...TEAMS].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6 mb-16 sm:mb-20"
    >
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {matches.map((match, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-3 sm:p-4 card-hover"
          >
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="relative flex-1">
                <select
                  value={match.homeTeam || ''}
                  onChange={(e) => handleTeamSelect(index, 'homeTeam', e.target.value)}
                  className="w-full h-full px-3 py-2 sm:px-4 sm:py-3 bg-black/30 rounded-xl border border-white/10 focus:border-[#CCFF00]/50 focus:outline-none appearance-none cursor-pointer text-sm sm:text-base"
                >
                  <option value="">Válassz hazai csapatot</option>
                  {sortedTeams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CCFF00] h-4 w-4" />
              </div>

              <div className="flex items-center justify-center">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />
                <span className="mx-3 text-xs sm:text-sm text-gray-400">VS</span>
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />
              </div>

              <div className="relative flex-1">
                <select
                  value={match.awayTeam || ''}
                  onChange={(e) => handleTeamSelect(index, 'awayTeam', e.target.value)}
                  className="w-full h-full px-3 py-2 sm:px-4 sm:py-3 bg-black/30 rounded-xl border border-white/10 focus:border-[#CCFF00]/50 focus:outline-none appearance-none cursor-pointer text-sm sm:text-base"
                >
                  <option value="">Válassz vendég csapatot</option>
                  {sortedTeams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CCFF00] h-4 w-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={runPredictions}
        disabled={!matches.some(match => match.homeTeam && match.awayTeam) || timeLeft <= 0 || isGenerating}
        className={`
          w-full mt-4 sm:mt-8 py-3 sm:py-4 rounded-xl font-medium transition-all text-sm sm:text-base
          ${isGenerating ? 
            'bg-gray-800 text-gray-400 cursor-not-allowed' : 
            'bg-gradient-to-r from-[#CCFF00] to-[#9EFF00] text-black hover:opacity-90'
          }
        `}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-gray-400 border-t-transparent" />
            <span>Predikciók generálása...</span>
          </div>
        ) : (
          'Predikciók futtatása'
        )}
      </motion.button>
    </motion.div>
  )
}

