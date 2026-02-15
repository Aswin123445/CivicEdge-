import React, { useState } from 'react';
import { 
  Award, MapPin, Calendar, CheckCircle, 
  MessageSquare, Users, Settings, Bell 
} from 'lucide-react';

const CitizenProfile = () => {
  const [activeTab, setActiveTab] = useState('impact');

  const stats = [
    { label: 'Issues Resolved', value: '24', icon: <CheckCircle className="text-emerald-500" /> },
    { label: 'Volunteer Hours', value: '142', icon: <Calendar className="text-blue-500" /> },
    { label: 'Community Rank', value: 'Top 5%', icon: <Award className="text-amber-500" /> },
  ];

  return (
    <div className=" bg-slate-50 text-slate-900 font-sans">
      {/* --- Top Navigation --- */}
      

      <main className="max-w-5xl mx-auto py-10 px-6">
        {/* --- Header / Hero Section --- */}
        <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-inner flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-lg shadow-lg">
              <CheckCircle size={16} />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-extrabold text-slate-800">Marcus Sterling</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-slate-500 font-medium">
              <span className="flex items-center gap-1"><MapPin size={16}/> Portland, OR</span>
              <span className="flex items-center gap-1"><Users size={16}/> District 4 Steward</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-sm font-bold">Verified Citizen</span>
            </div>
            <p className="mt-4 text-slate-600 max-w-lg italic">
              "Dedicated to improving local infrastructure and urban green spaces since 2023."
            </p>
          </div>

          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-md">
            Report New Issue
          </button>
        </header>

        {/* --- Impact Metrics --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 bg-slate-50 rounded-lg">{stat.icon}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lifetime</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* --- Content Tabs --- */}
        <div className="border-b border-slate-200 mb-8 flex gap-8">
          {['Impact', 'Reports', 'Badges'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-4 text-sm font-bold transition-all ${
                activeTab === tab.toLowerCase() 
                ? 'border-b-2 border-emerald-500 text-emerald-600' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* --- Dynamic Content Area --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
            {/* Mock Activity Item */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 flex gap-4">
              <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center">🏗️</div>
              <div>
                <p className="font-semibold text-slate-800">Pothole Repair Request #4402</p>
                <p className="text-sm text-slate-500">Status: <span className="text-emerald-600 font-bold">Resolved</span> • 2 days ago</p>
                <p className="mt-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">"The city maintenance team has completed the overlay on 5th Ave."</p>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Next Milestone</h4>
                <p className="text-indigo-200 text-sm mb-4">5 more reports to unlock the "Neighborhood Watch" badge.</p>
                <div className="w-full bg-indigo-800 h-2 rounded-full">
                  <div className="bg-emerald-400 h-full w-[70%] rounded-full" />
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Award size={120} />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CitizenProfile;