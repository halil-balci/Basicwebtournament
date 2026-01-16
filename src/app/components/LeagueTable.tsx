import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Trophy, Medal, Edit } from 'lucide-react';

export interface Standing {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface LeagueMatch {
  id: string;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
}

interface LeagueTableProps {
  standings: Standing[];
  matches: LeagueMatch[];
  onEditMatch: (match: LeagueMatch) => void;
  isAdmin: boolean;
}

export function LeagueTable({ standings, matches, onEditMatch, isAdmin }: LeagueTableProps) {
  const sortedStandings = [...standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  const getPositionIcon = (index: number) => {
    if (index === 0) return <Trophy className="size-5 text-yellow-500" />;
    if (index === 1) return <Medal className="size-5 text-slate-400" />;
    if (index === 2) return <Medal className="size-5 text-orange-700" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/70 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="size-6 text-orange-500" />
            Puan Durumu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">#</TableHead>
                  <TableHead className="text-slate-300">Takım</TableHead>
                  <TableHead className="text-slate-300 text-center">O</TableHead>
                  <TableHead className="text-slate-300 text-center">G</TableHead>
                  <TableHead className="text-slate-300 text-center">B</TableHead>
                  <TableHead className="text-slate-300 text-center">M</TableHead>
                  <TableHead className="text-slate-300 text-center">A</TableHead>
                  <TableHead className="text-slate-300 text-center">Y</TableHead>
                  <TableHead className="text-slate-300 text-center">AV</TableHead>
                  <TableHead className="text-slate-300 text-center font-bold">P</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStandings.map((standing, index) => (
                  <TableRow
                    key={standing.team}
                    className={`border-slate-700 hover:bg-slate-700/50 ${
                      index === 0 ? 'bg-green-900/20' : ''
                    }`}
                  >
                    <TableCell className="text-white font-medium">
                      <div className="flex items-center gap-2">
                        {getPositionIcon(index)}
                        {index + 1}
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-semibold">{standing.team}</TableCell>
                    <TableCell className="text-slate-300 text-center">{standing.played}</TableCell>
                    <TableCell className="text-slate-300 text-center">{standing.won}</TableCell>
                    <TableCell className="text-slate-300 text-center">{standing.drawn}</TableCell>
                    <TableCell className="text-slate-300 text-center">{standing.lost}</TableCell>
                    <TableCell className="text-slate-300 text-center">{standing.goalsFor}</TableCell>
                    <TableCell className="text-slate-300 text-center">{standing.goalsAgainst}</TableCell>
                    <TableCell className={`text-center font-medium ${
                      standing.goalDifference > 0 ? 'text-green-400' : 
                      standing.goalDifference < 0 ? 'text-red-400' : 'text-slate-300'
                    }`}>
                      {standing.goalDifference > 0 ? '+' : ''}{standing.goalDifference}
                    </TableCell>
                    <TableCell className="text-white font-bold text-center text-lg">
                      {standing.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/70 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Maçlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-white font-medium min-w-[150px] text-right">{match.team1}</span>
                  <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded">
                    <span className="text-white font-bold text-lg">
                      {match.score1 !== null ? match.score1 : '-'}
                    </span>
                    <span className="text-slate-500">:</span>
                    <span className="text-white font-bold text-lg">
                      {match.score2 !== null ? match.score2 : '-'}
                    </span>
                  </div>
                  <span className="text-white font-medium min-w-[150px]">{match.team2}</span>
                </div>
                {isAdmin && (
                  <Button
                    onClick={() => onEditMatch(match)}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 ml-4"
                  >
                    <Edit className="size-4 mr-2" />
                    Skor Gir
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
