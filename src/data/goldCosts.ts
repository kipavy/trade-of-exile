// Gold costs for currencies from https://poe2db.tw/us/Currency_Exchange
export interface CurrencyWithGold {
  value: string;
  label: string;
  icon: string;
  goldCost: number;
}

export const currenciesWithGold: CurrencyWithGold[] = [
  // Augmentation
  { value: 'orb_augmentation', label: 'Orb of Augmentation', icon: 'augmentation.webp', goldCost: 20 },
  { value: 'greater_orb_augmentation', label: 'Greater Orb of Augmentation', icon: 'augmentation.webp', goldCost: 60 },
  { value: 'perfect_orb_augmentation', label: 'Perfect Orb of Augmentation', icon: 'augmentation.webp', goldCost: 180 },
  
  // Transmutation
  { value: 'orb_transmutation', label: 'Orb of Transmutation', icon: 'transmute.webp', goldCost: 50 },
  { value: 'greater_orb_transmutation', label: 'Greater Orb of Transmutation', icon: 'transmute.webp', goldCost: 150 },
  { value: 'perfect_orb_transmutation', label: 'Perfect Orb of Transmutation', icon: 'transmute.webp', goldCost: 450 },
  
  // Regal
  { value: 'regal', label: 'Regal Orb', icon: 'regal.webp', goldCost: 120 },
  { value: 'greater_regal', label: 'Greater Regal Orb', icon: 'regal.webp', goldCost: 360 },
  { value: 'perfect_regal', label: 'Perfect Regal Orb', icon: 'regal.webp', goldCost: 1000 },

  // Exalted
  { value: 'ex', label: 'Exalted Orb', icon: 'exalted.webp', goldCost: 120 },
  { value: 'greater_ex', label: 'Greater Exalted Orb', icon: 'exalted.webp', goldCost: 360 },
  { value: 'perfect_ex', label: 'Perfect Exalted Orb', icon: 'exalted.webp', goldCost: 1000 },

  // Chaos
  { value: 'chaos', label: 'Chaos Orb', icon: 'chaos.webp', goldCost: 160 },
  { value: 'greater_chaos', label: 'Greater Chaos Orb', icon: 'chaos.webp', goldCost: 500 },
  { value: 'perfect_chaos', label: 'Perfect Chaos Orb', icon: 'chaos.webp', goldCost: 1500 },

  // Vaal
  { value: 'vaal', label: 'Vaal Orb', icon: 'vaal.webp', goldCost: 160 },

  // Alchemy
  { value: 'orb_alchemy', label: 'Orb of Alchemy', icon: 'alch.webp', goldCost: 200 },

  // Divine
  { value: 'divine', label: 'Divine Orb', icon: 'div.webp', goldCost: 800 },

  // Chance
  { value: 'orb_chance', label: 'Orb of Chance', icon: 'chance.webp', goldCost: 1000 },

  // Annulment
  { value: 'orb_annulment', label: 'Orb of Annulment', icon: 'annul.webp', goldCost: 1000 },

  // Artificer
  { value: 'orb_artificer', label: 'Orb of Artificer', icon: 'artificer.webp', goldCost: 1000 },

  // Fracturing
  { value: 'fracturing', label: 'Fracturing Orb', icon: 'fracturing.webp', goldCost: 1000 },

  // Mirror of Kalandra
  { value: 'mirror_kalandra', label: 'Mirror of Kalandra', icon: 'mirror.webp', goldCost: 25000 },

  // Jeweller's
  { value: 'lesser_jewellers', label: "Lesser Jeweller's Orb", icon: 'lesser_jeweller.webp', goldCost: 200 },
  { value: 'greater_jewellers', label: "Greater Jeweller's Orb", icon: 'greater_jeweller.webp', goldCost: 600 },
  { value: 'perfect_jewellers', label: "Perfect Jeweller's Orb", icon: 'perfect_jeweller.webp', goldCost: 1000 },

  // Gear upgrades
  { value: 'armourers_scrap', label: "Armourer's Scrap", icon: 'armourer.webp', goldCost: 250 },
  { value: 'blacksmiths_whetstone', label: "Blacksmith's Whetstone", icon: 'blacksmith.webp', goldCost: 500 },
  { value: 'arcanists_etcher', label: "Arcanist's Etcher", icon: 'arcanist.webp', goldCost: 500 },
  { value: 'glassblowers_bauble', label: "Glassblower's Bauble", icon: 'glassblower.webp', goldCost: 750 },
  { value: 'gemcutters_prism', label: "Gemcutter's Prism", icon: 'gemcutter.webp', goldCost: 1000 },

  // Others
  { value: 'scroll_wisdom', label: "Scroll of Wisdom", icon: 'wisdom.webp', goldCost: 1 },

];

export function getGoldCostByCurrency(currencyValue: string): number {
  const currency = currenciesWithGold.find(c => c.value === currencyValue);
  return currency?.goldCost || 0;
}

export function getCurrencyByValue(currencyValue: string): CurrencyWithGold | undefined {
  return currenciesWithGold.find(c => c.value === currencyValue);
}
