// Database Switcher: يحدد قاعدة البيانات المستخدمة
export type DatabaseType = 'mysql' | 'firebase';

export interface MySQLConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface DatabaseConfig {
  type: DatabaseType;
  mysql: MySQLConfig;
  firebase: FirebaseConfig;
}

// عدل هذا المتغير لتغيير القاعدة المستخدمة
export const databaseConfig: DatabaseConfig = {
  type: 'mysql', // 'mysql' أو 'firebase'
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'ahjbu_ah_user',
    password: 'BASem1462015%',
    database: 'ahjbu_ah_db',
  },
  firebase: {
    apiKey: "AIzaSyCxN3B8IlP4Byw_zqNoo7wIIRrV_3KfNxU",
    authDomain: "ahjbu-com.firebaseapp.com",
    projectId: "ahjbu-com",
    storageBucket: "ahjbu-com.firebasestorage.app",
    messagingSenderId: "911158844467",
    appId: "1:911158844467:web:23f87ee44f83e0c4f11746",
    measurementId: "G-FJG1G1LCYS"
  }
};
