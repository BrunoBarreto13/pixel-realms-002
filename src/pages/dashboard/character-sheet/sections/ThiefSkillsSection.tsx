import { Character } from "../types";
import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ThiefSkillsSectionProps {
  character: Character;
  isEditing: boolean;
}

const skillNameMap: Record<string, string> = {
  pickPockets: "Bater Carteira",
  openLocks: "Abrir Fechaduras",
  findRemoveTraps: "Achar/Remover Armadilhas",
  moveSilently: "Mover-se em Silêncio",
  hideInShadows: "Esconder-se nas Sombras",
  detectNoise: "Detectar Ruído",
  climbWalls: "Escalar Paredes",
  readLanguages: "Ler Idiomas",
};

export const ThiefSkillsSection = ({ character }: ThiefSkillsSectionProps) => {
  const { toast } = useToast();
  if (!character.thiefSkills) return null;

  const handleRollSkill = (skillName: string, totalValue: number) => {
    const roll = Math.floor(Math.random() * 100) + 1;
    const success = roll <= totalValue;
    toast({
      title: `Teste de ${skillName}`,
      description: `Rolagem (d100): ${roll} vs ${totalValue}% = ${success ? 'SUCESSO' : 'FALHA'}`,
    });
  };

  return (
    <PixelPanel>
      <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">Talentos de Ladrão</h3>
      <div className="space-y-2">
        {Object.entries(character.thiefSkills).map(([key, skill]) => (
          <div key={key} className="grid grid-cols-3 items-center gap-4 bg-input p-2 pixel-border-inset text-xs">
            <span className="font-pixel">{skillNameMap[key] || key}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-pixel font-bold text-accent text-center cursor-help">{skill.total}%</span>
                </TooltipTrigger>
                <TooltipContent className="bg-card border-2 border-border font-pixel text-xs">
                  <p>Base: {skill.base}%</p>
                  <p>Modificadores: {skill.modifiers > 0 ? '+' : ''}{skill.modifiers}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="text-right">
              <PixelButton size="sm" variant="secondary" onClick={() => handleRollSkill(skillNameMap[key], skill.total)}>
                Rolar
              </PixelButton>
            </div>
          </div>
        ))}
      </div>
    </PixelPanel>
  );
};