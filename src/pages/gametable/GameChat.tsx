import { useState } from "react";
import { Casino } from "lucide-react";
import DicePanel from "./DicePanel";
import { cn } from "@/lib/utils";

const chatMessages = [
    { time: "19:42", sender: "GM", color: "text-green-400", message: "A menacing Goblin ambushes the party!" },
    { time: "19:43", sender: "Lyra", color: "text-cyan-400", message: "I'll cast a protective spell!" },
    { time: "19:43", sender: "SYSTEM", color: "text-yellow-400", message: "Lyra rolls a d20... <span class='text-xl font-bold'>18!</span> Success!" },
    { time: "19:44", sender: "Kael", color: "text-orange-400", message: "My turn! I charge forward!" },
    { time: "19:44", sender: "SYSTEM", color: "text-yellow-400", message: "Kael rolls a d20 to attack... <span class='text-xl font-bold'>5.</span> A miss!" },
    { time: "19:45", sender: "SYSTEM", color: "text-red-500", message: "Goblin attacks Grog for 12 damage!" },
    { time: "19:45", sender: "SYSTEM", color: "text-red-500", message: "Grog has been defeated." },
    { time: "19:46", sender: "Zana", color: "text-purple-400", message: "I'll try a sleep spell on it!" },
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
            placeholder="Type message..." 
            type="text"
          />
          <button 
            onClick={() => setIsDicePanelOpen(!isDicePanelOpen)} 
            aria-label="Toggle dice roller" 
            className="p-3 bg-primary text-primary-foreground pixel-border aspect-square flex items-center justify-center"
          >
            <Casino className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameChat;