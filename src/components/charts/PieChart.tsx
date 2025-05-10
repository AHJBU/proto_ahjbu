
import React from 'react';
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface PieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  innerRadius?: number;
  outerRadius?: number;
  height?: number | string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  innerRadius = 60,
  outerRadius = 80,
  height = 300
}) => {
  // Create the config object for the ChartContainer
  const chartConfig = data.reduce((config: Record<string, any>, item) => {
    config[item.name] = {
      label: item.name,
      color: item.color
    };
    return config;
  }, {});

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
            />
          )}
        />
      </RechartsPieChart>
    </ChartContainer>
  );
};
