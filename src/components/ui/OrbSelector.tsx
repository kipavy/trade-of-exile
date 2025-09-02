import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { currenciesWithGold, getCurrencyByValue } from '@/data/goldCosts';

interface OrbSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function OrbSelector({ value, onValueChange, placeholder = "Select orb...", className }: OrbSelectorProps) {
  const [open, setOpen] = React.useState(false)
  
  const selectedCurrency = getCurrencyByValue(value);

  const handleSelect = (currentValue: string) => {
    onValueChange(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedCurrency ? (
              <div className="flex items-center gap-2">
                <img 
                  src={selectedCurrency.icon} 
                  alt={selectedCurrency.label}
                  className="w-4 h-4"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span>{selectedCurrency.label}</span>
                <span className="text-sm text-muted-foreground">
                  ({selectedCurrency.goldCost} gold)
                </span>
              </div>
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search orbs..." />
            <CommandEmpty>No orb found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {currenciesWithGold.map((currency) => (
                  <CommandItem
                    key={currency.value}
                    value={currency.value}
                    onSelect={() => handleSelect(currency.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === currency.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <img 
                        src={currency.icon} 
                        alt={currency.label}
                        className="w-4 h-4"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="flex-1">{currency.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {currency.goldCost} gold
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
