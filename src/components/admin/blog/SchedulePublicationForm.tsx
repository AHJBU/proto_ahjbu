
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface SchedulePublicationFormProps {
  showSchedule: boolean;
  publishDate: Date | null;
  publishTime: string;
  onDateSelect: (date: Date | undefined) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSchedule: () => void;
}

export const SchedulePublicationForm: React.FC<SchedulePublicationFormProps> = ({
  showSchedule,
  publishDate,
  publishTime,
  onDateSelect,
  onTimeChange,
  onClose,
  onSchedule
}) => {
  if (!showSchedule) return null;
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Schedule Publication</CardTitle>
        <CardDescription>Set when this post should be published</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {publishDate ? format(publishDate, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={publishDate || undefined}
                  onSelect={onDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Time</Label>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="time"
                name="publishTime"
                value={publishTime}
                onChange={onTimeChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSchedule} disabled={!publishDate}>
          Schedule Post
        </Button>
      </CardFooter>
    </Card>
  );
};
