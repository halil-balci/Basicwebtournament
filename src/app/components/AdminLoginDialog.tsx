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
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-orange-500" />
            Yönetici Girişi
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Skor girişi yapmak için yönetici kodunu girin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="adminCode">Yönetici Kodu</Label>
            <Input
              id="adminCode"
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Kodu girin"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300">
            İptal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!code.trim()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Giriş Yap
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
