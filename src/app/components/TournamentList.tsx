import { Trophy, Plus, Users, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface Tournament {
  id: string;
  name: string;
  format: 'bracket' | 'league';
  teams: string[];
  createdAt: string;
  status: 'ongoing' | 'finished';
}

interface TournamentListProps {
  tournaments: Tournament[];
  onSelectTournament: (id: string) => void;
  onCreateTournament: () => void;
}

export function TournamentList({ tournaments, onSelectTournament, onCreateTournament }: TournamentListProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="size-10 text-orange-500" />
            <div>
              <h1 className="text-4xl font-bold text-white">FC26 Turnuvalar</h1>
              <p className="text-slate-400 mt-1">Turnuvalarınızı yönetin ve takip edin</p>
            </div>
          </div>
          <Button onClick={onCreateTournament} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="size-5 mr-2" />
            Yeni Turnuva
          </Button>
        </div>

        {tournaments.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Trophy className="size-20 text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">Henüz turnuva yok</h3>
              <p className="text-slate-500 mb-6">İlk turnuvanızı oluşturarak başlayın</p>
              <Button onClick={onCreateTournament} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="size-5 mr-2" />
                Turnuva Oluştur
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <Card
                key={tournament.id}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all cursor-pointer backdrop-blur-sm"
                onClick={() => onSelectTournament(tournament.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Trophy className="size-8 text-orange-500" />
                    <div className="flex gap-2">
                      <Badge variant={tournament.format === 'bracket' ? 'default' : 'secondary'}>
                        {tournament.format === 'bracket' ? 'Eleme' : 'Lig'}
                      </Badge>
                      <Badge 
                        variant={tournament.status === 'finished' ? 'destructive' : 'default'}
                        className={tournament.status === 'finished' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                      >
                        {tournament.status === 'finished' ? 'Bitti' : 'Devam Ediyor'}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-white mt-4">{tournament.name}</CardTitle>
                  <CardDescription className="text-slate-400 flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="size-4" />
                      <span>{tournament.teams.length} Takım</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      <span>{new Date(tournament.createdAt).toLocaleDateString('tr-TR')}</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tournament.teams.slice(0, 3).map((team, idx) => (
                      <Badge key={idx} variant="outline" className="text-slate-300 border-slate-600">
                        {team}
                      </Badge>
                    ))}
                    {tournament.teams.length > 3 && (
                      <Badge variant="outline" className="text-slate-400 border-slate-600">
                        +{tournament.teams.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}