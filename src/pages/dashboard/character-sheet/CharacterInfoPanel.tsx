import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { User, Save, Edit, Minus, Plus, Upload } from "lucide-react";
import { Character, Race, CharacterClass, Experience } from "./types";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PixelInput } from "@/components/PixelInput";
import { PHB_CLASS_DETAILS_PTBR, PHB_CLASSES } from "@/lib/players-handbook";
import { Progress } from "@/components/ui/progress";
import * as Rules from "@/lib/add-2e-rules";

interface CharacterInfoPanelProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  isEditing: boolean;
  onSave: () => void;
  onEdit: () => void;
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculateHP: () => void;
  onLevelChange: (newLevel: number) => void;
  races: Race[];
  classes: CharacterClass[];
  strengthBonuses: any;
  dexterityBonuses: any;
  calculatedCaDetails: {
    ca_base: number;
    ajustes: { fonte: string; valor: number; item?: string }[];
    ca_final: number;
  };
  calculatedThac0: number;
}

const InfoDetailCard = ({ label, value, className }: { label: string, value: string | number, className?: string }) => (
  <div className={cn("bg-input p-3 pixel-border text-center", className)}>
    <Label className="font-pixel text-[10px] text-muted-foreground block">{label}</Label>
    <p className="font-pixel text-sm text-primary font-bold mt-1">{value}</p>
  </div>
);

const InfoInput = ({ label, value, onChange, disabled, type = 'text', className, placeholder }: { label: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled: boolean, type?: string, className?: string, placeholder?: string }) => (
  <div className={cn("flex flex-col gap-1", className)}>
    <Label className="font-pixel text-[10px] uppercase text-muted-foreground block">{label}</Label>
    <PixelInput 
      type={type}
      value={value}
      onChange={onChange}
      disabled={!disabled} // Invertendo a lógica para usar 'disabled' do PixelInput
      placeholder={placeholder}
      className="h-8 px-2 py-0 text-xs bg-input border-2 border-border focus:ring-0"
    />
  </div>
);

const InfoSelect = ({ label, value, onValueChange, disabled, options, className }: { label: string, value: string, onValueChange: (value: string) => void, disabled: boolean, options: { name: string, value: string }[], className?: string }) => (
  <div className={cn("flex flex-col gap-1", className)}>
    <Label className="font-pixel text-[10px] uppercase text-muted-foreground block">{label}</Label>
    <Select value={value} onValueChange={onValueChange} disabled={!disabled}>
      <SelectTrigger className="h-8 px-2 py-0 text-xs bg-input border-2 border-border focus:ring-0 font-pixel text-foreground">
        <SelectValue placeholder="Selecione..." />
      </SelectTrigger>
      <SelectContent className="bg-card border-2 border-border z-50">
        {options.map(opt => <SelectItem key={opt.value} value={opt.value} className="font-pixel text-xs">{opt.name}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>
);

const ColorPicker = ({ value, onChange, disabled }: { value: string, onChange: (value: string) => void, disabled: boolean }) => {
  const presetColors = [
    '#c7a547', '#c74747', '#7c47c7', '#47c77c', '#477cc7', '#c77c47', '#d1d5db', '#8b5cf6', '#34d399', '#fbbf24', '#a3a3a3', '#f472b6'
  ];

  return (
    <div className="flex flex-col gap-1 col-span-full">
      <Label className="font-pixel text-[10px] uppercase text-muted-foreground block">Cor do Jogador (Chat)</Label>
      <div className="flex flex-wrap items-center gap-2 bg-input p-2 pixel-border-inset">
        {presetColors.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => !disabled && onChange(color)}
            className={cn(
              "size-6 rounded-sm border-2 transition-all",
              value === color ? "border-accent ring-2 ring-offset-2 ring-offset-input" : "border-transparent hover:border-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{ backgroundColor: color }}
            disabled={disabled}
          />
        ))}
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          disabled={disabled} 
          className="w-8 h-8 p-0.5 bg-input pixel-border cursor-pointer disabled:cursor-not-allowed" 
        />
      </div>
    </div>
  );
};

const XPSection = ({ experience, isEditing, setCharacter }: { experience: Experience, isEditing: boolean, setCharacter: React.Dispatch<React.SetStateAction<Character>> }) => {
  const currentXP = experience.current;
  const nextLevelXP = experience.forNextLevel;
  const requiredXP = Math.max(0, nextLevelXP - currentXP);
  const progress = nextLevelXP > 0 ? Math.min(100, (currentXP / nextLevelXP) * 100) : 0;

  const handleXPChange = (value: string) => {
    setCharacter(prev => ({
      ...prev,
      experience: {
        ...prev.experience!,
        current: parseInt(value) || 0,
      }
    }));
  };

  return (
    <PixelPanel className="p-4 space-y-3">
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow">Pontos de Experiência</h3>
      <div className="mb-3 flex justify-between text-xs">
        <div>
          <span className="text-muted-foreground">XP Atual: </span>
          <span className="font-bold text-foreground">
            {isEditing ? (
              <input 
                type="number" 
                value={currentXP} 
                onChange={(e) => handleXPChange(e.target.value)} 
                className="w-20 border-none bg-transparent p-0 text-xs text-foreground focus:ring-0"
                disabled={!isEditing}
              />
            ) : (
              currentXP.toLocaleString('pt-BR')
            )}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Próximo Nível: </span>
          <span className="font-bold text-primary">{nextLevelXP.toLocaleString('pt-BR')}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <Progress value={progress} className="h-4 bg-black pixel-border-inset" indicatorClassName="bg-accent" />
        <p className="text-center text-[10px] text-muted-foreground">Faltam {requiredXP.toLocaleString('pt-BR')} XP para o próximo nível</p>
      </div>
    </PixelPanel>
  );
};

const HPSection = ({ character, onCalculateHP, isEditing, setCharacter }: { character: Character, onCalculateHP: () => void, isEditing: boolean, setCharacter: React.Dispatch<React.SetStateAction<Character>> }) => {
  const currentHP = character.hp;
  const maxHP = character.maxHp;
  const hpPercent = maxHP > 0 ? Math.min(100, (currentHP / maxHP) * 100) : 0;

  const handleHPChange = (value: string) => {
    setCharacter(prev => ({
      ...prev,
      hp: parseInt(value) || 0,
    }));
  };
  
  const handleMaxHPChange = (value: string) => {
    setCharacter(prev => ({
      ...prev,
      maxHp: parseInt(value) || 0,
    }));
  };

  return (
    <PixelPanel className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-pixel text-sm text-hp-red pixel-text-shadow">Pontos de Vida (HP)</h3>
        {isEditing && (
          <PixelButton size="sm" variant="secondary" onClick={onCalculateHP}>
            CALCULAR MAX
          </PixelButton>
        )}
      </div>
      
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Atual / Máximo</span>
        <div className="flex items-baseline">
          <input 
            className="w-16 border-none bg-transparent p-0 text-right text-3xl font-bold text-hp-red focus:ring-0 disabled:opacity-100" 
            type="number" 
            value={currentHP}
            onChange={(e) => handleHPChange(e.target.value)}
            disabled={!isEditing}
          />
          <span className="text-xl font-bold text-muted-foreground"> / </span>
          <input 
            className="w-16 border-none bg-transparent p-0 text-left text-3xl font-bold text-primary focus:ring-0 disabled:opacity-100" 
            type="number" 
            value={maxHP}
            onChange={(e) => handleMaxHPChange(e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
      
      <div className="w-full">
        <Progress value={hpPercent} className="h-4 bg-black pixel-border-inset" indicatorClassName={cn("bg-hp-red", hpPercent < 25 && "bg-destructive")} />
      </div>
    </PixelPanel>
  );
};

const ClassInfoSection = ({ character }: { character: Character }) => {
  const classData = PHB_CLASSES.find(c => c.value === character.class);
  const classDetail = PHB_CLASS_DETAILS_PTBR.find(d => d.name === classData?.name);
  const hitDie = classData?.hit_die;
  const thac0 = Rules.getThac0(character.class, character.level);
  
  const requirements = classDetail?.requisitos.split(';').map(r => r.trim()).filter(r => r !== 'Nenhum requisito especial.');
  const alignment = classDetail?.requisitos.includes('alinhamento') ? classDetail.requisitos.split('alinhamento')[1].trim().replace('.', '') : 'Qualquer';

  return (
    <div className="p-4 space-y-3 bg-muted/30 pixel-border"> {/* Changed to a div with styling */}
      <h3 className="font-pixel text-sm text-primary pixel-text-shadow">Informações da Classe: {classData?.name || '---'}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <InfoDetailCard label="Dado de Vida" value={hitDie ? `d${hitDie}` : '---'} />
        <InfoDetailCard label="TACO Base" value={thac0} />
        <InfoDetailCard label="Requisitos Primários" value={requirements?.join(', ') || 'Nenhum'} />
        <InfoDetailCard label="Alinhamento Permitido" value={alignment} />
      </div>
    </div>
  );
};


const CharacterInfoPanel = ({
  character,
  setCharacter,
  isEditing,
  onSave,
  onEdit,
  onAvatarUpload,
  onCalculateHP,
  onLevelChange,
  races,
  classes,
  strengthBonuses,
  dexterityBonuses,
  calculatedCaDetails,
  calculatedThac0,
}: CharacterInfoPanelProps) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  
  const handleAvatarClick = () => {
    if (isEditing) {
      avatarInputRef.current?.click();
    }
  };

  const handleInputChange = (field: keyof Character, value: string | number) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: keyof Character, value: string) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  // HP and XP calculations for quick display
  const currentHP = character.hp;
  const maxHP = character.maxHp;
  const hpPercent = maxHP > 0 ? Math.min(100, (currentHP / maxHP) * 100) : 0;

  const currentXP = character.experience.current;
  const nextLevelXP = character.experience.forNextLevel;
  const requiredXP = Math.max(0, nextLevelXP - currentXP);
  const xpProgress = nextLevelXP > 0 ? Math.min(100, (currentXP / nextLevelXP) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* Left Column: Unified Profile Card (Sidebar-like) */}
      <PixelPanel className="lg:col-span-1 flex flex-col items-center p-4 space-y-4 h-full overflow-y-auto"> {/* Reduced padding, added overflow */}
        <div className="relative w-32 h-32 pixel-border bg-muted/50 flex items-center justify-center flex-shrink-0"> {/* Smaller avatar */}
            {character.avatarUrl ? (
              <img 
                src={character.avatarUrl} 
                alt={character.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-muted-foreground" /> 
            )}
            {isEditing && (
              <div 
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleAvatarClick}
              >
                <Upload className="w-8 h-8 text-white" /> 
              </div>
            )}
            <input
              type="file"
              ref={avatarInputRef}
              onChange={onAvatarUpload}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
          </div>
          
          <div className="text-center w-full">
            <PixelInput 
              value={character.name} 
              onChange={(e) => handleInputChange('name', e.target.value)} 
              disabled={!isEditing} 
              placeholder="Nome do Personagem"
              className="h-8 text-center text-xl font-bold bg-transparent border-none focus:ring-0"
            />
            <p className="font-pixel text-xs text-muted-foreground">
              {character.race || "Raça"} • {character.class || "Classe"} • Nível {character.level}
            </p>
            <PixelInput 
              value={character.playerName} 
              onChange={(e) => handleInputChange('playerName', e.target.value)} 
              disabled={!isEditing} 
              placeholder="Nome do Jogador"
              className="h-6 text-center text-xs text-muted-foreground bg-transparent border-none focus:ring-0"
            />
          </div>

          {/* Quick Stats: HP, CA, THAC0 */}
          <div className="w-full grid grid-cols-3 gap-2 text-xs mt-4">
            <div className="bg-input p-2 pixel-border-inset text-center">
              <Label className="font-pixel text-[10px] text-hp-red block">PV</Label>
              <p className="font-pixel text-sm text-foreground font-bold">{currentHP}/{maxHP}</p>
            </div>
            <div className="bg-input p-2 pixel-border-inset text-center">
              <Label className="font-pixel text-[10px] text-primary block">CA</Label>
              <p className="font-pixel text-sm text-foreground font-bold">{calculatedCaDetails.ca_final}</p>
            </div>
            <div className="bg-input p-2 pixel-border-inset text-center">
              <Label className="font-pixel text-[10px] text-primary block">TACO</Label>
              <p className="font-pixel text-sm text-foreground font-bold">{calculatedThac0}</p>
            </div>
          </div>

          {/* XP Bar */}
          <div className="w-full space-y-1 mt-4">
            <div className="flex justify-between items-baseline text-xs">
              <Label className="font-pixel text-accent">XP</Label>
              <span className="text-foreground/80">{currentXP.toLocaleString('pt-BR')}/{nextLevelXP.toLocaleString('pt-BR')}</span>
            </div>
            <Progress value={xpProgress} className="h-3 bg-black pixel-border-inset" indicatorClassName="bg-accent" />
            <p className="text-center text-[10px] text-muted-foreground">Faltam {requiredXP.toLocaleString('pt-BR')} XP para o próximo nível</p>
          </div>

          {/* Class Info Section (integrated into left panel) */}
          {character.class && (
            <ClassInfoSection character={character} />
          )}

          {/* Action Buttons (sticky at bottom) */}
          <div className="w-full flex flex-col gap-2 mt-4 sticky bottom-0 bg-card pt-4 border-t-2 border-border">
            {!isEditing ? (
              <PixelButton onClick={onEdit} variant="outline" className="flex items-center justify-center gap-2 flex-1">
                <Edit className="h-4 w-4" />
                <span>EDITAR FICHA</span>
              </PixelButton>
            ) : (
              <PixelButton onClick={onSave} className="flex items-center justify-center gap-2 flex-1">
                <Save className="h-4 w-4" />
                <span>SALVAR FICHA</span>
              </PixelButton>
            )}
            <PixelButton variant="secondary" className="flex items-center justify-center gap-2 flex-1">
              {/* Placeholder for dice icon */}
              <img src="/placeholder.svg" alt="Dice icon" className="h-4 w-4" /> 
              <span>ROLAGENS RÁPIDAS</span>
            </PixelButton>
          </div>
        </PixelPanel>

      {/* Right Columns: Basic Info, HP, XP (separate editable panels) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        
        {/* Painel de Informações Básicas (Editable fields) */}
        <PixelPanel className="p-6 space-y-6">
          <h3 className="font-pixel text-lg text-accent pixel-text-shadow uppercase">Informações Básicas</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-4">
            
            {/* Raça */}
            <InfoSelect 
              label="Raça" 
              value={character.race} 
              onValueChange={(v) => handleSelectChange('race', v)} 
              disabled={isEditing} 
              options={races}
              className="col-span-2"
            />
            
            {/* Classe */}
            <InfoSelect 
              label="Classe" 
              value={character.class} 
              onValueChange={(v) => handleSelectChange('class', v)} 
              disabled={isEditing} 
              options={classes}
              className="col-span-2"
            />
            
            {/* Nível */}
            <div className="col-span-2 flex flex-col gap-1">
              <Label className="font-pixel text-[10px] uppercase text-muted-foreground block">Nível</Label>
              <div className="flex items-center">
                <PixelButton size="icon" variant="secondary" onClick={() => onLevelChange(Math.max(1, character.level - 1))} disabled={!isEditing} className="h-8 w-8 p-0 rounded-r-none"><Minus className="h-3 w-3" /></PixelButton>
                <input 
                  type="number" 
                  value={character.level} 
                  onChange={(e) => onLevelChange(parseInt(e.target.value) || 1)} 
                  className="flex h-8 w-full pixel-border bg-input px-1 py-0 font-pixel text-xs text-center text-foreground border-x-0 focus:ring-0 disabled:opacity-100" 
                  min={1} max={20} 
                  disabled={!isEditing} 
                />
                <PixelButton size="icon" variant="secondary" onClick={() => onLevelChange(Math.min(20, character.level + 1))} disabled={!isEditing} className="h-8 w-8 p-0 rounded-l-none"><Plus className="h-3 w-3" /></PixelButton>
              </div>
            </div>
            
            {/* Tendência */}
            <InfoInput 
              label="Tendência" 
              value={character.alignment} 
              onChange={(e) => handleInputChange('alignment', e.target.value)} 
              disabled={isEditing}
              className="col-span-2"
            />
            
            {/* Idade */}
            <InfoInput 
              label="Idade" 
              type="number"
              value={character.age} 
              onChange={(e) => handleInputChange('age', e.target.value)} 
              disabled={isEditing}
              className="col-span-1"
            />
            
            {/* Altura */}
            <InfoInput 
              label="Altura" 
              value={character.height} 
              onChange={(e) => handleInputChange('height', e.target.value)} 
              disabled={isEditing}
              className="col-span-1"
            />
            
            {/* Peso */}
            <InfoInput 
              label="Peso" 
              value={character.weight} 
              onChange={(e) => handleInputChange('weight', e.target.value)} 
              disabled={isEditing}
              className="col-span-1"
            />
            
            {/* Cabelos */}
            <InfoInput 
              label="Cabelos" 
              value={character.hair} 
              onChange={(e) => handleInputChange('hair', e.target.value)} 
              disabled={isEditing}
              className="col-span-1"
            />
            
            {/* Olhos */}
            <InfoInput 
              label="Olhos" 
              value={character.eyes} 
              onChange={(e) => handleInputChange('eyes', e.target.value)} 
              disabled={isEditing}
              className="col-span-1"
            />
            
            {/* Cor do Jogador */}
            <ColorPicker 
              value={character.color} 
              onChange={(v) => handleInputChange('color', v)} 
              disabled={!isEditing}
            />
          </div>
        </PixelPanel>

        {/* HP Section (Editable fields) */}
        <HPSection character={character} onCalculateHP={onCalculateHP} isEditing={isEditing} setCharacter={setCharacter} />
        
        {/* XP Section (Editable fields) */}
        {character.experience && (
          <XPSection experience={character.experience} isEditing={isEditing} setCharacter={setCharacter} />
        )}
      </div>
    </div>
  );
};

export default CharacterInfoPanel;