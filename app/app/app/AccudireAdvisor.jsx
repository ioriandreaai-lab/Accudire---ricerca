import React, { useState } from 'react';

const LOGO = '/logo.png';
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwh49Ay29-iFU8LxNM3p6KFsKVX8BlTnviXmBfCBdVgNJi3wBJkUjscrXtPfoH3dL9W/exec';

const STRUTTURE = [
  {id:1,nome:"Casa della Divina Provvidenza",tipo:"RSA",citta:"Correggio",provincia:"Reggio Emilia",regione:"Emilia-Romagna",telefono:"+39 0522 693411",email:"info@casadivinaprovvidenza.it",sito:"https://www.casadivinaprovvidenza.it",posti:90,postiDisp:3,prezzoMin:2200,prezzoMax:2900,convenzionata:true,alzheimer:true,h24:true,fisioterapia:true,giardino:true,singola:true,doppia:true,animali:false,lat:44.7667,lng:10.7833},
  {id:2,nome:"Centro Anziani di Correggio",tipo:"RSA",citta:"Correggio",provincia:"Reggio Emilia",regione:"Emilia-Romagna",telefono:"+39 0522 642455",email:"info@centroanzianicorreggio.it",sito:"https://www.centroanzianicorreggio.it",posti:75,postiDisp:0,prezzoMin:2100,prezzoMax:2700,convenzionata:true,alzheimer:true,h24:true,fisioterapia:true,giardino:true,singola:true,doppia:true,animali:false,lat:44.7667,lng:10.7833},
  {id:3,nome:"Residenza Anni Azzurri Il Giardino",tipo:"Casa di Riposo",citta:"Bagnolo in Piano",provincia:"Reggio Emilia",regione:"Emilia-Romagna",telefono:"+39 0522 951811",email:"ilgiardino@anniazzurri.it",sito:"https://www.anniazzurri.it",posti:85,postiDisp:5,prezzoMin:2300,prezzoMax:3000,convenzionata:true,alzheimer:true,h24:true,fisioterapia:true,giardino:true,singola:true,doppia:true,animali:true,lat:44.7667,lng:10.6667},
  {id:4,nome:"Residenza Stella",tipo:"Casa Famiglia",citta:"Carpi",provincia:"Modena",regione:"Emilia-Romagna",telefono:"+39 059 685100",email:"info@residenzastella.it",sito:"https://www.residenzastella.it",posti:12,postiDisp:2,prezzoMin:1600,prezzoMax:2100,convenzionata:false,alzheimer:false,h24:false,fisioterapia:false,giardino:true,singola:true,doppia:false,animali:true,lat:44.7833,lng:10.8833},
  {id:5,nome:"Villa Del Parco",tipo:"Casa di Riposo",citta:"Bologna",provincia:"Bologna",regione:"Emilia-Romagna",telefono:"+39 051 344535",email:"info@villadelparcobologna.it",sito:"https://www.villadelparcobologna.it",posti:55,postiDisp:4,prezzoMin:2200,prezzoMax:2900,convenzionata:false,alzheimer:true,h24:true,fisioterapia:true,giardino:true,singola:true,doppia:true,animali:false,lat:44.4949,lng:11.3426},
  {id:6,nome:"CRA Villa Ranuzzi",tipo:"RSA",citta:"Bologna",provincia:"Bologna",regione:"Emilia-Romagna",telefono:"+39 051 6137611",email:"info@villaranuzzi.it",sito:"https://www.villaranuzzi.it",posti:95,postiDisp:2,prezzoMin:2500,prezzoMax:3300,convenzionata:true,alzheimer:true,h24:true,fisioterapia:true,giardino:true,singola:true,doppia:true,animali:false,lat:44.4949,lng:11.3426},
  {id:7,nome:"Villa Serena",tipo:"RSA",citta:"Bologna",provincia:"Bologna",regione:"Emilia-Romagna",telefono:"+39 051 477001",email:"info@villaserena-bo.it",sito:"https://www.villaserena-bo.it",posti:80,postiDisp:0,prezzoMin:2300,prezzoMax:3000,convenzionata:true,alzheimer:true,h24:true,fisioterapia:true,giardino:false,singola:true,doppia:true,animali:false,lat:44.4949,lng:11.3426},
  {id:8,nome:"Residenza Ducale",tipo:"RSA",citta:"Modena",provincia:"Modena",regione:"Emilia-Romagna",telefono:"+39 059 374511",email:"ducale@anniazzurri.it",sito:"https://www.anniazzurri.it",posti:95,postiDisp:6,prezzoMin:2400,prezzoMax:3100,convenzionata:true,alzheimer:true,h24:true,fisioterapia:true,giardino:true,singola:true,doppia:true,animali:false,lat:44.6471,lng:10.9252},
  {id:9,nome:"RSA Villa Verde",tipo:"RSA",citta:"Modena",provincia:"Modena",regione:"Emilia-Romagna",telefono:"+39 059 334511",email:"info@rsavillaverde.it",sito:"https://www.rsavillaverde.it",posti:90,postiDisp:3,prezzoMin:2400,prezzoMax:3100,convenzionata:true,alzheimer:true,h24:true,fisioterapia:true,giardino:true,singola:true,doppia:true,animali:true,lat:44.6471,lng:10.9252},
  {id:10,nome:"Villa Armonia",tipo:"Casa di Riposo",citta:"Imola",provincia:"Bologna",regione:"Emilia-Romagna",telefono:"+39 0542 22592",email:"info@villarmoniaimola.it",sito:"https://www.villarmoniaimola.it",posti:42,postiDisp:8,prezzoMin:1800,prezzoMax:2400,convenzionata:true,alzheimer:false,h24:false,fisioterapia:true,giardino:true,singola:true,doppia:true,animali:true,lat:44.3533,lng:11.7141}
];

const CITIES = {
  "bologna":{lat:44.4949,lng:11.3426},"modena":{lat:44.6471,lng:10.9252},"reggio emilia":{lat:44.6989,lng:10.6297},
  "parma":{lat:44.8015,lng:10.3279},"carpi":{lat:44.7833,lng:10.8833},"correggio":{lat:44.7667,lng:10.7833},
  "imola":{lat:44.3533,lng:11.7141},"ferrara":{lat:44.8381,lng:11.6198},"ravenna":{lat:44.4184,lng:12.2035}
};

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLng = (lng2-lng1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

const TIPO_INFO = {
  'RSA': {
    icon: '🏥',
    nome: 'RSA - Residenza Sanitaria Assistenziale',
    descrizione: 'La RSA è una struttura sanitaria per anziani non autosufficienti che necessitano di assistenza medica e infermieristica continuativa. Non è un ospedale, ma una vera casa dove il tuo caro sarà seguito 24 ore su 24 da personale qualificato.',
    ideale: 'Persone con Alzheimer, demenza, gravi patologie croniche, necessità di riabilitazione intensiva o che non possono più svolgere le attività quotidiane in autonomia.',
    costo: '€2.200 - €3.500/mese',
    servizi: ['Medico sempre disponibile', 'Infermieri H24', 'Fisioterapia', 'Assistenza completa'],
    attenzione: [
      'Verifica il rapporto operatori/ospiti (ideale: 1 ogni 2-3 ospiti)',
      'Chiedi se esiste un nucleo Alzheimer dedicato',
      'Controlla i tempi della lista d\'attesa per posti convenzionati',
      'Informati sulle modalità di gestione delle emergenze notturne'
    ]
  },
  'Casa di Riposo': {
    icon: '🏡',
    nome: 'Casa di Riposo',
    descrizione: 'La Casa di Riposo è una struttura residenziale per anziani parzialmente autosufficienti. Offre assistenza nelle attività quotidiane (pasti, igiene, vestirsi) in un ambiente sereno e non medicalizzato, con attività sociali e ricreative.',
    ideale: 'Anziani che hanno bisogno di aiuto nelle attività quotidiane ma non necessitano di cure mediche intensive. Perfetta per chi cerca sicurezza e compagnia.',
    costo: '€1.800 - €2.800/mese',
    servizi: ['Assistenza di base', 'Pasti e pulizie', 'Attività ricreative', 'Sorveglianza'],
    attenzione: [
      'Verifica quali servizi sono inclusi nella retta base',
      'Chiedi informazioni sulle attività sociali organizzate',
      'Controlla la flessibilità degli orari di visita',
      'Informati su cosa succede se le condizioni di salute peggiorano'
    ]
  },
  'Casa Famiglia': {
    icon: '👨‍👩‍👧',
    nome: 'Casa Famiglia',
    descrizione: 'La Casa Famiglia è una piccola struttura (6-12 ospiti) che offre un ambiente domestico e familiare. È come vivere in una grande casa con altre persone, con qualcuno che si prende cura di tutti come in una vera famiglia.',
    ideale: 'Anziani autosufficienti o con lievi necessità assistenziali che soffrono di solitudine e cercano compagnia in un ambiente caldo e accogliente.',
    costo: '€1.400 - €2.200/mese',
    servizi: ['Ambiente familiare', 'Pasti casalinghi', 'Compagnia', 'Assistenza leggera'],
    attenzione: [
      'Conosci gli altri ospiti: la convivenza è fondamentale',
      'Verifica le qualifiche del personale',
      'Chiedi come vengono gestite eventuali emergenze sanitarie',
      'Assicurati che ci sia flessibilità nelle regole della casa'
    ]
  }
};

const C = {
  cta: '#F49898',
  accent: '#9C89B8',
  accentDark: '#7B6B9E',
  accentSoft: '#F4F0F9',
  bg: '#FFFBF4',
  card: '#FFFFFF',
  text: '#3D3D3D',
  textMedium: '#5A5A5A',
  textLight: '#8A8A8A',
  border: '#EDE8E3',
  success: '#6BBF8A',
  successLight: '#E8F5EC',
};

export default function AccudireAdvisor() {
  const [page, setPage] = useState('form');
  const [step, setStep] = useState(1);
  const [results, setResults] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [recommendedType, setRecommendedType] = useState('Casa di Riposo');
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(null);
  
  // Autocomplete città
  const [cittaInput, setCittaInput] = useState('');
  const [cittaSuggestions, setCittaSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  
  const [form, setForm] = useState({
    citta: '', cittaLat: null, cittaLng: null, raggio: 50, urgenza: '', nomeAnziano: '', eta: '', autonomia: '',
    patologie: [], servizi: [], budgetMin: 1500, budgetMax: 3500,
    camera: '', giardino: false, animali: false, situazione: '',
    nome: '', email: '', telefono: '', privacy: false
  });
  
  // Lista città locali come fallback
  const CITTA_LOCALI = [
    { name: 'Bologna', provincia: 'Bologna', regione: 'Emilia-Romagna', lat: 44.4949, lng: 11.3426, display: 'Bologna, Bologna' },
    { name: 'Modena', provincia: 'Modena', regione: 'Emilia-Romagna', lat: 44.6471, lng: 10.9252, display: 'Modena, Modena' },
    { name: 'Reggio Emilia', provincia: 'Reggio Emilia', regione: 'Emilia-Romagna', lat: 44.6989, lng: 10.6297, display: 'Reggio Emilia, Reggio Emilia' },
    { name: 'Parma', provincia: 'Parma', regione: 'Emilia-Romagna', lat: 44.8015, lng: 10.3279, display: 'Parma, Parma' },
    { name: 'Ferrara', provincia: 'Ferrara', regione: 'Emilia-Romagna', lat: 44.8381, lng: 11.6198, display: 'Ferrara, Ferrara' },
    { name: 'Ravenna', provincia: 'Ravenna', regione: 'Emilia-Romagna', lat: 44.4184, lng: 12.2035, display: 'Ravenna, Ravenna' },
    { name: 'Rimini', provincia: 'Rimini', regione: 'Emilia-Romagna', lat: 44.0678, lng: 12.5695, display: 'Rimini, Rimini' },
    { name: 'Forlì', provincia: 'Forlì-Cesena', regione: 'Emilia-Romagna', lat: 44.2227, lng: 12.0408, display: 'Forlì, Forlì-Cesena' },
    { name: 'Cesena', provincia: 'Forlì-Cesena', regione: 'Emilia-Romagna', lat: 44.1391, lng: 12.2464, display: 'Cesena, Forlì-Cesena' },
    { name: 'Piacenza', provincia: 'Piacenza', regione: 'Emilia-Romagna', lat: 45.0526, lng: 9.6930, display: 'Piacenza, Piacenza' },
    { name: 'Carpi', provincia: 'Modena', regione: 'Emilia-Romagna', lat: 44.7833, lng: 10.8833, display: 'Carpi, Modena' },
    { name: 'Imola', provincia: 'Bologna', regione: 'Emilia-Romagna', lat: 44.3533, lng: 11.7141, display: 'Imola, Bologna' },
    { name: 'Correggio', provincia: 'Reggio Emilia', regione: 'Emilia-Romagna', lat: 44.7667, lng: 10.7833, display: 'Correggio, Reggio Emilia' },
    { name: 'Milano', provincia: 'Milano', regione: 'Lombardia', lat: 45.4642, lng: 9.1900, display: 'Milano, Milano' },
    { name: 'Roma', provincia: 'Roma', regione: 'Lazio', lat: 41.9028, lng: 12.4964, display: 'Roma, Roma' },
    { name: 'Firenze', provincia: 'Firenze', regione: 'Toscana', lat: 43.7696, lng: 11.2558, display: 'Firenze, Firenze' },
    { name: 'Torino', provincia: 'Torino', regione: 'Piemonte', lat: 45.0703, lng: 7.6869, display: 'Torino, Torino' },
    { name: 'Verona', provincia: 'Verona', regione: 'Veneto', lat: 45.4384, lng: 10.9916, display: 'Verona, Verona' },
    { name: 'Padova', provincia: 'Padova', regione: 'Veneto', lat: 45.4064, lng: 11.8768, display: 'Padova, Padova' },
    { name: 'Venezia', provincia: 'Venezia', regione: 'Veneto', lat: 45.4408, lng: 12.3155, display: 'Venezia, Venezia' },
  ];
  
  // Ricerca locale come fallback
  const searchCittaLocale = (query) => {
    const q = query.toLowerCase().trim();
    return CITTA_LOCALI.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.provincia.toLowerCase().includes(q)
    ).slice(0, 5);
  };
  
  // Fetch città da OpenStreetMap con fallback locale
  const searchCitta = async (query) => {
    if (query.length < 2) {
      setCittaSuggestions([]);
      return;
    }
    
    // Prima prova fallback locale
    const localResults = searchCittaLocale(query);
    if (localResults.length > 0) {
      setCittaSuggestions(localResults);
    }
    
    setLoadingSuggestions(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&country=italy&format=json&addressdetails=1&limit=5&featuretype=city`,
        { headers: { 'Accept-Language': 'it' } }
      );
      const data = await response.json();
      
      const cities = data
        .filter(item => item.address && (item.address.city || item.address.town || item.address.village || item.address.municipality))
        .map(item => ({
          name: item.address.city || item.address.town || item.address.village || item.address.municipality,
          provincia: item.address.county || item.address.province || '',
          regione: item.address.state || '',
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          display: `${item.address.city || item.address.town || item.address.village || item.address.municipality}${item.address.county ? ', ' + item.address.county : ''}`
        }));
      
      // Rimuovi duplicati
      const unique = cities.filter((city, index, self) => 
        index === self.findIndex(c => c.name === city.name && c.provincia === city.provincia)
      );
      
      if (unique.length > 0) {
        setCittaSuggestions(unique);
      }
    } catch (error) {
      console.error('Errore ricerca città, uso fallback locale:', error);
      // Mantieni i risultati locali già impostati
    }
    setLoadingSuggestions(false);
  };
  
  // Debounce per non chiamare API ad ogni tasto
  const debounceRef = React.useRef(null);
  const handleCittaInput = (value) => {
    setCittaInput(value);
    setShowSuggestions(true);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchCitta(value), 300);
  };
  
  const selectCitta = (city) => {
    setCittaInput(city.display);
    setForm(prev => ({ 
      ...prev, 
      citta: city.name,
      cittaLat: city.lat,
      cittaLng: city.lng
    }));
    setShowSuggestions(false);
    setCittaSuggestions([]);
  };

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const toggleArray = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };

  const canProceed = () => {
    switch(step) {
      case 1: return form.citta.trim() !== '' && form.cittaLat !== null;
      case 2: return form.urgenza !== '';
      case 3: return form.eta !== '' && form.autonomia !== '';
      case 7: return form.nome && form.email && form.privacy;
      default: return true;
    }
  };

  const determineRecommendedType = () => {
    const needAlzheimer = form.patologie.includes('alzheimer') || form.servizi.includes('alzheimer');
    const needH24 = form.servizi.includes('h24');
    const isNonAuto = form.autonomia === 'nonAuto';
    const isAuto = form.autonomia === 'autosufficiente';
    
    if (needAlzheimer || needH24 || isNonAuto) return 'RSA';
    if (isAuto && !needH24) return 'Casa Famiglia';
    return 'Casa di Riposo';
  };

  const calculateMatching = () => {
    // Usa le coordinate selezionate dall'autocomplete
    if (!form.cittaLat || !form.cittaLng) return [];
    
    const coords = { lat: form.cittaLat, lng: form.cittaLng };
    const raggioConBuffer = form.raggio * 1.2; // +20% buffer sulla distanza

    const needAlzheimer = form.patologie.includes('alzheimer') || form.servizi.includes('alzheimer');
    const needH24 = form.servizi.includes('h24');
    const needFisio = form.servizi.includes('fisioterapia');
    const recType = determineRecommendedType();
    setRecommendedType(recType);

    return STRUTTURE.map(s => {
      const dist = getDistance(coords.lat, coords.lng, s.lat, s.lng);
      
      // Filtri esclusione
      if (dist > raggioConBuffer) return null; // Distanza con +20% buffer
      if (s.prezzoMin > form.budgetMax * 1.2) return null; // Budget +20%

      // Scoring
      let score = 0;
      
      // Distanza (25%) - calcolato sul raggio originale
      const distScore = Math.max(0, 25 - (dist / form.raggio) * 25);
      score += distScore;
      
      // Budget (30%)
      const avgPrezzo = (s.prezzoMin + s.prezzoMax) / 2;
      const avgBudget = (form.budgetMin + form.budgetMax) / 2;
      const budgetDiff = Math.abs(avgPrezzo - avgBudget) / avgBudget;
      score += Math.max(0, 30 - budgetDiff * 30);
      
      // Tipo struttura (20%)
      if (s.tipo === recType) score += 20;
      
      // Servizi matching (15%)
      let serviziScore = 0;
      if (needAlzheimer && s.alzheimer) serviziScore += 7;
      if (needH24 && s.h24) serviziScore += 5;
      if (needFisio && s.fisioterapia) serviziScore += 3;
      score += serviziScore;
      
      // Preferenze (10%)
      if (form.giardino && s.giardino) score += 5;
      if (form.animali && s.animali) score += 5;

      return { ...s, dist: Math.round(dist), score: Math.round(Math.min(100, score)) };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 10);
  };

  const sendToGoogleSheet = async (formData, resultsData) => {
    try {
      const payload = {
        citta: formData.citta,
        raggio: formData.raggio,
        urgenza: formData.urgenza,
        eta: formData.eta,
        autonomia: formData.autonomia,
        patologie: formData.patologie.join(', '),
        servizi: formData.servizi.join(', '),
        budgetMin: formData.budgetMin,
        budgetMax: formData.budgetMax,
        camera: formData.camera,
        giardino: formData.giardino ? 'Sì' : 'No',
        animali: formData.animali ? 'Sì' : 'No',
        situazione: formData.situazione,
        nome: formData.nome,
        email: formData.email,
        telefono: formData.telefono,
        struttureCount: resultsData.length,
        topMatch: resultsData.length > 0 ? `${resultsData[0].nome} (${resultsData[0].score}%)` : 'Nessuna'
      };

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Errore invio a Google Sheet:', error);
    }
  };

  const handleSubmit = () => {
    setPage('loading');
    setTimeout(() => {
      const matchedResults = calculateMatching();
      setResults(matchedResults);
      
      // Invia lead a Google Sheet
      sendToGoogleSheet(form, matchedResults);
      
      setPage('results');
    }, 2000);
  };

  const reset = () => {
    setPage('form'); setStep(1); setResults([]); setShowAll(false);
    setCittaInput(''); setCittaSuggestions([]); setShowSuggestions(false);
    setForm({ citta: '', cittaLat: null, cittaLng: null, raggio: 50, urgenza: '', nomeAnziano: '', eta: '', autonomia: '', patologie: [], servizi: [], budgetMin: 1500, budgetMax: 3500, camera: '', giardino: false, animali: false, situazione: '', nome: '', email: '', telefono: '', privacy: false });
  };

  const StepIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
      {[1,2,3,4,5,6,7].map(s => (
        <div key={s} style={{ width: s === step ? 32 : 10, height: 10, borderRadius: 5, backgroundColor: s <= step ? C.accent : C.border, transition: 'all 0.3s' }} />
      ))}
    </div>
  );

  const Option = ({ selected, onClick, children }) => (
    <button onClick={onClick} style={{ padding: '16px 20px', borderRadius: 14, border: `2px solid ${selected ? C.accent : C.border}`, backgroundColor: selected ? C.accentSoft : C.card, cursor: 'pointer', textAlign: 'left', width: '100%' }}>
      <span style={{ fontWeight: 600, color: selected ? C.accent : C.text }}>{children}</span>
    </button>
  );

  const Chip = ({ selected, onClick, children }) => (
    <button onClick={onClick} style={{ padding: '10px 18px', borderRadius: 20, border: `2px solid ${selected ? C.accent : C.border}`, backgroundColor: selected ? C.accentSoft : C.card, cursor: 'pointer', fontWeight: 600, fontSize: 14, color: selected ? C.accent : C.text }}>{children}</button>
  );

  const tipoInfo = TIPO_INFO[recommendedType];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: "'Nunito', system-ui, sans-serif" }}>
      
      <header style={{ backgroundColor: C.card, borderBottom: `1px solid ${C.border}`, padding: '12px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="https://www.accudire.it"><img src={LOGO} alt="Accudire.it" style={{ height: 48 }} /></a>
          {page === 'results' && <button onClick={reset} style={{ color: C.accent, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>← Nuova ricerca</button>}
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>

        {/* === FORM === */}
        {page === 'form' && (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: C.text, marginBottom: 12 }}>
                Ti aiutiamo a prenderti cura<br /><span style={{ color: C.accent }}>di chi ami</span>
              </h1>
              <p style={{ color: C.textMedium, fontSize: 16 }}>Rispondi a poche domande e troveremo insieme la soluzione migliore</p>
            </div>

            <div style={{ backgroundColor: C.card, borderRadius: 24, padding: '32px', boxShadow: '0 4px 24px rgba(156,137,184,0.1)', border: `1px solid ${C.border}` }}>
              <StepIndicator />

              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>📍 Dove cerchi?</h2>
                  <p style={{ color: C.textLight, marginBottom: 24 }}>Indica la zona ideale per il tuo caro</p>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Città di riferimento</label>
                  <div style={{ position: 'relative', marginBottom: 24 }}>
                    <input 
                      type="text" 
                      placeholder="Inizia a scrivere una città..." 
                      value={cittaInput} 
                      onChange={(e) => handleCittaInput(e.target.value)}
                      onFocus={() => cittaSuggestions.length > 0 && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      style={{ width: '100%', padding: 16, borderRadius: 14, border: `2px solid ${form.cittaLat ? C.success : C.border}`, fontSize: 16, boxSizing: 'border-box', backgroundColor: C.bg }} 
                    />
                    {form.cittaLat && (
                      <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: C.success, fontSize: 20 }}>✓</span>
                    )}
                    
                    {/* Dropdown suggestions */}
                    {showSuggestions && (cittaSuggestions.length > 0 || loadingSuggestions) && (
                      <div style={{ 
                        position: 'absolute', top: '100%', left: 0, right: 0, 
                        backgroundColor: C.card, borderRadius: 14, marginTop: 4,
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: `1px solid ${C.border}`,
                        zIndex: 100, overflow: 'hidden'
                      }}>
                        {loadingSuggestions ? (
                          <div style={{ padding: 16, textAlign: 'center', color: C.textLight }}>
                            Ricerca in corso...
                          </div>
                        ) : (
                          cittaSuggestions.map((city, i) => (
                            <button
                              key={i}
                              onClick={() => selectCitta(city)}
                              style={{
                                width: '100%', padding: '14px 16px', border: 'none',
                                backgroundColor: 'transparent', cursor: 'pointer',
                                textAlign: 'left', borderBottom: i < cittaSuggestions.length - 1 ? `1px solid ${C.border}` : 'none',
                                transition: 'background-color 0.15s'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = C.accentSoft}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                              <div style={{ fontWeight: 600, color: C.text, marginBottom: 2 }}>{city.name}</div>
                              <div style={{ fontSize: 13, color: C.textLight }}>{city.provincia}{city.regione ? `, ${city.regione}` : ''}</div>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Raggio di ricerca: {form.raggio} km</label>
                  <input type="range" min="10" max="100" step="5" value={form.raggio} onChange={(e) => updateForm('raggio', parseInt(e.target.value))} style={{ width: '100%', accentColor: C.accent }} />
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>⏰ Quanto è urgente?</h2>
                  <p style={{ color: C.textLight, marginBottom: 24 }}>Questo ci aiuta a trovare strutture con disponibilità</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Option selected={form.urgenza === 'immediata'} onClick={() => updateForm('urgenza', 'immediata')}>🚨 Immediata — Entro 1 mese</Option>
                    <Option selected={form.urgenza === 'breve'} onClick={() => updateForm('urgenza', 'breve')}>📅 Breve termine — 1-3 mesi</Option>
                    <Option selected={form.urgenza === 'pianificazione'} onClick={() => updateForm('urgenza', 'pianificazione')}>🗓️ Pianificazione — Più di 3 mesi</Option>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>👤 Parlaci del tuo caro</h2>
                  <p style={{ color: C.textLight, marginBottom: 24 }}>Queste informazioni ci aiutano a trovare la struttura più adatta</p>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Età</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                    {['65-74', '75-84', '85-94', '95+'].map(e => <Chip key={e} selected={form.eta === e} onClick={() => updateForm('eta', e)}>{e} anni</Chip>)}
                  </div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Livello di autonomia</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Option selected={form.autonomia === 'autosufficiente'} onClick={() => updateForm('autonomia', 'autosufficiente')}>✓ Autosufficiente — Riesce a fare quasi tutto da solo</Option>
                    <Option selected={form.autonomia === 'parziale'} onClick={() => updateForm('autonomia', 'parziale')}>🤝 Parzialmente autosufficiente — Ha bisogno di aiuto</Option>
                    <Option selected={form.autonomia === 'nonAuto'} onClick={() => updateForm('autonomia', 'nonAuto')}>🏥 Non autosufficiente — Necessita assistenza continua</Option>
                  </div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, marginTop: 20, color: C.text }}>Patologie specifiche (opzionale)</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {['Alzheimer', 'Parkinson', 'Diabete', 'Problemi cardiaci', 'Post-ictus', 'Altro'].map(p => <Chip key={p} selected={form.patologie.includes(p.toLowerCase())} onClick={() => toggleArray('patologie', p.toLowerCase())}>{p}</Chip>)}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>🏥 Quali servizi sono importanti?</h2>
                  <p style={{ color: C.textLight, marginBottom: 24 }}>Seleziona tutto ciò che serve al tuo caro</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { id: 'h24', icon: '👩‍⚕️', label: 'Infermiere H24', desc: 'Assistenza infermieristica sempre disponibile' },
                      { id: 'fisioterapia', icon: '💪', label: 'Fisioterapia', desc: 'Riabilitazione e mantenimento motorio' },
                      { id: 'alzheimer', icon: '🧠', label: 'Nucleo Alzheimer', desc: 'Reparto specializzato per demenze' },
                      { id: 'palliative', icon: '💜', label: 'Cure palliative', desc: 'Assistenza per malati terminali' }
                    ].map(s => (
                      <button key={s.id} onClick={() => toggleArray('servizi', s.id)} style={{ padding: '16px 20px', borderRadius: 14, border: `2px solid ${form.servizi.includes(s.id) ? C.accent : C.border}`, backgroundColor: form.servizi.includes(s.id) ? C.accentSoft : C.card, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ fontSize: 28 }}>{s.icon}</span>
                        <div>
                          <p style={{ fontWeight: 700, color: form.servizi.includes(s.id) ? C.accent : C.text }}>{s.label}</p>
                          <p style={{ fontSize: 13, color: C.textLight }}>{s.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>💰 Qual è il budget mensile?</h2>
                  <p style={{ color: C.textLight, marginBottom: 24 }}>Indica il range che puoi sostenere</p>
                  <div style={{ backgroundColor: C.bg, borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 20 }}>
                    <p style={{ fontSize: 32, fontWeight: 800, color: C.accent }}>€{form.budgetMin} - €{form.budgetMax}</p>
                    <p style={{ fontSize: 14, color: C.textLight }}>al mese</p>
                  </div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Minimo: €{form.budgetMin}</label>
                  <input type="range" min="1000" max="4000" step="100" value={form.budgetMin} onChange={(e) => updateForm('budgetMin', Math.min(parseInt(e.target.value), form.budgetMax - 200))} style={{ width: '100%', accentColor: C.accent, marginBottom: 20 }} />
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Massimo: €{form.budgetMax}</label>
                  <input type="range" min="1500" max="5000" step="100" value={form.budgetMax} onChange={(e) => updateForm('budgetMax', Math.max(parseInt(e.target.value), form.budgetMin + 200))} style={{ width: '100%', accentColor: C.accent }} />
                </div>
              )}

              {step === 6 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>✨ Preferenze aggiuntive</h2>
                  <p style={{ color: C.textLight, marginBottom: 24 }}>Dettagli che possono fare la differenza</p>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, color: C.text }}>Tipo di camera</label>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                    <Option selected={form.camera === 'singola'} onClick={() => updateForm('camera', 'singola')}>🛏️ Singola</Option>
                    <Option selected={form.camera === 'doppia'} onClick={() => updateForm('camera', 'doppia')}>🛏️🛏️ Doppia</Option>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                    <button onClick={() => updateForm('giardino', !form.giardino)} style={{ padding: '16px 20px', borderRadius: 14, border: `2px solid ${form.giardino ? C.accent : C.border}`, backgroundColor: form.giardino ? C.accentSoft : C.card, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: 24 }}>🌳</span>
                      <span style={{ fontWeight: 600, color: form.giardino ? C.accent : C.text }}>Giardino o spazio esterno</span>
                    </button>
                    <button onClick={() => updateForm('animali', !form.animali)} style={{ padding: '16px 20px', borderRadius: 14, border: `2px solid ${form.animali ? C.accent : C.border}`, backgroundColor: form.animali ? C.accentSoft : C.card, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: 24 }}>🐕</span>
                      <span style={{ fontWeight: 600, color: form.animali ? C.accent : C.text }}>Ammessi animali domestici</span>
                    </button>
                  </div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Vuoi raccontarci qualcos'altro?</label>
                  <textarea placeholder="Qualsiasi dettaglio utile..." value={form.situazione} onChange={(e) => updateForm('situazione', e.target.value)} rows={4}
                    style={{ width: '100%', padding: 16, borderRadius: 14, border: `2px solid ${C.border}`, fontSize: 16, boxSizing: 'border-box', resize: 'none', backgroundColor: C.bg }} />
                </div>
              )}

              {step === 7 && (
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 8 }}>📬 Come possiamo contattarti?</h2>
                  <p style={{ color: C.textLight, marginBottom: 24 }}>Per inviarti i risultati e restare a disposizione</p>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Il tuo nome *</label>
                  <input type="text" placeholder="Mario Rossi" value={form.nome} onChange={(e) => updateForm('nome', e.target.value)}
                    style={{ width: '100%', padding: 16, borderRadius: 14, border: `2px solid ${C.border}`, fontSize: 16, boxSizing: 'border-box', marginBottom: 16, backgroundColor: C.bg }} />
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Email *</label>
                  <input type="email" placeholder="mario@email.com" value={form.email} onChange={(e) => updateForm('email', e.target.value)}
                    style={{ width: '100%', padding: 16, borderRadius: 14, border: `2px solid ${C.border}`, fontSize: 16, boxSizing: 'border-box', marginBottom: 16, backgroundColor: C.bg }} />
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: C.text }}>Telefono (opzionale)</label>
                  <input type="tel" placeholder="+39 333 1234567" value={form.telefono} onChange={(e) => updateForm('telefono', e.target.value)}
                    style={{ width: '100%', padding: 16, borderRadius: 14, border: `2px solid ${C.border}`, fontSize: 16, boxSizing: 'border-box', marginBottom: 24, backgroundColor: C.bg }} />
                  
                  {/* Privacy checkbox */}
                  <div style={{ 
                    backgroundColor: C.bg, 
                    borderRadius: 14, 
                    padding: 20, 
                    border: `1px solid ${form.privacy ? C.success : C.border}`,
                    transition: 'border-color 0.2s'
                  }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={form.privacy || false} 
                        onChange={(e) => updateForm('privacy', e.target.checked)}
                        style={{ 
                          width: 22, height: 22, marginTop: 2, accentColor: C.accent,
                          cursor: 'pointer', flexShrink: 0
                        }} 
                      />
                      <span style={{ fontSize: 14, color: C.textMedium, lineHeight: 1.6 }}>
                        Le tue informazioni sono confidenziali e protette dalla normativa sulla privacy. 
                        Selezionando questa casella, accetti i termini sulla protezione della privacy che puoi consultare{' '}
                        <a 
                          href="https://www.accudire.it/privacy-policy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: C.accent, fontWeight: 600, textDecoration: 'underline' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          qui
                        </a>.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                {step > 1 ? <button onClick={() => setStep(step - 1)} style={{ padding: '14px 24px', borderRadius: 12, border: `2px solid ${C.border}`, backgroundColor: C.card, color: C.text, fontWeight: 600, cursor: 'pointer' }}>← Indietro</button> : <div />}
                {step < 7 ? (
                  <button onClick={() => setStep(step + 1)} disabled={!canProceed()} style={{ padding: '14px 32px', borderRadius: 12, backgroundColor: canProceed() ? C.accent : C.border, color: 'white', fontWeight: 700, cursor: canProceed() ? 'pointer' : 'not-allowed', border: 'none' }}>Continua →</button>
                ) : (
                  <button onClick={handleSubmit} disabled={!canProceed()} style={{ padding: '14px 32px', borderRadius: 12, backgroundColor: canProceed() ? C.cta : C.border, color: 'white', fontWeight: 700, cursor: canProceed() ? 'pointer' : 'not-allowed', border: 'none', boxShadow: canProceed() ? `0 4px 20px ${C.cta}50` : 'none' }}>Trova strutture →</button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* === LOADING === */}
        {page === 'loading' && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ width: 100, height: 100, margin: '0 auto 24px', borderRadius: '50%', backgroundColor: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 48 }}>💜</span></div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 8 }}>Stiamo cercando le strutture migliori...</h2>
            <p style={{ color: C.textMedium }}>Analizziamo le opzioni con i tuoi criteri</p>
          </div>
        )}

        {/* === RESULTS === */}
        {page === 'results' && (
          <div>
            {/* La tua ricerca */}
            <div style={{ background: `linear-gradient(135deg, ${C.bg} 0%, ${C.accentSoft} 100%)`, borderRadius: 24, padding: 28, marginBottom: 24, border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${C.accent} 0%, ${C.accentDark} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 24 }}>🔍</span></div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text }}>La tua ricerca</h3>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                <div style={{ backgroundColor: C.card, borderRadius: 14, padding: 14, textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: C.textLight }}>📍 Zona</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{form.citta}</p>
                  <p style={{ fontSize: 12, color: C.textLight }}>entro {form.raggio} km</p>
                </div>
                <div style={{ backgroundColor: C.card, borderRadius: 14, padding: 14, textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: C.textLight }}>👤 Età</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{form.eta} anni</p>
                </div>
                <div style={{ backgroundColor: C.card, borderRadius: 14, padding: 14, textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: C.textLight }}>💰 Budget</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.text }}>€{form.budgetMin}-{form.budgetMax}</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {form.urgenza === 'immediata' && <span style={{ padding: '6px 14px', borderRadius: 20, backgroundColor: '#FEE2E2', fontSize: 13, color: '#DC2626', fontWeight: 600 }}>🚨 Urgente</span>}
                {form.servizi.includes('h24') && <span style={{ padding: '6px 14px', borderRadius: 20, backgroundColor: C.successLight, fontSize: 13, color: C.success, fontWeight: 600 }}>👩‍⚕️ H24</span>}
                {form.servizi.includes('alzheimer') && <span style={{ padding: '6px 14px', borderRadius: 20, backgroundColor: C.successLight, fontSize: 13, color: C.success, fontWeight: 600 }}>🧠 Alzheimer</span>}
                {form.giardino && <span style={{ padding: '6px 14px', borderRadius: 20, backgroundColor: C.successLight, fontSize: 13, color: C.success, fontWeight: 600 }}>🌳 Giardino</span>}
              </div>
            </div>

            {/* Strutture trovate */}
            <div style={{ backgroundColor: C.card, borderRadius: 24, padding: 32, marginBottom: 24, border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: C.text }}>🏠 Abbiamo trovato {results.length} strutture</h3>
                  <p style={{ fontSize: 14, color: C.textLight }}>Ordinate per compatibilità con le tue esigenze</p>
                </div>
              </div>

              {results.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <p style={{ color: C.textMedium }}>Non abbiamo trovato strutture con questi criteri. Prova ad ampliare il raggio o il budget.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {(showAll ? results : results.slice(0, 5)).map((s, i) => (
                    <div key={s.id} style={{ backgroundColor: C.bg, borderRadius: 16, padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div>
                          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                            <span style={{ backgroundColor: C.accent, color: 'white', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>#{i + 1}</span>
                            <span style={{ backgroundColor: C.card, color: C.accent, padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>{s.tipo}</span>
                          </div>
                          <h4 style={{ fontSize: 17, fontWeight: 700, color: C.text }}>{s.nome}</h4>
                          <p style={{ fontSize: 13, color: C.textLight }}>{s.citta} • {s.dist} km • €{s.prezzoMin}-{s.prezzoMax}/mese</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '10px 14px', backgroundColor: s.score >= 70 ? C.successLight : C.accentSoft, borderRadius: 12 }}>
                          <div style={{ fontSize: 22, fontWeight: 800, color: s.score >= 70 ? C.success : C.accent }}>{s.score}%</div>
                          <div style={{ fontSize: 10, color: C.textLight }}>match</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: expandedEmail === s.id ? 12 : 0 }}>
                        <a href={`tel:${s.telefono}`} style={{ padding: '10px 18px', backgroundColor: C.cta, color: 'white', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>📞 Chiama</a>
                        <button 
                          onClick={() => setExpandedEmail(expandedEmail === s.id ? null : s.id)}
                          style={{ 
                            padding: '10px 18px', 
                            backgroundColor: expandedEmail === s.id ? C.accentSoft : C.card, 
                            color: expandedEmail === s.id ? C.accent : C.text, 
                            borderRadius: 10, 
                            fontWeight: 600, 
                            fontSize: 13, 
                            border: `1px solid ${expandedEmail === s.id ? C.accent : C.border}`,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          ✉️ Email {expandedEmail === s.id ? '▲' : '▼'}
                        </button>
                        <a href={s.sito} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 18px', backgroundColor: C.card, color: C.text, borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: 13, border: `1px solid ${C.border}` }}>🌐 Sito</a>
                      </div>
                      
                      {/* Email espansa */}
                      {expandedEmail === s.id && (
                        <div style={{ 
                          backgroundColor: C.card, 
                          borderRadius: 10, 
                          padding: 14, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          border: `1px solid ${C.border}`,
                          marginTop: 8
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 18 }}>📧</span>
                            <a href={`mailto:${s.email}`} style={{ color: C.accent, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>{s.email}</a>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(s.email);
                              setCopiedEmail(s.id);
                              setTimeout(() => setCopiedEmail(null), 2000);
                            }}
                            style={{
                              padding: '8px 14px',
                              backgroundColor: copiedEmail === s.id ? C.successLight : C.bg,
                              color: copiedEmail === s.id ? C.success : C.text,
                              borderRadius: 8,
                              border: `1px solid ${copiedEmail === s.id ? C.success : C.border}`,
                              fontWeight: 600,
                              fontSize: 13,
                              cursor: 'pointer'
                            }}
                          >
                            {copiedEmail === s.id ? '✓ Copiata!' : 'Copia'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {results.length > 5 && !showAll && (
                    <button onClick={() => setShowAll(true)} style={{ padding: 14, backgroundColor: 'transparent', borderRadius: 12, border: `2px dashed ${C.border}`, color: C.accent, fontWeight: 600, cursor: 'pointer' }}>Mostra tutte le {results.length} strutture ↓</button>
                  )}
                </div>
              )}
            </div>

            {/* Tipo struttura consigliato - SPOSTATO SOTTO */}
            <div style={{ backgroundColor: C.card, borderRadius: 24, padding: 32, marginBottom: 24, border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 72, height: 72, borderRadius: 20, background: `linear-gradient(135deg, ${C.accent} 0%, ${C.accentDark} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>{tipoInfo.icon}</div>
                <div>
                  <p style={{ fontSize: 14, color: C.textLight, marginBottom: 4 }}>Perché ti consigliamo</p>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: C.text }}>{tipoInfo.nome}</h2>
                </div>
              </div>

              <div style={{ backgroundColor: C.accentSoft, borderRadius: 16, padding: 20, marginBottom: 20 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: C.accent, marginBottom: 10 }}>📖 Cos'è</h4>
                <p style={{ fontSize: 15, color: C.textMedium, lineHeight: 1.7 }}>{tipoInfo.descrizione}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div style={{ backgroundColor: C.bg, borderRadius: 16, padding: 20 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 10 }}>✓ Ideale per</h4>
                  <p style={{ fontSize: 14, color: C.textMedium, lineHeight: 1.6 }}>{tipoInfo.ideale}</p>
                </div>
                <div style={{ backgroundColor: C.bg, borderRadius: 16, padding: 20 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 10 }}>💰 Costo medio</h4>
                  <p style={{ fontSize: 24, fontWeight: 800, color: C.accent, marginBottom: 8 }}>{tipoInfo.costo}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {tipoInfo.servizi.map((s, i) => <span key={i} style={{ fontSize: 12, color: C.textLight, backgroundColor: C.card, padding: '4px 10px', borderRadius: 8 }}>{s}</span>)}
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#FEF3C7', borderRadius: 16, padding: 20 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#B8860B', marginBottom: 12 }}>⚠️ A cosa prestare attenzione</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {tipoInfo.attenzione.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: '#B8860B', fontWeight: 700 }}>•</span>
                      <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.5 }}>{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agevolazioni - 2 colonne */}
            <div style={{ backgroundColor: C.card, borderRadius: 24, padding: 32, marginBottom: 24, border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: C.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>💰</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: C.text }}>Agevolazioni economiche</h3>
                  <p style={{ fontSize: 14, color: C.textLight }}>Potresti avere diritto a questi aiuti</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ backgroundColor: C.bg, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Indennità di accompagnamento</h4>
                    <span style={{ fontSize: 18, fontWeight: 800, color: C.success }}>€531/mese</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.textMedium, marginBottom: 12 }}>Per invalidi civili 100% con necessità di assistenza continua.</p>
                  <div style={{ backgroundColor: C.card, borderRadius: 10, padding: 12 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: 6 }}>📋 Come richiederla:</p>
                    <ol style={{ fontSize: 12, color: C.textMedium, paddingLeft: 16, margin: 0, lineHeight: 1.8 }}>
                      <li>Certificato medico dal medico di base</li>
                      <li>Domanda all'INPS (tramite patronato)</li>
                      <li>Visita della commissione ASL</li>
                    </ol>
                  </div>
                </div>

                <div style={{ backgroundColor: C.bg, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Contributo ASL (convenzione)</h4>
                    <span style={{ fontSize: 18, fontWeight: 800, color: C.success }}>50-70%</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.textMedium, marginBottom: 12 }}>L'ASL copre parte della retta per posti convenzionati.</p>
                  <div style={{ backgroundColor: C.card, borderRadius: 10, padding: 12 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: 6 }}>📋 Come richiederlo:</p>
                    <ol style={{ fontSize: 12, color: C.textMedium, paddingLeft: 16, margin: 0, lineHeight: 1.8 }}>
                      <li>Richiedi valutazione UVG all'ASL</li>
                      <li>Presenta l'ISEE sociosanitario</li>
                      <li>Attendi assegnazione posto</li>
                    </ol>
                  </div>
                </div>

                <div style={{ backgroundColor: C.bg, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Bonus anziani 2025</h4>
                    <span style={{ fontSize: 18, fontWeight: 800, color: C.success }}>fino €850/mese</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.textMedium, marginBottom: 12 }}>Per over 80, non autosufficienti, con ISEE sotto €6.000.</p>
                  <div style={{ backgroundColor: C.card, borderRadius: 10, padding: 12 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: 6 }}>📋 Come richiederlo:</p>
                    <ol style={{ fontSize: 12, color: C.textMedium, paddingLeft: 16, margin: 0, lineHeight: 1.8 }}>
                      <li>Verifica i requisiti sul sito INPS</li>
                      <li>Presenta domanda online o tramite patronato</li>
                      <li>Allega ISEE e certificazione sanitaria</li>
                    </ol>
                  </div>
                </div>

                <div style={{ backgroundColor: C.bg, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Detrazione fiscale 19%</h4>
                    <span style={{ fontSize: 18, fontWeight: 800, color: C.success }}>fino €2.100</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.textMedium, marginBottom: 12 }}>Sulle spese sanitarie e di assistenza in struttura.</p>
                  <div style={{ backgroundColor: C.card, borderRadius: 10, padding: 12 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: 6 }}>📋 Come richiederla:</p>
                    <ol style={{ fontSize: 12, color: C.textMedium, paddingLeft: 16, margin: 0, lineHeight: 1.8 }}>
                      <li>Conserva tutte le fatture della struttura</li>
                      <li>Inserisci le spese nel 730 o Unico</li>
                      <li>Recuperi il 19% nella dichiarazione</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Consulenza */}
            <div style={{ backgroundColor: C.card, borderRadius: 24, padding: 32, marginBottom: 24, border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${C.cta} 0%, ${C.accent} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🤝</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: C.text }}>Hai bisogno di aiuto?</h3>
                  <p style={{ fontSize: 14, color: C.textLight }}>I nostri esperti possono guidarti passo passo</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div style={{ backgroundColor: C.successLight, borderRadius: 16, padding: 20, border: `2px solid ${C.success}` }}>
                  <span style={{ backgroundColor: C.success, color: 'white', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>GRATUITA</span>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: C.text, marginTop: 10, marginBottom: 8 }}>Mini Consulenza</h4>
                  <p style={{ fontSize: 28, fontWeight: 800, color: C.success, marginBottom: 8 }}>€0</p>
                  <p style={{ fontSize: 13, color: C.textMedium, marginBottom: 12 }}>15 minuti per orientarti nella scelta</p>
                  <a href="https://calendly.com/accudire" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', backgroundColor: C.success, color: 'white', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Prenota gratis</a>
                </div>

                <div style={{ backgroundColor: C.accentSoft, borderRadius: 16, padding: 20, border: `2px solid ${C.accent}` }}>
                  <span style={{ backgroundColor: C.accent, color: 'white', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>CONSIGLIATA</span>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: C.text, marginTop: 10, marginBottom: 8 }}>Consulenza Avanzata</h4>
                  <p style={{ fontSize: 28, fontWeight: 800, color: C.accent, marginBottom: 8 }}>€49</p>
                  <p style={{ fontSize: 13, color: C.textMedium, marginBottom: 12 }}>60 min + report PDF personalizzato</p>
                  <a href="https://buy.stripe.com/accudire" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', backgroundColor: C.accent, color: 'white', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Prenota ora</a>
                </div>

                <div style={{ backgroundColor: '#FFF7ED', borderRadius: 16, padding: 20, border: `2px solid #F59E0B` }}>
                  <span style={{ backgroundColor: '#F59E0B', color: 'white', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>TUTTO INCLUSO</span>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: C.text, marginTop: 10, marginBottom: 8 }}>Family Care</h4>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#F59E0B', marginBottom: 8 }}>€79<span style={{ fontSize: 14 }}>/anno</span></p>
                  <p style={{ fontSize: 13, color: C.textMedium, marginBottom: 12 }}>Assistenza illimitata + 2 consulenze</p>
                  <a href="https://buy.stripe.com/accudire-family" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', backgroundColor: '#F59E0B', color: 'white', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Attiva ora</a>
                </div>
              </div>
            </div>

            {/* CTA WhatsApp */}
            <div style={{ backgroundColor: C.cta, borderRadius: 24, padding: 32, textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Preferisci scriverci subito?</h3>
              <p style={{ opacity: 0.95, marginBottom: 20 }}>Siamo disponibili su WhatsApp per qualsiasi domanda</p>
              <a href="https://wa.me/393520681027" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', backgroundColor: 'white', color: C.cta, borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>💬 Scrivici su WhatsApp</a>
            </div>
          </div>
        )}
      </main>

      <footer style={{ borderTop: `1px solid ${C.border}`, marginTop: 48, padding: '32px 24px', textAlign: 'center', backgroundColor: C.card }}>
        <img src={LOGO} alt="Accudire.it" style={{ height: 40, marginBottom: 12 }} />
        <p style={{ color: C.textLight, fontSize: 13 }}>© 2025 Accudire.it — Ti aiutiamo a prenderti cura di chi ami</p>
      </footer>
    </div>
  );
}
