
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDateRangePicker } from '@/components/analytics/CalendarDateRangePicker';
import { Badge } from '@/components/ui/badge';

// Mock visitor data - in production, this would come from a real database
const generateVisitorData = (period: string) => {
  // Different data based on time period
  if (period === 'yearly') {
    return [
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
  } else if (period === 'monthly') {
    return Array.from({ length: 30 }, (_, i) => ({
      date: `${i+1}`,
      'Page Views': Math.floor(Math.random() * 500) + 100,
      'Unique Visitors': Math.floor(Math.random() * 300) + 50,
    }));
  } else { // weekly
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      date: day,
      'Page Views': Math.floor(Math.random() * 300) + 50,
      'Unique Visitors': Math.floor(Math.random() * 150) + 20,
    }));
  }
};

// Source data with more detailed breakdown
const sourceData = [
  { name: 'Direct', value: 40, color: '#4285F4' },
  { name: 'Search', value: 30, color: '#34A853' },
  { name: 'Social', value: 20, color: '#FBBC05' },
  { name: 'Referral', value: 10, color: '#EA4335' },
];

// Enhanced source data with more details
const detailedSourceData = [
  { name: 'Google', category: 'Search', value: 25, color: '#34A853' },
  { name: 'Direct Traffic', category: 'Direct', value: 40, color: '#4285F4' },
  { name: 'Facebook', category: 'Social', value: 12, color: '#1877F2' },
  { name: 'Twitter', category: 'Social', value: 5, color: '#1DA1F2' },
  { name: 'LinkedIn', category: 'Social', value: 3, color: '#0A66C2' },
  { name: 'Bing', category: 'Search', value: 5, color: '#008373' },
  { name: 'Other Sites', category: 'Referral', value: 10, color: '#EA4335' },
];

// Enhanced device data with more details
const deviceData = [
  { device: 'Desktop', 'Visitors': 4000, breakdown: { Windows: 2500, Mac: 1200, Linux: 300 } },
  { device: 'Mobile', 'Visitors': 3000, breakdown: { iOS: 1800, Android: 1200 } },
  { device: 'Tablet', 'Visitors': 1000, breakdown: { iPad: 700, 'Android Tablet': 300 } },
];

// Enhanced browser data
const browserData = [
  { browser: 'Chrome', 'Visitors': 5500, color: '#4285F4' },
  { browser: 'Safari', 'Visitors': 2300, color: '#34A853' },
  { browser: 'Firefox', 'Visitors': 1200, color: '#FF7139' },
  { browser: 'Edge', 'Visitors': 900, color: '#0078D7' },
  { browser: 'Others', 'Visitors': 600, color: '#EA4335' },
];

interface DetailedVisitorStatsProps {
  defaultPeriod?: 'weekly' | 'monthly' | 'yearly';
}

const DetailedVisitorStats: React.FC<DetailedVisitorStatsProps> = ({ 
  defaultPeriod = 'weekly' 
}) => {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>(defaultPeriod);
  const [visitorData, setVisitorData] = useState(generateVisitorData(period));
  const [detailLevel, setDetailLevel] = useState<'simple' | 'detailed'>('simple');
  
  const handlePeriodChange = (newPeriod: 'weekly' | 'monthly' | 'yearly') => {
    setPeriod(newPeriod);
    setVisitorData(generateVisitorData(newPeriod));
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <CardTitle>Visitor Analytics</CardTitle>
            <CardDescription>View website traffic and engagement statistics.</CardDescription>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Select
              value={detailLevel}
              onValueChange={(value) => setDetailLevel(value as 'simple' | 'detailed')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Detail Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
            
            <CalendarDateRangePicker />
          </div>
        </div>
        
        <Tabs defaultValue="traffic" className="w-full pt-3">
          <TabsList className="mb-8 w-full">
            <TabsTrigger value="traffic" className="flex-1">Traffic</TabsTrigger>
            <TabsTrigger value="sources" className="flex-1">Sources</TabsTrigger>
            <TabsTrigger value="devices" className="flex-1">Devices</TabsTrigger>
            <TabsTrigger value="browsers" className="flex-1">Browsers</TabsTrigger>
          </TabsList>
          
          <div className="flex justify-end mb-6">
            <TabsList>
              <TabsTrigger 
                value="weekly" 
                className={period === 'weekly' ? 'bg-primary text-white' : ''}
                onClick={() => handlePeriodChange('weekly')}
              >
                Weekly
              </TabsTrigger>
              <TabsTrigger 
                value="monthly" 
                className={period === 'monthly' ? 'bg-primary text-white' : ''}
                onClick={() => handlePeriodChange('monthly')}
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger 
                value="yearly" 
                className={period === 'yearly' ? 'bg-primary text-white' : ''}
                onClick={() => handlePeriodChange('yearly')}
              >
                Yearly
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="traffic" className="pt-4">
            <AreaChart 
              data={visitorData} 
              xAxisKey="date" 
              series={[
                { name: 'Page Views', color: '#9b87f5' },
                { name: 'Unique Visitors', color: '#1EAEDB' }
              ]}
            />
            
            {detailLevel === 'detailed' && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Avg. Time on Page</div>
                    <div className="text-xl font-bold mt-1">2m 34s</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Bounce Rate</div>
                    <div className="text-xl font-bold mt-1">42.3%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">New vs Returning</div>
                    <div className="text-xl font-bold mt-1">68% / 32%</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sources" className="pt-4">
            <div className="flex flex-col md:flex-row">
              <div className="flex justify-center md:w-1/2">
                <PieChart 
                  data={detailLevel === 'detailed' ? detailedSourceData : sourceData}
                  innerRadius={60}
                  outerRadius={100}
                />
              </div>
              
              <div className="md:w-1/2 mt-6 md:mt-0">
                {detailLevel === 'detailed' ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Traffic Sources Breakdown</h3>
                    <div className="space-y-3">
                      {detailedSourceData.map(source => (
                        <div key={source.name} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: source.color }}
                            />
                            <span>{source.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {source.category}
                            </Badge>
                          </div>
                          <div className="font-medium">{source.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Traffic Sources</h3>
                    <div className="space-y-3">
                      {sourceData.map(source => (
                        <div key={source.name} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: source.color }}
                            />
                            <span>{source.name}</span>
                          </div>
                          <div className="font-medium">{source.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="devices" className="pt-4">
            <BarChart 
              data={deviceData} 
              xAxisKey="device" 
              series={[{ name: 'Visitors', color: '#7E69AB' }]} 
            />
            
            {detailLevel === 'detailed' && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Device Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {deviceData.map(device => (
                    <Card key={device.device}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">{device.device}</CardTitle>
                        <CardDescription>Total: {device.Visitors} visitors</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {Object.entries(device.breakdown).map(([name, value]) => (
                            <div key={name} className="flex justify-between text-sm">
                              <span>{name}</span>
                              <span className="font-medium">{value} ({Math.round(value/device.Visitors*100)}%)</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="browsers" className="pt-4">
            <BarChart 
              data={browserData} 
              xAxisKey="browser" 
              series={[{ name: 'Visitors', color: '#4285F4' }]} 
            />
            
            {detailLevel === 'detailed' && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Browser Version Breakdown</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Chrome</span>
                        <div className="space-x-2 text-sm">
                          <Badge variant="outline">v112: 45%</Badge>
                          <Badge variant="outline">v111: 30%</Badge>
                          <Badge variant="outline">v110: 20%</Badge>
                          <Badge variant="outline">Older: 5%</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Safari</span>
                        <div className="space-x-2 text-sm">
                          <Badge variant="outline">v16: 60%</Badge>
                          <Badge variant="outline">v15: 25%</Badge>
                          <Badge variant="outline">Older: 15%</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Firefox</span>
                        <div className="space-x-2 text-sm">
                          <Badge variant="outline">v112: 50%</Badge>
                          <Badge variant="outline">v111: 30%</Badge>
                          <Badge variant="outline">Older: 20%</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default DetailedVisitorStats;
