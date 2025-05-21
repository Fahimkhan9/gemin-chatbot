'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row-reverse bg-base-200">
      {/* Mobile navbar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-base-100 border-b border-base-300">
        <button className="btn btn-sm btn-outline" onClick={() => setDrawerOpen(!drawerOpen)}>
          ☰
        </button>
        <div className="text-xl font-bold">Chatbot</div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-y-auto">{children}</div>

      {/* Sidebar drawer (mobile & desktop) */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-base-100 shadow-lg border-r border-base-300 transform transition-transform z-40 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <div className="p-4 text-xl font-bold border-b border-base-300">Chatbot</div>
        <ul className="menu p-2">
          <li><Link href='/dashboard'>🏠 Dashboard</Link></li>

        </ul>
      </div>

      {/* Overlay for mobile */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}
