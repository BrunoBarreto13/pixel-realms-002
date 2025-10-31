import { PixelButton } from "@/components/PixelButton";
import { Home, Dices, ScrollText, Shield, LogOut, BookOpen, ChevronRight, BookMarked, Settings as SettingsIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CharacterSheet from "./CharacterSheet";
import Library from "./library";
import Settings from "./Settings";
import GameTable from "./GameTable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, isMaster, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("home");
  const [isCampaignOpen, setIsCampaignOpen] = useState(false);

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
  ];

  useEffect(() => {
    const activeItemParent = allMenuItems.find(item => item.children?.some(child => child.id === activeSection));
    if (activeItemParent) {
      setIsCampaignOpen(true);
    } else {
      setIsCampaignOpen(false);
    }
  }, [activeSection]);

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
    if (activeSection === "settings") return "Configurações";
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
        <p className="font-pixel text-sm text-muted-foreground">
          CARREGANDO...
        </p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <p className="text-center">Seção Início em desenvolvimento.</p>;
      case "library":
        return <Library />;
      case "character-sheet":
        return <CharacterSheet />;
      case "game-table":
        return <GameTable />;
      case "settings":
        return <Settings />;
      default:
        return (
          <div className="text-center">
            <h3 className="font-pixel text-xl text-primary mb-4">{getActiveLabel().toUpperCase()}</h3>
            <p className="font-pixel text-xs text-muted-foreground leading-relaxed">Esta seção está em desenvolvimento...</p>
          </div>
        );
    }
  };

  const NavButton = ({ id, label, icon: Icon, isActive, onClick, hasChildren = false, isOpen = false }) => (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between gap-3 p-3 font-pixel text-xs transition-all text-left",
        isActive ? "bg-primary text-primary-foreground pixel-border" : "bg-card/50 text-foreground hover:bg-muted pixel-border-inset"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-accent")} />
        <span>{label}</span>
      </div>
      {hasChildren && <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />}
    </button>
  );

  return (
    <div className={cn("min-h-screen w-full flex", activeSection === 'game-table' ? 'game-table-background' : 'game-background')}>
      <div className="w-full flex bg-background/80 backdrop-blur-sm shadow-2xl">
        {/* Sidebar */}
        <aside className="w-64 bg-secondary flex flex-col p-4 border-r-4 border-primary">
          <div className="p-6">
            <h1 className="font-pixel text-2xl text-accent brand-text-shadow text-center">PIXEL<br/>REALMS</h1>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.children ? (
                  <Collapsible open={isCampaignOpen} onOpenChange={setIsCampaignOpen}>
                    <CollapsibleTrigger asChild>
                      <NavButton 
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        isActive={item.children.some(c => c.id === activeSection)}
                        onClick={() => setIsCampaignOpen(!isCampaignOpen)}
                        hasChildren
                        isOpen={isCampaignOpen}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2 pl-4 space-y-2">
                      {item.children.map((child) => (
                        <NavButton 
                          key={child.id}
                          id={child.id}
                          label={child.label}
                          icon={child.icon}
                          isActive={activeSection === child.id}
                          onClick={() => setActiveSection(child.id)}
                        />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <NavButton 
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    isActive={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                  />
                )}
              </div>
            ))}
          </nav>
          <div className="space-y-2">
            <NavButton 
              id="settings"
              label="Configurações"
              icon={SettingsIcon}
              isActive={activeSection === "settings"}
              onClick={() => setActiveSection("settings")}
            />
            <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 font-pixel text-xs transition-all text-left bg-destructive text-destructive-foreground pixel-border">
              <LogOut className="h-4 w-4" />
              <span>SAIR</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 lg:gap-8">
          <header className="flex-shrink-0">
            <h2 className="text-3xl text-accent">{getActiveLabel()}</h2>
          </header>
          <div className="flex-1 overflow-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;