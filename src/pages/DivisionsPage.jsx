import React, { useState } from 'react';
import Divisions from '../components/Divisions';
import ServiceSearch from '../components/ServiceSearch';
import { logRequestToDB } from '../lib/supabaseClient';

export default function DivisionsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700">
      <Divisions />
      
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-4">
            Capability <span className="text-blue-600">Search</span>
          </h2>
          <p className="text-slate-500">Search our database of 50+ specialized engineering capabilities.</p>
        </div>
        
        <ServiceSearch onSelect={(s) => { setSelected(s); logRequestToDB(s); }} />
        
        {/* Contact Logic for Selected Service goes here... */}
      </section>
    </div>
  );
}