import React, { useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';

// Import raw files for downloads
import mmsdCode from './school_closure_monitor.py?raw';
import canvasCode from './canvas_dashboard.py?raw';

const FreeStuff: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'mmsd'>('mmsd');

  const handleDownload = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#2c2825] font-serif selection:bg-[#e8e5db]">
      
      {/* Header */}
      <div className="text-center pt-20 pb-16 px-6">
        <div className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase mb-6">
          Portfolio · Automation Tools
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-[#2c2825] mb-6 tracking-tight">
          Tools That Work <span className="italic">While You Don't</span>
        </h1>
        <div className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">
          Python · local automation · practical infrastructure
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-y border-[#e2dfd5] bg-[#f0eee6] overflow-x-auto">
        <button 
          onClick={() => setActiveTab('canvas')}
          className={`flex-1 min-w-[200px] py-4 text-[10px] font-mono tracking-widest uppercase flex items-center justify-center gap-3 transition-colors ${
            activeTab === 'canvas' 
              ? 'text-[#9b4130] bg-[#f9f8f6] border-t-2 border-t-[#9b4130]' 
              : 'text-gray-500 hover:bg-[#e8e5db] border-t-2 border-t-transparent'
          }`}
        >
          <span className="text-sm">🎓</span> Canvas Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('mmsd')}
          className={`flex-1 min-w-[200px] py-4 text-[10px] font-mono tracking-widest uppercase flex items-center justify-center gap-3 transition-colors ${
            activeTab === 'mmsd' 
              ? 'text-[#9b4130] bg-[#f9f8f6] border-t-2 border-t-[#9b4130]' 
              : 'text-gray-500 hover:bg-[#e8e5db] border-t-2 border-t-transparent'
          }`}
        >
          <span className="text-sm">🚨</span> MMSD Closure Monitor
        </button>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        
        {activeTab === 'mmsd' && (
          <div className="animate-in fade-in duration-500">
            {/* Title Block */}
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-[#f0eee6] rounded-sm flex items-center justify-center text-xl shadow-sm border border-[#e2dfd5]">
                🚨
              </div>
              <h2 className="text-3xl font-serif text-[#2c2825] font-bold tracking-tight">MMSD Closure Monitor</h2>
            </div>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase md:ml-14 mb-12">
              School delay/closure alerts via text and email · no app install required
            </div>

            {/* Why I made this - Speech Bubble */}
            <div className="relative mb-12 md:ml-14 max-w-3xl">
              <div className="bg-white border-2 border-[#2c2825] rounded-2xl p-6 md:p-8 relative z-10 shadow-sm">
                <div className="text-[10px] font-mono tracking-widest text-[#9b4130] uppercase mb-3 font-bold flex items-center gap-2">
                  <span className="text-lg">💬</span> Why I made this
                </div>
                <p className="font-serif text-[#2c2825] text-[15px] md:text-[16px] leading-relaxed italic">
                  "For all the equity talk, not announcing school closure decisions regardless of two hour call in/out times disproportionately affects those of us that have the least workplace protections for last minute upheaval, and can least afford to not get paid because we are typically hourly employees. I hope this app helps someone else too."
                </p>
              </div>
              {/* Bubble Tail */}
              <div className="absolute -bottom-2.5 left-12 w-6 h-6 bg-white border-b-2 border-r-2 border-[#2c2825] transform rotate-45 z-20 rounded-br-sm"></div>
            </div>

            {/* Intro */}
            <div className="prose prose-stone font-serif text-[#2c2825] leading-relaxed max-w-none mb-12 text-[15px] md:text-base">
              <p>
                MMSD has a well-documented tendency to be among the last school districts in Dane County to announce closures and delays — irrespective of the two-hour call window blue-collar jobs expect, making sudden call-offs and workplace tardiness disproportionately land on those of us least able to afford such penalties. This app cannot fix policy, but it can get you the announcement nearly as soon as it is made by checking various sites (MMSD, local news...). This script monitors those sources every 5 minutes and sends you a text message the moment anything changes or closure/delay language appears.
              </p>
              <p>
                No app to install on your phone. No paid service. Works through your carrier's email-to-SMS gateway, which every major US carrier supports for free. You get a text before most people have checked their app.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-[#e2dfd5] rounded-sm mb-16 bg-[#f9f8f6]">
              <div className="p-5 border-b md:border-b-0 md:border-r border-[#e2dfd5]">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-2">Check Interval</div>
                <div className="font-serif font-bold text-[#2c2825]">Every 5 minutes</div>
              </div>
              <div className="p-5 border-b md:border-b-0 md:border-r border-[#e2dfd5]">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-2">Alert Method</div>
                <div className="font-serif font-bold text-[#2c2825]">SMS + optional email</div>
              </div>
              <div className="p-5 border-r border-[#e2dfd5]">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-2">Cost</div>
                <div className="font-serif font-bold text-[#2c2825]">Free (carrier gateway)</div>
              </div>
              <div className="p-5">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-2">Detects</div>
                <div className="font-serif font-bold text-[#2c2825]">Page change + keywords</div>
              </div>
            </div>

            {/* How detection works */}
            <h3 className="text-xl font-serif font-bold text-[#2c2825] mb-4">How detection works</h3>
            <p className="font-serif text-[#2c2825] mb-6 text-[15px]">The script runs two independent checks every cycle:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 border border-[#e2dfd5] rounded-sm mb-16 bg-[#f9f8f6]">
              <div className="p-6 border-b md:border-b-0 md:border-r border-[#e2dfd5]">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-3">Check 1 — Page Change</div>
                <div className="font-serif text-[#2c2825] text-[15px] leading-relaxed">
                  SHA-256 hashes the full page on every poll. Any change — banner, alert bar, front-page post — triggers an immediate alert.
                </div>
              </div>
              <div className="p-6">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-3">Check 2 — Keyword Scan</div>
                <div className="font-serif text-[#2c2825] text-[15px] leading-relaxed">
                  Scans for "closed," "closure," "no school," "delay," "late start," "cancelled," and related terms. Sends one alert, not one per cycle.
                </div>
              </div>
            </div>

            {/* Sample alert text */}
            <h3 className="text-xl font-serif font-bold text-[#2c2825] mb-4">Sample alert text</h3>
            <div className="border border-[#e2dfd5] rounded-sm mb-16 bg-[#f9f8f6] overflow-hidden shadow-sm">
              <div className="bg-[#e8e5db] px-4 py-2 flex items-center gap-2 border-b border-[#e2dfd5]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d0cdc3]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d0cdc3]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d0cdc3]"></div>
                </div>
                <div className="ml-4 text-[9px] font-mono tracking-widest text-gray-500 uppercase">SMS Received 5:43 AM</div>
              </div>
              <div className="p-6 font-mono text-xs text-[#2c2825] whitespace-pre-wrap leading-relaxed">
                {`MMSD closure/delay signal\n\n[2026-01-14 05:43:02] Possible closure or\ndelay language detected on the MMSD site.\n\nCheck: https://www.madison.k12.wi.us`}
              </div>
            </div>

            {/* Setup */}
            <h3 className="text-xl font-serif font-bold text-[#2c2825] mb-8">Setup (10 minutes)</h3>
            <div className="space-y-8 mb-16">
              <div className="flex gap-5">
                <div className="w-6 h-6 shrink-0 border border-[#e2dfd5] flex items-center justify-center font-mono text-xs text-gray-500 bg-white shadow-sm">1</div>
                <div>
                  <h4 className="font-serif font-bold text-[#2c2825] mb-1">Create a Gmail App Password</h4>
                  <p className="font-serif text-[#2c2825] text-[15px] leading-relaxed">Google Account → Security → 2-Step Verification → App Passwords. Create one for "Mail." This is what the script uses to send alerts — your real password never touches it.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-6 h-6 shrink-0 border border-[#e2dfd5] flex items-center justify-center font-mono text-xs text-gray-500 bg-white shadow-sm">2</div>
                <div>
                  <h4 className="font-serif font-bold text-[#2c2825] mb-1">Find your carrier's SMS gateway</h4>
                  <p className="font-serif text-[#2c2825] text-[15px] leading-relaxed">See the table below. Format: <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm">6085551234@vtext.com</code> (your 10-digit number, no dashes).</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-6 h-6 shrink-0 border border-[#e2dfd5] flex items-center justify-center font-mono text-xs text-gray-500 bg-white shadow-sm">3</div>
                <div>
                  <h4 className="font-serif font-bold text-[#2c2825] mb-1">Configure and run</h4>
                  <p className="font-serif text-[#2c2825] text-[15px] leading-relaxed"><code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm">cp .env.example .env</code>, fill in your Gmail and SMS gateway address, then <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm">python school_closure_monitor.py</code>.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-6 h-6 shrink-0 border border-[#e2dfd5] flex items-center justify-center font-mono text-xs text-gray-500 bg-white shadow-sm">4</div>
                <div>
                  <h4 className="font-serif font-bold text-[#2c2825] mb-1">Keep it running</h4>
                  <p className="font-serif text-[#2c2825] text-[15px] leading-relaxed">The script loops indefinitely. Run it in a tmux session, or set up launchd / systemd for always-on operation. Instructions in the README.</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="mb-16">
              <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-4">Carrier SMS Gateways</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[400px]">
                  <thead>
                    <tr className="border-b border-[#e2dfd5]">
                      <th className="py-3 text-[9px] font-mono tracking-widest text-gray-500 uppercase font-normal w-1/3">Carrier</th>
                      <th className="py-3 text-[9px] font-mono tracking-widest text-gray-500 uppercase font-normal">Gateway</th>
                    </tr>
                  </thead>
                  <tbody className="font-serif text-[15px] text-[#2c2825]">
                    <tr className="border-b border-[#e2dfd5]">
                      <td className="py-4">Verizon</td>
                      <td className="py-4 font-mono text-[11px]">number@vtext.com</td>
                    </tr>
                    <tr className="border-b border-[#e2dfd5]">
                      <td className="py-4">AT&T</td>
                      <td className="py-4 font-mono text-[11px]">number@txt.att.net</td>
                    </tr>
                    <tr className="border-b border-[#e2dfd5]">
                      <td className="py-4">T-Mobile</td>
                      <td className="py-4 font-mono text-[11px]">number@tmomail.net</td>
                    </tr>
                    <tr className="border-b border-[#e2dfd5]">
                      <td className="py-4">US Cellular</td>
                      <td className="py-4 font-mono text-[11px]">number@email.uscc.net</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Callout */}
            <div className="border-l-2 border-[#9b4130] pl-6 py-1 mb-16">
              <p className="font-serif italic text-[#2c2825] text-[15px] leading-relaxed">
                This works with any district's website — just change <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm not-italic">WATCH_URL</code> in your <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm not-italic">.env</code>. If you're outside Madison but your district has the same last-to-call tendency, this tool is portable.
              </p>
            </div>

            {/* Code Block */}
            <div className="bg-[#f0eee6] border border-[#e2dfd5] p-6 rounded-sm mb-16 overflow-x-auto shadow-inner">
              <pre className="font-mono text-[11px] text-[#2c2825] leading-relaxed">
{`# .env (never committed to git)
FROM_EMAIL=you@gmail.com
FROM_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx
TO_SMS=6085551234@vtext.com
TO_EMAIL= # optional second recipient
WATCH_URL=https://www.madison.k12.wi.us
CHECK_INTERVAL_SECONDS=300`}
              </pre>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 border-t border-[#e2dfd5] pt-8">
              <a 
                href="https://github.com/phinnphace/school_closure_monitor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#9b4130] text-white font-mono text-[10px] tracking-widest uppercase px-6 py-3.5 flex items-center gap-2 hover:bg-[#7a3325] transition-colors rounded-sm shadow-sm"
              >
                <ArrowUpRight className="w-3.5 h-3.5" /> View on Github
              </a>
              <button 
                onClick={() => handleDownload(mmsdCode, 'school_closure_monitor.py')}
                className="border border-[#e2dfd5] bg-white text-[#2c2825] font-mono text-[10px] tracking-widest uppercase px-6 py-3.5 flex items-center gap-2 hover:bg-[#f0eee6] transition-colors rounded-sm shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download .py
              </button>
            </div>
          </div>
        )}

        {activeTab === 'canvas' && (
          <div className="animate-in fade-in duration-500">
            {/* Title Block */}
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-[#f0eee6] rounded-sm flex items-center justify-center text-xl shadow-sm border border-[#e2dfd5]">
                🎓
              </div>
              <h2 className="text-3xl font-serif text-[#2c2825] font-bold tracking-tight">Canvas Dashboard</h2>
            </div>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase md:ml-14 mb-12">
              Automated assignment tracking and SQLite database generation
            </div>

            {/* Why I made this - Speech Bubble */}
            <div className="relative mb-12 md:ml-14 max-w-3xl">
              <div className="bg-white border-2 border-[#2c2825] rounded-2xl p-6 md:p-8 relative z-10 shadow-sm">
                <div className="text-[10px] font-mono tracking-widest text-[#9b4130] uppercase mb-3 font-bold flex items-center gap-2">
                  <span className="text-lg">💬</span> Why I made this
                </div>
                <p className="font-serif text-[#2c2825] text-[15px] md:text-[16px] leading-relaxed italic">
                  "I am not a native Canvas user. I came from Blackboard and found myself wasting time hunting through here everyday; compounded by professors non standard organizational locations. Eventually, out of frustration, I wondered if there was an API. Amazingly there is. I hope this helps your day(s) like it has helped mine by making one thing at least organized."
                </p>
              </div>
              {/* Bubble Tail */}
              <div className="absolute -bottom-2.5 left-12 w-6 h-6 bg-white border-b-2 border-r-2 border-[#2c2825] transform rotate-45 z-20 rounded-br-sm"></div>
            </div>

            {/* Intro */}
            <div className="prose prose-stone font-serif text-[#2c2825] leading-relaxed max-w-none mb-12 text-[15px] md:text-base">
              <p>
                Canvas's own interface buries what you need behind three menus, a notification badge, and a calendar that requires two clicks just to see a due date. This script runs every morning and produces a single Markdown file with everything that matters: what's due, what's missing, submission status per assignment, and a course-by-course completion rate.
              </p>
              <p>
                It also writes everything to a local SQLite database, so if you want to know "what has no submission and is due in the next 14 days across all courses," you just write a query rather than clicking through four pages. The auto-generated summary runs on whatever schedule you set — daily, twice a day, whatever works for you — while the database is always there to query on demand.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-[#e2dfd5] rounded-sm mb-16 bg-[#f9f8f6]">
              <div className="p-5 border-b md:border-b-0 md:border-r border-[#e2dfd5]">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-2">Runs</div>
                <div className="font-serif font-bold text-[#2c2825]">On your schedule</div>
              </div>
              <div className="p-5 border-b md:border-b-0 md:border-r border-[#e2dfd5]">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-2">Output</div>
                <div className="font-serif font-bold text-[#2c2825]">Markdown + SQLite</div>
              </div>
              <div className="p-5 border-r border-[#e2dfd5]">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-2">Cost</div>
                <div className="font-serif font-bold text-[#2c2825]">Free</div>
              </div>
              <div className="p-5">
                <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-2">Detects</div>
                <div className="font-serif font-bold text-[#2c2825]">Missing & upcoming work</div>
              </div>
            </div>

            {/* What it produces Table */}
            <div className="mb-16">
              <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-4">What it produces</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[400px]">
                  <thead>
                    <tr className="border-b border-[#e2dfd5]">
                      <th className="py-3 text-[9px] font-mono tracking-widest text-gray-500 uppercase font-normal w-1/3">File</th>
                      <th className="py-3 text-[9px] font-mono tracking-widest text-gray-500 uppercase font-normal">What it is</th>
                    </tr>
                  </thead>
                  <tbody className="font-serif text-[15px] text-[#2c2825]">
                    <tr className="border-b border-[#e2dfd5]">
                      <td className="py-4 font-mono text-[11px]">canvas_summary.md</td>
                      <td className="py-4">Daily human-readable snapshot: upcoming work, missing assignments, per-course stats</td>
                    </tr>
                    <tr className="border-b border-[#e2dfd5]">
                      <td className="py-4 font-mono text-[11px]">canvas_data.db</td>
                      <td className="py-4">SQLite database — query anything: overdue by course, completion rates, all submissions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Setup */}
            <h3 className="text-xl font-serif font-bold text-[#2c2825] mb-8">Setup (10 minutes)</h3>
            <div className="space-y-8 mb-16">
              <div className="flex gap-5">
                <div className="w-6 h-6 shrink-0 border border-[#e2dfd5] flex items-center justify-center font-mono text-xs text-gray-500 bg-white shadow-sm">1</div>
                <div>
                  <h4 className="font-serif font-bold text-[#2c2825] mb-1">Prerequisites</h4>
                  <p className="font-serif text-[#2c2825] text-[15px] leading-relaxed">Python 3.9+ and a Canvas account (any school that uses Instructure Canvas).</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-6 h-6 shrink-0 border border-[#e2dfd5] flex items-center justify-center font-mono text-xs text-gray-500 bg-white shadow-sm">2</div>
                <div>
                  <h4 className="font-serif font-bold text-[#2c2825] mb-1">Install dependencies</h4>
                  <p className="font-serif text-[#2c2825] text-[15px] leading-relaxed">Run <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm">pip install -r requirements.txt</code></p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-6 h-6 shrink-0 border border-[#e2dfd5] flex items-center justify-center font-mono text-xs text-gray-500 bg-white shadow-sm">3</div>
                <div>
                  <h4 className="font-serif font-bold text-[#2c2825] mb-1">Configure your environment</h4>
                  <p className="font-serif text-[#2c2825] text-[15px] leading-relaxed mb-4"><code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm">cp .env.example .env</code> and edit <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm">.env</code>.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <strong className="font-bold">Getting your Canvas token:</strong>
                      <p className="text-[15px]">Canvas → your profile picture (top-left) → Settings → scroll to "Approved Integrations" → <strong>+ New Access Token</strong></p>
                    </div>
                    <div>
                      <strong className="font-bold">Finding course IDs:</strong>
                      <p className="text-[15px]">Open a course in Canvas. The URL will look like <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm">/courses/204930</code> — that number is the course ID.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-6 h-6 shrink-0 border border-[#e2dfd5] flex items-center justify-center font-mono text-xs text-gray-500 bg-white shadow-sm">4</div>
                <div>
                  <h4 className="font-serif font-bold text-[#2c2825] mb-1">Run</h4>
                  <p className="font-serif text-[#2c2825] text-[15px] leading-relaxed"><code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm">python canvas_dashboard.py</code></p>
                </div>
              </div>
            </div>

            {/* Callout */}
            <div className="border-l-2 border-[#9b4130] pl-6 py-1 mb-16">
              <p className="font-serif italic text-[#2c2825] text-[15px] leading-relaxed">
                Your API token lives only in <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm not-italic">.env</code> which is excluded from version control via <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm not-italic">.gitignore</code>. The token gives read access to your Canvas data — treat it like a password.
              </p>
            </div>

            {/* Code Block - Env */}
            <div className="bg-[#f0eee6] border border-[#e2dfd5] p-6 rounded-sm mb-16 overflow-x-auto shadow-inner">
              <pre className="font-mono text-[11px] text-[#2c2825] leading-relaxed">
{`# .env (never committed to git)
CANVAS_TOKEN=your_token_here
CANVAS_BASE_URL=https://your-school.instructure.com
KEEP_COURSE_IDS=123456,789012    # optional — leave blank for all active courses
OUTPUT_DIR=                      # optional — defaults to this folder`}
              </pre>
            </div>

            {/* Automate it */}
            <h3 className="text-xl font-serif font-bold text-[#2c2825] mb-4">Automate it (run every morning)</h3>
            <p className="font-serif text-[#2c2825] mb-6 text-[15px]">Set the script to run automatically in the background:</p>
            
            <div className="space-y-6 mb-16">
              <div className="border border-[#e2dfd5] rounded-sm bg-[#f9f8f6] overflow-hidden">
                <div className="bg-[#e8e5db] px-4 py-3 border-b border-[#e2dfd5]">
                  <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">macOS / Linux — Cron (Simplest)</div>
                </div>
                <div className="p-6">
                  <p className="font-serif text-[#2c2825] text-[15px] mb-4">Run <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm">crontab -e</code> and add this line to run at 8:00 AM every day:</p>
                  <div className="bg-[#f0eee6] border border-[#e2dfd5] p-4 rounded-sm overflow-x-auto shadow-inner">
                    <pre className="font-mono text-[11px] text-[#2c2825] leading-relaxed">
{`0 8 * * * cd /path/to/canvas-dashboard && .venv/bin/python canvas_dashboard.py >> canvas_dashboard.log 2>&1`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border border-[#e2dfd5] rounded-sm bg-[#f9f8f6] overflow-hidden">
                <div className="bg-[#e8e5db] px-4 py-3 border-b border-[#e2dfd5]">
                  <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">Windows — Task Scheduler</div>
                </div>
                <div className="p-6">
                  <ol className="list-decimal list-inside font-serif text-[#2c2825] text-[15px] space-y-2">
                    <li>Open Task Scheduler → Create Basic Task</li>
                    <li>Trigger: Daily at your preferred time</li>
                    <li>Action: Start a program
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-600">
                        <li>Program: <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm text-[#2c2825]">C:\\path\\to\\python.exe</code></li>
                        <li>Arguments: <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm text-[#2c2825]">C:\\path\\to\\canvas_dashboard.py</code></li>
                        <li>Start in: <code className="font-mono text-[11px] bg-[#e8e5db] px-1.5 py-0.5 rounded-sm text-[#2c2825]">C:\\path\\to\\canvas-dashboard\\</code></li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Code Block - SQL */}
            <h3 className="text-xl font-serif font-bold text-[#2c2825] mb-4">Querying the database</h3>
            <div className="bg-[#f0eee6] border border-[#e2dfd5] p-6 rounded-sm mb-16 overflow-x-auto shadow-inner">
              <pre className="font-mono text-[11px] text-[#2c2825] leading-relaxed">
{`sqlite3 canvas_data.db

-- Upcoming assignments
SELECT name, due_at FROM assignments 
WHERE due_at > datetime('now') ORDER BY due_at;

-- Missing work
SELECT a.name, c.name FROM submissions s
JOIN assignments a ON s.assignment_id = a.id
JOIN courses c ON a.course_id = c.id
WHERE s.missing = 1;`}
              </pre>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 border-t border-[#e2dfd5] pt-8">
              <a 
                href="https://github.com/phinnphace/canvas_dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#9b4130] text-white font-mono text-[10px] tracking-widest uppercase px-6 py-3.5 flex items-center gap-2 hover:bg-[#7a3325] transition-colors rounded-sm shadow-sm"
              >
                <ArrowUpRight className="w-3.5 h-3.5" /> View on Github
              </a>
              <button 
                onClick={() => handleDownload(canvasCode, 'canvas_dashboard.py')}
                className="border border-[#e2dfd5] bg-white text-[#2c2825] font-mono text-[10px] tracking-widest uppercase px-6 py-3.5 flex items-center gap-2 hover:bg-[#f0eee6] transition-colors rounded-sm shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download .py
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FreeStuff;
