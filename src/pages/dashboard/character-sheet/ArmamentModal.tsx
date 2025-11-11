import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PixelButton } from "@/components/PixelButton";
import { PixelInput } from "@/components/PixelInput";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Armament, Weapon } from "./types";
import { useState, useEffect } from "react";

interface ArmamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (armament: Armament) => void;
  armament: Armament | null;
  weaponList: Weapon[];
}

const initialArmamentState: Omit<Armament, keyof Weapon> = {
  bonus_ataque: 0,
  bonus_dano: 0,
  observacoes: '',
};

export const ArmamentModal = ({ isOpen, onClose, onSave, armament, weaponList }: ArmamentModalProps) => {
  const [currentArmament, setCurrentArmament] = useState<Armament | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentArmament(armament ? { ...armament } : { ...weaponList[0], ...initialArmamentState, name: "" });
    }
  }, [armament, isOpen, weaponList]);

  const handleBaseWeaponChange = (weaponId: string) => {
    const baseWeapon = weaponList.find(w => w.id === weaponId);
    if (baseWeapon && currentArmament) {
      setCurrentArmament(prev => ({
        ...(prev as Armament),
        ...baseWeapon,
        name: baseWeapon.name,
      }));
    }
  };

  const handleInputChange = (field: keyof Armament, value: string | number) => {
    if (currentArmament) {
      setCurrentArmament(prev => ({ ...prev!, [field]: value }));
    }
  };

  const handleSaveClick = () => {
    if (currentArmament) {
      onSave(currentArmament);
      onClose();
    }
  };

  if (!currentArmament) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card pixel-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-pixel text-lg text-primary pixel-text-shadow">
            {armament ? "Editar Perícia com Arma" : "Adicionar Perícia com Arma"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <Label className="font-pixel text-xs text-foreground">Arma Base</Label>
            <Select onValueChange={handleBaseWeaponChange} value={currentArmament.id}>
              <SelectTrigger className="pixel-border bg-input backdrop-blur-sm font-pixel text-xs h-12 rounded-lg">
                <SelectValue placeholder="Selecione uma arma base..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-2 border-border z-50 rounded-lg">
                {weaponList.map(w => <SelectItem key={w.id} value={w.id} className="font-pixel text-xs">{w.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <PixelInput
            label="Nome Customizado"
            value={currentArmament.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ex: Espada Longa +1"
          />
          <div className="grid grid-cols-2 gap-4">
            <PixelInput
              label="Bônus de Ataque"
              type="number"
              value={currentArmament.bonus_ataque || 0}
              onChange={(e) => handleInputChange('bonus_ataque', parseInt(e.target.value) || 0)}
            />
            <PixelInput
              label="Bônus de Dano"
              type="number"
              value={currentArmament.bonus_dano || 0}
              onChange={(e) => handleInputChange('bonus_dano', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-pixel text-xs text-foreground">Observações</Label>
            <textarea
              value={currentArmament.observacoes || ''}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              className="w-full min-h-[80px] pixel-border bg-input p-2 font-pixel text-xs resize-y rounded-lg"
              placeholder="Ex: +2 de dano contra mortos-vivos"
            />
          </div>
        </div>
        <DialogFooter>
          <PixelButton variant="outline" onClick={onClose}>Cancelar</PixelButton>
          <PixelButton onClick={handleSaveClick}>Salvar</PixelButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};