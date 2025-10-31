import { cn } from "@/lib/utils";

// --- Data ---
const partyMembers = [
  {
    name: "Kael",
    level: 12,
    hp: 85,
    maxHp: 100,
    mp: 60,
    maxMp: 100,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8RMNV-GqilUhpT9oHTPOvBIMR35nGjLtpcFj3x7slOabeW1N6EPE-pqGkI0lcHSIBfmhXd2_zzjTDpp_ysXYtRsGqUSKCcw1P9pmxsPDhXqYwDLXhkGnZEtZV7-C1b_szQ4wu49xztZkOvWLystHIXT0mAA1btM02PUjqSNDoaKgRud_-gfgYMp9Q6wSCMtH6U1yxj5OLpfPYAtTEWqpNWKZpewd956f4qXIqIxe3w0LXq46rs44cCCdjs7x0UYWVvGfvA0itCE",
    isDefeated: false,
  },
  {
    name: "Lyra",
    level: 11,
    hp: 95,
    maxHp: 100,
    mp: 80,
    maxMp: 100,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGl-6DD75HDfAWQpUUd-BLc1bnao8iJQ-VPgqtf1bYOc6ufPILSt_y2jDhUNPLPoShY5T9dOqRVnJ98CAX9Ki7qMWwuh651XFEwu4CZivGHrhm9ItLiM86kzCaVV7MDQ-8YEZ75qiOz8zN557hKi4Yb6KG2t6j2iMdexAWNtx2-ihliiTzcw_rpjcL-AOBnCuqXLJv8VD-khvWP1FN-id7kyHsGumkHwkG36yTosxMov8S_fdLNbznykpWBMEfmrwpkaOVeaGIjrs",
    isDefeated: false,
  },
  {
    name: "Grog",
    level: 10,
    hp: 0,
    maxHp: 100,
    mp: 25,
    maxMp: 100,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu83jpGJZaXhr1blAwL_zCf8WSmmT0RPkYO-p5jcBSCrLIxqShyWehzqdzXDaofzHl4quBaAmNLIWzc3vv1AGt_4pfcYk3YMrp4VZrvtJl_FhIjECnTe_qbqJ5i-LT_xTH2nQQ6Amct1T6oXNBg_4KSNM03bl6a0mkSqIRzYqODLcShKLHwzRdL2EUCC2qKhIk5HzIF50LSOxj4MGy-TUIffT4oMVkSRIujUArGQSagveNmPEaUgFyp9z_1qhpSZm6UjqLY9wujvw",
    isDefeated: true,
  },
  {
    name: "Zana",
    level: 11,
    hp: 30,
    maxHp: 100,
    mp: 90,
    maxMp: 100,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS0bVWLhbWj_w6NRlLJ22CcAkRTmVzdwwfcjE5GX3S4QwO6fmH60r4_dKEQQQ_fZsXcKMqML5zBMoWDWl_TLAFIq8l96T_jMjCTmmQUlN7B0TOsxr3jsjTD692zCWVXcJmSLr_wpeFmAAmSXt1nCWuceewBWFy5sXItRU4nGdutxeFDKHWeMwtwCArYtWBJrfl82i1WhRuTiuNu77gbbVM6ImbPJ_A_rj6Ls9tlD5HDy0eN1IEXgN-aJ-w_gmgrhnHd8VzjftB6OE",
    isDefeated: false,
  },
];

const chatMessages = [
    { time: "19:42", sender: "GM", color: "text-red-500", message: "A menacing Goblin ambushes the party!" },
    { time: "19:43", sender: "Lyra", color: "text-cyan-400", message: "I'll cast a protective spell!" },
    { time: "19:43", sender: "SYSTEM", color: "text-blue-400", message: "Lyra rolls a d20... <span class='font-bold text-lg'>18!</span> Success!" },
    { time: "19:44", sender: "Kael", color: "text-orange-400", message: "My turn! I charge forward!" },
    { time: "19:44", sender: "SYSTEM", color: "text-blue-400", message: "Kael rolls a d20 to attack... <span class='font-bold text-lg'>5.</span> A miss!" },
    { time: "19:45", sender: "SYSTEM", color: "text-red-500", message: "Goblin attacks Grog for 12 damage!" },
    { time: "19:45", sender: "SYSTEM", color: "text-red-500 font-bold", message: "Grog has been defeated." },
    { time: "19:46", sender: "Zana", color: "text-purple-400", message: "I'll try a sleep spell on it!" },
];

// --- Sub-components ---

const PartyMemberCard = ({ member }) => (
  <div className={cn("flex items-start gap-3", member.isDefeated && "opacity-60")}>
    <img 
      className={cn("w-16 h-16 pixel-border bg-[#2f1b0c]", member.isDefeated && "filter grayscale")} 
      src={member.avatarUrl} 
      alt={`Avatar for ${member.name}`} 
    />
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-semibold">{member.name}</p>
        <p className="text-xs text-gray-400">Lvl {member.level}</p>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-[#facc15] font-bold">HP</span>
        <div className="w-full h-4 bg-[#2f1b0c] pixel-border">
          <div className={cn("h-full", member.hp > 25 ? "bg-green-500" : "bg-red-600")} style={{ width: `${member.hp}%` }}></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#facc15] font-bold">MP</span>
        <div className="w-full h-4 bg-[#2f1b0c] pixel-border">
          <div className="h-full bg-blue-500" style={{ width: `${member.mp}%` }}></div>
        </div>
      </div>
    </div>
  </div>
);

const GameTable = () => {
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-12 grid-rows-6 gap-4 h-[calc(100vh-12rem)] text-white">
      {/* Party Panel */}
      <div className="col-span-12 lg:col-span-3 row-span-2 lg:row-span-6 p-4 pixel-border bg-[#3e3226] flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-lg text-[#facc15] text-shadow">PARTY</h2>
        {partyMembers.map(member => <PartyMemberCard key={member.name} member={member} />)}
      </div>

      {/* Map Panel */}
      <div className="col-span-12 lg:col-span-9 row-span-4 lg:row-span-4 p-1 pixel-border bg-gray-600 overflow-hidden">
        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDELmLYbuq6MjCMerLP7FJyuDj_mnGCVc6HvHrdnwMM0yfVxoPjj6cpR0QpyXiTvl-h6IkascxaRyvtcr16BXVuyWCqMDzRxeA3Eh-C0k0it7elxULKXvai6cCNNlEU2nOdIA39TKX6_EYspJj5VOk87OqNJRWXwU0P2b7QPMkK-m2MyTRz1Br3sUMJgLk6A_ipvmB_ChnO_1r97ZRIvAjSjkhdRpDvg0xFcL5-my2StsC9KjoQwo2Av21_sTuhlFwY6dI93DhlY7w" alt="A pixel art map of a dungeon." />
      </div>

      {/* Bottom Panels */}
      <div className="col-span-12 lg:col-span-9 row-span-2 lg:row-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Chat Box */}
        <div className="md:col-span-2 p-4 pixel-border bg-[#3e3226] flex flex-col">
          <div className="flex-1 text-xs leading-relaxed overflow-y-auto pr-2">
            {chatMessages.map((msg, index) => (
              <p key={index}>
                <span className="text-gray-400">[{msg.time}]</span>{' '}
                <span className={cn(msg.color, "font-bold")}>{msg.sender}:</span>{' '}
                <span dangerouslySetInnerHTML={{ __html: msg.message }} />
              </p>
            ))}
          </div>
          <div className="mt-2 flex">
            <input className="flex-grow bg-[#2f1b0c] border-none focus:ring-0 text-white placeholder-gray-400 text-xs p-2 pixel-border" placeholder="Type message..." type="text" />
          </div>
        </div>

        {/* Actions & Dice */}
        <div className="md:col-span-1 grid grid-rows-2 gap-4">
          {/* Action Buttons */}
          <div className="row-span-1 p-3 pixel-border bg-[#3e3226] grid grid-cols-2 gap-2 text-xs">
            <button className="bg-[#2f1b0c] text-white p-2 pixel-border hover:bg-[#ac7339] active:bg-[#facc15] active:text-[#2f1b0c]">Attack</button>
            <button className="bg-[#2f1b0c] text-white p-2 pixel-border hover:bg-[#ac7339] active:bg-[#facc15] active:text-[#2f1b0c]">Magic</button>
            <button className="bg-[#2f1b0c] text-white p-2 pixel-border hover:bg-[#ac7339] active:bg-[#facc15] active:text-[#2f1b0c]">Item</button>
            <button className="bg-[#2f1b0c] text-white p-2 pixel-border hover:bg-[#ac7339] active:bg-[#facc15] active:text-[#2f1b0c]">Flee</button>
          </div>
          {/* Dice Roller */}
          <div className="row-span-1 p-3 pixel-border bg-[#2f1b0c]">
            <p className="text-center text-[#facc15] text-shadow text-xs mb-2">ROLL DICE</p>
            <div className="grid grid-cols-3 gap-2">
              <button className="p-2 pixel-border bg-[#3e3226] text-white hover:bg-[#ac7339] active:bg-[#facc15] active:text-[#2f1b0c]">d4</button>
              <button className="p-2 pixel-border bg-[#3e3226] text-white hover:bg-[#ac7339] active:bg-[#facc15] active:text-[#2f1b0c]">d6</button>
              <button className="p-2 pixel-border bg-[#3e3226] text-white hover:bg-[#ac7339] active:bg-[#facc15] active:text-[#2f1b0c]">d8</button>
              <button className="p-2 pixel-border bg-[#3e3226] text-white hover:bg-[#ac7339] active:bg-[#facc15] active:text-[#2f1b0c]">d10</button>
              <button className="p-2 pixel-border bg-[#ac7339] text-white hover:bg-[#facc15] hover:text-[#2f1b0c] active:bg-[#3e3226] active:text-white">d20</button>
              <button className="p-2 pixel-border bg-[#3e3226] text-white hover:bg-[#ac7339] active:bg-[#facc15] active:text-[#2f1b0c]">d100</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTable;