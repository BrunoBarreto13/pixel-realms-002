import { PixelCard } from "@/components/PixelCard";
import { PixelButton } from "@/components/PixelButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { PixelInput } from "@/components/PixelInput";

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
    <div className="space-y-6 max-w-4xl mx-auto">
      <PixelCard>
        <h3 className="font-pixel text-lg text-primary mb-4 pixel-glow">
          APARÊNCIA
        </h3>
        <div className="flex items-center justify-between">
          <p className="font-pixel text-xs text-foreground">
            Tema da Interface (Floresta / Caverna)
          </p>
          <ThemeToggle />
        </div>
      </PixelCard>

      <PixelCard>
        <h3 className="font-pixel text-lg text-primary mb-4 pixel-glow">
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
      </PixelCard>

      <PixelCard>
        <h3 className="font-pixel text-lg text-destructive mb-4">
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
      </PixelCard>
    </div>
  );
};

export default Settings;