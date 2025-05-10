
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
        {/* زر إعادة الإعداد للمطورين فقط */}
        <button
          style={{marginBottom: '16px', padding: '8px 16px', background: '#dc2626', color: 'white', borderRadius: '4px'}}
          onClick={() => {
            localStorage.removeItem('setupComplete');
            window.location.reload();
          }}
        >
          إعادة الإعداد (Reset Setup) — للمطورين فقط
        </button>
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
