import { Trophy, Plus, Users, Calendar, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { useState } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTournaments = tournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Mobile-optimized Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 sm:p-2.5 rounded-xl shadow-lg">
                <Trophy className="size-6 sm:size-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">FC26</h1>
                <p className="text-xs sm:text-sm text-slate-400">Turnuvalar</p>
              </div>
            </div>
            <Button 
              onClick={onCreateTournament} 
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 h-12 sm:h-auto"
            >
              <Plus className="size-5 sm:mr-2" />
              <span className="hidden sm:inline">Yeni Turnuva</span>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Turnuva ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 sm:h-14 text-base sm:text-lg bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl backdrop-blur-sm transition-all"
            />
          </div>
          
          {searchQuery && (
            <p className="text-slate-400 text-sm text-center mt-3">
              {filteredTournaments.length} sonuç
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
        {tournaments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 text-center border border-slate-700/50 max-w-md w-full">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="size-10 sm:size-12 text-slate-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-3">Turnuva Yok</h3>
              <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">İlk turnuvanızı oluşturarak başlayın</p>
              <Button 
                onClick={onCreateTournament} 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white w-full sm:w-auto shadow-xl shadow-orange-500/25"
              >
                <Plus className="size-5 mr-2" />
                Turnuva Oluştur
              </Button>
            </div>
          </div>
        ) : filteredTournaments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 text-center border border-slate-700/50 max-w-md w-full">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="size-10 sm:size-12 text-slate-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-3">Sonuç Yok</h3>
              <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">"{searchQuery}" için turnuva bulunamadı</p>
              <Button 
                onClick={onCreateTournament} 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white w-full sm:w-auto shadow-xl shadow-orange-500/25"
              >
                <Plus className="size-5 mr-2" />
                Yeni Turnuva
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-6 pb-6">
            {filteredTournaments.map((tournament) => (
              <Card
                key={tournament.id}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-orange-500/50 transition-all cursor-pointer backdrop-blur-sm hover:shadow-xl hover:shadow-orange-500/10 active:scale-[0.98] rounded-2xl overflow-hidden"
                onClick={() => onSelectTournament(tournament.id)}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2.5 sm:p-3 rounded-xl shadow-lg shadow-orange-500/25">
                      <Trophy className="size-5 sm:size-6 text-white" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Badge 
                        variant={tournament.format === 'bracket' ? 'default' : 'secondary'}
                        className="text-xs font-semibold px-2.5 py-1"
                      >
                        {tournament.format === 'bracket' ? 'Eleme' : 'Lig'}
                      </Badge>
                      <Badge 
                        variant={tournament.status === 'finished' ? 'destructive' : 'default'}
                        className={`text-xs font-semibold px-2.5 py-1 ${
                          tournament.status === 'finished' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {tournament.status === 'finished' ? 'Bitti' : 'Devam Ediyor'}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg sm:text-xl font-bold leading-tight line-clamp-2">
                    {tournament.name}
                  </CardTitle>
                  <CardDescription className="text-slate-400 flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Users className="size-4" />
                      <span>{tournament.teams.length} Takım</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-4" />
                      <span>{new Date(tournament.createdAt).toLocaleDateString('tr-TR')}</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {tournament.teams.slice(0, 2).map((team, idx) => (
                        <Badge key={idx} variant="outline" className="text-slate-300 border-slate-600/50 text-xs">
                          {team}
                        </Badge>
                      ))}
                      {tournament.teams.length > 2 && (
                        <Badge variant="outline" className="text-slate-400 border-slate-600/50 text-xs">
                          +{tournament.teams.length - 2}
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="size-5 text-slate-600 group-hover:text-orange-500 transition-colors" />
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