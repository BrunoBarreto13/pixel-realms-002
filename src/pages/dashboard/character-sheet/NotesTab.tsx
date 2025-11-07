import { Character } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PixelPanel } from "@/components/PixelPanel";
import { PixelButton } from "@/components/PixelButton";
import { Plus, Trash2 } from "lucide-react";
import { PixelInput } from "@/components/PixelInput";
import { Label } from "@/components/ui/label";

interface NotesTabProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
}

// --- Sub-componentes para Aliados/Animais (SEÇÕES 20, 21) ---

interface Follower {
  name: string;
  level: number;
  thac0: number;
  ac: number;
  hp: number;
  movement: string;
  notes: string;
}

const initialFollower: Follower = {
  name: "", level: 1, thac0: 20, ac: 10, hp: 1, movement: "9m", notes: ""
};

const FollowerSection = ({ title, followers, isEditing, setFollowers }: { title: string, followers: Follower[], isEditing: boolean, setFollowers: (f: Follower[]) => void }) => {
  const handleAdd = () => {
    setFollowers([...followers, initialFollower]);
  };

  const handleRemove = (index: number) => {
    setFollowers(followers.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Follower, value: string | number) => {
    const updated = [...followers];
    updated[index] = { ...updated[index], [field]: value };
    setFollowers(updated);
  };

  return (
    <PixelPanel className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-pixel text-sm text-accent pixel-text-shadow">{title}</h3>
        {isEditing && (
          <PixelButton size="sm" variant="outline" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" /> Adicionar
          </PixelButton>
        )}
      </div>
      
      <div className="space-y-4">
        {followers.map((follower, index) => (
          <div key={index} className="bg-input p-3 pixel-border-inset space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <PixelInput 
                label="Nome" 
                value={follower.name} 
                onChange={(e) => handleChange(index, 'name', e.target.value)} 
                disabled={!isEditing} 
              />
              <PixelInput 
                label="Nível/DV" 
                type="number"
                value={follower.level} 
                onChange={(e) => handleChange(index, 'level', parseInt(e.target.value) || 0)} 
                disabled={!isEditing} 
              />
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <InfoDetailCard label="TACO" value={follower.thac0} />
              <InfoDetailCard label="CA" value={follower.ac} />
              <InfoDetailCard label="PV" value={follower.hp} />
              <InfoDetailCard label="Movimento" value={follower.movement} />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-pixel text-[10px] text-muted-foreground">Anotações</Label>
              <textarea
                value={follower.notes}
                onChange={(e) => handleChange(index, 'notes', e.target.value)}
                disabled={!isEditing}
                className="w-full min-h-[50px] pixel-border bg-card/50 p-2 font-pixel text-xs resize-y"
              />
            </div>
            {isEditing && (
              <div className="text-right">
                <PixelButton size="sm" variant="destructive" onClick={() => handleRemove(index)}>
                  <Trash2 className="h-3 w-3 mr-1" /> Remover
                </PixelButton>
              </div>
            )}
          </div>
        ))}
        {followers.length === 0 && (
          <p className="font-pixel text-xs text-muted-foreground text-center py-4">Nenhum {title.toLowerCase()} adicionado.</p>
        )}
      </div>
    </PixelPanel>
  );
};

const InfoDetailCard = ({ label, value }: { label: string, value: string | number }) => (
  <div className="bg-card/50 p-2 pixel-border text-center">
    <Label className="font-pixel text-[10px] text-muted-foreground block">{label}</Label>
    <p className="font-pixel text-xs text-foreground font-bold mt-1">{value}</p>
  </div>
);

// --- Componente Principal ---

export const NotesTab = ({ character, setCharacter }: NotesTabProps) => {
  const isEditing = true; // Assume editing is controlled by the main sheet state

  const handleNotesChange = (key: 'general' | 'history', value: string) => {
    setCharacter(prev => ({
      ...prev,
      notes: { ...prev.notes, [key]: value }
    }));
  };

  const handleFollowersChange = (followers: Follower[]) => {
    setCharacter(prev => ({
      ...prev,
      notes: { ...prev.notes, followers: JSON.stringify(followers) }
    }));
  };

  const handleAnimalsChange = (animals: Follower[]) => {
    setCharacter(prev => ({
      ...prev,
      notes: { ...prev.notes, animals: JSON.stringify(animals) }
    }));
  };

  const getFollowers = (key: 'followers' | 'animals'): Follower[] => {
    try {
      const data = character.notes?.[key];
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  return (
    <div className="mt-0">
      <Tabs defaultValue="history">
        <TabsList className="flex flex-wrap gap-1 bg-transparent p-0 h-auto mb-4">
          <TabsTrigger value="history" className="font-pixel text-xs uppercase px-4 py-2 border-4 border-border bg-secondary text-secondary-foreground rounded-t-lg shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[4px] z-10">Histórico</TabsTrigger>
          <TabsTrigger value="general" className="font-pixel text-xs uppercase px-4 py-2 border-4 border-border bg-secondary text-secondary-foreground rounded-t-lg shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[4px] z-10">Geral</TabsTrigger>
          <TabsTrigger value="allies" className="font-pixel text-xs uppercase px-4 py-2 border-4 border-border bg-secondary text-secondary-foreground rounded-t-lg shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[4px] z-10">Aliados</TabsTrigger>
          <TabsTrigger value="animals" className="font-pixel text-xs uppercase px-4 py-2 border-4 border-border bg-secondary text-secondary-foreground rounded-t-lg shadow-none data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-b-card data-[state=active]:-mb-[4px] z-10">Animais</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <PixelPanel>
            <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">HISTÓRICO DO PERSONAGEM</h3>
            <textarea 
              className="w-full min-h-[400px] pixel-border bg-input p-4 font-pixel text-xs resize-y" 
              placeholder="Escreva a história do seu personagem..."
              value={character.notes?.history || ''}
              onChange={(e) => handleNotesChange('history', e.target.value)}
              disabled={!isEditing}
            />
          </PixelPanel>
        </TabsContent>

        <TabsContent value="general">
          <PixelPanel>
            <h3 className="font-pixel text-sm text-accent pixel-text-shadow mb-4">ANOTAÇÕES GERAIS</h3>
            <textarea 
              className="w-full min-h-[400px] pixel-border bg-input p-4 font-pixel text-xs resize-y" 
              placeholder="Anotações diversas, objetivos, diário..."
              value={character.notes?.general || ''}
              onChange={(e) => handleNotesChange('general', e.target.value)}
              disabled={!isEditing}
            />
          </PixelPanel>
        </TabsContent>

        <TabsContent value="allies">
          <FollowerSection 
            title="ALIADOS OU SEGUIDORES" 
            followers={getFollowers('followers')} 
            isEditing={isEditing} 
            setFollowers={handleFollowersChange} 
          />
        </TabsContent>

        <TabsContent value="animals">
          <FollowerSection 
            title="ANIMAIS" 
            followers={getFollowers('animals')} 
            isEditing={isEditing} 
            setFollowers={handleAnimalsChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};