import { PixelButton } from "@/components/PixelButton";
import { Home, Dices, ScrollText, Shield, LogOut, BookOpen, ChevronRight, BookMarked, Settings as SettingsIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import useSound from "@/hooks/useSound";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, isMaster, signOut } = useAuth();
  const [isCampaignOpen, setIsCampaignOpen] = useState(false);
  const playNavigateSound = useSound("/sounds/navigate.mp3");

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const allMenuItems = [
    { id: "/dashboard", label: "Início", icon: Home },
    {
      id: "campaign",
      label: "Campanha",
      icon: BookOpen,
      children: [
        { id: "/dashboard/game-table", label: "Mesa de jogo", icon: Dices },
        { id: "/dashboard/library", label: "Biblioteca", icon: BookMarked },
      ],
    },
    { id: "/dashboard/character-sheet", label: "Ficha do Jogador", icon: ScrollText },
    { id: "/dashboard/master-screen", label: "Divisória do Mestre", icon: Shield, masterOnly: true },
  ];

  useEffect(() => {
    const activeItemParent = allMenuItems.find(item => item.children?.some(child => location.pathname.startsWith(child.id)));
    if (activeItemParent) {
      setIsCampaignOpen(true);
    }
  }, [location.pathname]);

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

  const handleSectionChange = (path: string) => {
    playNavigateSound();
    navigate(path);
  };

  const getActiveLabel = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/dashboard/settings")) return "Configurações";
    for (const item of allMenuItems) {
      if (item.id === currentPath) return item.label;
      if (item.children) {
        const child = item.children.find(c => currentPath.startsWith(c.id));
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

  const NavButton = ({ id, label, icon: Icon, isActive, onClick, hasChildren = false, isOpen = false }) => (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between gap-3 p-3 font-pixel text-xs uppercase transition-all text-left rounded-lg border-2",
        isActive 
          ? "bg-menu-button-hover text-menu-button-text border-menu-button-border" 
          : "bg-menu-button text-menu-button-text border-menu-button-border hover:bg-menu-button-hover"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-menu-button-text" />
        <span>{label}</span>
      </div>
      {hasChildren && <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />}
    </button>
  );

  return (
    <div className={cn("min-h-screen w-full flex", location.pathname.startsWith('/dashboard/game-table') ? 'game-table-background' : 'game-background')}>
      <div className="w-full flex bg-background/80 backdrop-blur-sm shadow-2xl">
        {/* Sidebar */}
        <aside className="w-64 bg-parchment flex flex-col p-4 border-r-4 border-parchment-border">
          <div className="p-6">
            <h1 className="font-pixel text-2xl text-accent pixel-text-shadow text-center">PIXEL<br/>REALMS</h1>
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
                        isActive={item.children.some(c => location.pathname.startsWith(c.id))}
                        onClick={() => {
                          playNavigateSound();
                          setIsCampaignOpen(!isCampaignOpen);
                        }}
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
                          isActive={location.pathname.startsWith(child.id)}
                          onClick={() => handleSectionChange(child.id)}
                        />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <NavButton 
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    isActive={location.pathname === item.id}
                    onClick={() => handleSectionChange(item.id)}
                  />
                )}
              </div>
            ))}
          </nav>
          <div className="space-y-2">
            <NavButton 
              id="/dashboard/settings"
              label="Configurações"
              icon={SettingsIcon}
              isActive={location.pathname.startsWith("/dashboard/settings")}
              onClick={() => handleSectionChange("/dashboard/settings")}
            />
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-3 p-3 font-pixel text-xs uppercase transition-all text-left rounded-lg border-2 bg-menu-button text-menu-button-text border-menu-button-border hover:bg-menu-button-hover"
            >
              <LogOut className="h-4 w-4 text-menu-button-text" />
              <span>SAIR</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col m-4 sm:m-6 lg:m-8 gap-4 sm:gap-6 lg:gap-8">
          <header className="flex-shrink-0 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-accent pixel-text-shadow">{getActiveLabel()}</h2>
          </header>
          <div className="flex-1 overflow-auto rpg-main-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;