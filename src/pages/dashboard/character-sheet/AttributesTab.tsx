import { PixelInput } from "@/components/PixelInput";
import { Character, Attributes } from "./types";

interface AttributesTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  isEditing: boolean;
  strengthBonuses: any;
  dexterityBonuses: any;
  constitutionBonuses: any;
  intelligenceBonuses: any;
  wisdomBonuses: any;
  charismaBonuses: any;
}

export const AttributesTab = ({
  character,
  setCharacter,
  isEditing,
  strengthBonuses,
  dexterityBonuses,
  constitutionBonuses,
  intelligenceBonuses,
  wisdomBonuses,
  charismaBonuses,
}: AttributesTabProps) => {
  const handleAttributeChange = (attr: keyof Attributes, value: string) => {
    const numValue = parseInt(value) || 0;
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attr]: numValue,
      },
    }));
  };

  return (
    <div className="mt-0 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Strength */}
        <div className="bg-muted/30 p-4 pixel-border space-y-4">
          <h4 className="font-pixel text-sm text-accent">Força</h4>
          <PixelInput label="Valor" type="number" value={character.attributes.strength} onChange={(e) => handleAttributeChange('strength', e.target.value)} disabled={!isEditing} />
          {character.attributes.strength === 18 && ['fighter', 'paladin', 'ranger'].includes(character.class) && (
            <PixelInput label="Força Excepcional (%)" type="number" value={character.attributes.strengthPercentile} onChange={(e) => handleAttributeChange('strengthPercentile', e.target.value)} disabled={!isEditing} min="0" max="100" />
          )}
          <div className="font-pixel text-xs text-foreground space-y-1 pt-2 border-t border-border/50">
            <p>Acerto: <span className="text-accent">{strengthBonuses.hit > 0 ? '+' : ''}{strengthBonuses.hit}</span></p>
            <p>Dano: <span className="text-accent">{strengthBonuses.dmg > 0 ? '+' : ''}{strengthBonuses.dmg}</span></p>
            <p>Carga: <span className="text-accent">{strengthBonuses.weight}</span></p>
            <p>Sustentação: <span className="text-accent">{strengthBonuses.press}</span></p>
            <p>Abrir Portas: <span className="text-accent">{strengthBonuses.openDoors}</span></p>
            <p>Entortar Barras: <span className="text-accent">{strengthBonuses.bendBars}</span></p>
          </div>
        </div>
        {/* Dexterity */}
        <div className="bg-muted/30 p-4 pixel-border space-y-4">
          <h4 className="font-pixel text-sm text-accent">Destreza</h4>
          <PixelInput label="Valor" type="number" value={character.attributes.dexterity} onChange={(e) => handleAttributeChange('dexterity', e.target.value)} disabled={!isEditing} />
          <div className="font-pixel text-xs text-foreground space-y-1 pt-2 border-t border-border/50">
            <p>Reação: <span className="text-accent">{dexterityBonuses.reaction > 0 ? '+' : ''}{dexterityBonuses.reaction}</span></p>
            <p>Projétil: <span className="text-accent">{dexterityBonuses.missile > 0 ? '+' : ''}{dexterityBonuses.missile}</span></p>
            <p>Defesa (CA): <span className="text-accent">{dexterityBonuses.defense > 0 ? '+' : ''}{dexterityBonuses.defense}</span></p>
          </div>
        </div>
        {/* Constitution */}
        <div className="bg-muted/30 p-4 pixel-border space-y-4">
          <h4 className="font-pixel text-sm text-accent">Constituição</h4>
          <PixelInput label="Valor" type="number" value={character.attributes.constitution} onChange={(e) => handleAttributeChange('constitution', e.target.value)} disabled={!isEditing} />
          <div className="font-pixel text-xs text-foreground space-y-1 pt-2 border-t border-border/50">
            <p>PV / Nível: <span className="text-accent">{constitutionBonuses.hp > 0 ? '+' : ''}{constitutionBonuses.hp}</span></p>
            <p>Sobrev. Choque: <span className="text-accent">{constitutionBonuses.shock}%</span></p>
            <p>Ressurreição: <span className="text-accent">{constitutionBonuses.resurrect}%</span></p>
            <p>Resist. Veneno: <span className="text-accent">{constitutionBonuses.poison > 0 ? '+' : ''}{constitutionBonuses.poison}</span></p>
          </div>
        </div>
        {/* Intelligence */}
        <div className="bg-muted/30 p-4 pixel-border space-y-4">
          <h4 className="font-pixel text-sm text-accent">Inteligência</h4>
          <PixelInput label="Valor" type="number" value={character.attributes.intelligence} onChange={(e) => handleAttributeChange('intelligence', e.target.value)} disabled={!isEditing} />
          <div className="font-pixel text-xs text-foreground space-y-1 pt-2 border-t border-border/50">
            <p>Línguas: <span className="text-accent">{intelligenceBonuses.languages}</span></p>
            <p>Círculo Magia: <span className="text-accent">{intelligenceBonuses.spellLvl}</span></p>
            <p>Aprender Magia: <span className="text-accent">{intelligenceBonuses.learn}%</span></p>
            <p>Max Magias: <span className="text-accent">{intelligenceBonuses.maxSpells}</span></p>
          </div>
        </div>
        {/* Wisdom */}
        <div className="bg-muted/30 p-4 pixel-border space-y-4">
          <h4 className="font-pixel text-sm text-accent">Sabedoria</h4>
          <PixelInput label="Valor" type="number" value={character.attributes.wisdom} onChange={(e) => handleAttributeChange('wisdom', e.target.value)} disabled={!isEditing} />
          <div className="font-pixel text-xs text-foreground space-y-1 pt-2 border-t border-border/50">
            <p>Defesa Mágica: <span className="text-accent">{wisdomBonuses.magicDef > 0 ? '+' : ''}{wisdomBonuses.magicDef}</span></p>
            <p>Falha Magia Divina: <span className="text-accent">{wisdomBonuses.failure}%</span></p>
            <p>Magias Extras: <span className="text-accent">{wisdomBonuses.bonusSpells.join(', ')}</span></p>
          </div>
        </div>
        {/* Charisma */}
        <div className="bg-muted/30 p-4 pixel-border space-y-4">
          <h4 className="font-pixel text-sm text-accent">Carisma</h4>
          <PixelInput label="Valor" type="number" value={character.attributes.charisma} onChange={(e) => handleAttributeChange('charisma', e.target.value)} disabled={!isEditing} />
          <div className="font-pixel text-xs text-foreground space-y-1 pt-2 border-t border-border/50">
            <p>Max Lacaios: <span className="text-accent">{charismaBonuses.henchmen}</span></p>
            <p>Lealdade: <span className="text-accent">{charismaBonuses.loyalty > 0 ? '+' : ''}{charismaBonuses.loyalty}</span></p>
            <p>Reação: <span className="text-accent">{charismaBonuses.reaction > 0 ? '+' : ''}{charismaBonuses.reaction}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};