import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import {
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  LogOut,
  Loader2,
  LayoutDashboard,
  Bell,
  Search,
  Zap,
  BarChart3,
  Inbox,
  MapPin,
  Trash2,
  Mail,
  MessageSquare,
  HeadphonesIcon,
  Menu,
  Home,
  Activity,
  Camera,
  ImageIcon,
  ExternalLink,
} from "lucide-react";
import NotificationsDrawer from "../components/NotificationsDrawer";
import logoImg from "../assets/logo.png";

// --- CONSTANTS ---
const SERVICE_TYPES = ["Electrical", "HVAC-R", "Automation", "Handyman"];
const REQUEST_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};

// --- ANALYTICS COMPONENT ---
const AnalyticsDashboard = ({ requests }) => {
  const typeData = SERVICE_TYPES.map((type) => ({
    name: type,
    total: requests.filter((r) => r.service_type === type).length,
  }));

  const statusData = [
    {
      name: "Pending",
      value: requests.filter((r) => r.status === "pending").length,
      color: "#f59e0b",
    },
    {
      name: "Active",
      value: requests.filter((r) => r.status === "in-progress").length,
      color: "#3b82f6",
    },
    {
      name: "Closed",
      value: requests.filter((r) => r.status === "completed").length,
      color: "#10b981",
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[35px] border border-slate-100 shadow-sm">
        <h3 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-4 sm:mb-6">
          Service Distribution
        </h3>
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={typeData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 8, fontWeight: 700 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  fontSize: "10px",
                }}
              />
              <Bar
                dataKey="total"
                fill="#0f3d4a"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[35px] border border-slate-100 shadow-sm">
        <h3 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-4 sm:mb-6">
          Request Status
        </h3>
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                iconType="circle"
                wrapperStyle={{
                  fontSize: "9px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  paddingTop: "15px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- CUSTOM HOOKS ---
const useToast = () => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000,
    );
  };
  return { toast, showToast };
};

// --- MAIN DASHBOARD ---
const Dashboard = ({ session }) => {
  const [activeTab, setActiveTab] = useState("hub");
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast, showToast } = useToast();

  const [newRequest, setNewRequest] = useState({
    type: SERVICE_TYPES[0],
    description: "",
    address: "",
    contactNumber: "",
    imageFile: null,
  });

  const MREWA_WHATSAPP = import.meta.env.VITE_MREWA_WHATSAPP;
  const MREWA_EMAIL = import.meta.env.VITE_MREWA_EMAIL;
  const ADMIN_IDS = (import.meta.env.VITE_ADMIN_IDS || "").split(",").map(id => id.trim());

  // FIXED: Logic to fetch both Admin status and Requests in the correct order
  const fetchRequests = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      // 1. Always check DB for current admin status first
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
      
      const currentIsAdmin = profile?.is_admin || false;
      setIsAdmin(currentIsAdmin);

      // 2. Build query based on that fresh status
      let query = supabase.from("service_requests").select("*");
      
      // If NOT admin, restrict to own requests
      if (!currentIsAdmin) {
        query = query.eq("user_id", session.user.id);
      }
      
      const { data, error } = await query
        .order("status", { ascending: false })
        .order("created_at", { ascending: false });
      
      if (!error) setRequests(data || []);
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    const { count } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", session.user.id)
      .eq("is_read", false);
    setUnreadCount(count || 0);
  };

  useEffect(() => {
    // Initial Load
    fetchRequests();
    fetchUnreadCount();

    // Realtime Subscriptions
    const requestsChannel = supabase
      .channel("requests-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "service_requests" },
        () => fetchRequests(true) // Refresh when data changes
      )
      .subscribe();

    const notifChannel = supabase
      .channel("notif-sync")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${session.user.id}`,
        },
        () => fetchUnreadCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(requestsChannel);
      supabase.removeChannel(notifChannel);
    };
  }, [session.user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = null;

    try {
      if (newRequest.imageFile) {
        const file = newRequest.imageFile;
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${session.user.id}/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("service-images")
          .upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from("service-images").getPublicUrl(filePath);
        imageUrl = publicUrl;
      }

      const { error: dbError } = await supabase
        .from("service_requests")
        .insert([
          {
            user_id: session.user.id,
            user_email: session.user.email,
            service_type: newRequest.type,
            description: newRequest.description,
            address: newRequest.address,
            contact_number: newRequest.contactNumber,
            status: REQUEST_STATUS.PENDING,
            image_url: imageUrl,
          },
        ]);

      if (dbError) throw dbError;

      const adminNotifications = ADMIN_IDS.map((adminId) => ({
        user_id: adminId,
        title: "New Service Request",
        message: `${session.user.email} submitted a ${newRequest.type} request.`,
        type: "new_request",
      }));
      await supabase.from("notifications").insert(adminNotifications);

      await fetch("https://formspree.io/f/mreylowk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          _subject: `NEW REQUEST: ${newRequest.type}`,
          message: `Type: ${newRequest.type}\nLocation: ${newRequest.address}\nContact: ${newRequest.contactNumber}\nIssue: ${newRequest.description}\nImage: ${imageUrl || "No image attached"}`,
        }),
      });

      showToast("Request submitted successfully");
      setIsModalOpen(false);
      setNewRequest({ type: SERVICE_TYPES[0], description: "", address: "", contactNumber: "", imageFile: null });
      fetchRequests(true);
    } catch (error) {
      showToast("Submission failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    const { data, error } = await supabase
      .from("service_requests")
      .update({ status: newStatus })
      .eq("id", id)
      .select();

    if (!error && data) {
      showToast(`Status updated to ${newStatus}`);
      await supabase.from("notifications").insert([
        {
          user_id: data[0].user_id,
          title: "Status Update",
          message: `Your ${data[0].service_type} request is now ${newStatus}.`,
          type: "update",
        },
      ]);
      fetchRequests(true);
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Delete this request permanently?")) return;
    const { error } = await supabase.from("service_requests").delete().eq("id", id);
    if (!error) {
      showToast("Request deleted", "error");
      fetchRequests(true);
    }
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-inter antialiased relative overflow-x-hidden pb-16 lg:pb-0">
      <ToastNotification toast={toast} />

      <DesktopSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        unreadCount={unreadCount}
        setIsNotifOpen={setIsNotifOpen}
        session={session}
        onLogout={() => supabase.auth.signOut()}
        MREWA_WHATSAPP={MREWA_WHATSAPP}
        MREWA_EMAIL={MREWA_EMAIL}
      />

      <MobileHeader
        isAdmin={isAdmin}
        session={session}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onLogout={() => supabase.auth.signOut()}
        MREWA_WHATSAPP={MREWA_WHATSAPP}
        MREWA_EMAIL={MREWA_EMAIL}
      />

      <main className="lg:ml-72 p-3 sm:p-4 lg:p-8 max-w-7xl mx-auto w-full">
        <DashboardHeader
          isAdmin={isAdmin}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsModalOpen={setIsModalOpen}
          activeTab={activeTab}
          canCreateRequest={!isAdmin}
        />

        {activeTab === "hub" ? (
          <>
            <StatsGrid
              stats={{
                pending: requests.filter((r) => r.status === "pending").length,
                inProgress: requests.filter((r) => r.status === "in-progress").length,
                completed: requests.filter((r) => r.status === "completed").length,
              }}
            />
            <RequestsList
              isLoading={isLoading}
              requests={filteredRequests}
              isAdmin={isAdmin}
              onUpdateStatus={handleUpdateStatus}
              onDeleteRequest={handleDeleteRequest}
            />
          </>
        ) : (
          <AnalyticsDashboard requests={requests} />
        )}
      </main>

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newRequest={newRequest}
        setNewRequest={setNewRequest}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        serviceTypes={SERVICE_TYPES}
      />

      <NotificationsDrawer
        isOpen={isNotifOpen}
        onClose={() => {
          setIsNotifOpen(false);
          fetchUnreadCount();
        }}
        userId={session.user.id}
      />

      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={unreadCount}
        setIsNotifOpen={setIsNotifOpen}
        isAdmin={isAdmin}
      />
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ToastNotification = ({ toast }) => {
  if (!toast.show) return null;

  return (
    <div
      className={`fixed bottom-20 lg:bottom-10 left-1/2 -translate-x-1/2 z-[10000] px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 animate-in slide-in-from-bottom-5 duration-300 ${
        toast.type === "success"
          ? "bg-[#0f3d4a] text-[#a8e6cf]"
          : "bg-red-500 text-white"
      }`}
    >
      {toast.type === "success" ? (
        <CheckCircle size={14} className="sm:size-[16px]" />
      ) : (
        <AlertCircle size={14} className="sm:size-[16px]" />
      )}
      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
        {toast.message}
      </span>
    </div>
  );
};

const DesktopSidebar = ({
  activeTab,
  setActiveTab,
  isAdmin,
  unreadCount,
  setIsNotifOpen,
  session,
  onLogout,
  MREWA_WHATSAPP,
  MREWA_EMAIL,
}) => (
  <aside className="w-72 bg-[#0f3d4a] text-white flex-col hidden lg:flex fixed top-0 bottom-0 left-0 shadow-2xl z-40">
    <div className="p-6 pb-8">
      <div className="flex items-center gap-3">
        {/* Logo instead of lightning icon */}
        <img
          src={logoImg}
          alt="MREWA Logo"
          className="h-10 w-auto object-contain"
        />
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">
          MREWA<span className="text-[#a8e6cf]">.</span>
        </h1>
      </div>
    </div>

    <nav className="flex-grow px-4 space-y-1">
      <NavItem
        icon={<LayoutDashboard size={20} />}
        label="Service Hub"
        active={activeTab === "hub"}
        onClick={() => setActiveTab("hub")}
      />
      {isAdmin && (
        <NavItem
          icon={<BarChart3 size={20} />}
          label="Analytics"
          active={activeTab === "reports"}
          onClick={() => setActiveTab("reports")}
        />
      )}
      <NavItem
        icon={<Bell size={20} />}
        label="Notifications"
        badge={unreadCount}
        onClick={() => setIsNotifOpen(true)}
      />
    </nav>

    {!isAdmin && (
      <div className="px-6 mb-6">
        <SupportWidget
          MREWA_WHATSAPP={MREWA_WHATSAPP}
          MREWA_EMAIL={MREWA_EMAIL}
        />
      </div>
    )}

    <div className="p-6 mt-auto">
      <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3">
        <p className="text-[8px] font-black uppercase text-[#a8e6cf] tracking-[1px]">
          {isAdmin ? "Administrator" : "Client"}
        </p>
        <p className="text-[11px] font-medium truncate opacity-80">
          {session.user.email}
        </p>
      </div>
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500/20 transition-all"
      >
        <LogOut size={14} /> Sign Out
      </button>
    </div>
  </aside>
);

const NavItem = ({ icon, label, active = false, badge = 0, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all group ${
      active
        ? "bg-[#a8e6cf] text-[#0f3d4a] shadow-lg"
        : "text-white/50 hover:bg-white/5 hover:text-white"
    }`}
  >
    <div className="flex items-center gap-3">
      <span
        className={active ? "text-[#0f3d4a]" : "group-hover:text-[#a8e6cf]"}
      >
        {icon}
      </span>
      <span className="text-[10px] font-black uppercase tracking-[1px]">
        {label}
      </span>
    </div>
    {badge > 0 && (
      <span className="h-4 w-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full">
        {badge > 9 ? "9+" : badge}
      </span>
    )}
  </button>
);

const SupportWidget = ({ MREWA_WHATSAPP, MREWA_EMAIL }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
      <HeadphonesIcon size={12} className="text-[#a8e6cf]" /> Quick Support
    </p>
    <div className="flex flex-col gap-2">
      <a
        href={`https://wa.me/${MREWA_WHATSAPP?.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between bg-[#a8e6cf] text-[#0f3d4a] p-2.5 rounded-xl hover:scale-[1.02] transition-transform"
      >
        <span className="text-[8px] font-black uppercase tracking-wider">
          WhatsApp
        </span>
        <MessageSquare size={14} />
      </a>
      <a
        href={`mailto:${MREWA_EMAIL}`}
        className="flex items-center justify-between bg-white/10 text-white p-2.5 rounded-xl hover:bg-white/20 transition-all"
      >
        <span className="text-[8px] font-black uppercase tracking-wider">
          Email
        </span>
        <Mail size={14} />
      </a>
    </div>
  </div>
);

// Mobile Support Widget Component
const MobileSupportWidget = ({ MREWA_WHATSAPP, MREWA_EMAIL }) => (
  <div className="bg-white rounded-xl p-4 mb-4 border border-slate-100 shadow-sm">
    <p className="text-[9px] font-black uppercase tracking-widest text-[#0f3d4a] mb-3 flex items-center gap-2">
      <HeadphonesIcon size={14} className="text-[#55b3c5]" /> Quick Support
    </p>
    <div className="flex flex-row gap-2">
      <a
        href={`https://wa.me/${MREWA_WHATSAPP?.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl hover:bg-[#128C7E] transition-all text-[9px] font-black uppercase tracking-wider"
      >
        <MessageSquare size={14} /> WhatsApp
      </a>
      <a
        href={`mailto:${MREWA_EMAIL}`}
        className="flex-1 flex items-center justify-center gap-2 bg-[#0f3d4a] text-white py-3 rounded-xl hover:bg-[#1a5f6f] transition-all text-[9px] font-black uppercase tracking-wider"
      >
        <Mail size={14} /> Email
      </a>
    </div>
  </div>
);

const MobileHeader = ({
  isAdmin,
  session,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onLogout,
  MREWA_WHATSAPP,
  MREWA_EMAIL,
}) => (
  <header className="lg:hidden bg-[#0f3d4a] text-white sticky top-0 z-30 shadow-lg">
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-2">
        {/* Logo for mobile header */}
        <img
          src={logoImg}
          alt="MREWA Logo"
          className="h-8 w-auto object-contain"
        />
        <h1 className="text-lg font-black italic uppercase tracking-tighter">
          MREWA<span className="text-[#a8e6cf]">.</span>
        </h1>
      </div>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        <Menu size={20} />
      </button>
    </div>

    {isMobileMenuOpen && (
      <div className="absolute top-full left-0 right-0 bg-[#0f3d4a] p-4 border-t border-white/10 animate-in slide-in-from-top duration-200 shadow-xl max-h-[80vh] overflow-y-auto">
        <div className="bg-white/5 rounded-xl p-3 mb-3">
          <p className="text-[8px] font-black uppercase text-[#a8e6cf]">
            {isAdmin ? "Administrator" : "Client"}
          </p>
          <p className="text-xs font-medium truncate">{session.user.email}</p>
        </div>
        
        {/* Mobile Support Widget - Only show for non-admin users */}
        {!isAdmin && (
          <div className="mb-3">
            <MobileSupportWidget
              MREWA_WHATSAPP={MREWA_WHATSAPP}
              MREWA_EMAIL={MREWA_EMAIL}
            />
          </div>
        )}
        
        <button
          onClick={onLogout}
          className="w-full bg-red-500/10 text-red-400 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    )}
  </header>
);

const MobileBottomNav = ({
  activeTab,
  setActiveTab,
  unreadCount,
  setIsNotifOpen,
  isAdmin,
}) => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 px-1 py-1 flex items-center justify-around shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
    <button
      onClick={() => setActiveTab("hub")}
      className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
        activeTab === "hub" ? "text-[#0f3d4a]" : "text-slate-400"
      }`}
    >
      <Home size={20} />
      <span className="text-[8px] font-black uppercase mt-0.5">Hub</span>
    </button>

    {isAdmin && (
      <button
        onClick={() => setActiveTab("reports")}
        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
          activeTab === "reports" ? "text-[#0f3d4a]" : "text-slate-400"
        }`}
      >
        <Activity size={20} />
        <span className="text-[8px] font-black uppercase mt-0.5">
          Analytics
        </span>
      </button>
    )}

    <button
      onClick={() => setIsNotifOpen(true)}
      className="flex flex-col items-center p-2 text-slate-400 relative rounded-lg"
    >
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 right-2 h-4 w-4 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-black">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
      <span className="text-[8px] font-black uppercase mt-0.5">Alerts</span>
    </button>
  </nav>
);

const DashboardHeader = ({
  isAdmin,
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
  activeTab,
  canCreateRequest,
}) => (
  <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 lg:mb-8">
    <div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0f3d4a] uppercase italic tracking-tighter mb-1">
        {activeTab === "hub"
          ? isAdmin
            ? "Admin Dashboard"
            : "Service Dashboard"
          : "Analytics Dashboard"}
      </h2>
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <p className="text-slate-400 text-[7px] sm:text-[8px] font-black uppercase tracking-[1px]">
          Live Connection Active
        </p>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
          size={14}
        />
        <input
          type="text"
          placeholder="Search requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-56 pl-8 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#55b3c5] text-xs font-medium shadow-sm"
        />
      </div>

      {canCreateRequest && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0f3d4a] text-[#a8e6cf] px-5 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
        >
          <Plus size={14} /> New Request
        </button>
      )}
    </div>
  </header>
);

const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 lg:mb-8">
    <StatWidget
      label="Pending"
      value={stats.pending}
      color="amber"
      icon={<Inbox size={14} className="sm:size-[16px]" />}
    />
    <StatWidget
      label="In Progress"
      value={stats.inProgress}
      color="blue"
      icon={<Zap size={14} className="sm:size-[16px]" />}
    />
    <StatWidget
      label="Completed"
      value={stats.completed}
      color="emerald"
      icon={<CheckCircle size={14} className="sm:size-[16px]" />}
    />
  </div>
);

const StatWidget = ({ label, value, color, icon }) => {
  const themes = {
    amber: "text-amber-500 bg-amber-50 border-amber-100",
    blue: "text-blue-500 bg-blue-50 border-blue-100",
    emerald: "text-emerald-500 bg-emerald-50 border-emerald-100",
  };

  return (
    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-slate-100 shadow-sm">
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 border ${themes[color]}`}
      >
        {icon}
      </div>
      <div className="text-lg sm:text-xl lg:text-2xl font-black text-[#0f3d4a] tracking-tighter">
        {value}
      </div>
      <div className="text-[7px] sm:text-[8px] lg:text-[9px] font-black uppercase tracking-[0.5px] text-slate-400">
        {label}
      </div>
    </div>
  );
};

const RequestsList = ({
  isLoading,
  requests,
  isAdmin,
  onUpdateStatus,
  onDeleteRequest,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12 sm:py-16">
        <Loader2 className="animate-spin text-slate-300" size={28} />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white p-8 sm:p-10 rounded-2xl sm:rounded-3xl text-center border border-slate-50">
        <Inbox size={28} className="mx-auto mb-3 text-slate-200" />
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
          No Requests Found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {requests.map((req) => (
        <RequestCard
          key={req.id}
          request={req}
          isAdmin={isAdmin}
          onUpdateStatus={onUpdateStatus}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
};

const RequestCard = ({ request, isAdmin, onUpdateStatus, onDeleteRequest }) => {
  const isPending = request.status === "pending";
  const isInProgress = request.status === "in-progress";
  const waUrl = `https://wa.me/${request.contact_number?.replace(/\D/g, "")}`;

  return (
    <div
      className={`bg-white p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-slate-100 shadow-sm hover:border-[#55b3c5]/30 transition-all ${
        isPending ? "border-l-4 border-l-amber-400" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Image Section */}
        {request.image_url ? (
          <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden shrink-0 group relative cursor-pointer border border-slate-100">
            <img
              src={request.image_url}
              alt="Service request"
              className="w-full h-full object-cover"
            />
            <a
              href={request.image_url}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        ) : (
          <div className="w-full sm:w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 text-slate-200">
            <ImageIcon size={20} />
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="bg-[#0f3d4a] text-[#a8e6cf] px-2 py-0.5 rounded-md text-[7px] sm:text-[8px] font-black uppercase tracking-widest">
              {request.service_type}
            </span>
            <span className="text-[7px] sm:text-[8px] text-slate-300 font-bold uppercase">
              ID: {request.id.slice(0, 6)}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-700 mb-2 line-clamp-2">
            {request.description}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 border-t border-slate-50">
            <span className="flex items-center gap-1 text-slate-400 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
              <MapPin size={10} className="text-[#55b3c5]" />
              <span className="truncate max-w-[80px] sm:max-w-[120px]">
                {request.address}
              </span>
            </span>

            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-emerald-500 text-[8px] sm:text-[9px] font-black uppercase tracking-widest"
            >
              <MessageSquare size={10} className="text-emerald-500" />
              <span>{request.contact_number}</span>
            </a>
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-slate-50">
              {request.image_url && (
                <a
                  href={request.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  <ImageIcon size={12} /> Image
                </a>
              )}

              {isPending && (
                <button
                  onClick={() => onUpdateStatus(request.id, "in-progress")}
                  className="bg-[#0f3d4a] text-[#a8e6cf] px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-[#1a5f6f] transition-all"
                >
                  Start
                </button>
              )}

              {isInProgress && (
                <button
                  onClick={() => onUpdateStatus(request.id, "completed")}
                  className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all"
                >
                  Complete
                </button>
              )}

              <button
                onClick={() => onDeleteRequest(request.id)}
                className="p-1.5 bg-red-50 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RequestModal = ({
  isOpen,
  onClose,
  newRequest,
  setNewRequest,
  onSubmit,
  isSubmitting,
  serviceTypes,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0f3d4a]/90 backdrop-blur-xl z-[9000] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 relative shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-300 hover:text-[#0f3d4a] p-2 z-10"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-black text-[#0f3d4a] italic uppercase tracking-tighter mb-5 sm:mb-6 text-center">
          New Service Request
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Service Type Grid */}
          <div className="grid grid-cols-2 gap-2">
            {serviceTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setNewRequest({ ...newRequest, type })}
                className={`py-2.5 sm:py-3 rounded-lg border-2 font-black uppercase text-[8px] sm:text-[9px] tracking-widest transition-all ${
                  newRequest.type === type
                    ? "border-[#55b3c5] bg-[#55b3c5]/5 text-[#0f3d4a]"
                    : "border-slate-100 text-slate-400"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Address & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              required
              placeholder="Site Address"
              value={newRequest.address}
              onChange={(e) =>
                setNewRequest({ ...newRequest, address: e.target.value })
              }
              className="w-full px-3 py-3 bg-slate-50 rounded-lg outline-none text-xs font-bold"
            />
            <input
              required
              placeholder="Contact Number"
              value={newRequest.contactNumber}
              onChange={(e) =>
                setNewRequest({ ...newRequest, contactNumber: e.target.value })
              }
              className="w-full px-3 py-3 bg-slate-50 rounded-lg outline-none text-xs font-bold"
              inputMode="tel"
            />
          </div>

          {/* Description */}
          <textarea
            required
            value={newRequest.description}
            onChange={(e) =>
              setNewRequest({ ...newRequest, description: e.target.value })
            }
            className="w-full p-3 bg-slate-50 rounded-lg outline-none text-xs"
            rows="3"
            placeholder="Describe the technical issue..."
          />

          {/* Image Upload */}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={(e) =>
                setNewRequest({ ...newRequest, imageFile: e.target.files[0] })
              }
            />
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[#55b3c5] transition-all group"
            >
              <Camera
                size={16}
                className="text-slate-400 group-hover:text-[#55b3c5]"
              />
              <span className="text-[9px] font-black uppercase text-slate-400 group-hover:text-[#55b3c5]">
                {newRequest.imageFile
                  ? newRequest.imageFile.name
                  : "Add Photo (Optional)"}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0f3d4a] text-[#a8e6cf] py-4 rounded-lg font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mx-auto" size={18} />
            ) : (
              "Submit Request"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;