"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { type ChartConfig } from "@/types/chart"
import { useCalculateGrowth } from "@/hooks/useCalculateGrowth"

export default function AreaChartComponent({ computedInterestRate }: { computedInterestRate: number }) {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000)
  const [manualInterestRate, setManualInterestRate] = useState<number>(5)
  const [iterations, setIterations] = useState<number>(10)
  const [showLinearGrowth, setShowLinearGrowth] = useState<boolean>(true)
  const [useComputedInterest, setUseComputedInterest] = useState<boolean>(true)

  const interestRate = useComputedInterest ? computedInterestRate : manualInterestRate
  const chartData = useCalculateGrowth(initialInvestment, interestRate, iterations)

  const chartConfig: ChartConfig = {
    initialInvestment: {
      label: "Initial Investment",
      color: "hsl(var(--chart-5))",
    },
    withInterest: {
      label: `With ${interestRate.toFixed(2)}% Interest`,
      color: "hsl(var(--chart-1))",
    },
    linearGrowth: {
      label: "Linear Growth",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Growth</CardTitle>
        {/* <CardDescription>Comparing initial investment vs compound interest growth over {iterations} iterations</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-3 flex items-center">
            <Label htmlFor="showLinearGrowth" className="mr-2">Linear Growth</Label>
            <Checkbox
              id="showLinearGrowth"
              checked={showLinearGrowth}
              onCheckedChange={(checked) => setShowLinearGrowth(checked === true)}
            />
          </div>
            <div className="col-span-3 flex items-center">
              <Label htmlFor="useComputedInterest" className="mr-2">Use Computed Interest</Label>
              <Checkbox
                id="useComputedInterest"
                checked={useComputedInterest}
                onCheckedChange={(checked) => setUseComputedInterest(checked === true)}
              />
          </div>
          <div>
            <Label htmlFor="initialInvestment">Initial Investment</Label>
            <Input
              id="initialInvestment"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate.toFixed(2)}
              onChange={(e) => setManualInterestRate(Number(e.target.value))}
              disabled={useComputedInterest}
            />
          </div>
          <div>
            <Label htmlFor="iterations">Iterations</Label>
            <Input
              id="iterations"
              type="number"
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
            />
          </div>
        </div>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="iteration" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickFormatter={(value) => `${value.toLocaleString()}`}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel/>} />
              <defs>
              <linearGradient id="fillinitialInvestment" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-initialInvestment)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-initialInvestment)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillWithInterest" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-withInterest)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-withInterest)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLinearGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-linearGrowth)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-linearGrowth)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
              <Area
                type="monotone"
                dataKey="initialInvestment"
                name="Initial Investment"
                stroke="var(--color-initialInvestment)"
                fill="url(#fillinitialInvestment)"
                fillOpacity={0.5}
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="withInterest"
                name={`With ${interestRate.toFixed(2)}% Interest`}
                stroke="var(--color-withInterest)"
                fill="url(#fillWithInterest)"
                fillOpacity={0.5}
                stackId="2"
              />
              {showLinearGrowth && (
                <Area
                  type="monotone"
                  dataKey="linearGrowth"
                  name="Linear Growth"
                  stroke="var(--color-linearGrowth)"
                  fill="url(#fillLinearGrowth)"
                  fillOpacity={0.5}
                  stackId="3"
                />
              )}
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Compare growth with and without compound interest <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {iterations}-iteration projection based on initial investment and interest rate
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}