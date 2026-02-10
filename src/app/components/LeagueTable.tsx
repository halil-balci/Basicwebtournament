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
    if (index === 0) return <Trophy className="size-4 sm:size-5 text-yellow-500" />;
    if (index === 1) return <Medal className="size-4 sm:size-5 text-slate-400" />;
    if (index === 2) return <Medal className="size-4 sm:size-5 text-orange-700" />;
    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-slate-700/50 backdrop-blur-sm shadow-lg rounded-2xl">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-1.5 sm:p-2 rounded-lg">
              <Trophy className="size-4 sm:size-5 text-white" />
            </div>
            Puan Durumu
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700/50 hover:bg-slate-700/30">
                  <TableHead className="text-slate-300 text-xs sm:text-sm px-2 sm:px-4">#</TableHead>
                  <TableHead className="text-slate-300 text-xs sm:text-sm px-2 sm:px-4">Takım</TableHead>
                  <TableHead className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4">O</TableHead>
                  <TableHead className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden sm:table-cell">G</TableHead>
                  <TableHead className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden sm:table-cell">B</TableHead>
                  <TableHead className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden sm:table-cell">M</TableHead>
                  <TableHead className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden md:table-cell">A</TableHead>
                  <TableHead className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden md:table-cell">Y</TableHead>
                  <TableHead className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4">AV</TableHead>
                  <TableHead className="text-slate-300 text-center font-bold text-xs sm:text-sm px-2 sm:px-4">P</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStandings.map((standing, index) => (
                  <TableRow
                    key={standing.team}
                    className={`border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                      index === 0 ? 'bg-gradient-to-r from-green-900/20 to-green-800/20' : ''
                    }`}
                  >
                    <TableCell className="text-white font-medium text-xs sm:text-sm px-2 sm:px-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        {getPositionIcon(index)}
                        <span>{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-semibold text-xs sm:text-base px-2 sm:px-4 truncate max-w-[120px] sm:max-w-none">
                      {standing.team}
                    </TableCell>
                    <TableCell className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4">{standing.played}</TableCell>
                    <TableCell className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden sm:table-cell">{standing.won}</TableCell>
                    <TableCell className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden sm:table-cell">{standing.drawn}</TableCell>
                    <TableCell className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden sm:table-cell">{standing.lost}</TableCell>
                    <TableCell className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden md:table-cell">{standing.goalsFor}</TableCell>
                    <TableCell className="text-slate-300 text-center text-xs sm:text-sm px-1 sm:px-4 hidden md:table-cell">{standing.goalsAgainst}</TableCell>
                    <TableCell className={`text-center font-medium text-xs sm:text-sm px-1 sm:px-4 ${
                      standing.goalDifference > 0 ? 'text-green-400' : 
                      standing.goalDifference < 0 ? 'text-red-400' : 'text-slate-300'
                    }`}>
                      {standing.goalDifference > 0 ? '+' : ''}{standing.goalDifference}
                    </TableCell>
                    <TableCell className="text-white font-bold text-center text-base sm:text-lg px-2 sm:px-4">
                      {standing.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-slate-700/50 backdrop-blur-sm shadow-lg rounded-2xl">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-white text-lg sm:text-xl">Maçlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 sm:space-y-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-700/50 p-3 sm:p-4 rounded-xl hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4 flex-1">
                  <span className="text-white font-medium text-sm sm:text-base flex-1 sm:flex-none sm:min-w-[150px] sm:text-right truncate">
                    {match.team1}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3 bg-slate-800 px-3 sm:px-4 py-2 rounded-lg shrink-0">
                    <span className="text-white font-bold text-base sm:text-lg">
                      {match.score1 !== null ? match.score1 : '-'}
                    </span>
                    <span className="text-slate-500">:</span>
                    <span className="text-white font-bold text-base sm:text-lg">
                      {match.score2 !== null ? match.score2 : '-'}
                    </span>
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base flex-1 sm:flex-none sm:min-w-[150px] truncate">
                    {match.team2}
                  </span>
                </div>
                {isAdmin && (
                  <Button
                    onClick={() => onEditMatch(match)}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all h-9 rounded-lg w-full sm:w-auto"
                  >
                    <Edit className="size-4 mr-2" />
                    <span className="text-xs sm:text-sm">Skor Gir</span>
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