import React from 'react';
import HeadAccessory from './HeadAccessory.jsx';

export default function Penguin({ mood='happy', accessories=[], size='medium' }) {
  const expression = mood === 'thirsty' ? 'thirsty' : mood === 'happy' || mood === 'thriving' ? 'happy' : 'neutral';
  return <div className={`penguin-wrap ${size} penguin-${expression}`} aria-label={`AQUARY penguin, ${expression} expression`}>
    <div className="penguin-art">
      <img src={`/mascot/${expression}.png`} alt={`Cute penguin looking ${expression}`} />
      {accessories.map((id,i)=><span key={`${id}-${i}`} className={`pet-accessory accessory-head accessory-${id}`}><HeadAccessory id={id}/></span>)}
    </div>
  </div>;
}
