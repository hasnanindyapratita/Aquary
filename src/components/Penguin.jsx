import React, { useEffect, useRef, useState } from 'react';
import HeadAccessory from './HeadAccessory.jsx';
import { burst } from '../utils/fun.js';

const LINES = {
  thirsty: ['Glek glek... aku haus nih! 💧', 'Minum dulu yuk, aku temenin!', 'Tenggorokanku kering, hehe...'],
  neutral: ['Halo! Udah minum belum?', 'Satu teguk kecil aja, yuk!', 'Aku di sini nemenin kamu~'],
  happy: ['Yeay! Segerrr! ✨', 'Kamu keren banget hari ini!', 'Makasih udah jagain aku!'],
};

export default function Penguin({ mood='happy', accessories=[], size='medium', talk }) {
  const expression = mood === 'thirsty' ? 'thirsty' : mood === 'happy' || mood === 'thriving' ? 'happy' : 'neutral';
  const interactive = talk ?? size !== 'small';
  const [tick, setTick] = useState(0);
  const [line, setLine] = useState('');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const poke = e => {
    if (!interactive) return;
    const pool = LINES[expression];
    setLine(pool[Math.floor(Math.random() * pool.length)]);
    setTick(t => t + 1);
    const r = e.currentTarget.getBoundingClientRect();
    burst('hearts', r.left + r.width / 2, r.top + r.height * 0.25);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLine(''), 2800);
  };
  const key = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); poke(e); } };
  const a11y = interactive
    ? { role: 'button', tabIndex: 0, 'aria-label': 'Sentuh pinguin untuk menyapa', onClick: poke, onKeyDown: key }
    : { 'aria-label': `Pinguin, ekspresi ${expression}` };
  return <div className={`penguin-wrap ${size} penguin-${expression}`}>
    {line && <div className="pipo-bubble" role="status">{line}</div>}
    <div className={`penguin-art bounce-${tick % 2} ${interactive ? 'is-tappable' : ''}`} {...a11y}>
      <img src={`/mascot/${expression}.png`} alt="" draggable="false" />
      {accessories.map((id,i)=><span key={`${id}-${i}`} className={`pet-accessory accessory-head pet-acc-${id}`}><HeadAccessory id={id}/></span>)}
    </div>
  </div>;
}
