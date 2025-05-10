
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import DetailedVisitorStats from './DetailedVisitorStats';

// Mock visitor data
const visitorData = [
  { date: 'Jan', 'Page Views': 4000, 'Unique Visitors': 2400 },
  { date: 'Feb', 'Page Views': 3000, 'Unique Visitors': 1398 },
  { date: 'Mar', 'Page Views': 2000, 'Unique Visitors': 9800 },
  { date: 'Apr', 'Page Views': 2780, 'Unique Visitors': 3908 },
  { date: 'May', 'Page Views': 1890, 'Unique Visitors': 4800 },
  { date: 'Jun', 'Page Views': 2390, 'Unique Visitors': 3800 },
  { date: 'Jul', 'Page Views': 3490, 'Unique Visitors': 4300 },
  { date: 'Aug', 'Page Views': 2490, 'Unique Visitors': 4300 },
  { date: 'Sep', 'Page Views': 2490, 'Unique Visitors': 4300 },
  { date: 'Oct', 'Page Views': 2490, 'Unique Visitors': 4300 },
  { date: 'Nov', 'Page Views': 2490, 'Unique Visitors': 4300 },
  { date: 'Dec', 'Page Views': 2490, 'Unique Visitors': 4300 },
];

const sourceData = [
  { name: 'Direct', value: 40, color: '#4285F4' },
  { name: 'Search', value: 30, color: '#34A853' },
  { name: 'Social', value: 20, color: '#FBBC05' },
  { name: 'Referral', value: 10, color: '#EA4335' },
];

const deviceData = [
  { device: 'Desktop', 'Visitors': 4000 },
  { device: 'Mobile', 'Visitors': 3000 },
  { device: 'Tablet', 'Visitors': 1000 },
];

const VisitorStats: React.FC = () => {
  const [mode, setPeriod] = useState('simple');

  return (
    <div>
      <div className="flex justify-end mb-6">
        <TabsList>
          <TabsTrigger 
            value="simple" 
            className={mode === 'simple' ? 'bg-primary text-white' : ''}
            onClick={() => setPeriod('simple')}
          >
            Simple View
          </TabsTrigger>
          <TabsTrigger 
            value="detailed" 
            className={mode === 'detailed' ? 'bg-primary text-white' : ''}
            onClick={() => setPeriod('detailed')}
          >
            Detailed View
          </TabsTrigger>
        </TabsList>
      </div>

      {mode === 'simple' ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Visitor Analytics</CardTitle>
            <CardDescription>View website traffic and engagement statistics.</CardDescription>
            <Tabs defaultValue="traffic" className="w-full pt-3">
              <TabsList className="mb-8 w-full">
                <TabsTrigger value="traffic" className="flex-1">Traffic</TabsTrigger>
                <TabsTrigger value="sources" className="flex-1">Sources</TabsTrigger>
                <TabsTrigger value="devices" className="flex-1">Devices</TabsTrigger>
              </TabsList>
              
              <TabsContent value="traffic" className="pt-4">
                <AreaChart 
                  data={visitorData} 
                  xAxisKey="date" 
                  series={[
                    { name: 'Page Views', color: '#9b87f5' },
                    { name: 'Unique Visitors', color: '#1EAEDB' }
                  ]}
                />
              </TabsContent>
              
              <TabsContent value="sources" className="pt-4">
                <div className="flex justify-center">
                  <PieChart 
                    data={sourceData}
                    innerRadius={60}
                    outerRadius={100}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="devices" className="pt-4">
                <BarChart 
                  data={deviceData} 
                  xAxisKey="device" 
                  series={[{ name: 'Visitors', color: '#7E69AB' }]} 
                />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      ) : (
        <DetailedVisitorStats defaultPeriod="weekly" />
      )}
    </div>
  );
};

export default VisitorStats;
