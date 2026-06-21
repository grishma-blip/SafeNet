import React, { useState, useEffect } from "react";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { contentAPI, reviewAPI, authAPI } from "./services/api";
import {
  Shield,
  UploadCloud,
  UserCheck,
  AlertTriangle,
  Sliders,
  LogOut,
  User as UserIcon,
  Activity,
  History,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Gavel,
  Trash2,
  Plus,
  RefreshCw,
  LayoutDashboard,
  Mail,
  Lock
} from "lucide-react";

// Import Recharts for telemetry
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";

// ==========================================
// VIEW COMPONENTS & SUBPAGES
// ==========================================

// 1. LOGIN COMPONENT
const LoginView: React.FC<{ setPage: (p: string) => void }> = ({ setPage }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authAPI.login({ email, password });
      login(data.token, data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || "Login credentials incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Left Showcase Column */}
      <div className="hidden lg:flex lg:w-1/2 p-16 flex-col justify-between relative bg-gradient-to-br from-cyber-cyan/10 via-cyber-blue/5 to-cyber-purple/10 border-r border-slate-200/50 overflow-hidden">
        {/* Background decorative float glow orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-cyber-cyan/15 blur-[120px] animate-float-1 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full bg-cyber-purple/15 blur-[120px] animate-float-2 pointer-events-none"></div>
        {/* Mesh grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>

        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-blue rounded-xl flex items-center justify-center text-white shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-cyber-blue bg-clip-text text-transparent">SafeNet</span>
            <span className="block text-[8px] uppercase tracking-widest text-slate-400 font-extrabold mt-0.5">Control Panel</span>
          </div>
        </div>

        {/* Interactive Moderation Pipeline Simulator */}
        <div className="relative z-10 my-auto max-w-lg space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight text-slate-900">
              Enterprise-Grade <br />
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-cyan bg-clip-text text-transparent">Content Moderation</span>
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Real-time ingestion gates, multi-modal automated scanners, policy-based filter matrices, and human moderator audit loops in one seamless control system.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl bg-white/60 border border-white/80 shadow-sm space-y-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-1">Moderation Pipeline Simulator</div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center text-cyber-blue text-xs font-bold shadow-sm">01</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800">Payload Ingestion</div>
                  <div className="text-[10px] text-slate-400 font-bold">Text posts, images, OCR payloads, and video assets</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20">Active</span>
              </div>

              <div className="h-4 w-0.5 bg-gradient-to-b from-cyber-blue to-cyber-purple ml-4"></div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-purple/10 flex items-center justify-center text-cyber-purple text-xs font-bold shadow-sm">02</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800">Automated Scanner Filter</div>
                  <div className="text-[10px] text-slate-400 font-bold">Evaluating toxicity scoring, regex matches, and keywords</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20">Scanning</span>
              </div>

              <div className="h-4 w-0.5 bg-gradient-to-b from-cyber-purple to-cyber-rose ml-4"></div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-rose/10 flex items-center justify-center text-cyber-rose text-xs font-bold shadow-sm">03</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800">Auditor Audit Queue</div>
                  <div className="text-[10px] text-slate-400 font-bold">Flagging violating items for manual review workflows</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase bg-cyber-rose/10 text-cyber-rose border border-cyber-rose/20">Branching</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom System Metrics */}
        <div className="relative z-10 grid grid-cols-3 gap-6 border-t border-slate-200/80 pt-6">
          <div>
            <span className="block text-xl font-black text-slate-900">5.4k/s</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Ingest Rate</span>
          </div>
          <div>
            <span className="block text-xl font-black text-slate-900">&lt; 20ms</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Avg Latency</span>
          </div>
          <div>
            <span className="block text-xl font-black text-slate-900">99.8%</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Scanner Acc.</span>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative min-h-screen">
        {/* Background decorative float glow orbs (mobile only) */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-cyber-cyan/10 blur-[110px] pointer-events-none lg:hidden"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-cyber-purple/10 blur-[110px] pointer-events-none lg:hidden"></div>
        {/* Mesh grid pattern overlay (mobile only) */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none lg:hidden"></div>

        <div className="w-full max-w-md space-y-8 animate-fade-in relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-blue rounded-xl flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-cyber-blue bg-clip-text text-transparent">SafeNet</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Sign In</h2>
            <p className="text-xs text-slate-500 font-semibold mt-2">Enter your auditor credentials to access the SafeNet console.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-cyber-rose text-xs rounded-xl p-3.5 font-medium animate-fade-in">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyber-cyan transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-100/50 border border-slate-200/80 focus:bg-white rounded-xl pl-11 pr-4 py-3 text-slate-800 outline-none focus:border-cyber-cyan focus:ring-4 focus:ring-cyber-cyan/8 transition-all duration-300 font-medium placeholder-slate-400 text-sm"
                    placeholder="e.g. auditor@safenet.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyber-cyan transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-100/50 border border-slate-200/80 focus:bg-white rounded-xl pl-11 pr-4 py-3 text-slate-800 outline-none focus:border-cyber-cyan focus:ring-4 focus:ring-cyber-cyan/8 transition-all duration-300 font-medium placeholder-slate-400 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:from-cyber-blue hover:to-cyber-cyan active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(14,165,233,0.15)] hover:shadow-[0_12px_24px_rgba(14,165,233,0.25)] flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {loading ? "Authenticating..." : "Sign In to SafeNet"}
            </button>

            <p className="text-center text-xs text-slate-500 font-medium mt-6">
              New deployment?{" "}
              <button type="button" onClick={() => setPage("register")} className="text-cyber-cyan hover:underline font-bold">
                Register System Auditor
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// 2. REGISTER COMPONENT
const RegisterView: React.FC<{ setPage: (p: string) => void }> = ({ setPage }) => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authAPI.register({ name, email, password, role });
      login(data.token, data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration error. Check email credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Left Showcase Column */}
      <div className="hidden lg:flex lg:w-1/2 p-16 flex-col justify-between relative bg-gradient-to-br from-cyber-cyan/10 via-cyber-blue/5 to-cyber-purple/10 border-r border-slate-200/50 overflow-hidden">
        {/* Background decorative float glow orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-cyber-cyan/15 blur-[120px] animate-float-1 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full bg-cyber-purple/15 blur-[120px] animate-float-2 pointer-events-none"></div>
        {/* Mesh grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>

        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-blue rounded-xl flex items-center justify-center text-white shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-cyber-blue bg-clip-text text-transparent">SafeNet</span>
            <span className="block text-[8px] uppercase tracking-widest text-slate-400 font-extrabold mt-0.5">Control Panel</span>
          </div>
        </div>

        {/* Interactive Moderation Pipeline Simulator */}
        <div className="relative z-10 my-auto max-w-lg space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight text-slate-900">
              Enterprise-Grade <br />
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-cyan bg-clip-text text-transparent">Content Moderation</span>
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              Real-time ingestion gates, multi-modal automated scanners, policy-based filter matrices, and human moderator audit loops in one seamless control system.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl bg-white/60 border border-white/80 shadow-sm space-y-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-1">Moderation Pipeline Simulator</div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center text-cyber-blue text-xs font-bold shadow-sm">01</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800">Payload Ingestion</div>
                  <div className="text-[10px] text-slate-400 font-bold">Text posts, images, OCR payloads, and video assets</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20">Active</span>
              </div>

              <div className="h-4 w-0.5 bg-gradient-to-b from-cyber-blue to-cyber-purple ml-4"></div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-purple/10 flex items-center justify-center text-cyber-purple text-xs font-bold shadow-sm">02</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800">Automated Scanner Filter</div>
                  <div className="text-[10px] text-slate-400 font-bold">Evaluating toxicity scoring, regex matches, and keywords</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20">Scanning</span>
              </div>

              <div className="h-4 w-0.5 bg-gradient-to-b from-cyber-purple to-cyber-rose ml-4"></div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-rose/10 flex items-center justify-center text-cyber-rose text-xs font-bold shadow-sm">03</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800">Auditor Audit Queue</div>
                  <div className="text-[10px] text-slate-400 font-bold">Flagging violating items for manual review workflows</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase bg-cyber-rose/10 text-cyber-rose border border-cyber-rose/20">Branching</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom System Metrics */}
        <div className="relative z-10 grid grid-cols-3 gap-6 border-t border-slate-200/80 pt-6">
          <div>
            <span className="block text-xl font-black text-slate-900">5.4k/s</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Ingest Rate</span>
          </div>
          <div>
            <span className="block text-xl font-black text-slate-900">&lt; 20ms</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Avg Latency</span>
          </div>
          <div>
            <span className="block text-xl font-black text-slate-900">99.8%</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Scanner Acc.</span>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative min-h-screen">
        {/* Background decorative float glow orbs (mobile only) */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-cyber-cyan/10 blur-[110px] pointer-events-none lg:hidden"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-cyber-purple/10 blur-[110px] pointer-events-none lg:hidden"></div>
        {/* Mesh grid pattern overlay (mobile only) */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none lg:hidden"></div>

        <div className="w-full max-w-md space-y-8 animate-fade-in relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-blue rounded-xl flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-cyber-blue bg-clip-text text-transparent">SafeNet</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Provision Account</h2>
            <p className="text-xs text-slate-500 font-semibold mt-2">Create a new auditor or user profile to access console nodes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-cyber-rose text-xs rounded-xl p-3.5 font-medium animate-fade-in">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Auditor Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyber-cyan transition-colors">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-100/50 border border-slate-200/80 focus:bg-white rounded-xl pl-11 pr-4 py-2.5 text-slate-800 outline-none focus:border-cyber-cyan focus:ring-4 focus:ring-cyber-cyan/8 transition-all duration-300 font-medium placeholder-slate-400 text-sm"
                    placeholder="e.g. Marcus Aurelius"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyber-cyan transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-100/50 border border-slate-200/80 focus:bg-white rounded-xl pl-11 pr-4 py-2.5 text-slate-800 outline-none focus:border-cyber-cyan focus:ring-4 focus:ring-cyber-cyan/8 transition-all duration-300 font-medium placeholder-slate-400 text-sm"
                    placeholder="e.g. auditor@safenet.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyber-cyan transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-100/50 border border-slate-200/80 focus:bg-white rounded-xl pl-11 pr-4 py-2.5 text-slate-800 outline-none focus:border-cyber-cyan focus:ring-4 focus:ring-cyber-cyan/8 transition-all duration-300 font-medium placeholder-slate-400 text-sm"
                    placeholder="Minimum 6 characters"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:border-cyber-cyan focus:ring-4 focus:ring-cyber-cyan/8 transition-all duration-300 font-medium text-sm"
                >
                  <option value="user">User (Upload Ingestion Only)</option>
                  <option value="moderator">Moderator (Audits reviews)</option>
                  <option value="admin">System Admin (Rules management & Audits)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:from-cyber-blue hover:to-cyber-cyan active:scale-[0.98] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(14,165,233,0.15)] hover:shadow-[0_12px_24px_rgba(14,165,233,0.25)] flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {loading ? "Registering..." : "Provision New Account"}
            </button>

            <p className="text-center text-xs text-slate-500 font-medium mt-6">
              Already registered?{" "}
              <button type="button" onClick={() => setPage("login")} className="text-cyber-cyan hover:underline font-bold">
                Sign In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// 3. INGESTION CONSOLE VIEW
const IngestView: React.FC = () => {
  const [contentType, setContentType] = useState<"text" | "image" | "video">("text");
  const [textPayload, setTextPayload] = useState("");
  const [ocrPayload, setOcrPayload] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const presets = [
    {
      label: "CLEAN TEXT",
      color: "bg-green-50 border-green-200 text-cyber-emerald",
      borderSide: "border-l-4 border-l-cyber-emerald",
      type: "text",
      payload: "Highly recommending this system design project, it was fantastic! Very robust."
    },
    {
      label: "TOXIC TEXT",
      color: "bg-red-50 border-red-200 text-cyber-rose",
      borderSide: "border-l-4 border-l-cyber-rose",
      type: "text",
      payload: "I absolutely hate this guy and want to abuse him. He is a total idiot, let's kill him."
    },
    {
      label: "SPAM LINK",
      color: "bg-amber-50 border-amber-200 text-cyber-amber",
      borderSide: "border-l-4 border-l-cyber-amber",
      type: "text",
      payload: "Win a free iPhone now! Click here to claim double double crypto absolute free!"
    }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setContentType(p.type as any);
    setTextPayload(p.payload);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("contentType", contentType);
      
      if (contentType === "text") {
        formData.append("textPayload", textPayload);
      } else {
        if (!mediaFile) {
          setError("Please select a media file to upload.");
          setLoading(false);
          return;
        }
        formData.append("file", mediaFile);
        if (contentType === "image" && ocrPayload) {
          formData.append("textPayload", ocrPayload);
        }
      }

      await contentAPI.ingest(formData);
      setMessage("Content successfully ingested. Moderation pipeline started in background.");
      
      // Reset
      setTextPayload("");
      setOcrPayload("");
      setMediaFile(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to ingest content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in text-slate-800">
      <div className="glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow">
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2 text-slate-900">
          <UploadCloud className="text-cyber-cyan" /> Content Ingestion Gateway
        </h2>
        <p className="text-xs text-slate-500 mb-6 font-medium">Deliver payloads to automated scanners</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Content Format</label>
            <div className="grid grid-cols-3 gap-3">
              {(["text", "image", "video"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => { setContentType(type); setMediaFile(null); }}
                  className={`py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all ${
                    contentType === type
                      ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-[0_2px_8px_rgba(14,165,233,0.1)]"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {contentType === "text" ? (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Text Payload</label>
              <textarea
                value={textPayload}
                onChange={(e) => setTextPayload(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 outline-none focus:border-cyber-cyan focus:bg-white transition-all font-medium h-32"
                placeholder="Type user post content here..."
                required
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Select {contentType} File
                </label>
                <div className="relative border-2 border-dashed border-slate-200 hover:border-cyber-cyan/60 rounded-xl p-6 bg-slate-50/50 hover:bg-slate-50/80 transition-all duration-300 flex flex-col items-center justify-center gap-2 group cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept={contentType === "image" ? "image/*" : "video/*"}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required={!mediaFile}
                  />
                  <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-cyber-cyan group-hover:scale-110 transition-all duration-300" />
                  <span className="text-xs font-bold text-slate-650 text-center">
                    {mediaFile ? mediaFile.name : `Drag & drop or click to upload ${contentType}`}
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase font-extrabold">
                    {contentType === "image" ? "PNG, JPG, WEBP up to 5MB" : "MP4, WEBM up to 20MB"}
                  </span>
                </div>
              </div>

              {contentType === "image" && (
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                    Simulate OCR Extracted Text (Optional)
                  </label>
                  <textarea
                    value={ocrPayload}
                    onChange={(e) => setOcrPayload(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-cyber-cyan focus:bg-white transition-all font-medium h-20"
                    placeholder="Text appearing inside the image asset..."
                  />
                </div>
              )}
            </div>
          )}

          {error && <div className="text-cyber-rose text-sm font-semibold">{error}</div>}
          {message && <div className="text-cyber-emerald text-sm font-semibold">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-bold py-3.5 rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(14,165,233,0.2)]"
          >
            {loading ? "Processing..." : "Deliver Ingestion Payload"}
          </button>
        </form>
      </div>

      <div className="glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow flex flex-col">
        <h2 className="text-xl font-bold mb-1 text-slate-900">Quick Match Presets</h2>
        <p className="text-xs text-slate-500 mb-6 font-medium">Pre-loaded cases covering common moderation scenarios</p>

        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p)}
              className={`w-full text-left p-4 rounded-xl border border-slate-200/60 bg-white hover:bg-slate-50 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-slate-300 transition-all ${p.borderSide} hover:scale-[1.01] duration-300`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] px-2 py-0.5 border rounded-md font-extrabold uppercase ${p.color}`}>
                  {p.label}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{p.type}</span>
              </div>
              <p className="text-xs text-slate-650 line-clamp-2 italic font-mono">"{p.payload}"</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. CONTENT HISTORY VIEW
const HistoryView: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await contentAPI.getHistory();
      setHistory(data.history);
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 border-green-200 text-cyber-emerald";
      case "rejected":
        return "bg-red-50 border-red-200 text-cyber-rose";
      case "flagged":
        return "bg-yellow-50 border-yellow-200 text-cyber-amber";
      case "under_review":
        return "bg-blue-50 border-blue-200 text-cyber-blue";
      default:
        return "bg-slate-50 border-slate-250 text-slate-500";
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow animate-fade-in text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <History className="text-cyber-cyan" /> Upload Ingestion History
          </h2>
          <p className="text-xs text-slate-500 font-medium">Chronological list of submitted assets</p>
        </div>
        <button onClick={fetchHistory} className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 shadow-sm transition-all">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm font-semibold">Loading logs...</div>
      ) : history.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm font-semibold">No uploads recorded yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Content ID</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Payload/Asset Preview</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Ingested At</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h._id} className="border-b border-slate-100 hover:bg-white/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700"><code>{h._id.substring(12)}</code></td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 border border-slate-200 rounded bg-slate-50 uppercase font-bold text-[9px] text-slate-500">
                      {h.contentType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-650 font-medium">
                    {h.contentType === "text" ? h.textPayload : h.mediaUrl}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 border rounded-md font-extrabold uppercase text-[9px] ${getStatusBadge(h.status)}`}>
                      {h.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-450 font-medium">
                    {new Date(h.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// 5. MODERATOR PANEL VIEW
const ModeratorView: React.FC = () => {
  const [pending, setPending] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [revealMedia, setRevealMedia] = useState(false);
  const [actionTaken, setActionTaken] = useState<"APPROVE" | "REJECT">("APPROVE");
  const [reasonCode, setReasonCode] = useState("CLEAN");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const data = await reviewAPI.getPending();
      setPending(data.pending);
      // Preselect first item if available
      if (data.pending.length > 0) {
        setSelectedItem(data.pending[0]);
        setRevealMedia(false);
      } else {
        setSelectedItem(null);
      }
    } catch (err) {
      console.error("Pending reviews load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setBtnLoading(true);

    try {
      await reviewAPI.audit(selectedItem._id, {
        actionTaken,
        reasonCode,
        notes
      });
      setNotes("");
      setReasonCode("CLEAN");
      await fetchPending();
    } catch (err) {
      alert("Failed to submit review.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    setRevealMedia(false);
    setNotes("");
    setReasonCode("CLEAN");
    setActionTaken("APPROVE");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in text-slate-805">
      {/* Review Queue List */}
      <div className="glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow flex flex-col h-[600px]">
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2 text-slate-900">
          <AlertTriangle className="text-cyber-amber" /> Review Queue
        </h2>
        <p className="text-xs text-slate-500 mb-6 font-medium">Awaiting human auditor actions</p>

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs font-semibold">Loading queue...</div>
        ) : pending.length === 0 ? (
          <div className="text-center py-12 text-cyber-emerald text-xs font-bold flex flex-col items-center justify-center gap-2 h-full">
            <UserCheck className="w-8 h-8 text-cyber-emerald" /> Queue clear. No pending items.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {pending.map((item) => (
              <button
                key={item._id}
                onClick={() => handleSelectItem(item)}
                className={`w-full text-left p-4 rounded-xl border transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)] ${
                  selectedItem?._id === item._id
                    ? "bg-cyber-cyan/5 border-cyber-cyan shadow-[0_4px_12px_rgba(14,165,233,0.08)]"
                    : "bg-white border-slate-200/60 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] px-2 py-0.5 border border-slate-200 rounded bg-slate-50 font-extrabold text-slate-555 uppercase">
                    {item.contentType}
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold">ID: {item._id.substring(12)}</span>
                </div>
                <p className="text-xs text-slate-655 font-medium truncate">
                  {item.contentType === "text" ? item.textPayload : item.mediaUrl}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Audit Workspace */}
      <div className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow min-h-[600px] flex flex-col">
        {!selectedItem ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 text-xs gap-3">
            <Gavel className="w-12 h-12 text-slate-300" />
            <p className="font-semibold">Select an item from the review queue to audit content and submit final action.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                <span className="text-xs font-extrabold px-3 py-1 border border-cyber-cyan/30 rounded bg-cyber-cyan/5 text-cyber-cyan uppercase">
                  {selectedItem.contentType}
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">Payload ID: {selectedItem._id}</span>
              </div>

              {/* Display Content Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Content Asset</h3>
                  
                  {selectedItem.contentType === "text" && (
                    <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-xl font-mono text-sm leading-relaxed text-slate-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                      {selectedItem.textPayload}
                    </div>
                  )}

                  {selectedItem.contentType === "image" && (
                    <div className="space-y-4">
                      <div className="relative border border-slate-200/80 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center min-h-[220px]">
                        {!revealMedia ? (
                          <div className="absolute inset-0 backdrop-blur-2xl bg-slate-100/60 flex flex-col items-center justify-center p-6 text-center z-10 transition-all duration-500">
                            <div className="relative mb-4 flex items-center justify-center">
                              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-cyber-rose/15 opacity-75"></span>
                              <div className="relative w-12 h-12 bg-red-50 border border-red-200 text-cyber-rose rounded-full flex items-center justify-center shadow-md">
                                <EyeOff className="w-5 h-5 animate-pulse" />
                              </div>
                            </div>
                            <h4 className="text-xs font-extrabold text-slate-905 uppercase tracking-widest mb-1">Content Shield Active</h4>
                            <p className="text-[10px] text-slate-500 font-semibold max-w-[240px] leading-relaxed">
                              Asset obscured due to safety compliance settings. Potential violations detected.
                            </p>
                            <button
                              type="button"
                              onClick={() => setRevealMedia(true)}
                              className="mt-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-extrabold text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-1.5 animate-fade-in"
                            >
                              <Eye className="w-3.5 h-3.5" /> Reveal Protected Asset
                            </button>
                          </div>
                        ) : (
                          <img
                            src={selectedItem.mediaUrl}
                            alt="Audit Target"
                            className="max-h-[220px] object-contain"
                          />
                        )}
                      </div>
                      
                      {selectedItem.textPayload && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-medium text-slate-700">
                          <strong className="text-cyber-cyan">OCR Extracted:</strong> "{selectedItem.textPayload}"
                        </div>
                      )}
                    </div>
                  )}

                  {selectedItem.contentType === "video" && (
                    <div className="relative border border-slate-200/80 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center min-h-[220px]">
                      {!revealMedia ? (
                        <div className="absolute inset-0 backdrop-blur-2xl bg-slate-100/60 flex flex-col items-center justify-center p-6 text-center z-10 transition-all duration-500">
                          <div className="relative mb-4 flex items-center justify-center">
                            <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-cyber-rose/15 opacity-75"></span>
                            <div className="relative w-12 h-12 bg-red-50 border border-red-200 text-cyber-rose rounded-full flex items-center justify-center shadow-md">
                              <EyeOff className="w-5 h-5 animate-pulse" />
                            </div>
                          </div>
                          <h4 className="text-xs font-extrabold text-slate-905 uppercase tracking-widest mb-1">Content Shield Active</h4>
                          <p className="text-[10px] text-slate-500 font-semibold max-w-[240px] leading-relaxed">
                            Asset obscured due to safety compliance settings. Potential violations detected.
                          </p>
                          <button
                            type="button"
                            onClick={() => setRevealMedia(true)}
                            className="mt-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-extrabold text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" /> Reveal Protected Asset
                          </button>
                        </div>
                      ) : (
                        <video
                          src={selectedItem.mediaUrl}
                          controls
                          className="max-h-[220px] w-full rounded-xl"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Audit Form actions */}
            <form onSubmit={handleAuditSubmit} className="mt-8 border-t border-slate-200 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-555 mb-2">Audit Action</label>
                  <select
                    value={actionTaken}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setActionTaken(val);
                      if (val === "APPROVE") setReasonCode("CLEAN");
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-cyber-cyan"
                  >
                    <option value="APPROVE">APPROVE (Allow Content)</option>
                    <option value="REJECT">REJECT (Remove Content)</option>
                  </select>
                </div>

                {actionTaken === "REJECT" && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-555 mb-2">Reason Code</label>
                    <select
                      value={reasonCode}
                      onChange={(e) => setReasonCode(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-cyber-cyan"
                    >
                      <option value="HATE_SPEECH">Hate Speech</option>
                      <option value="SPAM">Spam / Scam</option>
                      <option value="NSFW">Explicit (NSFW)</option>
                      <option value="VIOLENCE">Violence / Gore</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-555 mb-2">Review Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-cyber-cyan focus:bg-white text-slate-855 h-20"
                  placeholder="Record review observations here..."
                />
              </div>

              <button
                type="submit"
                disabled={btnLoading}
                className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-[0_4px_10px_rgba(14,165,233,0.15)]"
              >
                <Gavel className="w-4 h-4" /> {btnLoading ? "Committing..." : "Commit Moderation Decision"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// 6. POLICY RULES CONFIG VIEW
const RulesView: React.FC = () => {
  const [rules, setRules] = useState<any[]>([]);
  const [ruleType, setRuleType] = useState<"KEYWORD" | "REGEX">("KEYWORD");
  const [pattern, setPattern] = useState("");
  const [label, setLabel] = useState<"HATE_SPEECH" | "SPAM" | "VIOLENCE" | "EXPLICIT">("HATE_SPEECH");
  const [loading, setLoading] = useState(true);

  const fetchRules = async () => {
    try {
      const data = await reviewAPI.getRules();
      setRules(data.rules);
    } catch (err) {
      console.error("Rules fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await reviewAPI.createRule({ ruleType, pattern, label });
      setPattern("");
      fetchRules();
    } catch (err) {
      alert("Failed to create rule. Rules must have unique patterns.");
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (confirm("Are you sure you want to delete this rule?")) {
      try {
        await reviewAPI.deleteRule(id);
        fetchRules();
      } catch (err) {
        alert("Failed to delete rule.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in text-slate-850">
      <div className="glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow h-fit">
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2 text-slate-900">
          <Sliders className="text-cyber-cyan" /> Add Policy Filter
        </h2>
        <p className="text-xs text-slate-500 mb-6 font-medium">Define active keyword or regex patterns</p>

        <form onSubmit={handleCreateRule} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Matcher Type</label>
            <select
              value={ruleType}
              onChange={(e) => setRuleType(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold"
            >
              <option value="KEYWORD">KEYWORD (Exact Word Bound)</option>
              <option value="REGEX">REGEX (Regex Pattern)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Pattern / Word</label>
            <input
              type="text"
              required
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium outline-none focus:border-cyber-cyan focus:bg-white"
              placeholder="e.g. bitcoin doubler, \b[0-9]{10}\b"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Violation Label</label>
            <select
              value={label}
              onChange={(e) => setLabel(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold"
            >
              <option value="HATE_SPEECH">HATE_SPEECH</option>
              <option value="SPAM">SPAM</option>
              <option value="VIOLENCE">VIOLENCE</option>
              <option value="EXPLICIT">EXPLICIT</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_10px_rgba(14,165,233,0.15)]"
          >
            <Plus className="w-4 h-4" /> Save Policy Rule
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow">
        <h2 className="text-xl font-bold mb-1 text-slate-900">Active Rules List</h2>
        <p className="text-xs text-slate-500 mb-6 font-medium">Policies currently active in scanners</p>

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs font-semibold">Loading rules...</div>
        ) : rules.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs font-semibold">No active policies configured.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-450 uppercase tracking-wider font-bold">
                  <th className="py-2.5 px-4">Type</th>
                  <th className="py-2.5 px-4">Pattern</th>
                  <th className="py-2.5 px-4">Label</th>
                  <th className="py-2.5 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule._id} className="border-b border-slate-100 hover:bg-white/40">
                    <td className="py-3 px-4 font-mono font-bold text-slate-600">{rule.ruleType}</td>
                    <td className="py-3 px-4 font-mono text-cyber-blue font-bold"><code>{rule.pattern}</code></td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 border border-slate-200 rounded bg-slate-50 uppercase text-[9px] font-bold text-slate-500">
                        {rule.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteRule(rule._id)}
                        className="text-cyber-rose hover:text-red-650 flex items-center gap-1 font-bold"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// 7. TELEMETRY ANALYTICS VIEW
const AnalyticsView: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const data = await reviewAPI.getStats();
      setStats(data.stats);
    } catch (err) {
      console.error("Stats load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-slate-400 text-sm font-semibold animate-fade-in">Loading analytics data...</div>;
  }

  const pieData = stats ? [
    { name: "Approved", value: stats.approved, color: "#10b981" },
    { name: "Rejected", value: stats.rejected, color: "#ef4444" },
    { name: "Flagged", value: stats.flagged, color: "#f59e0b" }
  ].filter(item => item.value > 0) : [];

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      {/* Mini Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl bg-white/70 shadow-light-shadow flex items-center justify-between border border-white/60 border-t-4 border-t-cyber-blue hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyber-blue/10 flex items-center justify-center text-cyber-blue shadow-sm">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Total Ingested</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">{stats.total}</div>
            </div>
          </div>
          <svg className="w-14 h-8 text-cyber-blue/40 hidden xl:block" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M0 25 C10 20, 20 10, 30 15 C40 20, 50 5, 60 18 C70 30, 80 12, 90 8 L100 12" />
          </svg>
        </div>

        <div className="glass-panel p-5 rounded-2xl bg-white/70 shadow-light-shadow flex items-center justify-between border border-white/60 border-t-4 border-t-cyber-emerald hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyber-emerald/10 flex items-center justify-center text-cyber-emerald shadow-sm">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Approved</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">{stats.approved}</div>
            </div>
          </div>
          <svg className="w-14 h-8 text-cyber-emerald/40 hidden xl:block" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M0 20 C10 18, 20 25, 30 12 C40 5, 50 18, 60 10 C70 8, 80 5, 90 2 L100 5" />
          </svg>
        </div>

        <div className="glass-panel p-5 rounded-2xl bg-white/70 shadow-light-shadow flex items-center justify-between border border-white/60 border-t-4 border-t-cyber-rose hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyber-rose/10 flex items-center justify-center text-cyber-rose shadow-sm">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Rejected</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">{stats.rejected}</div>
            </div>
          </div>
          <svg className="w-14 h-8 text-cyber-rose/40 hidden xl:block" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M0 5 C10 8, 20 12, 30 5 C40 2, 50 25, 60 15 C70 20, 80 28, 90 28 L100 25" />
          </svg>
        </div>

        <div className="glass-panel p-5 rounded-2xl bg-white/70 shadow-light-shadow flex items-center justify-between border border-white/60 border-t-4 border-t-cyber-amber hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyber-amber/10 flex items-center justify-center text-cyber-amber shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Flagged / Queue</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">{stats.flagged}</div>
            </div>
          </div>
          <svg className="w-14 h-8 text-cyber-amber/40 hidden xl:block" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M0 15 C10 15, 20 10, 30 25 C40 25, 50 12, 60 18 C70 15, 80 10, 90 15 L100 10" />
          </svg>
        </div>
      </div>

      {/* Graphical charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow h-[360px] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-1">Upload & Audit Trends</h3>
            <p className="text-[10px] text-slate-400 font-bold">Pipeline progression metrics for the past 7 days</p>
          </div>
          
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRejects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: "10px", fontWeight: "bold" }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: "10px", fontWeight: "bold" }} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", fontSize: "11px", color: "#000" }} />
                <Area type="monotone" dataKey="uploads" name="Total Ingests" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorUploads)" />
                <Area type="monotone" dataKey="rejected" name="Rejections" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRejects)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Type Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow h-[360px] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-1">Payload Format Distribution</h3>
            <p className="text-[10px] text-slate-400 font-bold">Breakdown of uploaded file types</p>
          </div>

          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Text", count: stats.types.text, fill: "#0ea5e9" },
                  { name: "Image", count: stats.types.image, fill: "#8b5cf6" },
                  { name: "Video", count: stats.types.video, fill: "#3b82f6" }
                ]}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: "10px", fontWeight: "bold" }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: "10px", fontWeight: "bold" }} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", fontSize: "11px", color: "#000" }} />
                <Bar dataKey="count" name="Count" radius={[8, 8, 0, 0]}>
                  {
                    [
                      { fill: "#0ea5e9" },
                      { fill: "#8b5cf6" },
                      { fill: "#3b82f6" }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pie Decision Distribution Chart */}
        <div className="glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow h-[300px] flex flex-col items-center justify-between">
          <div className="w-full text-left">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-1">Decision Spread</h3>
          </div>

          {pieData.length === 0 ? (
            <div className="text-slate-400 text-xs font-semibold my-auto">No decision records yet.</div>
          ) : (
            <div className="flex-1 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: "10px" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Stats</span>
                <span className="text-xl font-black text-slate-950">{stats.total}</span>
              </div>
            </div>
          )}
        </div>

        {/* Audit Log History Panel */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-white/70 shadow-light-shadow h-[300px] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-1">Recent Review Actions</h3>
              <p className="text-[10px] text-slate-400 font-bold">History logging of manual auditor actions</p>
            </div>
            <button onClick={fetchStats} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            <AuditHistoryPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Auditor history logger loader helper
const AuditHistoryPanel: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await reviewAPI.getLogs();
        setLogs(data.logs);
      } catch (err) {
        console.error("Audit history log fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <div className="text-center py-8 text-slate-400 text-xs font-semibold">Loading audit history...</div>;
  if (logs.length === 0) return <div className="text-center py-8 text-slate-400 text-xs font-semibold">No manual reviews committed yet.</div>;

  return (
    <div className="space-y-3 text-xs">
      {logs.map((log) => (
        <div key={log._id} className="p-3 bg-white border border-slate-200/60 rounded-xl flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-1.5 py-0.5 border rounded text-[9px] font-extrabold uppercase ${
                log.actionTaken === "APPROVE" ? "bg-green-50 border-green-200 text-cyber-emerald" : "bg-red-50 border-red-200 text-cyber-rose"
              }`}>
                {log.actionTaken}
              </span>
              {log.actionTaken === "REJECT" && (
                <span className="text-[9px] text-cyber-amber bg-yellow-50 px-1.5 py-0.5 border border-yellow-200 rounded uppercase font-bold">
                  {log.reasonCode}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 font-mono font-medium">Audited content ID: <code>{log.contentId?._id?.substring(12) || "deleted"}</code></p>
            {log.notes && <p className="text-[10px] text-slate-600 font-medium italic mt-1">"{log.notes}"</p>}
          </div>
          <span className="text-[10px] text-slate-400 font-mono font-bold">
            By: {log.moderatorId?.name || "Mod"}
          </span>
        </div>
      ))}
    </div>
  );
};


// ==========================================
// MAIN APP COMPONENT & SIDEBAR ROUTING
// ==========================================
const AppContent: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("ingest");
  const [authPage, setAuthPage] = useState<string>("login");

  if (!user) {
    if (authPage === "register") {
      return <RegisterView setPage={setAuthPage} />;
    }
    return <LoginView setPage={setAuthPage} />;
  }

  const navigationItems = [
    { id: "ingest", label: "Ingestion Console", icon: UploadCloud, roles: ["user", "moderator", "admin"] },
    { id: "history", label: "Upload History", icon: History, roles: ["user", "moderator", "admin"] },
    { id: "moderator", label: "Auditor Queue", icon: Shield, roles: ["moderator", "admin"] },
    { id: "analytics", label: "Telemetry stats", icon: Activity, roles: ["moderator", "admin"] },
    { id: "rules", label: "Policy Config", icon: Sliders, roles: ["admin"] }
  ];

  const visibleNavs = navigationItems.filter(nav => nav.roles.includes(user.role));

  return (
    <div className="relative flex min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Background drifting glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyber-cyan/8 blur-[130px] animate-float-1 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyber-purple/8 blur-[130px] animate-float-2 pointer-events-none"></div>
      
      {/* Mesh grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>

      {/* Sidebar navigation */}
      <aside className="relative z-10 w-64 border-r border-slate-200/60 bg-white/75 backdrop-blur-xl p-6 flex flex-col justify-between sticky top-0 h-screen shadow-[5px_0_30px_rgba(0,0,0,0.015)]">
        <div className="space-y-8">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-cyber-cyan/25 blur animate-pulse"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-cyber-cyan to-cyber-blue rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:rotate-6">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-cyber-blue to-cyber-cyan bg-clip-text text-transparent">SafeNet</span>
              <span className="block text-[8px] uppercase tracking-widest text-slate-400 font-extrabold mt-0.5">Control Panel</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {visibleNavs.map((nav) => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveTab(nav.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border relative overflow-hidden group ${
                    activeTab === nav.id
                      ? "bg-gradient-to-r from-cyber-cyan/10 to-cyber-blue/5 border-cyber-cyan/25 text-cyber-cyan shadow-[0_4px_12px_rgba(14,165,233,0.05)]"
                      : "text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {activeTab === nav.id && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-cyber-cyan rounded-r-md"></div>
                  )}
                  <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${activeTab === nav.id ? "text-cyber-cyan" : "text-slate-400 group-hover:text-slate-600"}`} />
                  {nav.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile card & Logout */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3 mb-4 bg-slate-50/50 backdrop-blur-sm p-3 border border-slate-200/60 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan shadow-sm">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
              <div className="text-[9px] uppercase tracking-widest text-cyber-cyan font-extrabold mt-0.5">{user.role}</div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-cyber-rose active:scale-[0.98] font-bold text-xs transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Console Viewport */}
      <main className="relative z-10 flex-1 p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {visibleNavs.find(n => n.id === activeTab)?.label || "Console Workspace"}
            </h1>
            <p className="text-xs text-slate-450 mt-1 font-semibold">
              Active Session: <strong className="text-cyber-cyan font-bold">{user.email}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50/50 border border-green-200/80 px-4 py-2 rounded-xl text-cyber-emerald text-[10px] font-extrabold uppercase shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-emerald"></span>
            </span>
            Moderation Core Active
          </div>
        </header>

        {activeTab === "ingest" && <IngestView />}
        {activeTab === "history" && <HistoryView />}
        {activeTab === "moderator" && <ModeratorView />}
        {activeTab === "rules" && <RulesView />}
        {activeTab === "analytics" && <AnalyticsView />}
      </main>
    </div>
  );
};

// Wrap Auth context Provider
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
