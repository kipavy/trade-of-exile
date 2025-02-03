"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { type ChartConfig } from "@/types/chart"
import { useCalculateGrowth } from "@/hooks/useCalculateGrowth"

export default function AreaChartComponent() {
  const [initialInvestment, setInitialInvestment] = useState<number | undefined>(10000)
  const [interestRate, setInterestRate] = useState<number | undefined>(5)
  const [iterations, setIterations] = useState<number>(10)
  const chartData = useCalculateGrowth(initialInvestment, interestRate, iterations)

  const chartConfig = {
    initialInvestment: {
      label: "Initial Investment",
      color: "hsl(var(--chart-5))",
    },
    withInterest: {
      label: `With ${interestRate}% Interest`,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Investment Growth Comparison</CardTitle>
        <CardDescription>Comparing initial investment vs compound interest growth over {iterations} iterations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="initialInvestment">Initial Investment</Label>
            <Input
              id="initialInvestment"
              type="number"
              value={initialInvestment !== undefined ? initialInvestment : ''}
              onChange={(e) => setInitialInvestment(e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div>
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate !== undefined ? interestRate : ''}
              onChange={(e) => setInterestRate(e.target.value ? Number(e.target.value) : undefined)}
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
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="initialInvestment"
                name="Initial Investment"
                stroke="var(--color-initialInvestment)"
                fill="var(--color-initialInvestment)"
                fillOpacity={0.3}
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="withInterest"
                name={`With ${interestRate}% Interest`}
                stroke="var(--color-withInterest)"
                fill="var(--color-withInterest)"
                fillOpacity={0.3}
                stackId="2"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  )
}