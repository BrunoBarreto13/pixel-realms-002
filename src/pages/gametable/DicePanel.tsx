const DicePanel = () => {
  const dice = ["d4", "d6", "d8", "d10", "d20", "d100"];
  
  // TODO: Implement dice rolling logic
  const handleRoll = (die: string) => {
    console.log(`Rolling ${die}...`);
  };

  return (
    <div className="pixel-border-inset bg-card/50 p-4 mb-2">
      <h3 className="text-lg text-accent mb-4">ROLAR DADOS</h3>
      <div className="grid grid-cols-3 gap-2 text-xs">
        {dice.map(d => (
          <button 
            key={d} 
            onClick={() => handleRoll(d)}
            className="p-2 bg-primary/70 pixel-border-inset hover:bg-primary"
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DicePanel;