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
      <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 text-white rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Skor Girişi</DialogTitle>
          <DialogDescription className="text-slate-400 text-sm sm:text-base">
            Maç skorunu girin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white font-semibold text-base sm:text-lg truncate pr-2 flex-1">{match.team1}</span>
              <span className="text-slate-500 font-bold text-sm mx-2">VS</span>
              <span className="text-white font-semibold text-base sm:text-lg truncate pl-2 flex-1 text-right">{match.team2}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="score1" className="text-sm font-semibold text-slate-300 truncate block">{match.team1}</Label>
                <Input
                  id="score1"
                  type="number"
                  min="0"
                  value={score1}
                  onChange={(e) => setScore1(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white text-center text-3xl sm:text-4xl font-bold h-16 sm:h-20 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="score2" className="text-sm font-semibold text-slate-300 truncate block">{match.team2}</Label>
                <Input
                  id="score2"
                  type="number"
                  min="0"
                  value={score2}
                  onChange={(e) => setScore2(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white text-center text-3xl sm:text-4xl font-bold h-16 sm:h-20 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="0"
                />
              </div>
            </div>
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
            disabled={score1 === '' || score2 === ''}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed h-12 rounded-xl w-full sm:w-auto shadow-lg"
          >
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}