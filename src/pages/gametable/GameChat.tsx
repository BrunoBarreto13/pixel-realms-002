import { useState } from "react";
import { Dices } from "lucide-react";
import DicePanel from "./DicePanel";
import { cn } from "@/lib/utils";

const chatMessages = [
    { time: "19:42", sender: "MESTRE", color: "text-green-400", message: "Um Goblin ameaçador embosca o grupo!" },
    { time: "19:43", sender: "Lyra", color: "text-cyan-400", message: "Vou lançar um feitiço de proteção!" },
    { time: "19:43", sender: "SISTEMA", color: "text-yellow-400", message: "Lyra rola um d20... <span class='text-xl font-bold'>18!</span> Sucesso!" },
    { time: "19:44", sender: "Kael", color: "text-orange-400", message: "Minha vez! Eu avanço!" },
    { time: "19:44", sender: "SISTEMA", color: "text-yellow-400", message: "Kael rola um d20 para atacar... <span class='text-xl font-bold'>5.</span> Errou!" },
    { time: "19:45", sender: "SISTEMA", color: "text-red-500", message: "Goblin ataca Grog e causa 12 de dano!" },
    { time: "19:45", sender: "SISTEMA", color: "text-red-500", message: "Grog foi derrotado." },
    { time: "19:46", sender: "Zana", color: "text-purple-400", message: "Vou tentar um feitiço de sono nele!" },
];

const GameChat = () => {
  const [isDicePanelOpen, setIsDicePanelOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col pixel-border bg-secondary p-4 min-h-0">
      <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-2 text-xs">
        {chatMessages.map((msg, index) => (
          <p key={index}>
            <span className="text-foreground/60">[{msg.time}]</span>{' '}
            <span className={cn(msg.color, "font-bold")}>{msg.sender}:</span>{' '}
            <span dangerouslySetInnerHTML={{ __html: msg.message }} />
          </p>
        ))}
      </div>
      <div className="mt-auto">
        {isDicePanelOpen && <DicePanel />}
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-card text-foreground placeholder:text-foreground/50 p-3 pixel-border-inset border-none focus:ring-0 text-xs" 
            placeholder="Digite uma mensagem..." 
            type="text"
          />
          <button 
            onClick={() => setIsDicePanelOpen(!isDicePanelOpen)} 
            aria-label="Toggle dice roller" 
            className="p-3 bg-primary text-primary-foreground pixel-border aspect-square flex items-center justify-center"
          >
            <Dices className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameChat;