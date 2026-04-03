
import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Award } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { TeamScore } from '@/src/services/crmApi';

interface TeamRankingProps {
  teams: TeamScore[];
  teamOfTheMonth: string;
}

export const TeamRanking: React.FC<TeamRankingProps> = ({ teams, teamOfTheMonth }) => {
  return (
    <div className="bg-white rounded-[24px] p-5 border border-border/30 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center border border-yellow-100 shadow-sm">
          <Trophy size={20} />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Équipe du mois</h3>
          <p className="text-sm font-black text-text-primary uppercase tracking-tight">{teamOfTheMonth}</p>
        </div>
      </div>

      <div className="space-y-3">
        {teams.sort((a, b) => b.score - a.score).map((team, index) => (
          <div key={team.team} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black border",
                index === 0 ? "bg-yellow-50 border-yellow-100 text-yellow-600" : "bg-gray-50 border-border/50 text-text-secondary"
              )}>
                {index + 1}
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-black text-text-primary capitalize">{team.team}</p>
                <p className="text-[8px] text-text-secondary font-bold">{team.positive_comments} commentaires positifs</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-green/10 px-2 py-0.5 rounded-full border border-green/20">
                <Star size={8} className="text-green fill-green" />
                <span className="text-[10px] font-black text-green">{team.score}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
