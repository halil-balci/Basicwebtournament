import { Trophy, Edit } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

export interface Match {
  id: string;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
  round: number;
  matchIndex: number;
  winner: string | null;
}

interface TournamentBracketProps {
  matches: Match[];
  onEditMatch: (match: Match) => void;
  isAdmin: boolean;
}

export function TournamentBracket({ matches, onEditMatch, isAdmin }: TournamentBracketProps) {
  const rounds = Math.max(...matches.map(m => m.round)) + 1;
  
  const getRoundMatches = (round: number) => {
    return matches.filter(m => m.round === round).sort((a, b) => a.matchIndex - b.matchIndex);
  };

  const getRoundName = (round: number, totalRounds: number) => {
    if (round === totalRounds - 1) return 'Final';
    if (round === totalRounds - 2) return 'Yarı Final';
    if (round === totalRounds - 3) return 'Çeyrek Final';
    return `${round + 1}. Tur`;
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-4 sm:gap-6 lg:gap-8 min-w-max p-2 sm:p-4">
        {Array.from({ length: rounds }).map((_, roundIndex) => {
          const roundMatches = getRoundMatches(roundIndex);
          return (
            <div key={roundIndex} className="flex flex-col gap-3 sm:gap-4" style={{ minWidth: '280px' }}>
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                {roundIndex === rounds - 1 && (
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-1.5 rounded-lg">
                    <Trophy className="size-4 sm:size-5 text-white" />
                  </div>
                )}
                <h3 className="font-bold text-white text-base sm:text-lg">
                  {getRoundName(roundIndex, rounds)}
                </h3>
              </div>
              
              <div 
                className="flex flex-col gap-4 sm:gap-6" 
                style={{ marginTop: roundIndex > 0 ? `${roundIndex * 30}px` : '0' }}
              >
                {roundMatches.map((match) => (
                  <Card
                    key={match.id}
                    className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-slate-700/50 p-3 sm:p-4 backdrop-blur-sm shadow-lg rounded-xl"
                  >
                    <div className="space-y-2">
                      {match.team1 ? (
                        <div className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-all ${
                          match.winner === match.team1 
                            ? 'bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-600/50 shadow-lg shadow-green-500/10' 
                            : 'bg-slate-700/50 hover:bg-slate-700/70'
                        }`}>
                          <span className="text-white font-medium text-sm sm:text-base truncate pr-2">
                            {match.team1}
                          </span>
                          <span className={`font-bold text-lg sm:text-xl shrink-0 ${
                            match.winner === match.team1 ? 'text-green-400' : 'text-white'
                          }`}>
                            {match.score1 !== null ? match.score1 : '-'}
                          </span>
                        </div>
                      ) : (
                        <div className="bg-slate-700/30 p-2.5 sm:p-3 rounded-lg border border-dashed border-slate-600">
                          <span className="text-slate-500 text-xs sm:text-sm italic">Henüz belirli değil</span>
                        </div>
                      )}
                      
                      {match.team2 ? (
                        <div className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-all ${
                          match.winner === match.team2 
                            ? 'bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-600/50 shadow-lg shadow-green-500/10' 
                            : 'bg-slate-700/50 hover:bg-slate-700/70'
                        }`}>
                          <span className="text-white font-medium text-sm sm:text-base truncate pr-2">
                            {match.team2}
                          </span>
                          <span className={`font-bold text-lg sm:text-xl shrink-0 ${
                            match.winner === match.team2 ? 'text-green-400' : 'text-white'
                          }`}>
                            {match.score2 !== null ? match.score2 : '-'}
                          </span>
                        </div>
                      ) : match.team1 && match.round === 0 ? (
                        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-2.5 sm:p-3 rounded-lg border border-dashed border-yellow-600/50">
                          <span className="text-yellow-400 text-xs sm:text-sm italic">Rakipsiz geçiş (Bye)</span>
                        </div>
                      ) : (
                        <div className="bg-slate-700/30 p-2.5 sm:p-3 rounded-lg border border-dashed border-slate-600">
                          <span className="text-slate-500 text-xs sm:text-sm italic">Henüz belirli değil</span>
                        </div>
                      )}

                      {isAdmin && match.team1 && match.team2 && (
                        <Button
                          onClick={() => onEditMatch(match)}
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all h-9 rounded-lg"
                        >
                          <Edit className="size-4 mr-2" />
                          <span className="text-xs sm:text-sm">Skor Gir</span>
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}