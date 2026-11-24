import React from 'react';
import {
  Droplet, Waves, BookOpen, Clock3, HeartPulse, BarChart3, Settings, Coins,
  Flower2, Crown, Star, Heart, Glasses, Snowflake, Sparkles,
  GlassWater, Circle, Sun, ShieldCheck, Activity, FlaskConical,
  Microscope, Stethoscope, Leaf, Dna, Bone, Pill, Search,
  LogOut, ArrowRight, CalendarDays, Bell, CupSoda, Coffee
} from 'lucide-react';

const ICONS = {
  coin: Coins, water: Droplet, waves: Waves, book: BookOpen, clock: Clock3,
  chart: BarChart3, settings: Settings, flower: Flower2, crown: Crown, kidney: HeartPulse,
  star: Star, heart: Heart, glasses: Glasses, snowflake: Snowflake,
  sparkle: Sparkles, glass: GlassWater, ribbon: Heart, circle: Circle,
  sun: Sun, shield: ShieldCheck, activity: Activity, flask: FlaskConical,
  microscope: Microscope, stethoscope: Stethoscope, leaf: Leaf, dna: Dna,
  bone: Bone, pill: Pill, search: Search, logout: LogOut, arrow: ArrowRight,
  calendar: CalendarDays, bell: Bell, soda: CupSoda, coffee: Coffee
};

export default function AquaryIcon({ name='sparkle', size=20, className='', strokeWidth=1.9, ...props }) {
  const Icon = ICONS[name] || Sparkles;
  return <Icon size={size} strokeWidth={strokeWidth} className={`aquary-icon ${className}`} aria-hidden="true" {...props} />;
}
