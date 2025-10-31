import { cn } from "@/lib/utils";

const partyMembers = [
  { name: "Kael", level: 12, hp: 90, maxHp: 100, mp: 75, maxMp: 100, avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU8Pk_i4EnJg2I6l6kew1FeMUHehbxzrZIe-UF4QfARnSwxazPlOrdCbHLUkQ1eZ-icEOqPjFFwo7xBt4YxKF3LVe8CL4M4ZIvUNIW-xmNv9tpmS_uqcSxBe-HZyYEvSkoUkrYu5svwyFDdy5VqXHQ2PS8i4zJrnhizmV6-wFDPd62Ufi0AKtuYNyA7AXyMaT7Bx3rAZNokWvZJqQezopWCvt1mfQcyof8zPb4YGQ4tcUh_hdLxi8T-eMdHqr1z5YJANP92YtbMGE" },
  { name: "Lyra", level: 11, hp: 100, maxHp: 100, mp: 50, maxMp: 100, avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKgMOF1Qpe2rQYNSb9lxUiuuxKCW_cj_uTrRCjvxFi9OMM0_g6eRpwjSF6Xsu4V5Ic7junwuDybyHDOA2u-7iVsi_02il2hSTQOzkNk8vzpscZPZmoA23W9QY7OQnAOndkeNg3hc4IaBmsXwPf64VHlXGnKDajGLhXk1IeZDHBrOcVRwZkuZAAmSdjBzeAbW_PHiJwUy5qtYibmM9LRUT-dI7DZQWtc63jPlJBjPJxpPpGJdlmB64Xds3HFOI0e7fRKj8HJb9qmCs" },
  { name: "Grog", level: 10, hp: 15, maxHp: 100, mp: 95, maxMp: 100, avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXWSZgBnTWqqEx706N2LhJfYEqca1J8nFDEinbpIialGGtt3IYaBC_vCKLoiJ5psoQkcG1A4ApniB0GZEYDvoPR1cXj256SnYRcBoSAZw6EiMEs1TqpxjZQtQ6_9Nb34CynZxOhEGyPH3lRlIZAypHZQNp1TxCKhez43FjF5jYgIKZR0VRQ-7-BoX-jhKzYO8ortFglrc4Jl7cRvKyKWG61qVOW9OVGzu4YbB6jIflFIUa0_r6SHSxx--f8hzBM6Jqsu66kwtakUE" },
  { name: "Zana", level: 11, hp: 100, maxHp: 100, mp: 80, maxMp: 100, avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwffuouZF2RFGoAD83qBOU2Q7EK4c67opmi_DcKhxHIIOsGCiwYRL-PrRJzHHIWX38IpY_4T5--X6XXs3hbGNlN4I5MPbuJ2ooOjMPR0jnOvmCKHrCXlpLZeD85nOFT0hwT34twlIUg4IS-acqJybM05iWIYUhFoOC_hxOPXWS6FhNnDhzlZv3rVFoCCtkxGsRoTjtZp-Ere5sE-A3erundICSAsWduaflMtBjijdTsN1tpd7zFQajOopcc3c7RkSfDxh_9gNsWLM" },
];

const PartyStatus = () => (
  <div className="pixel-border bg-secondary p-2 flex-shrink-0">
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <h3 className="text-lg text-accent w-full sm:w-auto mb-2 sm:mb-0">GRUPO</h3>
      {partyMembers.map(member => (
        <div key={member.name} className="flex items-center gap-3">
          <img alt={`Pixel art portrait of ${member.name}.`} className="w-12 h-12 pixel-border" src={member.avatarUrl} />
          <div className="flex-1 text-xs w-32">
            <div className="flex justify-between items-baseline">
              <p>{member.name}</p>
              <p className="text-foreground/80">Lvl {member.level}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-hp-red font-bold">PV</span>
              <span className="text-foreground/80">{member.hp}/{member.maxHp}</span>
            </div>
            <div className="w-full h-4 bg-black pixel-border-inset p-0.5">
              <div 
                className="bg-hp-red h-full" 
                style={{ width: `${(member.hp / member.maxHp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PartyStatus;