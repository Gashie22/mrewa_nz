import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Bell, Check, Trash2, Clock } from 'lucide-react';

const NotificationsDrawer = ({ isOpen, onClose, userId }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    if (!userId) return;
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setNotifications(data || []);
  };

  useEffect(() => {
    if (!userId || !isOpen) return;

    fetchNotifications();

    // REALTIME SUBSCRIPTION
    const channel = supabase
      .channel(`user-notifs-drawer`) // Generic channel name
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'notifications' 
          // Note: Removing the 'filter' here and checking payload.new manually 
          // is more reliable across different Supabase project configs.
        },
        (payload) => {
          const isMyNotif = 
            payload.new?.user_id === userId || 
            payload.old?.user_id === userId;

          if (isMyNotif) {
            fetchNotifications();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, isOpen]); // Re-subscribe when opened to ensure fresh data

  const markAsRead = async (id) => {
    // Optimistic Update: Hide the "check" button immediately
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    );

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
  };

  const clearAll = async () => {
    if (!window.confirm("Clear all alerts?")) return;
    
    // Optimistic Update: Clear list immediately
    setNotifications([]);
    
    await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0f3d4a]/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex items-center justify-between bg-[#0f3d4a] text-white">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-[#a8e6cf]" />
            <h2 className="text-sm font-black uppercase tracking-widest">Command Alerts</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
              <Bell size={48} />
              <p className="text-[10px] font-black uppercase tracking-[4px] mt-4">No active alerts</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className={`p-4 rounded-2xl border transition-all ${n.is_read ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-[#a8e6cf]/30 shadow-sm border-l-4 border-l-[#a8e6cf]'}`}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[11px] font-black uppercase text-[#0f3d4a] tracking-tight">{n.title}</h3>
                  {!n.is_read && (
                    <button onClick={() => markAsRead(n.id)} className="text-[#55b3c5] hover:bg-[#55b3c5]/10 p-1 rounded-md transition-colors">
                      <Check size={14} />
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-2">{n.message}</p>
                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-300 uppercase">
                  <Clock size={10} />
                  {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t bg-slate-50">
            <button onClick={clearAll} className="w-full flex items-center justify-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-widest py-3 hover:bg-red-50 rounded-xl transition-colors">
              <Trash2 size={14} /> Clear Archive
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsDrawer;