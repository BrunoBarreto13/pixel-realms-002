import PagePanel from "@/components/PagePanel";
import { useAuth } from "@/hooks/useAuth";

const DashboardHome = () => {
  const { profile, isMaster } = useAuth();

  return (
    <PagePanel title="Início">
      {isMaster ? (
        <div>
          <h2 className="font-pixel text-xl text-primary pixel-text-shadow mb-4">
            Bem-vindo, Mestre {profile?.name}!
          </h2>
          <p className="font-pixel text-sm text-muted-foreground">
            Sua campanha atual é:
          </p>
          <p className="font-pixel text-lg text-accent mt-2">
            {profile?.character_or_campaign}
          </p>
        </div>
      ) : (
        <div>
          <h2 className="font-pixel text-xl text-primary pixel-text-shadow mb-4">
            Bem-vindo, Aventureiro!
          </h2>
          <p className="font-pixel text-sm text-muted-foreground">
            Use o menu à esquerda para navegar e preencher sua ficha de personagem.
          </p>
        </div>
      )}
    </PagePanel>
  );
};

export default DashboardHome;