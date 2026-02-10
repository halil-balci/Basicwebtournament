import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ShieldCheck } from 'lucide-react';

interface AdminLoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLogin: (code: string) => void;
}

export function AdminLoginDialog({ open, onClose, onLogin }: AdminLoginDialogProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (code.trim()) {
      onLogin(code.trim());
      setCode('');
      setError('');
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCode('');
      setError('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 text-white rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg">
              <ShieldCheck className="size-5 text-white" />
            </div>
            Yönetici Girişi
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm sm:text-base">
            Skor girişi yapmak için yönetici kodunu girin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="adminCode" className="text-sm font-semibold">Yönetici Kodu</Label>
            <Input
              id="adminCode"
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="bg-slate-700 border-slate-600 text-white h-12 text-base rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              placeholder="Kodu girin"
            />
            {error && <p className="text-red-400 text-xs sm:text-sm">{error}</p>}
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
            disabled={!code.trim()}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed h-12 rounded-xl w-full sm:w-auto shadow-lg"
          >
            Giriş Yap
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}