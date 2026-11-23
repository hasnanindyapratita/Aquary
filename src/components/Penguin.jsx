import React from 'react';

// Every wearable is anchored above the penguin's head for a consistent fit.
const ACCESSORY_ART = {
  beanie: ['🧢', 'head'], flower: ['🌼', 'head'], crown: ['👑', 'head'],
  halo: ['😇', 'head'], headphones: ['🎧', 'head'], bow: ['🎀', 'head'],
  glasses: ['🕶️', 'head'], roundglasses: ['👓', 'head'], blush: ['🌸', 'head'],
  scarf: ['🧣', 'head'], bowtie: ['🎀', 'head'], necklace: ['📿', 'head'],
  hoodie: ['🧥', 'head'], backpack: ['🎒', 'head'], shell: ['🐚', 'head'],
  star: ['⭐', 'head'], bubble: ['🫧', 'head'], heart: ['💙', 'head'],
  float: ['🛟', 'head'], umbrella: ['☂️', 'head'],
  blossom: ['🌸', 'head'], starclip: ['⭐', 'head'], pearlband: ['🤍', 'head'],
  doublebow: ['🩵', 'head'], beret: ['🧢', 'head'], sailor: ['⚓', 'head'],
  snowflake: ['❄️', 'head'], butterfly: ['🦋', 'head'], shellclip: ['🐚', 'head'],
};

export default function Penguin({ mood='happy', accessories=[], size='medium' }) {
  const expression = mood === 'thirsty' ? 'thirsty' : mood === 'happy' || mood === 'thriving' ? 'happy' : 'neutral';
  const worn = accessories.map(id => ACCESSORY_ART[id]).filter(Boolean);
  return <div className={`penguin-wrap ${size} penguin-${expression}`} aria-label={`AQUARY penguin, ${expression} expression`}>
    <div className="penguin-art">
      <img src={`/mascot/${expression}.png`} alt={`Cute penguin looking ${expression}`} />
      {worn.map(([art,slot],i)=><span key={`${art}-${i}`} className={`pet-accessory accessory-${slot} accessory-${i}`}>{art}</span>)}
    </div>
  </div>;
}
