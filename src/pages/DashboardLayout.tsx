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
import { PixelHomeIcon } from "@/components/icons/PixelHomeIcon";
import { PixelDicesIcon } from "@/components/icons/PixelDicesIcon";
import { PixelScrollTextIcon } from "@/components/icons/PixelScrollTextIcon";
import { PixelShieldIcon } from "@/components/icons/PixelShieldIcon";
import { PixelLogOutIcon } from "@/components/icons/PixelLogOutIcon";
import { PixelBookOpenIcon } from "@/components/icons/PixelBookOpenIcon";
import { PixelChevronRightIcon } from "@/components/icons/PixelChevronRightIcon";
import { PixelBookMarkedIcon } from "@/components/icons/PixelBookMarkedIcon";
import { PixelSettingsIcon } from "@/components/icons/PixelSettingsIcon";

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
    { id: "/dashboard", label: "Início", icon: PixelHomeIcon },
    {
      id: "campaign",
      label: "Campanha",
      icon: PixelBookOpenIcon,
      children: [
        { id: "/dashboard/game-table", label: "Mesa de jogo", icon: PixelDicesIcon },
        { id: "/dashboard/library", label: "Biblioteca", icon: PixelBookMarkedIcon },
      ],
    },
    { id: "/dashboard/character-sheet", label: "Ficha do Jogador", icon: PixelScrollTextIcon },
    { id: "/dashboard/master-screen", label: "Divisória do Mestre", icon: PixelShieldIcon, masterOnly: true },
  ];

  useEffect(() => {
    const activeItemParent = allMenuItems.find(item => item.children?.some(child => location.pathname.startsWith(child.id)));
    if (activeItemParent) {
      setIsCampaignOpen(true);
    }
  }, [location.pathname, allMenuItems]);

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
      {hasChildren && <PixelChevronRightIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />}
    </button>
  );

  return (
    <div className={cn("min-h-screen w-full flex", location.pathname.startsWith('/dashboard/game-table') ? 'game-table-background' : 'game-background')}>
      <div className="w-full flex bg-background/80 backdrop-blur-sm shadow-2xl">
        {/* Sidebar */}
        <aside className="w-64 bg-parchment flex flex-col p-4 border-r-4 border-parchment-border">
          <div className="p-6">
            <h1 className="font-pixel text-2xl text-[#FDE306] pixel-text-shadow text-center">PIXEL<br/>REALMS</h1>
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
              icon={PixelSettingsIcon}
              isActive={location.pathname.startsWith("/dashboard/settings")}
              onClick={() => handleSectionChange("/dashboard/settings")}
            />
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-3 p-3 font-pixel text-xs uppercase transition-all text-left rounded-lg border-2 bg-destructive text-destructive-foreground border-[#7f1d1d] hover:bg-destructive/90"
            >
              <PixelLogOutIcon className="h-4 w-4 text-destructive-foreground" />
              <span>SAIR</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col m-4 sm:m-6 lg:m-8">
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;