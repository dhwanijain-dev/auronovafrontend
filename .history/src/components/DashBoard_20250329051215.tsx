import { Bar, BarChart } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/charts"

export function Dashboard() {
    return (
        <ChartContainer>
            <BarChart data={data}>
                <Bar dataKey="value" />
                <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
        </ChartContainer>
    )
}
