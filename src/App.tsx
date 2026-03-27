import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './components/AnimatedSection'
import ProjectCard from './components/ProjectCard'
import SocialIcons from './components/SocialIcons'
import LetterLoader from './components/LetterLoader'
import CursorDot from './components/CursorDot'
import AndersonPontes from './assets/profile-pic.png'
import LexPge from './assets/lex.png'
import Sida from './assets/sida.png'
import BuscaDoe from './assets/buscadoe.png'
import Sigescon from './assets/sigescon.png'

/* ─── data ─────────────────────────────────────────────── */

const NAV_ITEMS = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'impacto', label: 'Impacto' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'skills', label: 'Skills' },
    { id: 'formacao', label: 'Formação' },
    { id: 'contato', label: 'Contato' },
]

const METRICS = [
    { value: '+300%', label: 'Retorno sobre valores protestados', sub: 'Projeto SIDA · PGE-PA' },
    { value: 'Prêmio Inova', label: 'Reconhecimento institucional', sub: 'PGE-PA 2024' },
    { value: '2 Portarias', label: 'Elogios no Diário Oficial', sub: 'LEXPGE 2.0 · SIDA' },
]

const STACK = ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker']

const SKILL_CLUSTERS = [
    {
        title: 'Front-End',
        skills: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'TailwindCSS', 'Shadcn/ui', 'Zod'],
    },
    {
        title: 'Back-End & Dados',
        skills: ['Python (FastAPI)', 'PostgreSQL', 'MySQL', 'Docker', 'REST APIs'],
    },
    {
        title: 'DevOps & Infra',
        skills: ['Git', 'GitHub', 'Docker', 'Linux', 'CI/CD'],
    },
    {
        title: 'IA & Analytics',
        skills: ['Machine Learning', 'Data Science', 'Elasticsearch', 'N8N'],
        studying: true,
    },
]

const EDUCATION = [
    { degree: 'MBA em Data Science e Analytics', institution: 'USP/Esalq', period: 'Em andamento' },
    { degree: 'Especialização em Engenharia de Software', institution: 'Faculdade Focus', period: 'Concluído' },
    { degree: 'Pós-graduação em Informática na Educação', institution: 'IFMA', period: 'Concluído' },
    { degree: 'Análise e Desenvolvimento de Sistemas', institution: 'Estácio', period: 'Concluído' },
]

const IMPACTS = [
    {
        name: 'LEXPGE 2.0',
        desc: 'Atuação como um dos principais desenvolvedores na base oficial de consulta legislativa do Estado do Pará. Trabalho reconhecido com portaria de elogio publicada no Diário Oficial.',
        link: { href: 'https://lex.pge.pa.gov.br/#/texto-integral/20560', label: 'Ver portaria' },
        
    },
    {
        name: 'SIDA — Sistema de Inteligência da Dívida Ativa',
        desc: 'Participação ativa no sistema de gestão de CDAs, resultando em +300% de retorno sobre valores protestados. Conquistou o Prêmio Inova PGE 2024.',
        link: { href: 'https://lex.pge.pa.gov.br/#/texto-integral/22767', label: 'Ver portaria' },
        
    },
    {
        name: 'SIGESCON',
        desc: 'Plataforma completa para gestão de contratos com back-end em FastAPI e front-end em React. Arquitetura orientada a alta performance e manutenibilidade.',
        link: null,
        demo: null,
    },
    {
        name: 'JURIMETRIA PGE-PA',
        desc: 'Sistema de análise de dados jurídicos: arquitetura de APIs, configuração de servidores Linux e interfaces com editores avançados para redação de peças jurídicas.',
        link: null,
        demo: null,
    },
    {
        name: 'BuscaDOE',
        desc: 'Sistema de download e indexação diária do Diário Oficial em Elasticsearch, viabilizando buscas textuais em tempo real sobre publicações oficiais do Estado.',
        link: null,
        demo: null,
    },
]

/* ─── shared primitives ─────────────────────────────────── */

const FlatCard = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
    <div
        className={`bg-surface-1 border border-surface-border rounded-xl ${className}`}
        style={{
            boxShadow:
                '0 1px 2px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
    >
        {children}
    </div>
)

const PageBackground = () => (
    <>
        <div
            aria-hidden="true"
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
                backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
                backgroundSize: '64px 64px',
            }}
        />
        <div
            aria-hidden="true"
            className="fixed inset-0 z-0 pointer-events-none opacity-[0.022]"
            style={{
                backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: '200px 200px',
            }}
        />
    </>
)

/* ─── App ───────────────────────────────────────────────── */

const App = () => {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40)
            const pos = window.scrollY + 140
            const ids = ['home', ...NAV_ITEMS.map((n) => n.id)]
            for (const id of ids) {
                const el = document.getElementById(id)
                if (!el) continue
                if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
                    setActiveSection(id)
                    break
                }
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setMenuOpen(false)
    }

    return (
        <div className="min-h-screen bg-surface-base text-ink-primary relative">
            <LetterLoader />
            <CursorDot />
            <PageBackground />

            {/* ── NAV ── */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-surface-base/80 backdrop-blur-xl border-b border-surface-border/60'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <button
                        onClick={() => scrollTo('home')}
                        className="font-mono text-sm text-ink-muted hover:text-accent transition-colors"
                    >
                        ap.dev
                    </button>

                    <div className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className={`text-sm transition-colors relative ${
                                    activeSection === item.id
                                        ? 'text-ink-primary'
                                        : 'text-ink-muted hover:text-ink-secondary'
                                }`}
                            >
                                {item.label}
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-ink-secondary"
                        aria-label="Abrir menu"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-surface-1/95 backdrop-blur-xl border-t border-surface-border px-6 py-4 space-y-4"
                        >
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`block w-full text-left text-sm py-1 ${
                                        activeSection === item.id ? 'text-ink-primary' : 'text-ink-muted'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* ── HERO ── */}
            <section id="home" className="min-h-screen flex items-center pt-20 relative z-10">
                <div className="container mx-auto px-6 py-16 grid lg:grid-cols-[13fr_7fr] gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.2, 0.65, 0.3, 0.95] }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted border border-surface-border rounded-full px-4 py-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-badge-pulse" aria-hidden="true" />
                            Disponível para projetos estratégicos · 2026
                        </div>

                        <h1 className="font-display text-5xl md:text-6xl xl:text-[4.5rem] leading-[1.06] tracking-tight text-ink-primary">
                            Engenharia que gera{' '}
                            <em className="not-italic text-accent">resultado</em>{' '}
                            institucional.
                        </h1>

                        <p className="text-ink-secondary text-lg leading-relaxed max-w-xl">
                            Anderson Pontes — Desenvolvedor Full Stack na PGE-PA, construindo sistemas
                            críticos com{' '}
                            <code className="font-mono text-sm text-accent bg-surface-2 px-1.5 py-0.5 rounded">
                                React + TypeScript
                            </code>{' '}
                            e{' '}
                            <code className="font-mono text-sm text-accent bg-surface-2 px-1.5 py-0.5 rounded">
                                Python / FastAPI
                            </code>
                            . De ponta a ponta: da arquitetura à entrega.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {STACK.map((s) => (
                                <span
                                    key={s}
                                    className="font-mono text-xs text-ink-muted border border-surface-border bg-surface-1 rounded px-3 py-1.5"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-1">
                            <motion.button
                                onClick={() => scrollTo('contato')}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-7 py-3.5 bg-accent text-surface-base font-semibold rounded-lg text-sm hover:bg-accent-light transition-colors"
                            >
                                Iniciar conversa
                            </motion.button>
                            <motion.button
                                onClick={() => scrollTo('projetos')}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-7 py-3.5 border border-surface-border text-ink-secondary font-medium rounded-lg text-sm hover:border-accent/40 hover:text-ink-primary transition-all inline-flex items-center gap-2"
                            >
                                Ver projetos{' '}
                                <span aria-hidden="true" className="text-accent">
                                    ↗
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.85, delay: 0.2, ease: 'easeOut' }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            <div
                                className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-surface-border"
                                style={{
                                    boxShadow:
                                        '0 2px 4px rgba(0,0,0,0.8), 0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
                                }}
                            >
                                <img
                                    src={AndersonPontes}
                                    alt="Foto de Anderson Pontes, Desenvolvedor Full Stack"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                className="absolute -bottom-2.5 -right-2.5 w-full h-full rounded-2xl border border-accent/20"
                                aria-hidden="true"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── METRICS BAR ── */}
            <div aria-label="Números de impacto" className="relative z-10 border-t border-b border-surface-border/60">
                <AnimatedSection>
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {METRICS.map((m, i) => (
                                <div
                                    key={m.value}
                                    className={[
                                        'py-8 px-6',
                                        i < 2 ? 'md:border-r border-surface-border/60' : '',
                                        i > 0 ? 'border-t md:border-t-0 border-surface-border/60' : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                >
                                    <p className="font-display text-3xl text-accent mb-1">{m.value}</p>
                                    <p className="text-ink-secondary text-sm">{m.label}</p>
                                    <p className="text-ink-muted text-xs mt-1 font-mono">{m.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            {/* ── SOBRE ── */}
            <section id="sobre" className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <p className="font-mono text-xs text-ink-muted mb-3 uppercase tracking-widest">
                            // sobre
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl text-ink-primary mb-14">
                            De ponta a ponta:{' '}
                            <span className="text-ink-secondary">da arquitetura à entrega.</span>
                        </h2>
                    </AnimatedSection>

                    <div className="grid lg:grid-cols-[3fr_2fr] gap-16">
                        <AnimatedSection delay={0.1} className="space-y-5 text-ink-secondary leading-relaxed text-base">
                            <p>
                                Desenvolvedor Full Stack com sólida experiência na criação de aplicações web
                                robustas e eficientes, focado em interfaces intuitivas e APIs de alta performance.
                                Atuo desde a prototipação de interfaces até a implantação em servidores Linux —
                                com visão de produto e foco em resultado institucional.
                            </p>
                            <p>
                                Na PGE-PA, lidero e participo do desenvolvimento de sistemas críticos utilizados
                                por centenas de servidores públicos, modernizando processos jurídicos e
                                administrativos com tecnologia de ponta e boas práticas de engenharia.
                            </p>
                            <p>
                                Sou orientado a resultados, assíduo e comprometido com otimização de processos e
                                colaboração em times ágeis. Além do código, valorizo comunicação clara e
                                aprendizado contínuo. Atualmente aprofundando estudos em Machine Learning, IA e
                                Data Science.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <p className="font-mono text-xs text-ink-muted mb-5 uppercase tracking-widest">
                                // stack principal
                            </p>
                            <div className="space-y-0">
                                {[
                                    { label: 'React + TypeScript', note: 'Front-End' },
                                    { label: 'Python / FastAPI', note: 'Back-End' },
                                    { label: 'PostgreSQL / MySQL', note: 'Banco de dados' },
                                    { label: 'TailwindCSS / Shadcn/ui', note: 'UI Kit' },
                                    { label: 'Docker', note: 'Infraestrutura' },
                                    { label: 'Git / GitHub', note: 'Versionamento' },
                                    { label: 'Elasticsearch', note: 'Busca e indexação' },
                                ].map(({ label, note }) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between py-3 border-b border-surface-border/50 last:border-0"
                                    >
                                        <code className="font-mono text-sm text-ink-primary">{label}</code>
                                        <span className="text-xs text-ink-muted">{note}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── IMPACTO ── */}
            <section id="impacto" className="py-24 relative z-10 border-t border-surface-border/40">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <p className="font-mono text-xs text-ink-muted mb-3 uppercase tracking-widest">
                            // realizações
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl text-ink-primary mb-14">
                            Principais entregas na PGE-PA
                        </h2>
                    </AnimatedSection>

                    <div className="space-y-4">
                        {IMPACTS.map((item, i) => (
                            <AnimatedSection key={item.name} delay={i * 0.06}>
                                <FlatCard className="p-6 md:p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6 hover:border-surface-3 transition-colors">
                                    <div className="flex-1">
                                        <h3 className="font-mono text-sm text-accent font-semibold mb-3">
                                            {item.name}
                                        </h3>
                                        <p className="text-ink-secondary text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                    {(item.link || item.demo) && (
                                        <div className="flex gap-6 shrink-0 items-center">
                                            
                                            {item.link && (
                                                <a
                                                    href={item.link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-mono text-ink-muted hover:text-accent transition-colors inline-flex items-center gap-1"
                                                >
                                                    {item.link.label}{' '}
                                                    <span aria-hidden="true">↗</span>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </FlatCard>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROJETOS ── */}
            <section id="projetos" className="py-24 relative z-10 border-t border-surface-border/40">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <p className="font-mono text-xs text-ink-muted mb-3 uppercase tracking-widest">
                            // projetos
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl text-ink-primary mb-14">
                            Projetos em destaque
                        </h2>
                    </AnimatedSection>

                    <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-5">
                        Institucionais
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                        <ProjectCard
                            title="LEXPGE 2.0"
                            description="Base oficial de consulta legislativa do Pará. Portaria de elogio no Diário Oficial."
                            technologies={['React', 'TypeScript', 'TailwindCSS', 'Shadcn/ui']}
                            imageUrl={LexPge}
                            demoUrl="https://lex.pge.pa.gov.br/"
                        />
                        <ProjectCard
                            title="SIDA"
                            description="+300% de retorno sobre valores protestados. Prêmio Inova PGE 2024."
                            technologies={['React', 'TypeScript', 'FastAPI', 'PostgreSQL']}
                            imageUrl={Sida}
                            demoUrl="https://sida.pge.pa.gov.br/"
                        />
                        <ProjectCard
                            title="BuscaDOE"
                            description="Indexação diária do Diário Oficial em Elasticsearch para busca textual em tempo real."
                            technologies={['React', 'TypeScript', 'Elasticsearch']}
                            imageUrl={BuscaDoe}
                            demoUrl="https://lex.pge.pa.gov.br/"
                        />
                        <ProjectCard
                            title="SIGESCON"
                            description="Gestão completa de contratos com arquitetura FastAPI + React."
                            technologies={['React', 'TypeScript', 'FastAPI', 'PostgreSQL']}
                            imageUrl={Sigescon}
                            demoUrl="https://lex.pge.pa.gov.br/"
                        />
                    </div>

                    <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-5">
                        Outros projetos
                    </p>
                    <div className="grid md:grid-cols-2 gap-5">
                        <AnimatedSection>
                            <FlatCard className="p-6 h-full hover:border-surface-3 transition-colors">
                                <h3 className="font-mono text-sm text-accent font-semibold mb-3">LICITUS</h3>
                                <p className="text-ink-secondary text-sm leading-relaxed mb-5">
                                    Sistema inteligente para contratações públicas (Lei 14.133/2021) com
                                    integração PNCP e suporte a IA para elaboração de documentos técnicos.
                                    Atuação Full Stack com módulos para fase preparatória de licitações.
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {['React', 'FastAPI', 'PostgreSQL', 'IA'].map((t) => (
                                        <span
                                            key={t}
                                            className="font-mono text-xs text-ink-muted border border-surface-border bg-surface-2 rounded px-2 py-0.5"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </FlatCard>
                        </AnimatedSection>
                        <AnimatedSection delay={0.08}>
                            <FlatCard className="p-6 h-full hover:border-surface-3 transition-colors">
                                <h3 className="font-mono text-sm text-accent font-semibold mb-3">
                                    ARQMANAGER
                                </h3>
                                <p className="text-ink-secondary text-sm leading-relaxed mb-5">
                                    Modernização de ecossistema central de gestão interna. Atuação em banco de
                                    dados, APIs (back-end) e experiência de usuário com UI/UX mais fluida e
                                    profissional com TailwindCSS.
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {['React', 'TailwindCSS', 'FastAPI', 'PostgreSQL'].map((t) => (
                                        <span
                                            key={t}
                                            className="font-mono text-xs text-ink-muted border border-surface-border bg-surface-2 rounded px-2 py-0.5"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </FlatCard>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── SKILLS ── */}
            <section id="skills" className="py-24 relative z-10 border-t border-surface-border/40">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <p className="font-mono text-xs text-ink-muted mb-3 uppercase tracking-widest">
                            // competências
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl text-ink-primary mb-14">
                            Stack e especialidades
                        </h2>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {SKILL_CLUSTERS.map((cluster, i) => (
                            <AnimatedSection key={cluster.title} delay={i * 0.08}>
                                <FlatCard className="p-6 h-full hover:border-surface-3 transition-colors">
                                    <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-5">
                                        {cluster.title}
                                        {cluster.studying && (
                                            <span className="ml-2 text-ink-muted normal-case tracking-normal">
                                                (estudando)
                                            </span>
                                        )}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cluster.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="font-mono text-xs text-ink-secondary border border-surface-border/80 bg-surface-2 rounded px-2.5 py-1"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </FlatCard>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FORMAÇÃO ── */}
            <section id="formacao" className="py-24 relative z-10 border-t border-surface-border/40">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <p className="font-mono text-xs text-ink-muted mb-3 uppercase tracking-widest">
                            // formação
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl text-ink-primary mb-14">Educação</h2>
                    </AnimatedSection>

                    <div className="relative">
                        <div
                            className="absolute left-0 top-0 bottom-0 w-px bg-surface-border hidden md:block"
                            aria-hidden="true"
                        />
                        <div className="space-y-0 md:pl-8">
                            {EDUCATION.map((edu, i) => (
                                <AnimatedSection key={edu.degree} delay={i * 0.07}>
                                    <div className="relative py-6 border-b border-surface-border/40 last:border-0">
                                        <div
                                            className="absolute -left-8 top-[1.85rem] w-1.5 h-1.5 rounded-full bg-accent hidden md:block"
                                            aria-hidden="true"
                                        />
                                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                                            <h3 className="text-ink-primary font-medium text-sm">
                                                {edu.degree}
                                            </h3>
                                            <span className="font-mono text-xs text-ink-muted shrink-0">
                                                {edu.period}
                                            </span>
                                        </div>
                                        <p className="text-ink-muted text-sm mt-1">{edu.institution}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CONTATO ── */}
            <section id="contato" className="py-24 relative z-10 border-t border-surface-border/40">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <p className="font-mono text-xs text-ink-muted mb-3 uppercase tracking-widest">
                            // contato
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl text-ink-primary mb-4">
                            Vamos construir algo relevante?
                        </h2>
                        <p className="text-ink-muted text-base mb-14 max-w-xl">
                            Disponível para projetos de alto impacto, parcerias estratégicas ou conversas
                            técnicas.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
                        <AnimatedSection delay={0.1}>
                            <div className="space-y-3">
                                <a
                                    href="https://wa.me/5598984497970?text=Ol%C3%A1%2C%20Anderson!%20Vim%20pelo%20seu%20portf%C3%B3lio."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Conversar no WhatsApp"
                                    className="flex items-center gap-4 p-4 bg-surface-1 border border-surface-border rounded-xl hover:border-accent/30 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                        <svg
                                            viewBox="0 0 32 32"
                                            className="w-5 h-5 fill-emerald-400"
                                            aria-hidden="true"
                                        >
                                            <path d="M19.11 17.52c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.33-.8-.71-1.34-1.59-1.49-1.86-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.83-1.99-.22-.53-.44-.46-.6-.47-.15-.01-.33-.01-.51-.01-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.23 0 1.32.95 2.59 1.09 2.77.13.18 1.87 2.86 4.54 4.01.64.28 1.13.44 1.52.56.64.2 1.23.17 1.69.1.51-.08 1.58-.64 1.8-1.27.22-.62.22-1.16.16-1.27-.07-.11-.24-.18-.51-.31z" />
                                            <path d="M16.02 3.2c-7.07 0-12.8 5.71-12.8 12.76 0 2.25.59 4.45 1.71 6.39L3.1 28.8l6.63-1.73a12.8 12.8 0 0 0 6.29 1.67h.01c7.06 0 12.79-5.72 12.79-12.77 0-3.42-1.34-6.63-3.79-9.05a12.72 12.72 0 0 0-9.01-3.72zm0 23.37h-.01a10.67 10.67 0 0 1-5.44-1.49l-.39-.23-3.94 1.03 1.05-3.84-.25-.39a10.58 10.58 0 0 1-1.63-5.66c0-5.89 4.81-10.68 10.72-10.68 2.86 0 5.54 1.11 7.56 3.12a10.6 10.6 0 0 1 3.16 7.56c0 5.89-4.81 10.68-10.73 10.68z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-ink-primary text-sm font-medium group-hover:text-accent transition-colors">
                                            WhatsApp
                                        </p>
                                        <p className="text-ink-muted text-xs font-mono">Resposta rápida</p>
                                    </div>
                                </a>

                                <a
                                    href="mailto:andersonpinheiro.developer@gmail.com?subject=Contato%20via%20portf%C3%B3lio"
                                    aria-label="Enviar e-mail"
                                    className="flex items-center gap-4 p-4 bg-surface-1 border border-surface-border rounded-xl hover:border-accent/30 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-surface-2 border border-surface-border flex items-center justify-center shrink-0">
                                        <svg
                                            className="w-5 h-5 text-ink-secondary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21.75 8.25v8.25A2.25 2.25 0 0119.5 18.75h-15a2.25 2.25 0 01-2.25-2.25V8.25m19.5 0A2.25 2.25 0 0019.5 6h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.912l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 10.405A2.25 2.25 0 012.25 8.493V8.25"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-ink-primary text-sm font-medium group-hover:text-accent transition-colors">
                                            E-mail
                                        </p>
                                        <p className="text-ink-muted text-xs font-mono">
                                            andersonpinheiro.developer@gmail.com
                                        </p>
                                    </div>
                                </a>

                                <p className="text-ink-muted text-xs font-mono pt-1 pl-1">
                                    Localização: Belém, Pará, Brasil
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-4">
                                // redes
                            </p>
                            <SocialIcons />
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="relative z-10 border-t border-surface-border py-8">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="font-mono text-xs text-ink-muted">
                        Anderson Pontes © {new Date().getFullYear()} — Belém, PA
                    </p>
                    <p className="font-mono text-xs text-ink-muted">
                        React · TypeScript · FastAPI · TailwindCSS
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App
