import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { PixelInput } from "@/components/PixelInput";
import PagePanel from "@/components/PagePanel";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePasswordChange = () => {
    toast({
      title: "Função em desenvolvimento",
      description: "A alteração de senha ainda não foi implementada.",
    });
  };

  return (
    <PagePanel title="Configurações">
      <div className="space-y-6 max-w-4xl mx-auto">
        <PixelPanel>
          <h3 className="font-pixel text-lg text-primary pixel-text-shadow mb-4">
            CONTA
          </h3>
          <div className="space-y-4">
            <PixelInput
              label="Email"
              type="email"
              value={user?.email || ""}
              disabled
            />
            <PixelButton
              variant="secondary"
              onClick={handlePasswordChange}
            >
              ALTERAR SENHA
            </PixelButton>
          </div>
        </PixelPanel>

        <PixelPanel>
          <h3 className="font-pixel text-lg text-primary pixel-text-shadow mb-4">
            LIVROS E RECURSOS
          </h3>
          <div className="space-y-4">
            <p className="font-pixel text-xs text-muted-foreground leading-relaxed">
              Anexe seus próprios livros de regras, aventuras ou outros recursos em formato PDF para fácil acesso durante o jogo.
            </p>
            <PixelButton
              variant="secondary"
              onClick={() => toast({ title: "Função em desenvolvimento", description: "O upload de PDFs ainda não foi implementado."})}
            >
              + ADICIONAR LIVRO
            </PixelButton>
          </div>
        </PixelPanel>

        <PixelPanel>
          <h3 className="font-pixel text-lg text-destructive pixel-text-shadow mb-4">
            ZONA DE PERIGO
          </h3>
          <div className="space-y-4">
            <p className="font-pixel text-xs text-muted-foreground leading-relaxed">
              A exclusão da sua conta é uma ação permanente e irreversível. Todos os seus personagens, campanhas e dados serão perdidos para sempre.
            </p>
            <PixelButton
              variant="destructive"
              onClick={() => toast({ title: "Função em desenvolvimento", description: "A exclusão de conta ainda não foi implementada."})}
            >
              DELETAR CONTA
            </PixelButton>
          </div>
        </PixelPanel>
      </div>
    </PagePanel>
  );
};

export default Settings;