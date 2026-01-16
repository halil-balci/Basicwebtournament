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
    <div className="w-full overflow-x-auto pb-8">
      <div className="flex gap-8 min-w-max p-4">
        {Array.from({ length: rounds }).map((_, roundIndex) => {
          const roundMatches = getRoundMatches(roundIndex);
          return (
            <div key={roundIndex} className="flex flex-col gap-4" style={{ minWidth: '300px' }}>
              <div className="flex items-center gap-2 mb-2">
                {roundIndex === rounds - 1 && <Trophy className="size-5 text-yellow-500" />}
                <h3 className="font-semibold text-white text-lg">
                  {getRoundName(roundIndex, rounds)}
                </h3>
              </div>
              
              <div className="flex flex-col gap-6" style={{ marginTop: `${roundIndex * 40}px` }}>
                {roundMatches.map((match) => (
                  <Card
                    key={match.id}
                    className="bg-slate-800/70 border-slate-700 p-4 backdrop-blur-sm"
                  >
                    <div className="space-y-2">
                      {match.team1 ? (
                        <div className={`flex items-center justify-between p-3 rounded ${
                          match.winner === match.team1 ? 'bg-green-900/30 border border-green-700' : 'bg-slate-700/50'
                        }`}>
                          <span className="text-white font-medium">{match.team1}</span>
                          <span className="text-white font-bold text-lg">
                            {match.score1 !== null ? match.score1 : '-'}
                          </span>
                        </div>
                      ) : (
                        <div className="bg-slate-700/30 p-3 rounded border border-dashed border-slate-600">
                          <span className="text-slate-500 text-sm italic">Henüz belirli değil</span>
                        </div>
                      )}
                      
                      {match.team2 ? (
                        <div className={`flex items-center justify-between p-3 rounded ${
                          match.winner === match.team2 ? 'bg-green-900/30 border border-green-700' : 'bg-slate-700/50'
                        }`}>
                          <span className="text-white font-medium">{match.team2}</span>
                          <span className="text-white font-bold text-lg">
                            {match.score2 !== null ? match.score2 : '-'}
                          </span>
                        </div>
                      ) : match.team1 && match.round === 0 ? (
                        <div className="bg-yellow-900/20 p-3 rounded border border-dashed border-yellow-700">
                          <span className="text-yellow-500 text-sm italic">Rakipsiz geçiş (Bye)</span>
                        </div>
                      ) : (
                        <div className="bg-slate-700/30 p-3 rounded border border-dashed border-slate-600">
                          <span className="text-slate-500 text-sm italic">Henüz belirli değil</span>
                        </div>
                      )}

                      {isAdmin && match.team1 && match.team2 && (
                        <Button
                          onClick={() => onEditMatch(match)}
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          <Edit className="size-4 mr-2" />
                          Skor Gir
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