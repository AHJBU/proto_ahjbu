// Database Service: طبقة وسيطة تتعامل مع القاعدة المختارة تلقائياً
import { databaseConfig } from '@/config/databaseSwitcher';

// MySQL imports (backend only)
// إذا كنت في بيئة Node.js:
// import mysql from 'mysql2/promise';

// Firebase imports (frontend or SSR)
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

export async function getDatabaseConnection() {
  if (databaseConfig.type === 'mysql') {
    // --- MySQL Connection Example ---
    // (ضع هنا كود الاتصال الفعلي في الباكند فقط)
    // const connection = await mysql.createConnection(databaseConfig.mysql);
    // return connection;
    return { type: 'mysql', config: databaseConfig.mysql };
  } else if (databaseConfig.type === 'firebase') {
    // --- Firebase Connection Example ---
    // const app = initializeApp(databaseConfig.firebase);
    // const db = getFirestore(app);
    // const auth = getAuth(app);
    // return { app, db, auth };
    return { type: 'firebase', config: databaseConfig.firebase };
  } else {
    throw new Error('نوع قاعدة البيانات غير مدعوم');
  }
}

// مثال على استخدام الخدمة:
// const db = await getDatabaseConnection();
// if (db.type === 'mysql') { /* ... */ }
// else if (db.type === 'firebase') { /* ... */ }
