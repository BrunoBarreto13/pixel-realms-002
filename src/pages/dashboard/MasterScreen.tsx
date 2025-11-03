import PagePanel from "@/components/PagePanel";
import { PixelPanel } from "@/components/PixelPanel";
import { useAuth } from "@/hooks/useAuth";

const MasterScreen = () => {
  const { profile } = useAuth();

  return (
    <PagePanel title="Divisória do Mestre">
      <PixelPanel>
        <h3 className="font-pixel text-lg text-primary pixel-text-shadow mb-4">
          Gestão de Campanha
        </h3>
        <div className="space-y-2">
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
      </PixelPanel>
    </PagePanel>
  );
};

export default MasterScreen;