import PagePanel from "@/components/PagePanel";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabTriggerClasses = "font-pixel text-xs uppercase px-4 py-2 border-4 border-border bg-secondary text-secondary-foreground rounded-t-lg shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[4px] z-10";

const MasterScreen = () => {
  const { profile } = useAuth();

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
          <TabsContent value="campaign" className="mt-0 space-y-6">
            <h3 className="font-pixel text-lg text-primary pixel-text-shadow mb-4">
              Gestão de Campanha
            </h3>
            <div className="space-y-2 bg-muted/30 p-4 pixel-border">
              <p className="font-pixel text-xs text-muted-foreground">
                Campanha Ativa:
              </p>
              <p className="font-pixel text-base text-accent">
                {profile?.character_or_campaign || "Nenhuma campanha ativa."}
              </p>
              <p className="font-pixel text-xs text-muted-foreground mt-4">
                (Funcionalidade para criar/gerenciar campanhas será adicionada aqui)
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </PagePanel>
  );
};

export default MasterScreen;