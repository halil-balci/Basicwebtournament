import { ArrowLeft, ShieldCheck, LogOut } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';

interface TournamentViewProps {
  tournament: {
    id: string;
    name: string;
    format: 'bracket' | 'league';
    teams: string[];
    status: 'ongoing' | 'finished';
  };
  onBack: () => void;
  isAdmin: boolean;
  onAdminLogin: () => void;
  onAdminLogout: () => void;
  children: React.ReactNode;
}

export function TournamentView({
  tournament,
  onBack,
  isAdmin,
  onAdminLogin,
  onAdminLogout,
  children,
}: TournamentViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Mobile-optimized Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 h-10 rounded-xl shrink-0"
            >
              <ArrowLeft className="size-4 sm:mr-2" />
              <span className="hidden sm:inline">Geri</span>
            </Button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-white truncate">{tournament.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge 
                  variant={tournament.format === 'bracket' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {tournament.format === 'bracket' ? 'Eleme' : 'Lig'}
                </Badge>
                <Badge 
                  variant={tournament.status === 'finished' ? 'destructive' : 'default'}
                  className={`text-xs ${tournament.status === 'finished' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {tournament.status === 'finished' ? 'Bitti' : 'Devam Ediyor'}
                </Badge>
                <span className="text-slate-400 text-xs">{tournament.teams.length} Takım</span>
              </div>
            </div>
          </div>

          {/* Admin Button */}
          <div className="w-full">
            {isAdmin ? (
              <Button
                onClick={onAdminLogout}
                variant="outline"
                size="sm"
                className="border-green-700 bg-green-950/30 text-green-400 hover:bg-green-900/40 w-full sm:w-auto h-10 rounded-xl"
              >
                <ShieldCheck className="size-4 mr-2" />
                <span className="text-xs sm:text-sm">Yönetici Modundasınız</span>
                <LogOut className="size-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onAdminLogin}
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 w-full sm:w-auto h-10 rounded-xl shadow-lg"
              >
                <ShieldCheck className="size-4 mr-2" />
                <span className="text-xs sm:text-sm">Yönetici Girişi</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}