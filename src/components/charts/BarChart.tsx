
import React from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface BarChartProps {
  data: any[];
  xAxisKey: string;
  series: { name: string; color: string }[];
  height?: number | string;
  stacked?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey,
  series,
  height = 300,
  stacked = false
}) => {
  // Create the config object for the ChartContainer
  const chartConfig = series.reduce((config: Record<string, any>, item) => {
    config[item.name] = {
      label: item.name,
      color: item.color
    };
    return config;
  }, {});

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey={xAxisKey} 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          width={30}
          tick={{ fontSize: 12 }}
        />
        <ChartTooltip
          content={({ active, payload, label }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              label={label}
            />
          )}
        />
        {series.map((s) => (
          <Bar 
            key={s.name} 
            dataKey={s.name} 
            fill={s.color}
            radius={[4, 4, 0, 0]}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};
