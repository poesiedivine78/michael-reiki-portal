
import React, { useEffect, useState, useRef, useMemo } from 'react';
import CustomCursor from './components/CustomCursor';
import NebulaBackground from './components/NebulaBackground';
import Orb from './components/Orb';
import { SERVICES, FULL_TEXTS, COLORS, BIO_STORY, CHAKRAS, LINEAGE, SOUL_QUIZ, BLOG_POSTS } from './constants';
import { Sparkles, Star, ChevronUp, Menu, X, CheckCircle2, Volume2, VolumeX, ArrowRight, Calendar, Clock, Send, Instagram, Facebook, Youtube } from 'lucide-react';

const useReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return { ref, isVisible };
};

const RevealSection: React.FC<{ children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }> = ({ children, className, id, style }) => {
  const { ref, isVisible } = useReveal();
  return (
    <section 
      id={id} 
      ref={ref} 
      style={style}
      className={`${className} transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-20 blur-xl'}`}
    >
      {children}
    </section>
  );
};

const NavLink = ({ href, children, onClick }: { href: string, children?: React.ReactNode, onClick?: () => void }) => (
  <a 
    href={href} 
    onClick={(e) => {
      if (onClick) onClick();
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    className="hover:text-[#C084FC] transition-colors duration-300 py-2 cursor-pointer"
  >
    {children}
  </a>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedChakra, setSelectedChakra] = useState<typeof CHAKRAS[0] | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizResults, setQuizResults] = useState<string[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<typeof LINEAGE[0] | null>(null);
  const [activeStoryChapter, setActiveStoryChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const reversedChakras = useMemo(() => [...CHAKRAS].reverse(), []);

  const storyThemes = useMemo(() => [
    { primary: 'rgba(2, 6, 23, 0.4)', accent: '#3B82F6', intensity: 0.1 },    // Origin
    { primary: 'rgba(15, 23, 42, 0.5)', accent: '#C084FC', intensity: 0.15 }, // Miracle
    { primary: 'rgba(2, 6, 23, 0.7)', accent: '#3B82F6', intensity: 0.1 },    // Rupture
    { primary: 'rgba(15, 23, 42, 0.5)', accent: '#8B5CF6', intensity: 0.2 },  // Accompagnement
    { primary: 'rgba(40, 10, 80, 0.7)', accent: '#C084FC', intensity: 0.4 },  // Awakening
    { primary: 'rgba(2, 6, 23, 0.6)', accent: '#3B82F6', intensity: 0.15 },   // Signature
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowScrollTop(currentScrollY > 400);
      setScrollProgress(currentScrollY);

      if (audioRef.current && isAudioPlaying) {
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = currentScrollY / pageHeight;
        audioRef.current.volume = Math.min(0.05 + (scrollPercent * 0.15), 0.3);
      }

      const viewportCenter = window.innerHeight / 2;
      storyRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
            setActiveStoryChapter(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAudioPlaying]);

  const handleQuizOption = (result: string) => {
    const newResults = [...quizResults, result];
    setQuizResults(newResults);
    if (quizStep < SOUL_QUIZ.questions.length - 1) setQuizStep(quizStep + 1);
    else setQuizStep(quizStep + 1);
  };

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3');
      audioRef.current.loop = true;
    }
    if (isAudioPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(console.error);
    setIsAudioPlaying(!isAudioPlaying);
  };

  const currentTheme = storyThemes[activeStoryChapter] || storyThemes[0];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleChakraClick = (chakra: typeof CHAKRAS[0]) => {
    setSelectedChakra(chakra);
    if (window.innerWidth < 1024 && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const chakraIndex = selectedChakra ? reversedChakras.findIndex(c => c.name === selectedChakra.name) : -1;
  const descriptionY = chakraIndex !== -1 ? (chakraIndex * 89) : 0; 

  const scrollToContact = () => {
    const contact = document.querySelector('#contact');
    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`relative text-white selection:bg-[#C084FC] selection:text-black min-h-screen ${mobileMenuOpen ? 'overflow-hidden' : ''}`}>
      <CustomCursor />
      <NebulaBackground />

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          onClick={toggleMobileMenu}
        />
        <div 
          className={`absolute right-0 top-0 h-full w-[85%] max-sm glass border-l border-white/10 flex flex-col p-10 transition-transform duration-500 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <Star className="text-[#C084FC] w-6 h-6" />
              <span className="font-black tracking-[0.2em] text-xs uppercase">Menu Stellaire</span>
            </div>
            <button onClick={toggleMobileMenu} className="text-[#C084FC] p-2 hover:bg-white/5 rounded-full transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-8 text-xl font-black uppercase tracking-[0.3em]">
            {[
              { name: 'Histoire', id: '#bio' },
              { name: 'Soins', id: '#services' },
              { name: 'Lignée', id: '#lineage' },
              { name: 'Journal', id: '#journal' },
              { name: 'Contact', id: '#contact' }
            ].map((item, idx) => (
              <div 
                key={item.name} 
                className="transition-all duration-500"
                style={{ 
                  transitionDelay: `${idx * 100}ms`,
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                  opacity: mobileMenuOpen ? 1 : 0
                }}
              >
                <NavLink href={item.id} onClick={toggleMobileMenu}>
                  {item.name}
                </NavLink>
              </div>
            ))}
            <div 
              className="mt-10 transition-all duration-500"
              style={{ 
                transitionDelay: '600ms',
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0
              }}
            >
              <button 
                onClick={() => { toggleMobileMenu(); setQuizOpen(true); }}
                className="w-full py-6 bg-[#C084FC] text-black rounded-3xl font-black text-sm tracking-widest uppercase shadow-2xl"
              >
                S'éveiller
              </button>
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-white/10 text-center">
             <Star className="text-[#C084FC] w-6 h-6 mx-auto opacity-40 animate-pulse" />
             <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold mt-6">Starseed Cosmic Angel</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 left-8 z-[60] hidden md:block">
        <button onClick={() => setQuizOpen(true)} className="glass group px-6 py-4 rounded-full border-[#C084FC]/30 flex items-center gap-4 hover:border-[#C084FC] transition-all hover:scale-105 shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-[#C084FC] flex items-center justify-center text-black shadow-[0_0_20px_rgba(192,132,252,0.5)]"><Sparkles size={18} /></div>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Parcours de l'Âme</p>
            <p className="text-[8px] text-[#C084FC] uppercase tracking-widest opacity-70">Trouver mon soin idéal</p>
          </div>
        </button>
      </div>

      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
        <button onClick={toggleAudio} className="w-12 h-12 glass rounded-full flex items-center justify-center text-[#C084FC] border-[#C084FC]/30 hover:scale-110 shadow-2xl transition-transform">
          {isAudioPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
        </button>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`w-12 h-12 glass rounded-full flex items-center justify-center text-[#C084FC] border-[#C084FC]/30 transition-all ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
          <ChevronUp size={24} />
        </button>
      </div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 py-4 ${scrolled ? 'glass py-3 border-b border-[#C084FC]/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Star className="text-[#C084FC] w-6 h-6" />
            <div className="flex flex-col">
              <span className="font-black tracking-[0.3em] text-xs uppercase">Michael Furtak</span>
              <span className="text-[8px] text-[#C084FC] uppercase tracking-[0.4em]">Maître Reiki</span>
            </div>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em]">
            <NavLink href="#bio">Histoire</NavLink>
            <NavLink href="#services">Soins</NavLink>
            <NavLink href="#lineage">Lignée</NavLink>
            <NavLink href="#journal">Journal</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <button onClick={() => setQuizOpen(true)} className="px-6 py-2 bg-[#C084FC] text-black rounded-full hover:scale-110 transition-all shadow-[0_0_15px_rgba(192,132,252,0.3)] ml-4">S'éveiller</button>
          </div>
          <button onClick={toggleMobileMenu} className="md:hidden text-[#C084FC] p-2 hover:bg-white/5 rounded-full transition-colors"><Menu size={24} /></button>
        </div>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
          <Orb color={COLORS.violet} size="min(95vw, 850px)" />
        </div>
        <RevealSection className="z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#C084FC]/40 bg-black/40 backdrop-blur-md mb-12">
            <Sparkles size={14} className="text-[#C084FC]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C084FC]">Fréquence Stellaire</span>
          </div>
          <h1 className="text-5xl md:text-[110px] font-black mb-12 tracking-tighter leading-tight bg-gradient-to-b from-white to-[#8B5CF6] bg-clip-text text-transparent">{FULL_TEXTS.hero.title}</h1>
          <p className="text-xl md:text-3xl serif-quote italic text-white/70 mb-16 max-w-4xl mx-auto leading-relaxed px-4">"{FULL_TEXTS.hero.subtitle}"</p>
          <button onClick={() => setQuizOpen(true)} className="px-16 py-8 bg-[#C084FC] text-black font-black rounded-full hover:scale-105 transition-all uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(192,132,252,0.3)]">Découvrir mon Énergie</button>
        </RevealSection>
      </section>

      <RevealSection id="services" className="py-40 relative px-6 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out -z-10"
          style={{
            background: selectedChakra 
              ? `radial-gradient(circle at 30% 50%, ${selectedChakra.color}1a 0%, transparent 70%), linear-gradient(to bottom, transparent, #0F172A10, transparent)` 
              : 'linear-gradient(to bottom, transparent, #0F172A40, transparent)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-none">Soins <span className="text-[#C084FC]">Vibratoires</span></h2>
            <div className="w-24 h-[1px] bg-[#C084FC] mx-auto opacity-50"></div>
          </div>
          
          <div className="mb-32 glass p-10 md:p-20 rounded-[60px] md:rounded-[80px] border-[#C084FC]/20 relative overflow-hidden shadow-2xl">
             <div className="grid lg:grid-cols-2 gap-20 items-start">
                <div className="flex flex-col items-center py-10 order-1" onMouseLeave={() => setSelectedChakra(null)}>
                  <div className="flex flex-col items-center gap-6">
                    {reversedChakras.map((chakra) => (
                      <div key={chakra.name} onMouseEnter={() => setSelectedChakra(chakra)} onClick={() => handleChakraClick(chakra)} className="relative">
                        <Orb color={chakra.color} size="65px" interactive={true} label={chakra.name} description={chakra.meaning} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-12 text-center lg:text-left order-2 h-full flex flex-col pt-10 lg:pt-0">
                  <div className="transition-all duration-700 ease-out" style={{ 
                    transform: window.innerWidth >= 1024 && chakraIndex !== -1 ? `translateY(${descriptionY}px)` : 'none' 
                  }}>
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#3B82F6]">Exploration Énergétique</span>
                    <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-none mt-4">Alignement <span className="text-[#C084FC]">Cosmique</span></h3>
                    <div 
                      ref={descriptionRef}
                      className="mt-12 min-h-[220px] bg-white/5 p-10 rounded-3xl border border-white/10 flex flex-col justify-center italic serif-quote text-2xl md:text-3xl text-white/90 leading-relaxed shadow-inner"
                    >
                      {selectedChakra ? (
                        <div className="animate-in fade-in duration-500">
                          <span className="font-black uppercase tracking-widest text-lg mb-4 block" style={{ color: selectedChakra.color }}>
                            {selectedChakra.name}
                          </span>
                          "{selectedChakra.meaning}. Ce centre est vital pour votre équilibre énergétique."
                        </div>
                      ) : "Effleurez un centre pour révéler sa sagesse..."}
                    </div>
                  </div>
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {SERVICES.map((s, idx) => (
              <div key={idx} className="group glass p-12 md:p-16 rounded-[60px] transition-all hover:border-[#C084FC]/60 hover:shadow-2xl hover:scale-[1.02] duration-500">
                <span className="text-[11px] font-black tracking-[0.4em] uppercase text-[#3B82F6]">{s.subtitle}</span>
                <h3 className="text-4xl md:text-6xl font-black my-8 leading-tight">{s.title}</h3>
                <ul className="space-y-4 mb-12">
                  {s.benefits.map((b, i) => <li key={i} className="flex items-center gap-5 font-bold text-white/80"><CheckCircle2 className="text-[#C084FC] flex-shrink-0" size={20} /> {b}</li>)}
                </ul>
                <div className="flex flex-col sm:flex-row justify-between items-center pt-10 border-t border-white/10 gap-6">
                  <span className="text-5xl md:text-6xl font-black">{s.price}</span>
                  <button onClick={scrollToContact} className="w-full sm:w-auto px-10 py-5 bg-[#C084FC] text-black font-black rounded-3xl text-sm uppercase tracking-widest hover:bg-white transition-colors">Réserver</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <section id="bio" className="py-40 relative px-6 min-h-screen overflow-visible">
        <div 
          className="absolute inset-0 -z-10 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{ 
            backgroundColor: currentTheme.primary,
            boxShadow: `inset 0 0 400px ${currentTheme.accent}${Math.floor(currentTheme.intensity * 255).toString(16).padStart(2, '0')}`
          }}
        >
          <div 
            className="absolute inset-0 opacity-40 blur-[150px] transition-all duration-1000"
            style={{ 
              background: `radial-gradient(circle, ${currentTheme.accent} 0%, transparent 70%)`,
              transform: `scale(${1 + currentTheme.intensity})`
            }}
          />
          <div className={`stars-vibrant transition-opacity duration-1000 ${activeStoryChapter === 4 ? 'opacity-100' : 'opacity-20'}`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-center text-4xl md:text-[100px] font-black mb-56 uppercase tracking-tighter leading-none">Mon <span className="text-[#C084FC]">Histoire</span></h2>
          
          <div className="space-y-96">
            {BIO_STORY.map((chapter, idx) => (
              <div 
                key={idx} 
                ref={el => storyRefs.current[idx] = el} 
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-24 lg:gap-32 items-center`}
              >
                <div className="lg:w-1/2 relative group w-full">
                  <div className="rounded-[60px] overflow-hidden border border-white/10 shadow-3xl h-[450px] md:h-[600px] relative">
                    <img 
                      src={chapter.images[0]} 
                      alt={chapter.title} 
                      className="absolute w-full h-[140%] object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                      style={{ 
                        top: '-20%', 
                        transform: `translateY(${(scrollProgress / 10) % 50}px)` 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 glass px-10 py-3 rounded-full border-[#C084FC]/30 z-20 shadow-xl">
                    <span className="text-[10px] font-black text-[#C084FC] tracking-[0.4em] uppercase">{chapter.phase}</span>
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
                  <h3 className="text-3xl md:text-6xl font-black leading-none uppercase tracking-tighter text-white">{chapter.title}</h3>
                  <div className="w-20 h-1 bg-[#C084FC] mx-auto lg:mx-0 opacity-40"></div>
                  <p className="text-xl md:text-3xl text-white/80 leading-relaxed font-light italic serif-quote lg:border-l-4 border-[#C084FC]/20 lg:pl-12">
                    "{chapter.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RevealSection id="lineage" className="py-40 bg-black/40 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-8xl font-black uppercase mb-32 tracking-tighter">Sagesse <span className="text-[#C084FC]">Ancestrale</span></h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {LINEAGE.map((item, idx) => (
              <div key={idx} onClick={() => setSelectedMaster(item)} className="group cursor-pointer flex flex-col items-center max-w-[150px]">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full glass border-2 border-[#3B82F6]/30 overflow-hidden group-hover:border-[#C084FC] group-hover:scale-110 transition-all duration-500 shadow-2xl mb-8">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all" />
                </div>
                <h4 className="text-lg font-black uppercase group-hover:text-[#C084FC] transition-colors tracking-widest">{item.name}</h4>
                <p className="text-[10px] text-white/40 uppercase font-black mt-2">{item.role}</p>
              </div>
            ))}
          </div>
          
          {selectedMaster && (
            <div className="mt-24 glass p-12 md:p-16 rounded-[50px] border-[#C084FC]/40 max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center animate-in slide-in-from-bottom-10 relative">
              <button onClick={() => setSelectedMaster(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"><X size={32} /></button>
              <img src={selectedMaster.image} className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-[#C084FC]/20 object-cover shadow-2xl" alt={selectedMaster.name} />
              <div className="text-left space-y-6 flex-1">
                <h5 className="text-3xl md:text-5xl font-black text-[#C084FC] uppercase tracking-tighter">{selectedMaster.name}</h5>
                <p className="text-xl italic serif-quote text-white/80 leading-relaxed">"{selectedMaster.story}"</p>
              </div>
            </div>
          )}
        </div>
      </RevealSection>

      {/* SECTION JOURNAL (BLOG) */}
      <RevealSection id="journal" className="py-40 relative px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-none">Journal <span className="text-[#C084FC]">Stellaire</span></h2>
            <p className="text-white/50 uppercase tracking-[0.4em] text-xs font-bold">Réflexions, Sagesse & Éveil</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post, idx) => (
              <div key={idx} className="group glass rounded-[40px] overflow-hidden flex flex-col border-white/5 hover:border-[#C084FC]/40 transition-all duration-500 hover:scale-[1.03]">
                <div className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#3B82F6]">
                    <span>{post.category}</span>
                    <span className="flex items-center gap-2"><Clock size={12}/> {post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-black leading-tight group-hover:text-[#C084FC] transition-colors">{post.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed flex-1 italic">"{post.excerpt}"</p>
                  <div className="pt-6 flex justify-between items-center border-t border-white/5">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{post.date}</span>
                    <button className="text-[#C084FC] font-black uppercase text-[10px] tracking-widest flex items-center gap-2 group/btn">
                      Lire <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* SECTION CONTACT */}
      <RevealSection id="contact" className="py-40 relative px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[11px] font-black tracking-[0.4em] uppercase text-[#C084FC]">Sanctuaire de Communication</span>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">Échangeons <br/> de <span className="text-[#3B82F6]">Lumière</span></h2>
              </div>
              <p className="text-xl md:text-2xl text-white/70 italic serif-quote leading-relaxed border-l-2 border-[#C084FC]/30 pl-8">
                "Prêt à entamer votre voyage vers l'équilibre ? Posez vos intentions ici, je vous répondrai au rythme des étoiles."
              </p>
              
              <div className="flex gap-8">
                <a href="#" className="w-14 h-14 glass rounded-full flex items-center justify-center text-white/50 hover:text-[#C084FC] hover:border-[#C084FC] transition-all"><Instagram size={24}/></a>
                <a href="#" className="w-14 h-14 glass rounded-full flex items-center justify-center text-white/50 hover:text-[#C084FC] hover:border-[#C084FC] transition-all"><Facebook size={24}/></a>
                <a href="#" className="w-14 h-14 glass rounded-full flex items-center justify-center text-white/50 hover:text-[#C084FC] hover:border-[#C084FC] transition-all"><Youtube size={24}/></a>
              </div>
            </div>

            <div className="glass p-12 md:p-16 rounded-[60px] border-[#C084FC]/20 shadow-2xl">
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Nom Stellaire</label>
                  <input type="text" placeholder="Comment vous appelez-vous ?" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-[#C084FC] focus:bg-white/10 outline-none transition-all placeholder:text-white/20 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Fréquence (Email)</label>
                  <input type="email" placeholder="votre-ame@univers.com" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-[#C084FC] focus:bg-white/10 outline-none transition-all placeholder:text-white/20 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Votre Message</label>
                  <textarea rows={4} placeholder="Dites-moi tout ce qui vibre en vous..." className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-[#C084FC] focus:bg-white/10 outline-none transition-all placeholder:text-white/20 font-bold resize-none"></textarea>
                </div>
                <button className="w-full py-8 bg-[#C084FC] text-black font-black rounded-3xl uppercase tracking-widest text-sm shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-4">
                  Envoyer mon intention <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </RevealSection>

      {quizOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#020617]/95 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="glass max-w-2xl w-full p-12 md:p-20 rounded-[60px] border-[#C084FC]/30 relative text-center shadow-[0_0_50px_rgba(192,132,252,0.15)]">
            <button onClick={() => setQuizOpen(false)} className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"><X size={32} /></button>
            {quizStep < SOUL_QUIZ.questions.length ? (
              <div className="space-y-12 animate-in slide-in-from-bottom-10">
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">{SOUL_QUIZ.questions[quizStep].text}</h3>
                <div className="grid gap-6">
                  {SOUL_QUIZ.questions[quizStep].options.map((opt, i) => (
                    <button key={i} onClick={() => handleQuizOption(opt.result)} className="p-8 glass rounded-3xl text-left hover:border-[#C084FC] hover:bg-[#C084FC]/5 transition-all flex justify-between items-center group">
                      <span className="text-xl font-bold uppercase tracking-widest">{opt.label}</span>
                      <ArrowRight className="group-hover:translate-x-2 transition-transform text-[#C084FC]" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-12 animate-in zoom-in-95">
                <div className="w-24 h-24 rounded-full bg-[#C084FC] flex items-center justify-center mx-auto shadow-2xl animate-bounce"><Sparkles size={40} className="text-black" /></div>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Votre Sanctuaire</h3>
                <p className="text-xl md:text-2xl italic serif-quote text-white/70">"Votre vibration appelle le <span className="text-[#C084FC] font-bold">Reiki {quizResults[quizResults.length-1]}</span>. Votre éveil commence ici."</p>
                <button onClick={() => setQuizOpen(false)} className="px-12 py-6 bg-[#C084FC] text-black font-black rounded-full uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform">Prendre son envol</button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="py-32 border-t border-white/5 bg-[#020617] text-center px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#C084FC] to-transparent opacity-40"></div>
        <Star className="text-[#C084FC] w-12 h-12 mx-auto mb-16 opacity-60 animate-pulse" />
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 mb-20 text-[11px] font-black tracking-[0.5em] uppercase text-white/60">
          <NavLink href="#bio">Histoire</NavLink>
          <NavLink href="#services">Soins</NavLink>
          <NavLink href="#lineage">Lignée</NavLink>
          <NavLink href="#journal">Journal</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
        <div className="space-y-4">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">&copy; 2025 Michael Furtak — Sanctuaire de Lumière Énergétique — Starseed Cosmic Angel.</p>
          <p className="text-[8px] text-white/10 uppercase tracking-[1em] font-black">Celestial Harmony Systems</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
