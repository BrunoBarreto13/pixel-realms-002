import PagePanel from "@/components/PagePanel";
import { useAuth } from "@/hooks/useAuth";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronRight, Users, Skull, Notebook, BookOpen, Bot, Ghost, ScrollText } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PixelButton } from "@/components/PixelButton";

const MasterScreen = () => {
  const { profile } = useAuth();
  const [openMenus, setOpenMenus] = useState<string[]>(['campaign']);

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const campaignName = profile?.character_or_campaign || "Minha Campanha";

  return (
    <PagePanel title="Divisória do Mestre">
      <div className="rpg-panel space-y-4 rounded-lg">
        {/* Main Campaign Collapsible */}
        <Collapsible 
          open={openMenus.includes('campaign')} 
          onOpenChange={() => toggleMenu('campaign')}
        >
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between text-left bg-card p-4 pixel-border cursor-pointer hover:bg-muted/30 transition-colors rounded-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-accent" />
                <span className="font-pixel text-lg text-accent">{campaignName}</span>
              </div>
              <ChevronRight className={cn("h-5 w-5 transition-transform", openMenus.includes('campaign') ? "rotate-90" : "")} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2 pl-6">
            {/* Sub-collapsible: Personagens */}
            <Collapsible open={openMenus.includes('characters')} onOpenChange={() => toggleMenu('characters')}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between text-left bg-muted/30 p-3 pixel-border cursor-pointer hover:bg-muted/50 transition-colors rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="font-pixel text-sm">Personagens</span>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", openMenus.includes('characters') ? "rotate-90" : "")} />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 pl-4 py-2">
                <PixelButton variant="secondary" className="w-full justify-start">Criar Personagem</PixelButton>
                <PixelButton variant="secondary" className="w-full justify-start">Gerenciar Personagens</PixelButton>
                <PixelButton variant="secondary" className="w-full justify-start">Fichas dos Jogadores</PixelButton>
              </CollapsibleContent>
            </Collapsible>
            {/* Sub-collapsible: Mundo e Aventuras */}
            <Collapsible open={openMenus.includes('world')} onOpenChange={() => toggleMenu('world')}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between text-left bg-muted/30 p-3 pixel-border cursor-pointer hover:bg-muted/50 transition-colors rounded-lg">
                  <div className="flex items-center gap-2">
                    <Skull className="h-4 w-4" />
                    <span className="font-pixel text-sm">Mundo e Aventuras</span>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", openMenus.includes('world') ? "rotate-90" : "")} />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 pl-4 py-2">
                <PixelButton variant="secondary" className="w-full justify-start">Criar Localização</PixelButton>
                <PixelButton variant="secondary" className="w-full justify-start">Gerenciar Aventuras</PixelButton>
                <PixelButton variant="secondary" className="w-full justify-start">Mapas e Ilustrações</PixelButton>
              </CollapsibleContent>
            </Collapsible>
            {/* Sub-collapsible: Sessões */}
            <Collapsible open={openMenus.includes('session')} onOpenChange={() => toggleMenu('session')}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between text-left bg-muted/30 p-3 pixel-border cursor-pointer hover:bg-muted/50 transition-colors rounded-lg">
                  <div className="flex items-center gap-2">
                    <Notebook className="h-4 w-4" />
                    <span className="font-pixel text-sm">Sessões</span>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", openMenus.includes('session') ? "rotate-90" : "")} />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 pl-4 py-2">
                <PixelButton variant="secondary" className="w-full justify-start">Registrar Sessão</PixelButton>
                <PixelButton variant="secondary" className="w-full justify-start">Histórico de Sessões</PixelButton>
                <PixelButton variant="secondary" className="w-full justify-start">Recompensas e XP</PixelButton>
              </CollapsibleContent>
            </Collapsible>
          </CollapsibleContent>
        </Collapsible>

        {/* Other Collapsibles */}
        <Collapsible disabled>
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between text-left bg-muted/30 p-4 pixel-border cursor-not-allowed opacity-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5" />
                <span className="font-pixel text-lg">NPCs</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </button>
          </CollapsibleTrigger>
        </Collapsible>
        <Collapsible disabled>
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between text-left bg-muted/30 p-4 pixel-border cursor-not-allowed opacity-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Ghost className="h-5 w-5" />
                <span className="font-pixel text-lg">Monstros</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </button>
          </CollapsibleTrigger>
        </Collapsible>
        <Collapsible disabled>
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between text-left bg-muted/30 p-4 pixel-border cursor-not-allowed opacity-50 rounded-lg">
              <div className="flex items-center gap-3">
                <ScrollText className="h-5 w-5" />
                <span className="font-pixel text-lg">Notas da Sessão</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    </PagePanel>
  );
};

export default MasterScreen;