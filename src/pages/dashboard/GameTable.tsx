import { useState } from "react";
import PartyStatus from "./gametable/PartyStatus";
import GameChat from "./gametable/GameChat";
import { useToast } from "@/hooks/use-toast";

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
    <div className="pixel-border bg-secondary p-4 space-y-6">
      {/* Actions */}
      <div>
        <h3 className="text-lg text-accent mb-4">AÇÕES</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button className="p-3 bg-card hover:bg-card/80 pixel-border-inset text-center">Atacar</button>
          <button className="p-3 bg-card hover:bg-card/80 pixel-border-inset text-center">Magia</button>
          <button className="p-3 bg-card hover:bg-card/80 pixel-border-inset text-center">Item</button>
          <button className="p-3 bg-card hover:bg-card/80 pixel-border-inset text-center">Fugir/Esconder</button>
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
            <button
              key={d.label}
              onClick={() => handleRoll(d.sides)}
              className="p-2 uppercase transition-colors border-2 bg-menu-button text-menu-button-text border-menu-button-border hover:bg-menu-button-hover"
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


const MapPanel = () => (
  <div className="flex-1 pixel-border bg-black min-h-0">
    <img 
      alt="Pixel art top-down view of a stone dungeon map." 
      className="w-full h-full object-cover" 
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS-61RF5zkHl4Z4ri-882iDU4b5SPX8AkfAYyBU4uJGHXqGEDqAwNXCW4k0SyxvRs4KhfVsiDP4-ar-5LSBAIwBtEgOAyg2OcaFr23AFjfp2ezw9gP5oof0f8snBLulR0uz5jPHQ3vfQhtbLyZiRblk49RybhKLR4uHjlh6E_i_ADh9uh_tX4DBzJkKQ-_E0mvD1yWEoCFtdyISnRWlNu_zdF1ounCBy77Wqzg_hG1Nl5DD2IqEr6BjKvlLCL1Jp4aG3FpMTN9tRA"
    />
  </div>
);

const GameTable = () => {
  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          <PartyStatus />
          <MapPanel />
        </div>
        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full">
          <ActionsAndDicePanel />
          <GameChat />
        </div>
      </div>
    </div>
  );
};

export default GameTable;