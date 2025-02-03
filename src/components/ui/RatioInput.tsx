import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { ArrowRightLeft } from "lucide-react";

interface RatioInputProps {
  label: string;
  amount1?: number | '';
  setAmount1: (value: number | '') => void;
  amount2?: number | '';
  setAmount2: (value: number | '') => void;
  invertRatios: () => void;
  placeholder1?: string;
  placeholder2?: string;
}

export default function RatioInput({ label, amount1, setAmount1, amount2, setAmount2, invertRatios, placeholder1 = "Want", placeholder2 = "Have" }: RatioInputProps) {
    return (
      <div>
        <Label htmlFor={label}>
          {label}
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={amount1 || ''}
            onChange={(e) => setAmount1(e.target.value ? Number(e.target.value) : '')}
            placeholder={placeholder1}
            className="max-w-3xs mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <span>:</span>
          <Input
            type="number"
            value={amount2 || ''}
            onChange={(e) => setAmount2(e.target.value ? Number(e.target.value) : '')}
            placeholder={placeholder2}
            className="max-w-3xs mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <Button onClick={invertRatios} className="ml-2 group">
            <ArrowRightLeft className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
          </Button>
        </div>
      </div>
    )
}