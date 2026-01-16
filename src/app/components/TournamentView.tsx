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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ArrowLeft className="size-4 mr-2" />
              Geri
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">{tournament.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={tournament.format === 'bracket' ? 'default' : 'secondary'}>
                  {tournament.format === 'bracket' ? 'Eleme Usulü' : 'Lig Sistemi'}
                </Badge>
                <Badge 
                  variant={tournament.status === 'finished' ? 'destructive' : 'default'}
                  className={tournament.status === 'finished' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                >
                  {tournament.status === 'finished' ? 'Bitti' : 'Devam Ediyor'}
                </Badge>
                <span className="text-slate-400">{tournament.teams.length} Takım</span>
              </div>
            </div>
          </div>
          
          <div>
            {isAdmin ? (
              <Button
                onClick={onAdminLogout}
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-900/20"
              >
                <ShieldCheck className="size-4 mr-2" />
                Yönetici Modundasınız
                <LogOut className="size-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onAdminLogin}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <ShieldCheck className="size-4 mr-2" />
                Yönetici Girişi
              </Button>
            )}
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
}