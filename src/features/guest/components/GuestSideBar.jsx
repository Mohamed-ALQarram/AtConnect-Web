import React from 'react';
import Logo from '/AtConnect-Logo.png';
import { Home, MessageSquare, Bell, User, Settings, LogIn, UserPlus, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GuestSideBar = ({ slim = false, hiddenOnMobile = false }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex bg-main ${slim ? 'w-[80px] min-w-[80px]' : 'w-[20%] min-w-64'} h-screen border-r border-dark py-4 flex-col items-center text-main relative`}>
        {/* Logo Section */}
        <div className={`flex gap-3 items-center w-full mb-6 ${slim ? 'justify-center' : 'px-4'}`}>
          <img className="w-10 md:w-14 rounded-full" src={Logo} alt="@connect-logo" />
          {!slim && (
            <div className="text-nowrap text-main">
              <h3 className="font-bold text-lg">AtConnect</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold border border-primary/20">
                Guest Mode
              </span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="w-full">
          <ul className={`list-none flex flex-col gap-1 ${slim ? 'px-2' : 'px-4'}`}>
            <li 
              onClick={() => navigate('/guest')} 
              className="p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 transition-colors cursor-pointer bg-primary/10 text-primary font-bold"
            >
              <Home size={20} /> {!slim && <span>Browse Members</span>}
            </li>
            
            {/* Restricted links with subtle lock indicator */}
            <li 
              onClick={() => navigate('/login')} 
              title="Log in to access Messages"
              className="p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 text-muted hover:text-main hover:bg-surface transition-colors cursor-pointer opacity-70"
            >
              <MessageSquare size={20} /> {!slim && <span className="flex-1">Messages</span>}
            </li>
            <li 
              onClick={() => navigate('/login')} 
              title="Log in to access Notifications"
              className="p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 text-muted hover:text-main hover:bg-surface transition-colors cursor-pointer opacity-70"
            >
              <Bell size={20} /> {!slim && <span className="flex-1">Notifications</span>}
            </li>
            <li 
              onClick={() => navigate('/login')} 
              title="Log in to access Profile"
              className="p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 text-muted hover:text-main hover:bg-surface transition-colors cursor-pointer opacity-70"
            >
              <User size={20} /> {!slim && <span className="flex-1">Profile</span>}
            </li>
          </ul>
        </div>

        {/* Guest Banner & Auth Buttons at Bottom */}
        <div className="w-full absolute bottom-4 left-0">
          {!slim && (
            <div className="px-4 mb-4">
              <div className="bg-card p-3 rounded-2xl border border-dark text-xs flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-primary font-semibold">
                  <ShieldAlert size={14} />
                  <span>Viewing as Guest</span>
                </div>
                <p className="text-muted text-[11px] leading-tight">
                  Sign in to connect, send requests, and chat with members.
                </p>
              </div>
            </div>
          )}

          <ul className={`list-none flex flex-col gap-2 ${slim ? 'px-2' : 'px-4'}`}>
            <li 
              onClick={() => navigate('/login')} 
              className="p-3.5 rounded-24 flex items-center justify-center lg:justify-start gap-3 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors cursor-pointer shadow-md"
            >
              <LogIn size={20} /> {!slim && <span>Log In</span>}
            </li>
            <li 
              onClick={() => navigate('/register')} 
              className="p-3.5 rounded-24 flex items-center justify-center lg:justify-start gap-3 bg-surface hover:bg-opacity-80 text-main font-semibold border border-dark transition-colors cursor-pointer"
            >
              <UserPlus size={20} /> {!slim && <span>Sign Up</span>}
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Bottom Navigation for Guest */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 h-16 bg-main border-t border-dark flex justify-around items-center z-[100] ${hiddenOnMobile ? 'hidden' : 'flex'}`}>
        <button onClick={() => navigate('/guest')} className="p-2 rounded-full flex items-center justify-center text-primary">
          <Home size={24} />
        </button>
        <button onClick={() => navigate('/login')} className="p-2 rounded-full flex items-center justify-center text-muted hover:text-main">
          <LogIn size={24} />
        </button>
        <button onClick={() => navigate('/register')} className="p-2 rounded-full flex items-center justify-center text-muted hover:text-main">
          <UserPlus size={24} />
        </button>
      </div>
    </>
  );
};
