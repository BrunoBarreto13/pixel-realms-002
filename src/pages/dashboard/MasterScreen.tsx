import PagePanel from "@/components/PagePanel";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronRight, Users, Skull, Notebook } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PixelButton } from "@/components/PixelButton";

const tabTriggerClasses = "font-pixel text-xs uppercase px-4 py-2 border-4 border-border bg-secondary text-secondary-foreground rounded-t-lg shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[4px] z-10";

const MasterScreen = () => {
  const { profile } = useAuth();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <PagePanel title="Divisória do Mestre">
      <Tabs defaultValue="campaign" className="w-full">
        <TabsList className="flex flex-wrap gap-1 bg-transparent p-0 h-auto">
          <TabsTrigger value="campaign" className={tabTriggerClasses}>
            Gestão de Campanha
          </TabsTrigger>
          <TabsTrigger value="npcs" className={tabTriggerClasses} disabled>
            NPCs
          </TabsTrigger>
          <TabsTrigger value="monsters" className={tabTriggerClasses} disabled>
            Monstros
          </TabsTrigger>
          <TabsTrigger value="notes" className={tabTriggerClasses} disabled>
            Notas da Sessão
          </TabsTrigger>
        </TabsList>

        <div className="rpg-panel relative">
          {/* Gestão de Campanha */}
          <TabsContent value="campaign" className="mt-0 space-y-6">
            <h3 className="font-pixel text-lg text-primary pixel-text-shadow mb-4">
              Gestão de Campanha
            </h3>
            
            <div className="space-y-4">
              <Collapsible 
                open={openMenu === 'characters'} 
                onOpenChange={() => toggleMenu('characters')}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between bg-muted/30 p-4 pixel-border cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="font-pixel text-sm">Personagens</span>
                    </div>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", openMenu === 'characters' ? "rotate-90" : "")} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2 pl-4">
                  <PixelButton variant="secondary" className="w-full justify-start">
                    Criar Personagem
                  </PixelButton>
                  <PixelButton variant="secondary" className="w-full justify-start">
                    Gerenciar Personagens
                  </PixelButton>
                  <PixelButton variant="secondary" className="w-full justify-start">
                    Fichas dos Jogadores
                  </PixelButton>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible 
                open={openMenu === 'world'} 
                onOpenChange={() => toggleMenu('world')}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between bg-muted/30 p-4 pixel-border cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Skull className="h-4 w-4" />
                      <span className="font-pixel text-sm">Mundo e Aventuras</span>
                    </div>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", openMenu === 'world' ? "rotate-90" : "")} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2 pl-4">
                  <PixelButton variant="secondary" className="w-full justify-start">
                    Criar Localização
                  </PixelButton>
                  <PixelButton variant="secondary" className="w-full justify-start">
                    Gerenciar Aventuras
                  </PixelButton>
                  <PixelButton variant="secondary" className="w-full justify-start">
                    Mapas e Ilustrações
                  </PixelButton>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible 
                open={openMenu === 'session'} 
                onOpenChange={() => toggleMenu('session')}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between bg-muted/30 p-4 pixel-border cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Notebook className="h-4 w-4" />
                      <span className="font-pixel text-sm">Sessões</span>
                    </div>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", openMenu === 'session' ? "rotate-90" : "")} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2 pl-4">
                  <PixelButton variant="secondary" className="w-full justify-start">
                    Registrar Sessão
                  </PixelButton>
                  <PixelButton variant="secondary" className="w-full justify-start">
                    Histórico de Sessões
                  </PixelButton>
                  <PixelButton variant="secondary" className="w-full justify-start">
                    Recompensas e XP
                  </PixelButton>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="bg-muted/30 p-4 pixel-border mt-6">
              <p className="font-pixel text-xs text-muted-foreground">
                Campanha Ativa:
              </p>
              <p className="font-pixel text-base text-accent mt-2">
                {profile?.character_or_campaign || "Nenhuma campanha ativa."}
              </p>
              <p className="font-pixel text-xs text-muted-foreground mt-4">
                (Funcionalidade para criar/gerenciar campanhas será adicionada aqui)
              </p>
            </div>
          </TabsContent>

          {/* NPCs */}
          <TabsContent value="npcs" className="mt-0">
            <h3 className="font-pixel text-lg text-primary pixel-text-shadow mb-4">
              Gestão de NPCs
            </h3>
            <p className="font-pixel text-sm text-muted-foreground">
              Em desenvolvimento...
            </p>
          </TabsContent>

          {/* Monstros */}
          <TabsContent value="monsters" className="mt-0">
            <h3 className="font-pixel text-lg text-primary pixel-text-shadow mb-4">
              Bestiário
            </h3>
            <p className="font-pixel text-sm text-muted-foreground">
              Em desenvolvimento...
            </p>
          </TabsContent>

          {/* Notas da Sessão */}
          <TabsContent value="notes" className="mt-0">
            <h3 className="font-pixel text-lg text-primary pixel-text-shadow mb-4">
              Notas da Sessão
            </h3>
            <p className="font-pixel text-sm text-muted-foreground">
              Em desenvolvimento...
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </PagePanel>
  );
};

export default MasterScreen;