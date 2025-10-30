import { ThemeToggle } from "@/components/ThemeToggle";
import { PixelButton } from "@/components/PixelButton";
import { Home, Dices, ScrollText, Shield, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import caveBg from "@/assets/cave-bg.png";
import forestBg from "@/assets/forest-bg.png";
import CharacterSheet from "./CharacterSheet";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, isMaster, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("home");
  const isDark = document.documentElement.classList.contains("dark");

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const allMenuItems = [
    { id: "home", label: "Início", icon: Home },
    { id: "game-table", label: "Mesa de jogo", icon: Dices },
    { id: "character-sheet", label: "Ficha do Jogador", icon: ScrollText },
    { id: "master-screen", label: "Divisória do Mestre", icon: Shield, masterOnly: true },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => !item.masterOnly || isMaster);

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="font-pixel text-sm text-muted-foreground animate-pixel-pulse">
          CARREGANDO...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ backgroundImage: `url(${isDark ? caveBg : forestBg})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Sidebar */}
      <aside className="relative z-10 w-80 bg-card/90 backdrop-blur-sm border-r-4 border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b-4 border-border">
          <h1 className="font-pixel text-xl text-primary pixel-glow">
            PIXEL<br/>REALMS
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 p-3 font-pixel text-xs transition-all pixel-border ${
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/50 text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t-4 border-border space-y-2">
          <PixelButton
            variant="destructive"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 justify-start"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </PixelButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card/90 backdrop-blur-sm border-b-4 border-border p-4 flex justify-between items-center">
          <div>
            <h2 className="font-pixel text-lg text-foreground">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h2>
          </div>
          <ThemeToggle />
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {activeSection === "home" && (
              <div className="space-y-8">
                <div className="bg-card/80 backdrop-blur-sm p-8 pixel-border">
                  <h3 className="font-pixel text-xl text-primary mb-4 pixel-glow">
                    BEM-VINDO, AVENTUREIRO!
                  </h3>
                  <p className="font-pixel text-xs text-foreground leading-relaxed mb-6">
                    Sistema de RPG de Mesa Online baseado em AD&D 2e (Segunda Edição)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-6 pixel-border">
                      <h4 className="font-pixel text-sm text-secondary mb-2">CAMPANHA ATUAL</h4>
                      <p className="font-pixel text-xs text-foreground">Em desenvolvimento...</p>
                    </div>
                    <div className="bg-muted/50 p-6 pixel-border">
                      <h4 className="font-pixel text-sm text-secondary mb-2">PRÓXIMA SESSÃO</h4>
                      <p className="font-pixel text-xs text-foreground">A definir</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 backdrop-blur-sm p-8 pixel-border">
                  <h3 className="font-pixel text-lg text-primary mb-4">RECURSOS DISPONÍVEIS</h3>
                  <ul className="space-y-3 font-pixel text-xs text-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-accent">▸</span> Sistema de Rolagem de Dados
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">▸</span> Fichas de Personagem
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">▸</span> Gestão de Grupo
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">▸</span> Vídeo Chamada Integrada
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === "character-sheet" && (
              <CharacterSheet />
            )}

            {activeSection !== "home" && activeSection !== "character-sheet" && (
              <div className="bg-card/80 backdrop-blur-sm p-8 pixel-border text-center">
                <h3 className="font-pixel text-xl text-primary mb-4 pixel-glow">
                  {menuItems.find(item => item.id === activeSection)?.label.toUpperCase()}
                </h3>
                <p className="font-pixel text-xs text-muted-foreground leading-relaxed">
                  Esta seção está em desenvolvimento...
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
