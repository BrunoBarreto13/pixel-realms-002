import { useState, useMemo } from "react";
import { PixelInput } from "@/components/PixelInput";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spell } from "@/pages/dashboard/character-sheet/types";
import { SpellCard } from "./SpellCard";
import { PixelButton } from "@/components/PixelButton";
import { ArrowLeft } from "lucide-react";
import { PixelPanel } from "@/components/PixelPanel";

interface SpellListViewProps {
  spells: Spell[];
  title: string;
  onBack: () => void;
}

const SpellListView = ({ spells, title, onBack }: SpellListViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredSpells = useMemo(() => {
    return spells.filter(spell => {
      const nameMatch = spell.name.toLowerCase().includes(searchTerm.toLowerCase());
      const levelMatch = levelFilter === "all" || spell.level === parseInt(levelFilter);
      return nameMatch && levelMatch;
    });
  }, [spells, searchTerm, levelFilter]);

  const spellLevels = useMemo(() => {
    const levels = new Set(spells.map(s => s.level));
    return Array.from(levels).sort((a, b) => a - b);
  }, [spells]);

  return (
    <PixelPanel>
      <div className="flex items-center gap-4 mb-6">
        <PixelButton onClick={onBack} variant="outline" size="icon" aria-label="Voltar">
          <ArrowLeft className="h-4 w-4" />
        </PixelButton>
        <h2 className="font-pixel text-xl text-primary pixel-text-shadow">{title}</h2>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <PixelInput
            placeholder="Buscar magia pelo nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="pixel-border bg-card/50 backdrop-blur-sm font-pixel text-xs h-12">
              <SelectValue placeholder="Filtrar por círculo..." />
            </SelectTrigger>
            <SelectContent className="bg-card border-2 border-border z-50">
              <SelectItem value="all" className="font-pixel text-xs">Todos os Círculos</SelectItem>
              {spellLevels.map(level => (
                <SelectItem key={level} value={String(level)} className="font-pixel text-xs">
                  Círculo {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {filteredSpells.map((spell) => (
            <AccordionItem key={spell.name} value={spell.name} className="pixel-border bg-card/80 backdrop-blur-sm">
              <AccordionTrigger className="font-pixel text-xs p-4 hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>{spell.name}</span>
                  <span className="text-muted-foreground">Círculo {spell.level}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <SpellCard spell={spell} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {filteredSpells.length === 0 && (
          <p className="text-center font-pixel text-xs text-muted-foreground py-8">
            Nenhuma magia encontrada.
          </p>
        )}
      </div>
    </PixelPanel>
  );
};

export default SpellListView;