import { useState, useEffect, FormEvent } from 'react';
import { X, Calendar, CheckSquare, Sparkles, Building, Loader2, User, Mail, MessageSquare, ListFilter } from 'lucide-react';
import { DemoBooking } from '../types';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Manufacturing');
  const [employeeCount, setEmployeeCount] = useState('100-500');
  const [message, setMessage] = useState('');
  
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load existing bookings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('aethera_demos');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        setBookings([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !email.trim() || !companyName.trim()) return;

    setIsSubmitting(true);

    // Simulate enterprise booking dispatch
    setTimeout(() => {
      const newBooking: DemoBooking = {
        id: `dem-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName,
        email,
        companyName,
        industry,
        employeeCount,
        message,
        bookedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Expert Assigned'
      };

      const updated = [newBooking, ...bookings];
      setBookings(updated);
      localStorage.setItem('aethera_demos', JSON.stringify(updated));

      // Reset form
      setClientName('');
      setEmail('');
      setCompanyName('');
      setMessage('');
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto-clear success check banner after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    }, 1000);
  };

  const deleteBooking = (id: string) => {
    const filtered = bookings.filter(b => b.id !== id);
    setBookings(filtered);
    localStorage.setItem('aethera_demos', JSON.stringify(filtered));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <div className="relative bg-white border border-neutral-200 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col">
        
        {/* Head branding header layout */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center space-x-3 text-emerald-705">
            <Calendar className="w-5 h-5 text-emerald-650" />
            <div>
              <h3 className="font-display font-bold text-sm text-neutral-800 uppercase tracking-wider">Book Sustainability Briefing</h3>
              <p className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">Connect with an Aethera Solution Expert</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-neutral-450 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body scroll container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {isSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex items-center justify-between text-xs text-emerald-800">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-emerald-650" />
                <span>Briefing locked. A regional sustainability infrastructure specialist has been assigned to your booking.</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left side: Booking Form (7 cols on Desktop) */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
              
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold flex items-center">
                  <User className="w-3 h-3 mr-1.5 text-emerald-600" /> Full Name
                </label>
                <input
                  required
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Amanda Vance"
                  className="w-full bg-white border border-neutral-250 rounded px-3 py-2 text-xs font-mono text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold flex items-center">
                  <Mail className="w-3 h-3 mr-1.5 text-emerald-600" /> Corporate Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amanda@enterprise.com"
                  className="w-full bg-white border border-neutral-250 rounded px-3 py-2 text-xs font-mono text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold flex items-center">
                    <Building className="w-3 h-3 mr-1.5 text-emerald-600" /> Company Name
                  </label>
                  <input
                    required
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Corp"
                    className="w-full bg-white border border-neutral-250 rounded px-3 py-2 text-xs font-mono text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold flex items-center">
                    <ListFilter className="w-3 h-3 mr-1.5 text-emerald-600" /> Industry Vertical
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-white border border-neutral-250 rounded px-2.5 py-2 text-xs font-mono text-neutral-700 focus:outline-none focus:border-neutral-400"
                  >
                    <option>Manufacturing</option>
                    <option>Sovereign Utilities</option>
                    <option>Commercial Real Estate</option>
                    <option>Hyper-scale Data Centers</option>
                    <option>Government Sector</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold flex items-center">
                  <MessageSquare className="w-3 h-3 mr-1.5 text-emerald-600" /> BRIEFING OBJECTIVES (OPTIONAL)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Identify your compliance timeline goals (SGX, TCFD, CSRD) or integration requirements (SAP data sync)..."
                  rows={2}
                  className="w-full bg-white border border-neutral-250 rounded px-3 py-2 text-xs font-mono text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-750 disabled:bg-neutral-200 disabled:opacity-55 transition-all duration-200 text-white text-xs font-mono font-bold uppercase rounded cursor-pointer max-w-full flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Allocating expert resource...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Live Briefing</span>
                  </>
                )}
              </button>

            </form>

            {/* Right side: Explanation and Bookings listing info (5 cols) */}
            <div className="md:col-span-5 bg-neutral-50 border border-neutral-200 rounded-lg p-4 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-xs text-neutral-800 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-650 mr-1.5" />
                  Your Session Agenda
                </h4>
                <p className="text-[11px] text-neutral-600 leading-normal font-sans font-light">
                  During this live 30-minute platform review:
                </p>
                <div className="space-y-2 text-[10.5px] text-neutral-600 list-decimal pl-1">
                  <div>1. Demo deep-lying data integrations for your specific ERP ledger structures.</div>
                  <div>2. Map out a localized carbon factor workbook covering Scope 1 & 2 assets.</div>
                  <div>3. Practice sending a simulated Scope 3 survey to upstream suppliers.</div>
                </div>
              </div>

              {/* Bookings persisted inside local storage list */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <span className="font-mono text-[8px] text-neutral-500 font-bold uppercase block tracking-wider">
                  ACTIVE BOOKINGS STORED LIST ({bookings.length})
                </span>

                {bookings.length === 0 ? (
                  <div className="text-[10px] text-neutral-500 font-mono italic p-3 text-center border border-dashed border-neutral-250 rounded bg-white">
                    No briefings locked in yet.
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1 font-mono text-[10px]">
                    {bookings.map(b => (
                      <div key={b.id} className="bg-white border border-neutral-200 p-2.5 rounded flex items-center justify-between shadow-xs">
                        <div className="space-y-0.5 truncate max-w-[70%]">
                          <p className="font-display font-bold text-neutral-800 truncate">{b.companyName}</p>
                          <p className="font-mono text-[8px] text-neutral-500 truncate">{b.bookedAt}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[8px] font-mono text-emerald-800 font-bold bg-emerald-50 border border-emerald-150 px-1 rounded uppercase mb-1">
                            {b.status}
                          </span>
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="font-mono text-[8px] text-rose-600 hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
