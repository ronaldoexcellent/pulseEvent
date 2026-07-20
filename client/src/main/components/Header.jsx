import { Menu } from 'lucide-react';

export default function Header({ setShowMenu }) {
    return (
        <>
            {/* Mobile View */}
            <header className="flex items-center justify-between p-2 bg-white shadow-sm z-30 fixed top-0 left-0 right-0">
                {/* <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] via-[#c13ac7] to-[#f2378f]">
                    Pulse-Event
                </div> */}
                <a href="/" className="flex items-center">
                    <img src="/pulse-event-logo.png" width={100} height={100} alt="PulseEvent Logo" className="object-contain" />
                </a>
                <button 
                    onClick={() => setShowMenu(true)} 
                    className="relative p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                >
                    {/* This container has the gradient */}
                    <div 
                        className="w-6 h-6 bg-linear-to-r from-purple-700 via-pink-600 to-pink-500"
                        style={{
                            WebkitMask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cline x1='3' y1='12' x2='21' y2='12'%3E%3C/line%3E%3Cline x1='3' y1='6' x2='21' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='18' x2='21' y2='18'%3E%3C/line%3E%3C/svg%3E") no-repeat center / contain`,
                            mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cline x1='3' y1='12' x2='21' y2='12'%3E%3C/line%3E%3Cline x1='3' y1='6' x2='21' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='18' x2='21' y2='18'%3E%3C/line%3E%3C/svg%3E") no-repeat center / contain`
                        }}
                    />
                </button>
            </header>
        </>
    );
}