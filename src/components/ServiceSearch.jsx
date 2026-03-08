import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Search, Zap, Activity, Snowflake, Hammer, ArrowRight } from 'lucide-react';

const categoryIcons = {
  'Electrical Services': <Zap className="text-yellow-500" size={18} />,
  'Industrial Automation': <Activity className="text-blue-500" size={18} />,
  'Refrigeration': <Snowflake className="text-cyan-500" size={18} />,
  'Handyman Services': <Hammer className="text-orange-500" size={18} />
};

export default function ServiceSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      if (query.length < 2) return setResults([]);
      const { data } = await supabase
        .from('services')
        .select('*')
        .or(`service_name.ilike.%${query}%,keywords.cs.{${query.toLowerCase()}}`)
        .limit(5);
      setResults(data || []);
    };
    const delay = setTimeout(search, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm focus:border-blue-600 outline-none transition-all text-lg"
          placeholder="Search for Automation, HVAC, PLC..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-50">
          {results.map((s) => (
            <button
              key={s.id}
              onClick={() => { onSelect(s); setResults([]); setQuery(s.service_name); }}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b last:border-none border-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg">{categoryIcons[s.category] || <Zap size={18}/>}</div>
                <div>
                  <span className="block font-bold text-slate-800">{s.service_name}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{s.category}</span>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-300" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}