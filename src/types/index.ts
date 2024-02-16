export type CategoryTag = 'ind' | 'group' | 'course' | 'freeride';
export type AgeTag = 'kids' | 'adult' | 'all';
export type ResortTag = 'roza' | 'kp' | 'gazprom' | 'all';
export type RuleTag = 'low' | 'high' | 'peak';
export type EquipmentTag = 'set'
| 'boots'
| 'ski'
| 'snowboard'
| 'helmet'
| 'overalls'
| 'jacket'
| 'pants'
| 'mask'
| 'gloves'
| 'backpack'
| 'gopro'
| 'avalanche_backpack'
| 'poles'
| 'backpack';
export type ClassTag = 'econom' | 'comfort' | 'premium';

export type EqTag = 'ski' | 'snowboard' | 'all';

export interface Block {
  title: string;
  subtitle?: string;
}

export interface Category extends Block {
  tag: CategoryTag;
  age: AgeTag;
  disabled?: boolean;
}

export interface Resort extends Block {
  tag: ResortTag;
}

export interface Rule extends Block {
  id: string;
  tag: RuleTag;
  resort: ResortTag;
}

export interface Offer extends Block {
  category: CategoryTag;
  resort: ResortTag;
  age: AgeTag;
  clients: number;
  hours: number;
  days: number;
  disabled?: boolean;
  secondary?: boolean;
  low: number;
  high: number;
  peak: number;
}

export interface Rent {
  equipment: EquipmentTag;
  age: AgeTag;
  class: ClassTag;
  price: number;  
  description: string;
}

export interface FAQ {
  text?: string;
  content?: string;
  age?: AgeTag;
}