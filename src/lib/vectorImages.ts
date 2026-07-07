/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Custom premium SVG drawings specifically themed with Tinder Health colors (#227aba & #74b645)
// Encoded dynamically as Data URIs so they load instantly without external files and are production-ready.

const createDataUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const HERO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e5f91" />
      <stop offset="50%" stop-color="#227aba" />
      <stop offset="100%" stop-color="#74b645" />
    </linearGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#f8fafc" stop-opacity="0.95" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.15" />
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#hero-grad)" rx="24" />
  
  <path d="M 0,50 L 800,50 M 0,100 L 800,100 M 0,150 L 800,150 M 0,200 L 800,200 M 0,250 L 800,250 M 0,300 L 800,300 M 0,350 L 800,350 M 0,400 L 800,400 M 0,450 L 800,450 M 0,500 L 800,500 M 0,550 L 800,550" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1" />
  <path d="M 50,0 L 50,600 M 100,0 L 100,600 M 150,0 L 150,600 M 200,0 L 200,600 M 250,0 L 250,600 M 300,0 L 300,600 M 350,0 L 350,600 M 400,0 L 400,600 M 450,0 L 450,600 M 500,0 L 500,600 M 550,0 L 550,600 M 600,0 L 600,600 M 650,0 L 650,600 M 700,0 L 700,600 M 750,0 L 750,600" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1" />

  <circle cx="200" cy="150" r="180" fill="#ffffff" fill-opacity="0.1" filter="blur(40px)" />
  <circle cx="600" cy="450" r="150" fill="#74b645" fill-opacity="0.2" filter="blur(40px)" />

  <g transform="translate(140, 180)" filter="url(#shadow)">
    <circle cx="100" cy="100" r="100" fill="#ffffff" />
    <path d="M 40,160 C 40,120 70,110 100,110 C 130,110 160,120 160,160 Z" fill="#227aba" />
    <path d="M 60,160 L 140,160 L 100,115 Z" fill="#ffffff" />
    <path d="M 90,115 L 110,115 L 100,130 Z" fill="#e2e8f0" />
    <circle cx="100" cy="70" r="32" fill="#fed7aa" />
    <path d="M 75,55 C 75,45 85,38 100,38 C 115,38 125,45 125,55 Z" fill="#475569" />
    <circle cx="90" cy="68" r="8" stroke="#334155" stroke-width="2" fill="none" />
    <circle cx="110" cy="68" r="8" stroke="#334155" stroke-width="2" fill="none" />
    <line x1="98" y1="68" x2="102" y2="68" stroke="#334155" stroke-width="2" />
    <path d="M 85,100 C 85,125 115,125 115,100" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round" />
    <circle cx="100" cy="128" r="8" fill="#94a3b8" stroke="#64748b" stroke-width="2" />
    <rect x="130" y="80" width="24" height="32" rx="4" fill="#74b645" />
    <rect x="134" y="84" width="16" height="4" fill="#ffffff" rx="1" />
    <rect x="134" y="92" width="16" height="2" fill="#ffffff" rx="0.5" />
    <rect x="134" y="98" width="10" height="2" fill="#ffffff" rx="0.5" />
  </g>

  <g transform="translate(420, 120)" filter="url(#shadow)">
    <rect width="280" height="360" rx="20" fill="url(#card-grad)" stroke="#e2e8f0" stroke-width="2" />
    
    <rect x="20" y="20" width="240" height="60" rx="12" fill="#e0f2fe" />
    <path d="M 30,50 L 70,50 L 80,30 L 95,70 L 110,40 L 120,55 L 130,50 L 250,50" fill="none" stroke="#227aba" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="120" cy="55" r="4" fill="#74b645" />
    
    <text x="30" y="115" font-family="Inter, sans-serif" font-size="16" font-weight="bold" fill="#1e293b">Dr. Nia • Health Assistant</text>
    <text x="30" y="135" font-family="Inter, sans-serif" font-size="12" font-weight="medium" fill="#64748b">Verified Clinical Consultant</text>
    
    <rect x="30" y="155" width="110" height="24" rx="12" fill="#dcfce7" />
    <circle cx="42" cy="167" r="4" fill="#15803d" />
    <text x="54" y="171" font-family="Inter, sans-serif" font-size="11" font-weight="bold" fill="#15803d">100% ONLINE</text>

    <line x1="20" y1="195" x2="260" y2="195" stroke="#f1f5f9" stroke-width="2" />

    <g transform="translate(0, -5)">
      <circle cx="40" cy="230" r="14" fill="#eff6ff" />
      <path d="M 36,230 L 39,233 L 45,227" fill="none" stroke="#227aba" stroke-width="2" stroke-linecap="round" />
      <text x="64" y="227" font-family="Inter, sans-serif" font-size="12" font-weight="bold" fill="#334155">Instant Matcher</text>
      <text x="64" y="240" font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">Finds specialists under 60s</text>

      <circle cx="40" cy="280" r="14" fill="#f0fdf4" />
      <path d="M 36,280 L 39,283 L 45,277" fill="none" stroke="#74b645" stroke-width="2" stroke-linecap="round" />
      <text x="64" y="277" font-family="Inter, sans-serif" font-size="12" font-weight="bold" fill="#334155">Transparent Prices</text>
      <text x="64" y="290" font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">Know Naira cost upfront</text>

      <circle cx="40" cy="330" r="14" fill="#faf5ff" />
      <path d="M 36,330 L 39,333 L 45,327" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" />
      <text x="64" y="327" font-family="Inter, sans-serif" font-size="12" font-weight="bold" fill="#334155">Direct Specialist Access</text>
      <text x="64" y="340" font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">Over 500+ Nigerian doctors</text>
    </g>
  </g>
</svg>`;

const HOW_IT_WORKS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="journey-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#227aba" />
      <stop offset="100%" stop-color="#74b645" />
    </linearGradient>
    <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.2" />
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#journey-grad)" rx="24" />
  
  <path d="M 100,300 C 250,200 350,400 500,250 C 650,100 700,450 750,300" fill="none" stroke="url(#primary-grad)" stroke-width="4" stroke-opacity="0.15" stroke-dasharray="8 6" />
  
  <circle cx="500" cy="250" r="12" fill="#74b645" fill-opacity="0.3" />
  <circle cx="500" cy="250" r="6" fill="#74b645" />
  <circle cx="200" cy="240" r="16" fill="#227aba" fill-opacity="0.3" />
  <circle cx="200" cy="240" r="8" fill="#227aba" />

  <g transform="translate(260, 80)" filter="url(#card-shadow)">
    <rect width="280" height="440" rx="30" fill="#1e293b" stroke="#334155" stroke-width="3" />
    <rect x="10" y="10" width="260" height="420" rx="20" fill="#ffffff" />
    
    <rect x="90" y="10" width="100" height="15" rx="7" fill="#1e293b" />
    <circle cx="170" cy="17" r="3" fill="#334155" />

    <text x="30" y="55" font-family="Inter, sans-serif" font-size="14" font-weight="extrabold" fill="#227aba">tinder <tspan fill="#74b645">health</tspan></text>
    <rect x="30" y="70" width="220" height="1" fill="#e2e8f0" />

    <rect x="30" y="85" width="220" height="50" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
    <text x="45" y="105" font-family="Inter, sans-serif" font-size="10" font-weight="bold" fill="#64748b">CHOOSE SYMPTOM</text>
    <text x="45" y="122" font-family="Inter, sans-serif" font-size="11" font-weight="extrabold" fill="#1e293b">Tooth pain &amp; swelling</text>
    <circle cx="225" cy="110" r="10" fill="#dbeafe" />
    <path d="M 221,110 L 229,110 M 225,106 L 225,114" stroke="#227aba" stroke-width="2" stroke-linecap="round" />

    <path d="M 140,142 L 140,158" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3" />

    <rect x="30" y="165" width="220" height="80" rx="12" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
    <circle cx="60" cy="205" r="18" fill="#ffffff" />
    <path d="M 48,217 C 48,205 53,200 60,200 C 67,200 72,205 72,217" fill="#227aba" />
    <circle cx="60" cy="192" r="6" fill="#fed7aa" />
    <text x="90" y="195" font-family="Inter, sans-serif" font-size="11" font-weight="extrabold" fill="#1e293b">Dr. Amina Adamu</text>
    <text x="90" y="210" font-family="Inter, sans-serif" font-size="9" font-weight="bold" fill="#227aba">DENTIST • 98% MATCH</text>
    <text x="90" y="225" font-family="Inter, sans-serif" font-size="8" fill="#64748b">Kaduna North • 1.2km away</text>
    <circle cx="225" cy="205" r="10" fill="#dcfce7" />
    <path d="M 221,205 L 224,208 L 229,202" fill="none" stroke="#15803d" stroke-width="2" stroke-linecap="round" />

    <path d="M 140,252 L 140,268" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3" />

    <rect x="30" y="275" width="220" height="75" rx="12" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1" />
    <text x="45" y="295" font-family="Inter, sans-serif" font-size="10" font-weight="extrabold" fill="#15803d">BOOKING CONFIRMED</text>
    <text x="45" y="312" font-family="Inter, sans-serif" font-size="11" font-weight="bold" fill="#1e293b">Today at 3:30 PM</text>
    <text x="45" y="328" font-family="Inter, sans-serif" font-size="9" fill="#64748b">Receipt sent to email inbox</text>
    <rect x="180" y="287" width="55" height="20" rx="10" fill="#74b645" />
    <text x="190" y="300" font-family="Inter, sans-serif" font-size="9" font-weight="extrabold" fill="#ffffff">SECURE</text>
  </g>
</svg>`;

const TRUST_SAFETY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="trust-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>
    <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="50%" stop-color="#227aba" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#74b645" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <filter id="drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.12" />
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#trust-bg)" rx="24" />

  <g transform="translate(180, 100)" filter="url(#drop-shadow)">
    <path d="M 220,40 C 330,40 370,10 370,10 C 370,10 410,40 520,40 C 520,180 430,280 370,320 C 310,280 220,180 220,40 Z" transform="translate(-150, 0)" fill="url(#shield-grad)" />
    <path d="M 235,55 C 330,55 370,25 370,25 C 370,25 410,55 505,55 C 505,170 420,260 370,300 C 320,260 235,170 235,55 Z" transform="translate(-150, 0)" fill="#ffffff" fill-opacity="0.1" />

    <g transform="translate(180, 100)">
      <path d="M -20,20 L -20,0 C -20,-20 20,-20 20,0 L 20,20" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" />
      <rect x="-40" y="15" width="80" height="65" rx="10" fill="#ffffff" />
      <circle cx="0" cy="40" r="10" fill="url(#accent-grad)" />
      <path d="M -5,40 L 5,40 L 8,65 L -8,65 Z" fill="url(#accent-grad)" />
    </g>

    <text x="220" y="380" font-family="Inter, sans-serif" font-size="18" font-weight="extrabold" fill="#1e293b" text-anchor="middle">CLINICAL VETTING ASSURED</text>
  </g>

  <g transform="translate(480, 280)" filter="url(#drop-shadow)">
    <rect width="220" height="180" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
    <rect x="0" y="0" width="220" height="12" rx="6" fill="url(#accent-grad)" />
    
    <text x="20" y="45" font-family="Inter, sans-serif" font-size="13" font-weight="extrabold" fill="#1e293b">VERIFIED PROTOCOLS</text>
    
    <g transform="translate(20, 70)">
      <circle cx="10" cy="10" r="8" fill="#dcfce7" />
      <path d="M 7,10 L 9,12 L 13,8" fill="none" stroke="#15803d" stroke-width="2" stroke-linecap="round" />
      <text x="25" y="14" font-family="Inter, sans-serif" font-size="11" font-weight="bold" fill="#475569">Medical License Search</text>

      <circle cx="10" cy="38" r="8" fill="#dcfce7" />
      <path d="M 7,38 L 9,40 L 13,36" fill="none" stroke="#15803d" stroke-width="2" stroke-linecap="round" />
      <text x="25" y="42" font-family="Inter, sans-serif" font-size="11" font-weight="bold" fill="#475569">CAC Corporate Verify</text>

      <circle cx="10" cy="66" r="8" fill="#dcfce7" />
      <path d="M 7,66 L 9,68 L 13,64" fill="none" stroke="#15803d" stroke-width="2" stroke-linecap="round" />
      <text x="25" y="70" font-family="Inter, sans-serif" font-size="11" font-weight="bold" fill="#475569">Real Patient Reviews</text>
    </g>
  </g>

  <g transform="translate(100, 360)" filter="url(#drop-shadow)">
    <rect width="180" height="90" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
    <circle cx="40" cy="45" r="20" fill="#eff6ff" />
    <path d="M 33,45 L 38,50 L 48,40" fill="none" stroke="#227aba" stroke-width="3" stroke-linecap="round" />
    <text x="75" y="42" font-family="Inter, sans-serif" font-size="14" font-weight="extrabold" fill="#1e293b">100% SECURE</text>
    <text x="75" y="58" font-family="Inter, sans-serif" font-size="10" font-weight="medium" fill="#64748b">Encrypted PACS data</text>
  </g>
</svg>`;

const TALK_TO_DOCTOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="doctor-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#eff6ff" />
      <stop offset="100%" stop-color="#dbeafe" />
    </linearGradient>
    <linearGradient id="blue-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#227aba" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#doctor-bg)" rx="16" />
  
  <circle cx="80" cy="80" r="30" fill="#3b82f6" fill-opacity="0.1" />
  <circle cx="320" cy="220" r="40" fill="#74b645" fill-opacity="0.1" />

  <g transform="translate(60, 40)">
    <rect width="280" height="180" rx="12" fill="#1e293b" />
    <rect x="10" y="10" width="260" height="160" rx="6" fill="#f8fafc" />
    <rect x="20" y="20" width="220" height="140" rx="4" fill="#e2e8f0" />
    
    <g transform="translate(130, 90)">
      <path d="M -40,50 C -40,15 -15,10 0,10 C 15,10 40,15 40,50 Z" fill="url(#blue-grad)" />
      <circle cx="0" cy="-10" r="22" fill="#fed7aa" />
      <path d="M -15,-20 C -15,-30 0,-32 15,-20 Z" fill="#475569" />
      <path d="M -15,15 C -15,30 15,30 15,15" fill="none" stroke="#ffffff" stroke-width="3" />
      <circle cx="0" cy="30" r="5" fill="#e2e8f0" />
    </g>
    
    <rect x="30" y="30" width="45" height="16" rx="8" fill="#ef4444" />
    <circle cx="38" cy="38" r="3" fill="#ffffff" />
    <text x="46" y="41" font-family="Inter, sans-serif" font-size="8" font-weight="bold" fill="#ffffff">LIVE</text>
  </g>
  
  <rect x="170" y="220" width="60" height="20" fill="#475569" />
  <rect x="140" y="235" width="120" height="10" fill="#334155" rx="5" />
</svg>`;

const DIAGNOSTIC_TESTS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="lab-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5f3ff" />
      <stop offset="100%" stop-color="#ede9fe" />
    </linearGradient>
    <linearGradient id="purple-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <linearGradient id="green-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#lab-bg)" rx="16" />

  <g transform="translate(80, 90)">
    <path d="M 10,120 L 70,120 L 55,20 L 25,20 Z" fill="none" stroke="#475569" stroke-width="4" stroke-linejoin="round" />
    <path d="M 15,115 L 65,115 L 58,50 L 22,50 Z" fill="url(#purple-grad)" fill-opacity="0.8" />
    <circle cx="30" cy="80" r="4" fill="#ffffff" fill-opacity="0.6" />
    <circle cx="45" cy="100" r="5" fill="#ffffff" fill-opacity="0.6" />
    <circle cx="35" cy="65" r="3" fill="#ffffff" fill-opacity="0.6" />
  </g>

  <g transform="translate(190, 50)">
    <rect width="140" height="190" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
    
    <text x="15" y="30" font-family="Inter, sans-serif" font-size="11" font-weight="extrabold" fill="#1e293b">LAB REPORT</text>
    <text x="15" y="42" font-family="Inter, sans-serif" font-size="8" font-weight="bold" fill="#74b645">STATUS: COMPLETE</text>
    
    <rect x="15" y="52" width="110" height="1.5" fill="#f1f5f9" />

    <text x="15" y="72" font-family="Inter, sans-serif" font-size="9" font-weight="bold" fill="#475569">Cholesterol</text>
    <rect x="15" y="78" width="110" height="6" rx="3" fill="#e2e8f0" />
    <rect x="15" y="78" width="75" height="6" rx="3" fill="url(#green-grad)" />

    <text x="15" y="105" font-family="Inter, sans-serif" font-size="9" font-weight="bold" fill="#475569">Blood Glucose</text>
    <rect x="15" y="111" width="110" height="6" rx="3" fill="#e2e8f0" />
    <rect x="15" y="111" width="95" height="6" rx="3" fill="url(#purple-grad)" />

    <text x="15" y="138" font-family="Inter, sans-serif" font-size="9" font-weight="bold" fill="#475569">Hemoglobin</text>
    <rect x="15" y="144" width="110" height="6" rx="3" fill="#e2e8f0" />
    <rect x="15" y="144" width="55" height="6" rx="3" fill="url(#green-grad)" />
    
    <circle cx="105" cy="170" r="12" fill="#d1fae5" />
    <path d="M 101,170 L 104,173 L 109,167" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" />
  </g>
</svg>`;

const SPECIALIST_CARE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="special-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0fdf4" />
      <stop offset="100%" stop-color="#dcfce7" />
    </linearGradient>
    <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#special-bg)" rx="16" />

  <g transform="translate(110, 50)">
    <path d="M 90,65 C 90,30 135,30 135,65 C 135,100 90,140 90,140 C 90,140 45,100 45,65 C 45,30 90,30 90,65 Z" fill="url(#heart-grad)" />
    <path d="M 85,55 L 95,55 L 95,65 L 105,65 L 105,75 L 95,75 L 95,85 L 85,85 L 85,75 L 75,75 L 75,65 L 85,65 Z" fill="#ffffff" />

    <path d="M -30,100 C -30,170 90,190 90,190 C 90,190 210,170 210,100" fill="none" stroke="#475569" stroke-width="6" stroke-linecap="round" />
    <path d="M -30,100 C -30,70 -10,60 0,90" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round" />
    <path d="M 210,100 C 210,70 190,60 180,90" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round" />
    <circle cx="90" cy="190" r="16" fill="#94a3b8" stroke="#475569" stroke-width="4" />
    <circle cx="90" cy="190" r="10" fill="#cbd5e1" />
  </g>

  <g transform="translate(210, 180)">
    <rect width="130" height="40" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
    <circle cx="20" cy="20" r="6" fill="#74b645" />
    <text x="35" y="24" font-family="Inter, sans-serif" font-size="10" font-weight="extrabold" fill="#1e293b">Vetted Specialists</text>
  </g>
</svg>`;

export const HERO_IMAGE = createDataUri(HERO_SVG);
export const HOW_IT_WORKS_IMAGE = createDataUri(HOW_IT_WORKS_SVG);
export const TRUST_SAFETY_IMAGE = createDataUri(TRUST_SAFETY_SVG);
export const TALK_TO_DOCTOR_IMAGE = createDataUri(TALK_TO_DOCTOR_SVG);
export const DIAGNOSTIC_TESTS_IMAGE = createDataUri(DIAGNOSTIC_TESTS_SVG);
export const SPECIALIST_CARE_IMAGE = createDataUri(SPECIALIST_CARE_SVG);
