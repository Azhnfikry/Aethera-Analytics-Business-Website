import { useState, FormEvent, useMemo } from 'react';
import { 
  Plus, Upload, TrendingUp, Layers, BarChart3, MessageSquare, List, FileText, 
  Trash2, Send, Leaf, Bolt, Check, UploadCloud, AlertCircle, Building, User, 
  FileSpreadsheet, Download, RefreshCw, Sun, Moon, LogOut, Info, HelpCircle
} from 'lucide-react';
import AetheraLogo from './AetheraLogo';

interface EmissionEntry {
  id: string;
  scope: 1 | 2 | 3;
  category: 'Electricity' | 'Stationary Combustion' | 'Livestock' | 'Mobile Combustion' | 'Other';
  value: number; // in t CO2e
  date: string;
  notes: string;
}

interface DashboardProps {
  onOpenDemo: () => void;
}

export default function Dashboard({ onOpenDemo }: DashboardProps) {
  // Navigation states matching the exact sidebar in the screenshot
  const [activeTab, setActiveTab] = useState<
    'basic' | 'overview' | 'add_entry' | 'upload' | 'outlook' | 'factors' | 'analytics' | 'ai' | 'entries' | 'reports'
  >('overview');

  // Dark Mode toggle local to prototype
  const [isProtoDarkMode, setIsProtoDarkMode] = useState<boolean>(false);

  // Editable Profile/Basic info states
  const [companyName, setCompanyName] = useState<string>('A-Group');
  const [leadName, setLeadName] = useState<string>('Mr A');

  // Initialize data with the EXACT states seen in the customer prototype screenshot
  const [entries, setEntries] = useState<EmissionEntry[]>([
    {
      id: '1',
      scope: 2,
      category: 'Electricity',
      value: 969066.17,
      date: '2026-05-18',
      notes: 'Main Grid Purchase for Singapore Semiconductor Fab'
    },
    {
      id: '2',
      scope: 1,
      category: 'Stationary Combustion',
      value: 75.70,
      date: '2026-05-20',
      notes: 'Facility Backup Genset Fuel'
    },
    {
      id: '3',
      scope: 1,
      category: 'Livestock',
      value: 7.33,
      date: '2026-05-22',
      notes: 'Subsidiary Agricultural Account'
    },
    {
      id: '4',
      scope: 1,
      category: 'Mobile Combustion',
      value: 0.23015, // 230.15 kg displayed appropriately
      date: '2026-05-24',
      notes: 'Logistic Van Fleet Fuel'
    }
  ]);

  // Bulk upload states
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'parsing' | 'completed'>('idle');
  const [parsedValue, setParsedValue] = useState<number | null>(null);

  // New entry form state
  const [newScope, setNewScope] = useState<1 | 2 | 3>(1);
  const [newCategory, setNewCategory] = useState<EmissionEntry['category']>('Electricity');
  const [newValue, setNewValue] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');

  // AI chat state (restoring previous valuable AI neural analysis functions inside the design!)
  const [aiInput, setAiInput] = useState<string>('');
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'system'; text: string; time: string }[]>([
    {
      sender: 'system',
      text: 'Aethera AI Assistant connected on active emissions data ledger. Ready to draft regulatory responses, explain factors, or write decarbonization plans.',
      time: '14:20'
    }
  ]);

  // Dynamic calculations based on state list of emission entries
  const sums = useMemo(() => {
    let scope1 = 0;
    let scope2 = 0;
    let scope3 = 0;

    entries.forEach(item => {
      if (item.scope === 1) scope1 += item.value;
      else if (item.scope === 2) scope2 += item.value;
      else if (item.scope === 3) scope3 += item.value;
    });

    const total = scope1 + scope2 + scope3;

    return {
      scope1,
      scope2,
      scope3,
      total
    };
  }, [entries]);

  // Dynamic ranking of top categories based on current active entries
  const categorySummary = useMemo(() => {
    const map: Record<EmissionEntry['category'], number> = {
      'Electricity': 0,
      'Stationary Combustion': 0,
      'Livestock': 0,
      'Mobile Combustion': 0,
      'Other': 0
    };

    entries.forEach(item => {
      map[item.category] = (map[item.category] || 0) + item.value;
    });

    return Object.entries(map)
      .map(([name, val]) => ({
        name: name as EmissionEntry['category'],
        value: val,
        percentage: sums.total > 0 ? (val / sums.total) * 100 : 0
      }))
      .sort((a, b) => b.value - a.value);
  }, [entries, sums.total]);

  // Handle adding an entry manually
  const handleSubmitEntry = (e: FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newValue);
    if (isNaN(val) || val <= 0) return;

    const newRecord: EmissionEntry = {
      id: Math.random().toString(36).substr(2, 9),
      scope: newScope,
      category: newCategory,
      value: val,
      date: new Date().toISOString().split('T')[0],
      notes: newNotes || 'Added in visual sandbox'
    };

    setEntries(prev => [...prev, newRecord]);
    setNewValue('');
    setNewNotes('');
    setActiveTab('overview');
    showActionToast(`Added ${val} t CO2e to ${newCategory} (Scope ${newScope})`);
  };

  // Simulating Bulk upload file scanner
  const handleSimulateUpload = () => {
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('parsing');
      setTimeout(() => {
        // Mock a parsed value
        const randomParsed = parseFloat((Math.random() * 2500 + 100).toFixed(2));
        setParsedValue(randomParsed);
        const autoRecord: EmissionEntry = {
          id: Math.random().toString(36).substr(2, 9),
          scope: 2,
          category: 'Electricity',
          value: randomParsed,
          date: new Date().toISOString().split('T')[0],
          notes: 'OCR Smart-Meter invoice auto-import'
        };
        setEntries(prev => [...prev, autoRecord]);
        setUploadState('completed');
        showActionToast(`Document parsed! Automatically logged +${randomParsed} t CO2e under Scope 2 Electricity.`);
      }, 1000);
    }, 800);
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showActionToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // AI assistant responses co-pilot
  const handleSendAiMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || isAiTyping) return;

    const userText = aiInput;
    setAiInput('');
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userText, time: timeNow }]);
    setIsAiTyping(true);

    setTimeout(() => {
      let responseText = '';
      const promptLower = userText.toLowerCase();

      if (promptLower.includes('how to reduce') || promptLower.includes('reduction') || promptLower.includes('electricity')) {
        responseText = `AETHERA CO-PILOT ANALYSIS:\n\nLooking at your active profile, Scope 2 Electric Grid accounts make up ${((sums.scope2 / sums.total) * 100).toFixed(1)}% of your organizational footprint. \n\nWe recommend 3 immediate actionable initiatives:\n1. Transition Singapore Facility-1 to purchase absolute green retail tariffs with verifiable REC (Renewable Energy Certificates).\n2. Implement smart utility sub-meters to track peak loading idle loss.\n3. Integrate automated on-demand load adjustments during Singapore off-peak tariffs.`;
      } else if (promptLower.includes('scope 1') || promptLower.includes('generator') || promptLower.includes('diesel')) {
        responseText = `AETHERA CO-PILOT ANALYSIS:\n\nYour Scope 1 direct emissions are currently logged at ${sums.scope1.toFixed(2)} t CO2e.\nThe biggest stationary contributor is ${newCategory} at ${sums.scope1.toFixed(2)} t CO2e. Upgrading to high-efficiency diesel units or scheduling smart-microgrid peak energy shaving can shave up to 12% off standby combustion leakage.`;
      } else if (promptLower.includes('export') || promptLower.includes('pdf') || promptLower.includes('report')) {
        responseText = `Generating audit-sealed reporting document in preparation...\n\nYour formatted output with ${entries.length} data rows has been calculated against emission coefficients. Click the "Export" button in the upper right to download the finalized compliance spreadsheet.`;
      } else {
        responseText = `Aethera processed query: "${userText}"\nCurrently scanning registered emission factor databases. For targeted integrations with live SAP ledgers, Honeywell sub-meters, and official MAS SGX disclosures, you can trigger a live simulation in this workspace or book a full compliance review session below.`;
      }

      setMessages(prev => [...prev, { sender: 'system', text: responseText, time: timeNow }]);
      setIsAiTyping(false);
    }, 1100);
  };

  return (
    <div id="platform" className={`relative border border-neutral-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 font-sans ${isProtoDarkMode ? 'bg-[#0f1115] text-neutral-100 border-neutral-800' : 'bg-[#f4f6f8] text-neutral-800'}`}>
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-emerald-600 text-white font-mono text-xs px-4 py-3 rounded-lg shadow-xl flex items-center space-x-2 animate-bounce border border-emerald-500">
          <Check className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-[620px]">
        
        {/* ————————————————— SIDEBAR ————————————————— */}
        <aside className={`w-full lg:w-64 flex flex-col justify-between p-4 flex-shrink-0 border-b lg:border-b-0 lg:border-r transition-colors ${isProtoDarkMode ? 'bg-[#14181f] border-neutral-800' : 'bg-white border-neutral-200'}`}>
          <div className="space-y-6">
            
            {/* Logo header customized to exact layout */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center space-x-1">
                <AetheraLogo size="sm" />
              </div>
              <span className="font-mono text-[9px] font-bold text-[#568254] px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 rounded uppercase tracking-wider">
                Proto
              </span>
            </div>

            {/* Menu options list */}
            <nav className="space-y-1">
              <div className="text-[10px] uppercase tracking-wider font-mono text-neutral-400 mb-2 px-2 select-none">
                Carbon Tracker
              </div>
              
              <button
                onClick={() => showActionToast('This compliance dashboard is locked to the static Overview view in this prototype.')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'basic'
                    ? 'bg-emerald-600 text-white'
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>Basic Informations</span>
              </button>

              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'overview'
                    ? 'bg-[#0bb244] text-white' // Matches screenshot green overlay active
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => showActionToast('This compliance dashboard is locked to the static Overview view in this prototype.')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'add_entry'
                    ? 'bg-[#0bb244] text-white'
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Entry</span>
              </button>

              <button
                onClick={() => showActionToast('This compliance dashboard is locked to the static Overview view in this prototype.')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'upload'
                    ? 'bg-[#0bb244] text-white'
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Bulk Upload</span>
              </button>

              <button
                onClick={() => showActionToast('This compliance dashboard is locked to the static Overview view in this prototype.')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'outlook'
                    ? 'bg-[#0bb244] text-white'
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Emissions Outlook</span>
              </button>

              <button
                onClick={() => showActionToast('This compliance dashboard is locked to the static Overview view in this prototype.')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'factors'
                    ? 'bg-[#0bb244] text-white'
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Emission Factors</span>
              </button>

              <button
                onClick={() => showActionToast('This compliance dashboard is locked to the static Overview view in this prototype.')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-[#0bb244] text-white'
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => showActionToast('This compliance dashboard is locked to the static Overview view in this prototype.')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'ai'
                    ? 'bg-[#0bb244] text-white'
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>AI Assistant</span>
              </button>

              <button
                onClick={() => showActionToast('This compliance dashboard is locked to the static Overview view in this prototype.')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'entries'
                    ? 'bg-[#0bb244] text-white'
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <List className="w-4 h-4" />
                <span>All Entries</span>
                <span className="ml-auto font-mono text-[9px] bg-neutral-100 text-neutral-650 dark:bg-neutral-800 dark:text-neutral-400 px-1.5 py-0.5 rounded font-bold">
                  {entries.length}
                </span>
              </button>

              <button
                onClick={() => showActionToast('This compliance dashboard is locked to the static Overview view in this prototype.')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'reports'
                    ? 'bg-[#0bb244] text-white'
                    : isProtoDarkMode ? 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </button>
            </nav>
          </div>

          {/* Footer Controls matching Sidebar */}
          <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            
            {/* Unique Interactive Dark Mode button toggler in the prototype */}
            <button
              onClick={() => setIsProtoDarkMode(!isProtoDarkMode)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all border ${
                isProtoDarkMode 
                  ? 'bg-neutral-800 text-yellow-400 border-neutral-700 hover:bg-neutral-700/80' 
                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              {isProtoDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span>Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-neutral-500" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {/* Logout mockup red button */}
            <button
              onClick={() => showActionToast('Simulation Logout triggered. Click "Book Demo" for user credentials systems.')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide bg-rose-50 hover:bg-rose-100 text-rose-700 transition-all dark:bg-rose-950/20 dark:hover:bg-rose-900/30 dark:text-rose-400"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ————————————————— MAIN DISCLOSURE CORE ————————————————— */}
        <main className={`flex-grow p-4 sm:p-5 lg:p-7 flex flex-col justify-between transition-colors ${isProtoDarkMode ? 'bg-[#0a0c0e]' : 'bg-[#f7fafc]'}`}>
          <div className="space-y-6">
            
            {/* TOP BAR BRAND CRUMB */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-neutral-200/60 dark:border-neutral-805">
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-800 dark:text-white">
                  Carbon Accounting
                </h2>
                <div className="flex flex-wrap items-center gap-3.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center space-x-1.5 font-medium">
                    <Building className="w-3.5 h-3.5 text-[#568254]" />
                    <span className="font-bold underline cursor-pointer hover:text-neutral-800 dark:hover:text-white" onClick={() => {
                      const newCo = prompt("Enter custom enterprise group name:", companyName);
                      if (newCo) setCompanyName(newCo);
                    }}>
                      {companyName}
                    </span>
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isProtoDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`}></span>
                  <span className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="font-bold cursor-pointer hover:text-neutral-800 dark:hover:text-white" onClick={() => {
                      const name = prompt("Enter user operator display name:", leadName);
                      if (name) setLeadName(name);
                    }}>{leadName}</span>
                  </span>
                </div>
              </div>

              {/* Top-Right Sheets & Action triggers matching prototype exactly */}
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={() => {
                    showActionToast('Preparing CSV Data spreadsheet. Initiated direct fetch...');
                    setTimeout(() => {
                      const dataStr = "data:text/csv;charset=utf-8,Scope,Category,Value_tCO2e,Date,Notes\n" 
                        + entries.map(e => `${e.scope},${e.category},${e.value},${e.date},"${e.notes}"`).join("\n");
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", encodeURI(dataStr));
                      downloadAnchor.setAttribute("download", `${companyName.replace(/\s+/g, '_')}_carbon_ledger_export.csv`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                    }, 800);
                  }}
                  className="bg-white hover:bg-neutral-50 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700/80 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-2 text-xs font-semibold tracking-wide inline-flex items-center space-x-2 transition-all shadow-sm cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#0bb244]" />
                  <span>Sheets</span>
                </button>
                <button
                  onClick={() => {
                    showActionToast('Compiling comprehensive ESG Audit docket PDF document...');
                    setTimeout(onOpenDemo, 1200);
                  }}
                  className="bg-white hover:bg-neutral-50 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700/80 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-2 text-xs font-semibold tracking-wide inline-flex items-center space-x-2 transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* ————————————————— PANEL VIEWS DETECT ROUTER ————————————————— */}
            
            {/* 1. OVERVIEW VIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* HUGE TOTAL EMISSIONS WIDE CARD */}
                <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0bb244]"></div>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-[#568254] dark:text-emerald-400">
                        <Leaf className="w-4 h-4 fill-emerald-120 opacity-80" />
                        <span className="text-xs uppercase tracking-wider font-bold">Total GHG Emissions</span>
                      </div>
                      <span className="text-xs text-neutral-400 block font-light leading-none">
                        Carbon dioxide equivalent
                      </span>
                    </div>

                    {/* Tags top right matching customer layout */}
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 rounded-full font-bold">
                        2 scopes
                      </span>
                      <span className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 rounded-full font-bold">
                        4 categories
                      </span>
                    </div>
                  </div>

                  {/* Main Giant Total Indicator */}
                  <div className="my-5.5">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-850 dark:text-white leading-none">
                      {sums.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xl sm:text-2xl font-medium text-neutral-400">t CO2e</span>
                    </span>
                  </div>

                  {/* Inner Legends bullet breakdown */}
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono font-medium">
                    <span className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                      <span className="text-neutral-500 dark:text-neutral-400">Direct (Scope 1): </span>
                      <strong className="text-neutral-800 dark:text-white">{sums.scope1.toLocaleString(undefined, { maximumFractionDigits: 2 })} t CO2e</strong>
                    </span>
                    <span className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-neutral-500 dark:text-neutral-400">Energy (Scope 2): </span>
                      <strong className="text-neutral-800 dark:text-white">{sums.scope2.toLocaleString(undefined, { maximumFractionDigits: 2 })} t CO2e</strong>
                    </span>
                    <span className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="text-neutral-500 dark:text-neutral-400">Indirect (Scope 3): </span>
                      <strong className="text-neutral-800 dark:text-white">{sums.scope3.toLocaleString(undefined, { maximumFractionDigits: 2 })} t CO2e</strong>
                    </span>
                  </div>
                </div>

                {/* SCOPES 1, 2, 3 MATRIX (TRIPLE COLUMN GRID) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Scope 1 Panel (Blue Tint) */}
                  <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-4 relative overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-950 transition-colors shadow-xs group">
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-indigo-550"></div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-indigo-500 block uppercase font-mono">Scope 1</span>
                        <span className="text-[10px] text-neutral-400 block tracking-wide font-light">Direct Emissions</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600">
                        <Bolt className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="my-4">
                      <div className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-white">
                        {sums.scope1.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-neutral-400">t CO2e</span>
                      </div>
                      <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 mt-1 lines-clamp-2 leading-relaxed font-light">
                        Direct GHG emissions from owned or controlled sources
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-3.5 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="flex justify-between items-baseline text-[10.5px] font-mono leading-none">
                        <span className="text-neutral-450 dark:text-neutral-500">Percentage of total</span>
                        <strong className="text-neutral-700 dark:text-neutral-300 font-bold">
                          {sums.total > 0 ? ((sums.scope1 / sums.total) * 100).toFixed(1) : '0.0'}%
                        </strong>
                      </div>
                      <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-1.5 rounded-full Transition-all duration-500" 
                          style={{ width: `${sums.total > 0 ? (sums.scope1 / sums.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-3 flex items-center text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-450 space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                      <span>Active emissions source</span>
                    </div>
                  </div>

                  {/* Scope 2 Panel (Green Tint) */}
                  <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-4 relative overflow-hidden hover:border-emerald-300 dark:hover:border-emerald-950 transition-colors shadow-xs group">
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-emerald-500"></div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-emerald-600 block uppercase font-mono">Scope 2</span>
                        <span className="text-[10px] text-neutral-400 block tracking-wide font-light">Indirect Energy</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center text-emerald-600">
                        <Leaf className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="my-4">
                      <div className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-white">
                        {sums.scope2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-neutral-400">t CO2e</span>
                      </div>
                      <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 mt-1 lines-clamp-2 leading-relaxed font-light">
                        Indirect GHG emissions from purchased energy
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-3.5 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="flex justify-between items-baseline text-[10.5px] font-mono leading-none">
                        <span className="text-neutral-450 dark:text-neutral-500">Percentage of total</span>
                        <strong className="text-neutral-700 dark:text-neutral-300 font-bold animate-pulse">
                          {sums.total > 0 ? ((sums.scope2 / sums.total) * 100).toFixed(1) : '0.0'}%
                        </strong>
                      </div>
                      <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                          style={{ width: `${sums.total > 0 ? (sums.scope2 / sums.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-3 flex items-center text-[9px] font-mono font-bold uppercase tracking-wider text-[#568254] space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Active emissions source</span>
                    </div>
                  </div>

                  {/* Scope 3 Panel (Amber Tint) */}
                  <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-4 relative overflow-hidden hover:border-amber-300 dark:hover:border-amber-950 transition-colors shadow-xs group">
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-amber-500"></div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-amber-500 block uppercase font-mono">Scope 3</span>
                        <span className="text-[10px] text-neutral-400 block tracking-wide font-light">Other Indirect</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 flex items-center justify-center text-amber-600">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="my-4">
                      <div className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-white">
                        {sums.scope3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-neutral-400">t CO2e</span>
                      </div>
                      <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 mt-1 lines-clamp-2 leading-relaxed font-light">
                        All other indirect GHG emissions in value chain
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-3.5 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="flex justify-between items-baseline text-[10.5px] font-mono leading-none">
                        <span className="text-neutral-450 dark:text-neutral-500">Percentage of total</span>
                        <strong className="text-neutral-700 dark:text-neutral-300 font-bold">
                          {sums.total > 0 ? ((sums.scope3 / sums.total) * 100).toFixed(1) : '0.0'}%
                        </strong>
                      </div>
                      <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-amber-500 h-1.5 rounded-full transition-all duration-500" 
                          style={{ width: `${sums.total > 0 ? (sums.scope3 / sums.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-3 flex items-center text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400 space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600"></span>
                      <span>Awaiting Supplier Data</span>
                    </div>
                  </div>

                </div>

                {/* CATEGORY OVERVIEW SECTION */}
                <div className="space-y-3.5">
                  <div className="border-b pb-2 border-neutral-200/60 dark:border-neutral-800">
                    <h3 className="text-base font-bold text-neutral-800 dark:text-white">
                      Category Overview
                    </h3>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">
                      Top emission categories mapped under organization indices
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categorySummary.map((cat, index) => {
                      const displayValStr = cat.value >= 1 
                        ? `${cat.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} t CO2e`
                        : `${(cat.value * 1000).toFixed(2)} kg CO2e`;
                      
                      return (
                        <div 
                          key={cat.name} 
                          className={`bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-3.5 shadow-xs flex flex-col justify-between ${cat.value > 0 ? 'ring-1 ring-emerald-500/10' : ''}`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-display font-bold text-xs text-neutral-800 dark:text-neutral-200 truncate pr-2 max-w-[80%]">
                              {cat.name}
                            </span>
                            <span className="font-mono text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-1.5 py-0.5 rounded font-black">
                              #{index + 1}
                            </span>
                          </div>

                          <div className="my-3.5 space-y-0.5">
                            <span className="block text-lg font-extrabold text-neutral-800 dark:text-white">
                              {displayValStr}
                            </span>
                            <span className="block text-[10.5px] text-neutral-500 font-mono">
                              {cat.percentage.toFixed(1)}% of total
                            </span>
                          </div>

                          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1 rounded-full overflow-hidden">
                            <div 
                              className={`h-1 rounded-full ${index === 0 ? 'bg-emerald-500' : index === 1 ? 'bg-indigo-500' : 'bg-neutral-400'}`} 
                              style={{ width: `${cat.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* 2. BASIC INFORMATIONS CONFIG */}
            {activeTab === 'basic' && (
              <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 p-5 rounded-2xl space-y-4 animate-fadeIn">
                <div className="border-b pb-2 border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-base font-bold text-neutral-850 dark:text-white">Organization Parameters</h3>
                  <p className="text-xs text-neutral-450">Change basic sandbox metrics for localized dashboard simulation</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">Enterprise Group:</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full border border-neutral-250 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-2.5 text-xs focus:outline-none dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">Lead Analyst Operator:</label>
                    <input 
                      type="text" 
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full border border-neutral-250 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-2.5 text-xs focus:outline-none dark:text-white"
                    />
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
                  <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 block">SYSTEM STATUS SUMMARY:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-2 border rounded-lg bg-white dark:bg-neutral-800 dark:border-neutral-750">
                      <span className="text-[9px] text-neutral-450 block">STATUS</span>
                      <strong className="text-emerald-600 font-bold font-mono">ACTIVE LEDGER</strong>
                    </div>
                    <div className="p-2 border rounded-lg bg-white dark:bg-neutral-800 dark:border-neutral-750">
                      <span className="text-[9px] text-neutral-450 block">COEFFICIENT RULEBOOK</span>
                      <strong className="text-neutral-800 dark:text-neutral-200 font-bold">GHG PROTOCOL 2026</strong>
                    </div>
                    <div className="p-2 border rounded-lg bg-white dark:bg-neutral-800 dark:border-neutral-750">
                      <span className="text-[9px] text-neutral-450 block">AUDIT COEFFICIENTS</span>
                      <strong className="text-indigo-600 font-bold">100% SECURE</strong>
                    </div>
                    <div className="p-2 border rounded-lg bg-white dark:bg-neutral-800 dark:border-neutral-750">
                      <span className="text-[9px] text-neutral-450 block">COUNTRY BASING</span>
                      <strong className="text-neutral-800 dark:text-neutral-200 font-bold">SINGAPORE / ASEAN</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ADD ENTRY VIEW */}
            {activeTab === 'add_entry' && (
              <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 p-5 rounded-2xl max-w-xl mx-auto shadow-sm animate-fadeIn space-y-4">
                <div className="border-b pb-2.5 border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-base font-bold text-neutral-850 dark:text-white">Add Carbon Emission Record</h3>
                  <p className="text-xs text-neutral-500">Log custom activities to dynamically calibrate the live totals</p>
                </div>

                <form onSubmit={handleSubmitEntry} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 block">Emissions Scope</label>
                      <select 
                        value={newScope}
                        onChange={(e) => {
                          const sc = Number(e.target.value) as 1 | 2 | 3;
                          setNewScope(sc);
                          if (sc === 2) setNewCategory('Electricity');
                        }}
                        className="w-full border border-neutral-250 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-emerald-550 dark:text-white focus:outline-none"
                      >
                        <option value={1}>Scope 1 (Direct Emissions)</option>
                        <option value={2}>Scope 2 (Indirect Grid)</option>
                        <option value={3}>Scope 3 (Value Chain Cargo)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 block">Category Mapped</label>
                      <select 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as EmissionEntry['category'])}
                        className="w-full border border-neutral-250 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-emerald-550 dark:text-white focus:outline-none"
                      >
                        {newScope === 2 ? (
                          <option value="Electricity">Electricity</option>
                        ) : (
                          <>
                            <option value="Stationary Combustion">Stationary Combustion</option>
                            <option value="Livestock">Livestock</option>
                            <option value="Mobile Combustion">Mobile Combustion</option>
                            <option value="Other">Other Category</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 block">Value (in Metric Tonnes CO2 equivalent - t CO2e)</label>
                    <input 
                      type="number" 
                      step="any"
                      required
                      placeholder="e.g. 145.20"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full border border-neutral-250 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-550 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 block">Notes / Description:</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Q2 Generator diesel invoice"
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      className="w-full border border-neutral-250 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-550 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0bb244] hover:bg-emerald-600 text-white font-mono text-xs uppercase px-5 py-3 rounded-lg font-bold tracking-wider transition-all cursor-pointer shadow-sm"
                  >
                    Log Carbon Entry & Refresh Dashboard
                  </button>
                </form>
              </div>
            )}

            {/* 4. BULK UPLOAD VIEW */}
            {activeTab === 'upload' && (
              <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 p-5 rounded-2xl max-w-xl mx-auto shadow-sm animate-fadeIn space-y-6">
                <div className="border-b pb-2.5 border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-base font-bold text-neutral-850 dark:text-white">Smart Bulk OCR Upload</h3>
                  <p className="text-xs text-neutral-500">Drag & drop raw utility billing sheets, smart-meter PDFs, or transaction files</p>
                </div>

                <div 
                  onClick={handleSimulateUpload}
                  className="border-2 border-dashed border-neutral-250 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-550 transition-colors p-8 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer bg-neutral-50 dark:bg-neutral-900 group"
                >
                  <UploadCloud className="w-12 h-12 text-neutral-400 group-hover:text-[#0bb244] transition-colors mb-3.5" />
                  <span className="font-sans font-semibold text-xs text-neutral-700 dark:text-neutral-200 block">
                    {uploadState === 'idle' && 'Click or Drag utilities files here to scan invoice'}
                    {uploadState === 'uploading' && 'Uploading document package to safe server...'}
                    {uploadState === 'parsing' && 'Scanning invoice parameters via Neural Engine...'}
                    {uploadState === 'completed' && 'Parsing Completed Successfully!'}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Supports PDF, CSV, Honeywell XLS registers. Standard automated compliance factors are applied.
                  </span>
                </div>

                {uploadState === 'parsing' && (
                  <div className="flex items-center justify-center space-x-2 text-xs font-mono text-emerald-600 py-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Cross-checking emission coefficients with national Singapore EMA parameters...</span>
                  </div>
                )}

                {uploadState === 'completed' && parsedValue && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-xl space-y-2 font-mono text-xs text-emerald-850 dark:text-emerald-400">
                    <div className="font-bold flex items-center space-x-1.5 uppercase">
                      <Check className="w-4 h-4" />
                      <span>Ledger Verified</span>
                    </div>
                    <div>Added Record: <strong className="font-extrabold">{parsedValue.toFixed(2)} t CO2e</strong> electricity utility billed from smart readings.</div>
                    <button 
                      onClick={() => setUploadState('idle')}
                      className="text-[10px] text-neutral-500 underline uppercase mt-2 block"
                    >
                      Clear and Scan Another Bill
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 5. OUTLOOK GRAPH COMPONENT */}
            {activeTab === 'outlook' && (
              <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 p-5 rounded-2xl animate-fadeIn space-y-4 shadow-xs">
                <div className="border-b pb-2 border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-base font-bold text-neutral-850 dark:text-white">Emissions Outlook & Forecasting</h3>
                  <p className="text-xs text-neutral-450">Linear forecasting mapping target trajectories through Q4 2026</p>
                </div>

                {/* Styled Inline SVG Trend Line */}
                <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 relative h-64 flex flex-col justify-between">
                  <div className="h-44 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                      <line x1="0" y1="20" x2="500" y2="20" stroke="#cccccc" strokeDasharray="3" />
                      <line x1="0" y1="60" x2="500" y2="60" stroke="#cccccc" strokeDasharray="3" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#cccccc" strokeDasharray="3" />
                      
                      {/* Active Historic Line */}
                      <path 
                        d="M 10 100 Q 120 70 250 50 T 490 20" 
                        fill="none" 
                        stroke="#0bb244" 
                        strokeWidth="3.5" 
                        className="animate-pulse"
                      />
                      
                      {/* Target Compliance Ceiling Limit Line */}
                      <path 
                        d="M 10 60 L 490 60" 
                        fill="none" 
                        stroke="#e11d48" 
                        strokeWidth="1.5" 
                        strokeDasharray="4"
                      />

                      <text x="5" y="15" fill="#737373" className="text-[8px] font-mono">Singapore Tier-1 Goal Ceiling</text>
                      <text x="5" y="55" fill="#e11d48" className="text-[8px] font-mono">SGX ESG Compliant Bar</text>
                    </svg>
                  </div>

                  <div className="flex justify-between px-1 font-mono text-[8.5px] text-neutral-450">
                    <span>JAN 2026</span>
                    <span>APR 2026</span>
                    <span>JUL 2026 (FORECAST)</span>
                    <span>OCT 2026 (COMPLIANCE GOAL)</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  The green regression line represents your current carbon trajectories combined with automation integrations. Your Scope 2 electrification audits put you in alignment with the Singapore Green Plan 2030 guidelines.
                </p>
              </div>
            )}

            {/* 6. EMISSION FACTORS VIEW */}
            {activeTab === 'factors' && (
              <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 p-5 rounded-2xl animate-fadeIn space-y-4">
                <div className="border-b pb-2 border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-base font-bold text-neutral-850 dark:text-white">Active Grid Emission Factors</h3>
                  <p className="text-xs text-neutral-450">Standard legal conversion constants applied to user accounts</p>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                  <div className="p-3 border rounded-xl flex items-center justify-between text-xs font-mono bg-white dark:bg-neutral-800 dark:border-neutral-750">
                    <div>
                      <strong className="text-neutral-800 dark:text-white block font-bold">EMA Grid Factor (Singapore)</strong>
                      <span className="text-[10px] text-neutral-400 uppercase">electricity generation indirect</span>
                    </div>
                    <span className="font-extrabold text-[#568254]">0.4057 kg/kWh</span>
                  </div>
                  <div className="p-3 border rounded-xl flex items-center justify-between text-xs font-mono bg-white dark:bg-neutral-800 dark:border-neutral-750">
                    <div>
                      <strong className="text-neutral-800 dark:text-white block font-bold">Standard Fleet Combustion diesel</strong>
                      <span className="text-[10px] text-neutral-400 uppercase">scope 1 mobile logistics</span>
                    </div>
                    <span className="font-extrabold text-[#568254]">2.68 kg/Liter</span>
                  </div>
                  <div className="p-3 border rounded-xl flex items-center justify-between text-xs font-mono bg-white dark:bg-neutral-800 dark:border-neutral-750">
                    <div>
                      <strong className="text-neutral-800 dark:text-white block font-bold">Livestock enteric emissions</strong>
                      <span className="text-[10px] text-neutral-400 uppercase">scope 1 agricultural factor</span>
                    </div>
                    <span className="font-extrabold text-[#568254]">56.0 kg CH4/Head</span>
                  </div>
                </div>
              </div>
            )}

            {/* 7. ANALYTICS VIEW */}
            {activeTab === 'analytics' && (
              <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 p-5 rounded-2xl animate-fadeIn space-y-4 shadow-sm">
                <div className="border-b pb-2 border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-base font-bold text-neutral-850 dark:text-white">Carbon Footprint Breakdown</h3>
                  <p className="text-xs text-neutral-450">Proportional structural matrix of active carbon output accounts</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">Category Proportion:</span>
                    <div className="space-y-2">
                      {categorySummary.map(cat => (
                        <div key={cat.name} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-neutral-550 dark:text-neutral-400">{cat.name}</span>
                            <span className="font-bold text-neutral-800 dark:text-neutral-200">{cat.percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 dark:bg-neutral-850 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#0bb244] h-1.5 rounded-full" style={{ width: `${cat.percentage}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
                    <span className="text-[11px] font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase">CO2 Equivalent Ledger Balance</span>
                    <div className="my-auto space-y-1 pt-2">
                      <div className="text-3xl font-extrabold text-neutral-800 dark:text-white">
                        {sums.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <span className="text-[10px] text-neutral-450 uppercase font-mono block">auditable carbon tonnes recorded in ledger database</span>
                    </div>
                    <button 
                      onClick={onOpenDemo}
                      className="w-full bg-neutral-900 hover:bg-neutral-850 text-white font-mono text-[10px] uppercase py-2 rounded-lg cursor-pointer transition-all tracking-wider"
                    >
                      Audit Ledger proof hash sequence
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 8. AI ASSISTANT CHAT VIEW (REINSTATED CONVENIENT GPT PILOT FEATURE) */}
            {activeTab === 'ai' && (
              <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 p-5 rounded-2xl animate-fadeIn space-y-4">
                <div className="border-b pb-2 border-neutral-10s dark:border-neutral-800 flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-neutral-850 dark:text-white">Aethera Neural Dialogue</h3>
                    <p className="text-xs text-neutral-450">Explain coefficients, draft sustainability disclosures or audit data indices</p>
                  </div>
                  <span className="font-mono text-[9px] bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-black">
                    Gemini.Flash Node
                  </span>
                </div>

                <div className="border border-neutral-200/60 dark:border-neutral-800 rounded-xl p-4 bg-neutral-50/50 dark:bg-[#0d1013] h-[190px] overflow-y-auto space-y-4 font-mono text-xs max-h-[190px]">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'self-end items-end ml-auto' : 'self-start items-start'}`}>
                      <span className="text-[8px] text-neutral-400 font-bold uppercase mb-0.5">{m.sender === 'user' ? 'Internal Lead Operator' : 'Aethera Intelligence Pro'}</span>
                      <div className={`p-2.5 rounded-lg border leading-relaxed ${
                        m.sender === 'user' 
                          ? 'bg-neutral-900 border-neutral-800 text-white dark:bg-neutral-800 dark:border-neutral-700' 
                          : 'bg-emerald-50/70 border-emerald-100 text-neutral-800 dark:bg-emerald-950/20 dark:border-emerald-900/60 dark:text-emerald-400'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {isAiTyping && (
                    <div className="flex items-center space-x-2 text-neutral-500 italic animate-pulse">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                      <span>Drafting disclosure text alignments...</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendAiMessage} className="flex gap-2">
                  <input 
                    type="text"
                    value={aiInput}
                    disabled={isAiTyping}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask co-pilot: 'how to reduce electricity output?' or 'explain scope 1 calculation'"
                    className="flex-grow bg-white border border-neutral-250 dark:border-neutral-700 dark:bg-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-550 dark:text-white disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={isAiTyping || !aiInput.trim()}
                    className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-200 disabled:opacity-50 transition-all text-white rounded-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </form>
              </div>
            )}

            {/* 9. ALL ENTRIES (CRUD MANAGEMENT GRID) */}
            {activeTab === 'entries' && (
              <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 p-5 rounded-2xl animate-fadeIn space-y-4 shadow-sm">
                <div className="border-b pb-2 border-neutral-100 dark:border-neutral-800 flex justify-between items-baseline">
                  <div>
                    <h3 className="text-base font-bold text-neutral-850 dark:text-white">Active Emissions Logs</h3>
                    <p className="text-xs text-neutral-450">Delete lines or add entries to recalibrate targets</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('add_entry')}
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 p-1.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center space-x-1 border border-emerald-200/40 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Record</span>
                  </button>
                </div>

                <div className="overflow-x-auto border rounded-xl dark:border-neutral-800 max-h-[220px]">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50 dark:bg-neutral-900 text-neutral-500 font-mono text-[10px] uppercase font-bold border-b border-neutral-200 dark:border-neutral-800">
                        <th className="p-3">Scope</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Value (t CO2e)</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Notes</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-mono">
                      {entries.map(e => (
                        <tr key={e.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 font-medium">
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              e.scope === 1 ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400' :
                              e.scope === 2 ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' :
                              'bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400'
                            }`}>
                              S-{e.scope}
                            </span>
                          </td>
                          <td className="p-3 font-sans font-bold">{e.category}</td>
                          <td className="p-3 text-neutral-800 dark:text-white font-black">{e.value.toLocaleString(undefined, { maximumFractionDigits: 5 })}</td>
                          <td className="p-3 text-neutral-450">{e.date}</td>
                          <td className="p-3 text-neutral-500 text-[11px] truncate max-w-[140px] font-sans font-light">{e.notes}</td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => {
                                setEntries(prev => prev.filter(item => item.id !== e.id));
                                showActionToast(`Removed ${e.value} t CO2e emission log line.`);
                              }}
                              className="text-rose-600 hover:text-rose-850 dark:text-rose-400 dark:hover:text-rose-300 p-1 rounded transition-colors inline-block"
                              title="Delete entry line"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 10. COMPLIANCE REPORTS OVERVIEW */}
            {activeTab === 'reports' && (
              <div className="bg-white dark:bg-[#12161d] border border-neutral-200/90 dark:border-neutral-800 p-5 rounded-2xl animate-fadeIn space-y-4">
                <div className="border-b pb-2 border-neutral-10s dark:border-neutral-800">
                  <h3 className="text-base font-bold text-neutral-850 dark:text-white">Formatted Audit Artifacts</h3>
                  <p className="text-xs text-neutral-450">Official proof outputs generated directly under the audit trail ledger rules</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-xl bg-neutral-50/70 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 h-[110px] flex flex-col justify-between">
                    <div>
                      <strong className="text-xs block font-bold text-neutral-800 dark:text-neutral-200">MAS SGX Climate disclosure</strong>
                      <span className="text-[10px] text-neutral-450 uppercase block font-mono">Format: IFRS S1 & S2 alignment</span>
                    </div>
                    <button 
                      onClick={() => showActionToast('Singapore SGX climate audit reporting downloaded.')}
                      className="text-xs text-emerald-700 font-bold hover:underline text-left cursor-pointer uppercase font-mono text-[10px]"
                    >
                      Download report &gt;
                    </button>
                  </div>
                  <div className="p-4 border rounded-xl bg-neutral-50/70 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 h-[110px] flex flex-col justify-between">
                    <div>
                      <strong className="text-xs block font-bold text-neutral-800 dark:text-neutral-200">Decarbonization pathway</strong>
                      <span className="text-[10px] text-neutral-450 uppercase block font-mono">Scope 2 solar strategy roadmap</span>
                    </div>
                    <button 
                      onClick={() => {
                        showActionToast('Decarbonization strategy docket compiled.');
                        onOpenDemo();
                      }}
                      className="text-xs text-emerald-700 font-bold hover:underline text-left cursor-pointer uppercase font-mono text-[10px]"
                    >
                      Compile solar savings model &gt;
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>


        </main>
        
      </div>
    </div>
  );
}
