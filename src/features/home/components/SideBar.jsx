import Logo from '../../../assets/AtConnect-Logo.png'
import { Home, MessageSquare, Bell, User, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../auth/stores/useAuthStore';

const SideBar = ({ slim = false, hiddenOnMobile = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const clearCredentials = useAuthStore(state => state.clearCredentials);

    return (
        <>
        {/* Desktop Sidebar */}
        <div className={`hidden md:flex bg-main ${slim ? 'w-[80px] min-w-[80px]' : 'w-[20%] min-w-64'} h-screen border-r border-dark py-4 flex-col items-center text-main relative`} >
            <div className={`flex gap-3 items-center w-full mb-8 ${slim ? 'justify-center' : 'px-4'}`}>
                <img className="w-10 md:w-14 rounded-full" src={Logo} alt="@connect-logo" />
                {!slim && (
                    <div className='text-nowrap text-main'>
                        <h3 className='font-bold text-lg'>AtConnect</h3>
                        <p className='text-muted text-sm'>Connect with ease</p>
                    </div>
                )}
            </div>
            <div className='w-full'>
                <ul className={`list-none flex flex-col gap-1 ${slim ? 'px-2' : 'px-4'}`}>
                    <li onClick={() => navigate('/')} className={`p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 transition-colors cursor-pointer ${location.pathname === '/' ? 'bg-primary/10 text-primary font-bold' : 'text-muted hover:text-main hover:bg-surface'}`}>
                        <Home size={20} /> {!slim && <span>Home</span>}
                    </li>
                    <li onClick={() => navigate('/messages')} className={`p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 transition-colors cursor-pointer ${location.pathname.startsWith('/messages') ? 'bg-primary/10 text-primary font-bold' : 'text-muted hover:text-main hover:bg-surface'}`}>
                        <MessageSquare size={20} /> {!slim && <span>Messages</span>}
                    </li>
                    <li className='p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 text-muted hover:text-main hover:bg-surface transition-colors cursor-pointer'>
                        <Bell size={20} /> {!slim && <span>Notifications</span>}
                    </li>
                    <li className='p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 text-muted hover:text-main hover:bg-surface transition-colors cursor-pointer'>
                        <User size={20} /> {!slim && <span>Profile</span>}
                    </li>
                </ul>
            </div>
            <div className='w-full absolute bottom-4 left-0' >
                <ul className={`list-none flex flex-col gap-1 ${slim ? 'px-2' : 'px-6'}`}>
                    <li className='p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 text-muted hover:text-main hover:bg-surface transition-colors cursor-pointer'>
                        <Settings size={20} /> {!slim && <span>Settings</span>}
                    </li>
                    <li onClick={() => { clearCredentials(); navigate('/login'); }} className='p-4 rounded-24 flex items-center justify-center lg:justify-start gap-3 text-danger hover:bg-danger/10 transition-colors cursor-pointer'>
                        <LogOut size={20} /> {!slim && <span>Logout</span>}
                    </li>
                </ul>
            </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className={`md:hidden fixed bottom-0 left-0 right-0 h-16 bg-main border-t border-dark flex justify-around items-center z-[100] ${hiddenOnMobile ? 'hidden' : 'flex'}`}>
            <button onClick={() => navigate('/')} className={`p-2 rounded-full flex items-center justify-center transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-muted hover:text-main'}`}>
                <Home size={24} />
            </button>
            <button onClick={() => navigate('/messages')} className={`p-2 rounded-full flex items-center justify-center transition-colors ${location.pathname.startsWith('/messages') ? 'text-primary' : 'text-muted hover:text-main'}`}>
                <MessageSquare size={24} />
            </button>
            <button className='p-2 rounded-full flex items-center justify-center text-muted hover:text-main transition-colors'>
                <Bell size={24} />
            </button>
            <button className='p-2 rounded-full flex items-center justify-center text-muted hover:text-main transition-colors'>
                <User size={24} />
            </button>
            <button onClick={() => { clearCredentials(); navigate('/login'); }} className='p-2 rounded-full flex items-center justify-center text-danger hover:text-red-400 transition-colors'>
                <LogOut size={24} />
            </button>
        </div>
        </>
    )
}

export default SideBar;