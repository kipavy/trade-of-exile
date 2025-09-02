import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft } from "lucide-react";

interface RatioInputProps {
  labelPrefix: string;
  amount1?: number | '';
  setAmount1: (value: number | '') => void;
  amount2?: number | '';
  setAmount2: (value: number | '') => void;
  invertRatios: () => void;
  placeholder1?: string;
  placeholder2?: string;
  suffix1?: React.ReactNode;
  suffix2?: React.ReactNode;
}

interface RatioDisplayProps {
  ratio: string;
}

function RatioDisplay({ ratio }: RatioDisplayProps) {
  return (
    <div className="text-sm text-muted-foreground flex items-center">
      <span>{`1/${ratio}`}</span>
    </div>
  );
}

export default function RatioInput({
  labelPrefix,
  amount1,
  setAmount1,
  amount2,
  setAmount2,
  invertRatios,
  placeholder1 = "Want",
  placeholder2 = "Have",
  suffix1,
  suffix2,
}: RatioInputProps) {
  const showRatio =
    amount1 !== '' &&
    amount2 !== '' &&
    amount1 !== 0;
  const ratio = showRatio
    ? (Number(amount2) / Number(amount1)).toFixed(2)
    : '';

  const getValue = (amount: number | '' | undefined) =>
    amount === '' || amount === undefined ? '' : amount;

  return (
    <div>
      <div className="flex items-center space-x-1">
        <Label>{labelPrefix}</Label>
        {showRatio && <RatioDisplay ratio={ratio} />}
      </div>
      <div className="flex items-center space-x-1">
        <Input
          type="number"
          value={getValue(amount1)}
          onChange={(e) =>
            setAmount1(e.target.value ? Number(e.target.value) : '')
          }
          placeholder={placeholder1}
          className="max-w-3xs mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          suffix={suffix1}
        />
        <span>:</span>
        <Input
          type="number"
          value={getValue(amount2)}
          onChange={(e) =>
            setAmount2(e.target.value ? Number(e.target.value) : '')
          }
          placeholder={placeholder2}
          className="max-w-3xs mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          suffix={suffix2}
        />
        <Button onClick={invertRatios} className="ml-2 group">
          <ArrowRightLeft className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
        </Button>
      </div>
    </div>
  );
}