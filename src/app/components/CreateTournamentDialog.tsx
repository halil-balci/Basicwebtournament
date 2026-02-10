import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

interface CreateTournamentDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateTournament: (tournament: { name: string; format: 'bracket' | 'league'; teams: string[]; adminCode: string }) => void;
  existingTournaments: { name: string }[];
}

export function CreateTournamentDialog({ open, onClose, onCreateTournament, existingTournaments }: CreateTournamentDialogProps) {
  const [name, setName] = useState('');
  const [format, setFormat] = useState<'bracket' | 'league'>('bracket');
  const [teams, setTeams] = useState<string[]>([]);
  const [teamInput, setTeamInput] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [nameError, setNameError] = useState('');

  const handleNameChange = (value: string) => {
    setName(value);
    if (value.trim() && existingTournaments.some(t => t.name.toLowerCase() === value.trim().toLowerCase())) {
      setNameError('Bu isimde bir turnuva zaten mevcut');
    } else {
      setNameError('');
    }
  };

  const handleAddTeam = () => {
    if (teamInput.trim() && !teams.includes(teamInput.trim())) {
      setTeams([...teams, teamInput.trim()]);
      setTeamInput('');
    }
  };

  const handleRemoveTeam = (index: number) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (name.trim() && teams.length >= 2 && adminCode.trim() && !nameError) {
      onCreateTournament({ name: name.trim(), format, teams, adminCode: adminCode.trim() });
      setName('');
      setFormat('bracket');
      setTeams([]);
      setAdminCode('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 text-white max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Yeni Turnuva Oluştur</DialogTitle>
          <DialogDescription className="text-slate-400 text-sm sm:text-base">
            Turnuva bilgilerini girin ve takımları ekleyin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">Turnuva Adı</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Örn: FC26 Şampiyonası 2026"
              className="bg-slate-800 border-slate-700 text-white h-12 text-base rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
            {nameError && (
              <p className="text-red-400 text-xs sm:text-sm mt-1.5">{nameError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="format" className="text-sm font-semibold">Format</Label>
            <Select value={format} onValueChange={(value) => setFormat(value as 'bracket' | 'league')}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                <SelectItem value="bracket" className="text-white focus:bg-slate-700 focus:text-white">Eleme Usulü</SelectItem>
                <SelectItem value="league" className="text-white focus:bg-slate-700 focus:text-white">Lig Sistemi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminCode" className="text-sm font-semibold">Yönetici Kodu</Label>
            <Input
              id="adminCode"
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="Skor girişi için kod belirleyin"
              className="bg-slate-800 border-slate-700 text-white h-12 text-base rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team" className="text-sm font-semibold">Takımlar (En az 2 takım)</Label>
            <div className="flex gap-2">
              <Input
                id="team"
                value={teamInput}
                onChange={(e) => setTeamInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTeam()}
                placeholder="Takım adı girin"
                className="bg-slate-800 border-slate-700 text-white h-12 text-base rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
              <Button 
                onClick={handleAddTeam} 
                type="button" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 h-12 px-4 rounded-xl shadow-lg"
              >
                <Plus className="size-5" />
              </Button>
            </div>
            {teams.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-3 mt-3 border border-slate-700/50">
                <div className="flex flex-wrap gap-2">
                  {teams.map((team, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-700 text-white pr-1.5 py-1.5 text-sm rounded-lg">
                      {team}
                      <button
                        onClick={() => handleRemoveTeam(index)}
                        className="ml-2 hover:bg-slate-600 rounded p-0.5 transition-colors"
                      >
                        <X className="size-3.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 h-12 rounded-xl w-full sm:w-auto"
          >
            İptal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || teams.length < 2 || !adminCode.trim() || !!nameError}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed h-12 rounded-xl w-full sm:w-auto shadow-lg"
          >
            Turnuva Oluştur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}