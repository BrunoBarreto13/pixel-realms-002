import { ThemeToggle } from "@/components/ThemeToggle";
import { PixelButton } from "@/components/PixelButton";
import { Home, Dices, ScrollText, Shield, LogOut, BookOpen, ChevronRight, BookMarked, Settings as SettingsIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import castleDragonDark from "@/assets/castle-dragon-dark.png";
import castleDragonLight from "@/assets/castle-dragon-light.png";
import CharacterSheet from "./CharacterSheet";
import Library from "./library";
import Settings from "./Settings";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, isMaster, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("home");
  const [isCampaignOpen, setIsCampaignOpen] = useState(false);
  const isDark = document.documentElement.classList.contains("dark");

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const allMenuItems = [
    { id: "home", label: "Início", icon: Home },
    {
      id: "campaign",
      label: "Campanha",
      icon: BookOpen,
      children: [
        { id: "game-table", label: "Mesa de jogo", icon: Dices },
        { id: "library", label: "Biblioteca", icon: BookMarked },
      ],
    },
    { id: "character-sheet", label: "Ficha do Jogador", icon: ScrollText },
    { id: "master-screen", label: "Divisória do Mestre", icon: Shield, masterOnly: true },
    { id: "settings", label: "Configurações", icon: SettingsIcon },
  ];

  // When a child is selected, open the collapsible
  useEffect(() => {
    const activeItemParent = allMenuItems.find(item => item.children?.some(child => child.id === activeSection));
    if (activeItemParent) {
      setIsCampaignOpen(true);
    }
  }, [activeSection]);

  // Filter menu items based on user role
  const menuItems = allMenuItems
    .map(item => {
      if (item.children) {
        const visibleChildren = item.children.filter(child => !child.masterOnly || isMaster);
        return { ...item, children: visibleChildren };
      }
      return item;
    })
    .filter(item => {
      if (item.masterOnly && !isMaster) return false;
      if (item.children && item.children.length === 0) return false;
      return true;
    });

  const handleLogout = async () => {
    await signOut();
  };

  const getActiveLabel = () => {
    for (const item of allMenuItems) {
      if (item.id === activeSection) return item.label;
      if (item.children) {
        const child = item.children.find(c => c.id === activeSection);
        if (child) return child.label;
      }
    }
    return "Início";
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
        style={{ backgroundImage: `url(${isDark ? castleDragonDark : castleDragonLight})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Sidebar */}
      <aside className="relative z-10 w-80 bg-card/90 backdrop-blur-sm border-r-4 border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b-4 border-border">
          <h1 className="font-pixel text-xl text-brand-yellow brand-text-shadow brand-glow">
            PIXEL<br/>REALMS
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  <Collapsible open={isCampaignOpen} onOpenChange={setIsCampaignOpen}>
                    <CollapsibleTrigger asChild>
                      <button
                        className={`w-full flex items-center justify-between gap-3 p-3 font-pixel text-xs transition-all pixel-border ${
                          item.children.some(child => child.id === activeSection)
                            ? "bg-primary text-primary-foreground"
                            : "bg-card/50 text-foreground hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${isCampaignOpen ? 'rotate-90' : ''}`} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2 pl-4">
                      <ul className="space-y-2">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <button
                              onClick={() => setActiveSection(child.id)}
                              className={`w-full flex items-center gap-3 p-3 font-pixel text-xs transition-all pixel-border ${
                                activeSection === child.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card/50 text-foreground hover:bg-muted"
                              }`}
                            >
                              <child.icon className="h-4 w-4" />
                              <span>{child.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
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
                )}
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
              {getActiveLabel()}
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

            {activeSection === "library" && (
              <Library />
            )}

            {activeSection === "character-sheet" && (
              <CharacterSheet />
            )}

            {activeSection === "settings" && (
              <Settings />
            )}

            {activeSection !== "home" && activeSection !== "character-sheet" && activeSection !== "library" && activeSection !== "settings" && (
              <div className="bg-card/80 backdrop-blur-sm p-8 pixel-border text-center">
                <h3 className="font-pixel text-xl text-primary mb-4 pixel-glow">
                  {getActiveLabel().toUpperCase()}
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