import React from 'react';
import { Crown, Flower2, Sparkles, Glasses, Snowflake, Heart, Star, Circle, GlassWater, Ribbon, Sun, ShieldCheck } from 'lucide-react';

// Accessories use the same Lucide outline family as the rest of AQUARY.
const ACCESSORY_ART = {
  beanie: Sun, flower: Flower2, crown: Crown, halo: Sparkles,
  headphones: Circle, bow: Ribbon, glasses: Glasses, roundglasses: Glasses,
  blush: Flower2, scarf: Ribbon, bowtie: Ribbon, necklace: Circle,
  hoodie: ShieldCheck, backpack: ShieldCheck, shell: GlassWater,
  star: Star, bubble: Circle, heart: Heart, float: Circle, umbrella: Sun,
  blossom: Flower2, starclip: Star, pearlband: Circle, doublebow: Ribbon,
  beret: Sun, sailor: ShieldCheck, snowflake: Snowflake, butterfly: Flower2,
  shellclip: GlassWater,
};

export default function Penguin({ mood='happy', accessories=[], size='medium' }) {
  const expression = mood === 'thirsty' ? 'thirsty' : mood === 'happy' || mood === 'thriving' ? 'happy' : 'neutral';
  const worn = accessories.map(id => ({ id, Icon: ACCESSORY_ART[id] })).filter(item => item.Icon);
  return <div className={`penguin-wrap ${size} penguin-${expression}`} aria-label={`AQUARY penguin, ${expression} expression`}>
    <div className="penguin-art">
      <img src={`/mascot/${expression}.png`} alt={`Cute penguin looking ${expression}`} />
      {worn.map(({id,Icon},i)=><span key={`${id}-${i}`} className={`pet-accessory accessory-head accessory-${i}`}><Icon size={30} strokeWidth={2.2}/></span>)}
    </div>
  </div>;
}
