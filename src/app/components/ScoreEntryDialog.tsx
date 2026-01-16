import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

interface ScoreEntryDialogProps {
  open: boolean;
  onClose: () => void;
  match: {
    id: string;
    team1: string;
    team2: string;
    score1: number | null;
    score2: number | null;
  } | null;
  onSaveScore: (matchId: string, score1: number, score2: number) => void;
}

export function ScoreEntryDialog({ open, onClose, match, onSaveScore }: ScoreEntryDialogProps) {
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');

  useEffect(() => {
    if (match) {
      setScore1(match.score1 !== null ? match.score1.toString() : '');
      setScore2(match.score2 !== null ? match.score2.toString() : '');
    }
  }, [match]);

  const handleSubmit = () => {
    if (match && score1 !== '' && score2 !== '') {
      const s1 = parseInt(score1);
      const s2 = parseInt(score2);
      if (!isNaN(s1) && !isNaN(s2) && s1 >= 0 && s2 >= 0) {
        onSaveScore(match.id, s1, s2);
        onClose();
      }
    }
  };

  if (!match) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Skor Girişi</DialogTitle>
          <DialogDescription className="text-slate-400">
            Maç skorunu girin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold text-lg">{match.team1}</span>
              <span className="text-slate-500">vs</span>
              <span className="text-white font-semibold text-lg">{match.team2}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="score1">{match.team1} Skoru</Label>
                <Input
                  id="score1"
                  type="number"
                  min="0"
                  value={score1}
                  onChange={(e) => setScore1(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white text-center text-2xl font-bold"
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="score2">{match.team2} Skoru</Label>
                <Input
                  id="score2"
                  type="number"
                  min="0"
                  value={score2}
                  onChange={(e) => setScore2(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white text-center text-2xl font-bold"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300">
            İptal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={score1 === '' || score2 === ''}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
