import PartyStatus from "./gametable/PartyStatus";
import GameChat from "./gametable/GameChat";

const ActionsPanel = () => (
  <div className="pixel-border bg-secondary p-4">
    <h3 className="text-lg text-accent mb-4">AÇÕES</h3>
    <div className="grid grid-cols-2 gap-2 text-xs">
      <button className="p-3 bg-card hover:bg-card/80 pixel-border-inset text-center">Attack</button>
      <button className="p-3 bg-card hover:bg-card/80 pixel-border-inset text-center">Magic</button>
      <button className="p-3 bg-card hover:bg-card/80 pixel-border-inset text-center">Item</button>
      <button className="p-3 bg-card hover:bg-card/80 pixel-border-inset text-center">Flee</button>
    </div>
  </div>
);

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
          <ActionsPanel />
          <GameChat />
        </div>
      </div>
    </div>
  );
};

export default GameTable;