
import React from 'react';
import { motion } from 'motion/react';
import { RatingChart } from './RatingChart';
import { TeamRanking } from './TeamRanking';
import { SatisfactionScore, TeamScore } from '@/src/services/crmApi';
import { AlertCircle, TrendingUp, Star, MapPin, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SummaryTabProps {
  score: SatisfactionScore | null;
  teams: { teams: TeamScore[], team_of_the_month: string } | null;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({ score, teams }) => {
  if (!score || !teams) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 pb-10"
    >
      {/* 📊 Satisfaction Evolution */}
      <RatingChart score={score.global_score} evolution={score.evolution} period="Ce mois-ci" />

      {/* 🧩 Score Breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-[24px] border border-border/30 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-violet">
            <MapPin size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Internes</span>
          </div>
          <p className="text-2xl font-black text-text-primary">{score.internal_score}%</p>
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-violet rounded-full" style={{ width: `${score.internal_score}%` }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-[24px] border border-border/30 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-green">
            <Globe size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Plateformes</span>
          </div>
          <p className="text-2xl font-black text-text-primary">{score.platform_score}%</p>
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green rounded-full" style={{ width: `${score.platform_score}%` }} />
          </div>
        </div>
      </div>

      {/* 🏆 Team Ranking */}
      <TeamRanking teams={teams.teams} teamOfTheMonth={teams.team_of_the_month} />

      {/* ⚠️ Alerts */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-black text-text-secondary px-2 uppercase tracking-widest">Alertes prioritaires</h3>
        <div className="bg-red-50 border border-red-100 p-4 rounded-[24px] flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-500 flex items-center justify-center shrink-0">
            <AlertCircle size={18} />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-black text-red-600 uppercase tracking-tight">Alerte satisfaction</p>
            <p className="text-[10px] font-medium text-red-500 leading-relaxed">
              3 commentaires négatifs (&lt; 6/10) reçus au SPA ce matin. Action corrective recommandée.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
