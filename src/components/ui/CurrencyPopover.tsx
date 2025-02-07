import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores/store';
import { setCurrency } from '@/stores/slices/currencySlice';

interface CurrencyPopoverProps {
  items?: { value: string, label: string, icon: string }[];
  selectedItem?: string;
  onSelect?: (value: string) => void;
}

export function CurrencyPopover({ items, selectedItem, onSelect }: CurrencyPopoverProps) {
  const dispatch = useDispatch();
  const { currency, currencies } = useSelector((state: RootState) => state.currency);

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedItem || currency)

  React.useEffect(() => {
    setValue(selectedItem || currency);
  }, [selectedItem, currency]);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)
    if (onSelect) {
      onSelect(currentValue === value ? "" : currentValue)
    } else {
      dispatch(setCurrency(currentValue === value ? "" : currentValue))
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
         className="p-0 h-auto"
        >
          <img src={(items || currencies).find((item) => item.value === value)?.icon} alt="" className="w-6 h-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search item..." className="h-9" />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {(items || currencies).map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <img src={item.icon} alt="" className="w-6 h-6" />
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}




// import * as React from "react"
// import { Check, ChevronsUpDown } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/stores/store';
// import { setCurrency } from '@/stores/slices/currencySlice';

// interface CurrencyPopoverProps {
//   items?: { value: string, label: string, icon: string }[];
//   selectedItem?: string;
//   onSelect?: (value: string) => void;
// }

// export function CurrencyPopover({ items, selectedItem, onSelect }: CurrencyPopoverProps) {
//   const dispatch = useDispatch();
//   const { currency, currencies } = useSelector((state: RootState) => state.currency);

//   const [open, setOpen] = React.useState(false)
//   const [value, setValue] = React.useState(selectedItem || currency)

//   React.useEffect(() => {
//     setValue(selectedItem || currency);
//   }, [selectedItem, currency]);

//   const handleSelect = (currentValue: string) => {
//     setValue(currentValue === value ? "" : currentValue)
//     if (onSelect) {
//       onSelect(currentValue === value ? "" : currentValue)
//     } else {
//       dispatch(setCurrency(currentValue === value ? "" : currentValue))
//     }
//     setOpen(false)
//   }

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         {/* <img
//           src={(items || currencies).find((item) => item.value === value)?.icon}
//           alt=""
//           className="w-6 h-6 cursor-pointer inline-block"
//         /> */}
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search item..." className="h-9" />
//           <CommandList>
//             <CommandEmpty>No item found.</CommandEmpty>
//             <CommandGroup>
//               {(items || currencies).map((item) => (
//                 <CommandItem
//                   key={item.value}
//                   value={item.value}
//                   onSelect={() => handleSelect(item.value)}
//                 >
//                   <img src={item.icon} alt="" className="w-6 h-6" />
//                   {item.label}
//                   <Check
//                     className={cn(
//                       "ml-auto",
//                       value === item.value ? "opacity-100" : "opacity-0"
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )
// }