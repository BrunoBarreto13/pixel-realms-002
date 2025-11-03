import { useState } from "react";
import PartyStatus from "./gametable/PartyStatus";
import GameChat from "./gametable/GameChat";
import { useToast } from "@/hooks/use-toast";
import { PixelButton } from "@/components/PixelButton";
import { PixelPanel } from "@/components/PixelPanel";
import PagePanel from "@/components/PagePanel";

const ActionsAndDicePanel = () => {
  const [diceQuantity, setDiceQuantity] = useState(1);
  const { toast } = useToast();

  const handleRoll = (sides: number) => {
    let total = 0;
    const rolls = [];
    for (let i = 0; i < diceQuantity; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rolls.push(roll);
      total += roll;
    }
    
    const rollsString = rolls.join(' + ');
    const description = diceQuantity > 1 ? `${diceQuantity}d${sides}: (${rollsString}) = ${total}` : `d${sides}: ${total}`;

    toast({
      title: `Rolagem de Dados`,
      description: description,
    });
  };

  const dice = [
    { sides: 4, label: "d4" },
    { sides: 6, label: "d6" },
    { sides: 8, label: "d8" },
    { sides: 10, label: "d10" },
    { sides: 12, label: "d12" },
    { sides: 20, label: "d20" },
    { sides: 100, label: "d100" },
  ];

  return (
    <PixelPanel className="space-y-6">
      {/* Actions */}
      <div>
        <h3 className="text-lg text-accent mb-4">AÇÕES</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <PixelButton variant="secondary">Atacar</PixelButton>
          <PixelButton variant="secondary">Magia</PixelButton>
          <PixelButton variant="secondary">Item</PixelButton>
          <PixelButton variant="secondary">Fugir/Esconder</PixelButton>
        </div>
      </div>

      {/* Dice Roller */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg text-accent">ROLAR DADOS</h3>
          <div className="flex items-center gap-2">
            <label htmlFor="dice-qty" className="text-xs">Qtd:</label>
            <input
              id="dice-qty"
              type="number"
              value={diceQuantity}
              onChange={(e) => setDiceQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 h-8 pixel-border bg-input px-2 font-pixel text-xs text-center"
              min="1"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {dice.map(d => (
            <PixelButton
              key={d.label}
              onClick={() => handleRoll(d.sides)}
              variant="default"
              size="sm"
            >
              {d.label}
            </PixelButton>
          ))}
        </div>
      </div>
    </PixelPanel>
  );
};


const MapPanel = () => (
  <PixelPanel className="flex-1 min-h-0 flex items-center justify-center">
    <p className="font-pixel text-lg text-muted-foreground">Em construção</p>
  </PixelPanel>
);

const GameTable = () => {
  return (
    <PagePanel title="Mesa de Jogo" className="flex flex-col h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PartyStatus />
          <MapPanel />
        </div>
        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ActionsAndDicePanel />
          <GameChat />
        </div>
      </div>
    </PagePanel>
  );
};

export default GameTable;