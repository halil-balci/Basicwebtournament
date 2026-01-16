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
}

export function CreateTournamentDialog({ open, onClose, onCreateTournament }: CreateTournamentDialogProps) {
  const [name, setName] = useState('');
  const [format, setFormat] = useState<'bracket' | 'league'>('bracket');
  const [teams, setTeams] = useState<string[]>([]);
  const [teamInput, setTeamInput] = useState('');
  const [adminCode, setAdminCode] = useState('');

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
    if (name.trim() && teams.length >= 2 && adminCode.trim()) {
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
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Yeni Turnuva Oluştur</DialogTitle>
          <DialogDescription className="text-slate-400">
            Turnuva bilgilerini girin ve takımları ekleyin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Turnuva Adı</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: FC26 Şampiyonası 2026"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Format</Label>
            <Select value={format} onValueChange={(value) => setFormat(value as 'bracket' | 'league')}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="bracket">Eleme Usulü</SelectItem>
                <SelectItem value="league">Lig Sistemi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminCode">Yönetici Kodu</Label>
            <Input
              id="adminCode"
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="Skor girişi için kod belirleyin"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Takımlar (En az 2 takım)</Label>
            <div className="flex gap-2">
              <Input
                id="team"
                value={teamInput}
                onChange={(e) => setTeamInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTeam()}
                placeholder="Takım adı girin"
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Button onClick={handleAddTeam} type="button" className="bg-orange-500 hover:bg-orange-600">
                <Plus className="size-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {teams.map((team, index) => (
                <Badge key={index} variant="secondary" className="bg-slate-700 text-white pr-1">
                  {team}
                  <button
                    onClick={() => handleRemoveTeam(index)}
                    className="ml-2 hover:bg-slate-600 rounded p-0.5"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300">
            İptal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || teams.length < 2 || !adminCode.trim()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Turnuva Oluştur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
