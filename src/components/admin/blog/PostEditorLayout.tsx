
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye, CalendarIcon } from 'lucide-react';
import { SchedulePublicationForm } from './SchedulePublicationForm';

interface PostEditorLayoutProps {
  id?: string;
  title: string;
  lastSavedAt: Date | null;
  isLoading: boolean;
  showSchedule: boolean;
  publishDate: Date | null;
  publishTime: string;
  children: React.ReactNode;
  onBack: () => void;
  onPreview: () => void;
  onSaveDraft: () => void;
  onToggleSchedule: () => void;
  onPublish: () => void;
  onDateSelect: (date: Date | undefined) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSchedule: () => void;
}

export const PostEditorLayout: React.FC<PostEditorLayoutProps> = ({
  id,
  title,
  lastSavedAt,
  isLoading,
  showSchedule,
  publishDate,
  publishTime,
  children,
  onBack,
  onPreview,
  onSaveDraft,
  onToggleSchedule,
  onPublish,
  onDateSelect,
  onTimeChange,
  onSchedule
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>
        
        <div className="flex items-center gap-2">
          {lastSavedAt && (
            <span className="text-sm text-muted-foreground">
              Last saved: {lastSavedAt.toLocaleTimeString()}
            </span>
          )}
          
          <Button variant="outline" onClick={onPreview}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          
          <Button variant="outline" onClick={onSaveDraft}>
            Save Draft
          </Button>
          
          <Button variant="outline" onClick={onToggleSchedule}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          
          <Button onClick={onPublish} disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>
      
      <SchedulePublicationForm 
        showSchedule={showSchedule}
        publishDate={publishDate}
        publishTime={publishTime}
        onDateSelect={onDateSelect}
        onTimeChange={onTimeChange}
        onClose={onToggleSchedule}
        onSchedule={onSchedule}
      />
      
      {children}
    </div>
  );
};
