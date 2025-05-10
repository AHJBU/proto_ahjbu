
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import VisitorStats from '@/components/analytics/VisitorStats';
import DetailedVisitorStats from '@/components/analytics/DetailedVisitorStats';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6">
        <ScrollReveal>
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="overview">
                <VisitorStats />
              </Tabs>
            </CardContent>
          </Card>
        </ScrollReveal>
        
        <ScrollReveal>
          <DetailedVisitorStats />
        </ScrollReveal>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
