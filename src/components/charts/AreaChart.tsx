
import React from 'react';
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface AreaChartProps {
  data: any[];
  xAxisKey: string;
  series: { name: string; color: string }[];
  height?: number | string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  xAxisKey,
  series,
  height = 300
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
      <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s, index) => (
            <linearGradient key={s.name} id={`color-${s.name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={s.color} stopOpacity={0.1}/>
            </linearGradient>
          ))}
        </defs>
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
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
          <Area 
            key={s.name} 
            type="monotone" 
            dataKey={s.name} 
            stroke={s.color} 
            fillOpacity={1} 
            fill={`url(#color-${s.name})`} 
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
};
