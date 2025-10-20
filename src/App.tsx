import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from './components/AnimatedText'
import AnimatedSection from './components/AnimatedSection'
import ExperienceCard from './components/ExperienceCard'
import ProjectCard from './components/ProjectCard'
import SkillBadge from './components/SkillBadge'
import SocialIcons from './components/SocialIcons'
import ParticlesBackground from './components/ParticlesBackground'
import StarField from './components/StarField'
import GlowCard from './components/GlowCard'
import AndersonPontes from './assets/profile-pic.png'
import LexPge from './assets/lex.png'
import Sida from './assets/sida.png'
import BuscaDoe from './assets/buscadoe.png'

const App = () => {
    const [activeSection, setActiveSection] = useState('home')
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'sobre', 'skills', 'projetos', 'contato']
            const scrollPosition = window.scrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const offsetTop = element.offsetTop
                    const offsetHeight = element.offsetHeight

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        setMenuOpen(false)
    }

    return (
        <div className="min-h-screen relative">
            <StarField />
            <ParticlesBackground />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl z-50 border-b border-slate-800/50"
            >
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-2xl font-bold gradient-text"
                    >
                        &lt;DEV/&gt;
                    </motion.a>

                    <div className="hidden md:flex space-x-8">
                        {['home', 'sobre', 'skills', 'projetos', 'contato'].map((item) => (
                            <motion.button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`capitalize relative ${activeSection === item
                                    ? 'text-cyan-400 font-medium'
                                    : 'text-slate-300 hover:text-cyan-400'
                                    } transition-colors`}
                            >
                                {item}
                                {activeSection === item && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 text-cyan-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900/95 backdrop-blur-xl px-6 py-4 space-y-4 border-t border-slate-800"
                    >
                        {['home', 'sobre', 'skills', 'projetos', 'contato'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className={`block w-full text-left capitalize ${activeSection === item
                                    ? 'text-cyan-400 font-medium'
                                    : 'text-slate-300 hover:text-cyan-400'
                                    } transition-colors`}
                            >
                                {item}
                            </button>
                        ))}
                    </motion.div>
                )}
            </motion.nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center pt-20 relative z-10">
                <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-4"
                        >
                            <span className="text-cyan-400 text-lg font-mono">Olá, eu sou</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            <span className="gradient-text text-glow">Anderson Pontes</span>
                        </h1>

                        <div className="mb-8">
                            <AnimatedText
                                text="Desenvolvedor Front-end"
                                className="text-3xl md:text-4xl font-bold text-slate-200"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg mb-8 text-slate-400 leading-relaxed"
                        >
                            Criando experiências digitais incríveis com <span className="text-cyan-400 font-semibold">React</span>, <span className="text-purple-400 font-semibold">Next.js</span>, <span className="text-blue-400 font-semibold">TypeScript</span> e designs modernos.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                onClick={() => scrollToSection('contato')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                            >
                                Contate-me
                            </motion.button>
                            <motion.button
                                onClick={() => scrollToSection('projetos')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all"
                            >
                                Ver Projetos
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="md:w-1/2 flex justify-center"
                    >
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            <motion.div
                                animate={{
                                    rotate: 360,
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-full blur-3xl opacity-30"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border-2 border-cyan-500/30 rounded-full"
                            />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/50">
                                <img
                                    src={AndersonPontes}
                                    alt="Anderson Pontes"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="sobre" className="py-20 relative z-10">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                            <span className="gradient-text text-glow">Sobre Mim</span>
                        </h2>
                    </AnimatedSection>

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <AnimatedSection className="md:w-1/3" delay={0.2}>
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500" />
                                <div className="relative w-full h-80 rounded-2xl overflow-hidden border-2 border-cyan-500/50">
                                    <img
                                        src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                        alt="Working"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        </AnimatedSection>

                        <AnimatedSection className="md:w-2/3" delay={0.4}>
                            <div className="space-y-6 text-slate-300 leading-relaxed">
                                <p className="text-lg">
                                    Sou <span className="text-cyan-400 font-semibold">Desenvolvedor Front-End</span> com sólida experiência na criação de aplicações web modernas, robustas e eficientes. Atualmente, estou contribuindo com a modernização tecnológica na <span className="text-purple-400 font-semibold">Procuradoria-Geral do Estado do Pará (PGE-PA)</span>.
                                </p>
                                <p className="text-lg">
                                    Graduado em <span className="text-cyan-400">Análise e Desenvolvimento de Sistemas</span> e Pós-Graduado em <span className="text-purple-400">Engenharia de Software</span> e <span className="text-pink-400">Informática na Educação</span>. Tenho forte domínio no ecossistema React/Next.js com TypeScript/Javascript.
                                </p>
                                <p className="text-lg">
                                    Trabalho com ferramentas como <span className="text-cyan-400">TailwindCSS</span>, <span className="text-purple-400">Shadcn/ui</span> e <span className="text-pink-400">Zod</span>, desenvolvendo interfaces intuitivas, acessíveis e de alta performance, sempre com foco na qualidade do código e na melhor experiência do usuário.
                                </p>
                                <p className="text-lg">
                                    Sou um profissional orientado a resultados, assíduo e comprometido com a otimização de processos e a colaboração em equipe. Busco constantemente aprimorar minhas habilidades e aplicar meus conhecimentos para gerar valor.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                                <ExperienceCard
                                    title="Desenvolvedor Front-end"
                                    company="Procuradoria-Geral do Estado do Pará"
                                    period="2022 - Presente"
                                    description="Desenvolvedor front-end de aplicações web modernas e robustas."
                                />
                                <ExperienceCard
                                    title="Gerente"
                                    company="Empresa Brasileira de Correios e Telégrafos"
                                    period="2013 - 2022"
                                    description="Responsável pela gestão operacional, administrativa e comercial da unidade"
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 relative z-10">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                            <span className="gradient-text text-glow">Minhas Habilidades</span>
                        </h2>
                    </AnimatedSection>

                    <GlowCard className="mb-12" delay={0.2}>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Tecnologias Principais</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['React', 'TypeScript', 'JavaScript', 'Next.js', 'TailwindCSS', 'UI/UX Design', 'CSS3', 'HTML5', 'Shadcn/ui', 'ZOD'].map(skill => (
                                    <SkillBadge key={skill} skill={skill} level="advanced" />
                                ))}
                            </div>
                        </div>
                    </GlowCard>

                    <GlowCard className="mb-12" delay={0.4}>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-6 text-purple-400">Ferramentas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Git', 'Docker', 'Figma', 'Webpack', 'Jest', 'PostgreSQL', 'Node.js', "N8N"].map(skill => (
                                    <SkillBadge key={skill} skill={skill} level="intermediate" />
                                ))}
                            </div>
                        </div>
                    </GlowCard>

                    <GlowCard delay={0.6}>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-6 text-pink-400">Outras Habilidades</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['SEO', 'Scrum', 'Java', 'Spring', 'Responsive Design', 'Performance'].map(skill => (
                                    <SkillBadge key={skill} skill={skill} level="basic" />
                                ))}
                            </div>
                        </div>
                    </GlowCard>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projetos" className="py-20 relative z-10">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                            <span className="gradient-text text-glow">Projetos Recentes</span>
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ProjectCard
                            title="LEXPGE 2.0"
                            description={
                                <>
                                    Atuei como desenvolvedor front-end na criação do {' '}
                                    <a
                                        href="https://lex.pge.pa.gov.br/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-400 underline hover:text-cyan-300"
                                    >
                                        LEXPGE
                                    </a>.
                                    , a base oficial de consulta
                                    legislativa do Estado do Pará. O projeto recebeu reconhecimento formal por meio de uma portaria
                                    de elogio publicada no{' '}
                                    <a
                                        href="https://lex.pge.pa.gov.br/#/texto-integral/20560"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 underline hover:text-purple-300"
                                    >
                                        Diário Oficial
                                    </a>.
                                </>
                            }
                            technologies={['React', 'Tailwindcss', 'Shadcn/ui', 'Zod']}
                            imageUrl={LexPge}
                            demoUrl="https://lex.pge.pa.gov.br/"
                        />

                        <ProjectCard
                            title="SIDA - Sistema de Inteligência da Dívida Ativa"
                            description={
                                <>
                                    Contribuí significativamente para o desenvolvimento front-end do sistema de gestão de Certidões de Dívida Ativa (CDAs), o que proporcionou um aumento de 300% no retorno financeiro sobre valores protestados.
                                    A solução foi reconhecida com o Prêmio Inova PGE 2024, conforme portaria de elogio publicada no{' '}
                                    <a
                                        href="https://lex.pge.pa.gov.br/#/texto-integral/22767"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-400 underline hover:text-cyan-300"
                                    >
                                        Diário Oficial
                                    </a>.
                                </>
                            }
                            technologies={['React', 'Tailwindcss', 'Shadcn/ui', 'Zod']}
                            imageUrl={Sida}
                            demoUrl="https://sida.pge.pa.gov.br/"
                        />

                        <ProjectCard
                            title="BuscaDOE"
                            description="Contribuí no desenvolvimento front-end do sistema de download e indexação diária do Diário Oficial do Estado em Elasticsearch."
                            technologies={['React', 'Tailwindcss', 'Shadcn/ui', 'Zod']}
                            imageUrl={BuscaDoe}
                            demoUrl="X"
                        />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contato" className="py-20 relative z-10">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                            <span className="gradient-text text-glow">Vamos Trabalhar Juntos</span>
                        </h2>
                    </AnimatedSection>

                    <div className="flex flex-col md:flex-row gap-12">
                        <AnimatedSection className="md:w-1/2" delay={0.2}>
                            <GlowCard>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-6 text-cyan-400">Entre em Contato</h3>

                                    <div className="space-y-6">
                                        {[
                                            { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'andersonpinheiro.developer@gmail.com', color: 'text-cyan-400' },
                                            { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '(98) 98449-7970', color: 'text-purple-400' },
                                            { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text: 'Belém, Brasil', color: 'text-pink-400' }
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ x: 10 }}
                                                className="flex items-start gap-4 group"
                                            >
                                                <div className={`p-3 rounded-xl bg-slate-800/50 border border-slate-700 ${item.color} group-hover:border-cyan-500/50 transition-all flex-shrink-0`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                    </svg>
                                                </div>
                                                <span className="text-slate-300 break-all text-sm sm:text-base">{item.text}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </GlowCard>
                        </AnimatedSection>

                        <AnimatedSection className="md:w-1/2" delay={0.4}>
                            <GlowCard>
                                <div className="p-8">
                                    <h4 className="text-2xl font-bold mb-6 text-purple-400">Redes Sociais</h4>
                                    <SocialIcons />
                                </div>
                            </GlowCard>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center space-y-4"
                    >
                        <p className="text-lg font-semibold">
                            © {new Date().getFullYear()} <span className="gradient-text">Anderson Pontes</span> | Todos os direitos reservados.
                        </p>
                        <p className="text-sm text-slate-400 flex items-center justify-center gap-2 flex-wrap">
                            Desenvolvido com
                            <span className="text-cyan-400 font-medium">React</span>,
                            <span className="text-blue-400 font-medium">TypeScript</span> e
                            <span className="text-purple-400 font-medium">TailwindCSS</span>
                        </p>
                    </motion.div>
                </div>
            </footer>
        </div>
    )
}

export default App
