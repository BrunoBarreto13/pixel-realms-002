import { Character, Experience, SavingThrows } from "./types";
import { PixelPanel } from "@/components/PixelPanel";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface InfoTabProps {
  character: Character;
  strengthBonuses: any;
  dexterityBonuses: any;
  constitutionBonuses: any;
  intelligenceBonuses: any;
  wisdomBonuses: any;
  charismaBonuses: any;
  calculatedCaDetails: {
    ca_base: number;
    ajustes: { fonte: string; valor: number; item?: string }[];
    ca_final: number;
  };
  calculatedThac0: number;
  calculatedSaves: SavingThrows;
}

const InfoDetailCard = ({ label, value, className }: { label: string, value: string | number, className?: string }) => (
  <div className={cn("bg-input p-3 pixel-border text-center", className)}>
    <Label className="font-pixel text-[10px] text-muted-foreground block">{label}</Label>
    <p className="font-pixel text-sm text-primary font-bold mt-1">{value}</p>
  </div>
);

const InfoTab = ({
  character,
  strengthBonuses,
  dexterityBonuses,
  constitutionBonuses,
  intelligenceBonuses,
  wisdomBonuses,
  charismaBonuses,
  calculatedCaDetails,
  calculatedThac0,
  calculatedSaves,
}: InfoTabProps) => {
  const hpPercent = character.maxHp > 0 ? Math.min(100, (character.hp / character.maxHp) * 100) : 0;
  const xpProgress = character.experience.forNextLevel > 0 ? Math.min(100, (character.experience.current / character.experience.forNextLevel) * 100) : 0;

  return (
    <div className="mt-0 space-y-6">
      {/* Character Overview */}
      <PixelPanel className="p-4 space-y-4">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow">Visão Geral do Personagem</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Nome</Label>
            <p className="font-bold text-foreground">{character.name}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Jogador</Label>
            <p className="font-bold text-foreground">{character.playerName}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Raça</Label>
            <p className="font-bold text-foreground">{character.race}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Classe</Label>
            <p className="font-bold text-foreground">{character.class}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Nível</Label>
            <p className="font-bold text-foreground">{character.level}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Tendência</Label>
            <p className="font-bold text-foreground">{character.alignment}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* HP Summary */}
          <div className="bg-input p-3 pixel-border-inset space-y-2">
            <div className="flex justify-between items-baseline text-xs">
              <Label className="font-pixel text-hp-red">PV</Label>
              <span className={cn("text-foreground/80", hpPercent < 25 && "text-destructive")}>{character.hp}/{character.maxHp}</span>
            </div>
            <Progress value={hpPercent} className="h-3 bg-black pixel-border-inset" indicatorClassName={cn("bg-hp-red", hpPercent < 25 && "bg-destructive")} />
          </div>
          {/* XP Summary */}
          <div className="bg-input p-3 pixel-border-inset space-y-2">
            <div className="flex justify-between items-baseline text-xs">
              <Label className="font-pixel text-accent">XP</Label>
              <span className="text-foreground/80">{character.experience.current}/{character.experience.forNextLevel}</span>
            </div>
            <Progress value={xpProgress} className="h-3 bg-black pixel-border-inset" indicatorClassName="bg-accent" />
          </div>
        </div>
      </PixelPanel>

      {/* Attributes Summary */}
      <PixelPanel className="p-4 space-y-4">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow">Atributos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Força</Label>
            <p className="font-bold text-foreground">{character.attributes.strength}</p>
            <p className="text-[10px] text-accent">Acerto: {strengthBonuses.hit > 0 ? '+' : ''}{strengthBonuses.hit}</p>
            <p className="text-[10px] text-accent">Dano: {strengthBonuses.dmg > 0 ? '+' : ''}{strengthBonuses.dmg}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Destreza</Label>
            <p className="font-bold text-foreground">{character.attributes.dexterity}</p>
            <p className="text-[10px] text-accent">CA: {dexterityBonuses.defense > 0 ? '+' : ''}{dexterityBonuses.defense}</p>
            <p className="text-[10px] text-accent">Projétil: {dexterityBonuses.missile > 0 ? '+' : ''}{dexterityBonuses.missile}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Constituição</Label>
            <p className="font-bold text-foreground">{character.attributes.constitution}</p>
            <p className="text-[10px] text-accent">PV/Nível: {constitutionBonuses.hp > 0 ? '+' : ''}{constitutionBonuses.hp}</p>
            <p className="text-[10px] text-accent">Choque: {constitutionBonuses.shock}%</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Inteligência</Label>
            <p className="font-bold text-foreground">{character.attributes.intelligence}</p>
            <p className="text-[10px] text-accent">Línguas: {intelligenceBonuses.languages}</p>
            <p className="text-[10px] text-accent">Max Magias: {intelligenceBonuses.maxSpells}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Sabedoria</Label>
            <p className="font-bold text-foreground">{character.attributes.wisdom}</p>
            <p className="text-[10px] text-accent">Def. Mágica: {wisdomBonuses.magicDef > 0 ? '+' : ''}{wisdomBonuses.magicDef}</p>
            <p className="text-[10px] text-accent">Magias Extras: {wisdomBonuses.bonusSpells.length > 0 ? wisdomBonuses.bonusSpells.join(', ') : 'Nenhum'}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Carisma</Label>
            <p className="font-bold text-foreground">{character.attributes.charisma}</p>
            <p className="text-[10px] text-accent">Reação: {charismaBonuses.reaction > 0 ? '+' : ''}{charismaBonuses.reaction}</p>
            <p className="text-[10px] text-accent">Lealdade: {charismaBonuses.loyalty > 0 ? '+' : ''}{charismaBonuses.loyalty}</p>
          </div>
        </div>
      </PixelPanel>

      {/* Combat & Saves Summary */}
      <PixelPanel className="p-4 space-y-4">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow">Combate e Testes de Resistência</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <InfoDetailCard label="CA" value={calculatedCaDetails.ca_final} />
          <InfoDetailCard label="THAC0" value={calculatedThac0} />
          <InfoDetailCard label="Iniciativa" value={character.initiative} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center font-pixel text-xs mt-4">
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Paral./Veneno</Label>
            <p className="text-lg text-primary">{calculatedSaves.poison}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Petrif./Polim.</Label>
            <p className="text-lg text-primary">{calculatedSaves.petrification}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Bastão/Varinha</Label>
            <p className="text-lg text-primary">{calculatedSaves.rod}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Sopro de Dragão</Label>
            <p className="text-lg text-primary">{calculatedSaves.breath}</p>
          </div>
          <div className="bg-input p-2 pixel-border-inset">
            <Label className="text-muted-foreground">Magia</Label>
            <p className="text-lg text-primary">{calculatedSaves.spell}</p>
          </div>
        </div>
      </PixelPanel>
    </div>
  );
};

export default InfoTab;