'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 sticky top-0 z-50 bg-black/80 backdrop-blur-md animate-fade-in-down">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 via-blue-500 to-green-400 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <svg className="w-5 h-5 text-black relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              <path d="M8 8h2v2H8V8zM14 8h2v2h-2V8zM10 10h4v1h-4V10z" fill="rgba(255,255,255,0.8)"/>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-green-400/30 rounded-xl blur-sm"></div>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-sm"></div>
        </div>
        <a href="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent hover:opacity-80 transition">ForensIQ</a>
      </div>
      
      {user ? (
        <>
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            <li><a href="/dashboard" className="hover:text-cyan-400 transition">Dashboard</a></li>
            <li><a href="/practice" className="hover:text-cyan-400 transition">Practice</a></li>
            <li><a href="/debate" className="hover:text-cyan-400 transition">Debate</a></li>
            <li><a href="/analytics" className="hover:text-cyan-400 transition">Analytics</a></li>
            <li><a href="/profile" className="hover:text-cyan-400 transition">Profile</a></li>
          </ul>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden md:block">
              Welcome, {(() => {
                const fullName = user.user_metadata?.full_name;
                if (fullName) {
                  return fullName.split(' ').map((name: string) => 
                    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
                  ).join(' ');
                }
                const emailName = user.email?.split('@')[0];
                if (emailName) {
                  return emailName.charAt(0).toUpperCase() + emailName.slice(1).toLowerCase();
                }
                return 'User';
              })()}
            </span>
            <button
              onClick={handleSignOut}
              className="border border-white/30 text-white font-bold px-5 py-2 rounded-full hover:bg-white/10 transition"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <a href="/signup" className="group bg-gradient-to-r from-cyan-600 to-green-600 text-black font-bold px-5 py-2 rounded-full shadow hover:scale-105 transition overflow-hidden relative">
            <span className="relative z-10">Get Started</span>
            <span className="shimmer absolute inset-0"></span>
          </a>
          <a href="/signin" className="border border-white/30 text-white font-bold px-5 py-2 rounded-full hover:bg-white/10 transition">Sign In</a>
        </div>
      )}
    </nav>
  );
} 