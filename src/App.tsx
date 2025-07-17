import { useState, useEffect } from 'react'
import AnimatedText from './components/AnimatedText'
import ExperienceCard from './components/ExperienceCard'
import ProjectCard from './components/ProjectCard'
import SkillBadge from './components/SkillBadge'
import SocialIcons from './components/SocialIcons'
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
    setMenuOpen(false) // fecha o menu mobile ao clicar
  }

  return (
    <div className="min-h-screen dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-light/80 dark:bg-dark/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold gradient-text">DEV</a>

          <div className="hidden md:flex space-x-8">
            {['home', 'sobre', 'skills', 'projetos', 'contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize ${activeSection === item ? 'text-primary font-medium' : 'text-dark dark:text-light hover:text-primary dark:hover:text-primary'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-light dark:bg-dark px-6 py-4 space-y-4">
            {['home', 'sobre', 'skills', 'projetos', 'contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`block w-full text-left capitalize ${activeSection === item
                  ? 'text-primary font-medium'
                  : 'text-dark dark:text-light hover:text-primary dark:hover:text-primary'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Olá, eu sou <span className="gradient-text">Anderson Pontes</span>
            </h1>
            <AnimatedText text="Desenvolvedor Front-end" className="text-2xl md:text-4xl mb-6" />
            <p className="text-lg mb-8 text-dark/80 dark:text-light/80">
              Criando experiências digitais incríveis com React, NextJs, TypeScript e designs modernos.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => scrollToSection('contato')}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Contate-me
              </button>
              <button
                onClick={() => scrollToSection('projetos')}
                className="px-6 py-3 border-2 border-primary text-primary dark:text-light rounded-lg hover:bg-primary/10 transition-colors"
              >
                Ver Projetos
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-light dark:border-dark shadow-xl">
                <img
                  src={AndersonPontes}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-dark/5 dark:bg-light/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="gradient-text">Sobre Mim</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
              <div className="w-64 h-64 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt="Working"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-2/3 md:pl-12">
              <p className="text-lg mb-6">
                Sou Desenvolvedor Front-End com sólida experiência na criação de aplicações web modernas, robustas e eficientes. Atualmente, estou contribuindo com a modernização tecnológica na Procuradoria-Geral do Estado do Pará (PGE-PA).
              </p>
              <p className="text-lg mb-6">Graduado em Análise e Desenvolvimento de Sistemas e Pós-Graduado em Engenharia de Software e Informática na Educação. Tenho forte domínio no ecossistema React/Next.js com TypeScript/Javascript.</p>

              <p className="text-lg mb-6">
                Trabalho com ferramentas como TailwindCSS, Shadcn/ui e Zod, desenvolvendo interfaces intuitivas, acessíveis e de alta performance, sempre com foco na qualidade do código e na melhor experiência do usuário.
              </p>

              <p className="text-lg mb-6">Sou um profissional orientado a resultados, assíduo e comprometido com a otimização de processos e a colaboração em equipe. Busco constantemente aprimorar minhas habilidades e aplicar meus conhecimentos para gerar valor.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <ExperienceCard
                  title="Desenvolvedor Front-end"
                  company="Procuradoria-Geral do Estado do Pará"
                  period="2022 - Presente"
                  description="Desenvolvedor front-end de aplicações web modernas e robustas."
                />

                <ExperienceCard
                  title="Gerente"
                  company="Empresa Brasileira de Correios e Telegráfos"
                  period="2013 - 2022"
                  description="Responsável pela gestão operacional, administrativa e comercial da unidade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="gradient-text">Minhas Habilidades</span>
          </h2>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Tecnologias Principais</h3>
            <div className="flex flex-wrap gap-4">
              {['React', 'TypeScript', 'JavaScript', 'Next.js', 'TailwindCSS', 'UI/UX Design', 'CSS3', 'HTML5', 'Shadcn/ui', 'ZOD'].map(skill => (
                <SkillBadge key={skill} skill={skill} level="advanced" />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Ferramentas</h3>
            <div className="flex flex-wrap gap-4">
              {['Git', 'Docker', 'Figma', 'Webpack', 'Jest', 'PostgreSql', 'Node.js', "N8N"].map(skill => (
                <SkillBadge key={skill} skill={skill} level="intermediate" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Outras Habilidades</h3>
            <div className="flex flex-wrap gap-4">
              {['SEO', 'Scrum', 'Java', 'Spring', 'Responsive Design', 'Performance'].map(skill => (
                <SkillBadge key={skill} skill={skill} level="basic" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 bg-dark/5 dark:bg-light/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="gradient-text">Projetos Recentes</span>
          </h2>

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
                    className="text-blue-600 underline hover:text-blue-800"
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
                    className="text-blue-600 underline hover:text-blue-800"
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
                    className="text-blue-600 underline hover:text-blue-800"
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
              description={
                <>
                  Contribuí no desenvolvimento front-end do sistema de download e indexação diária do Diário Oficial do Estado em Elasticsearch.
                  
                </>
              }
              technologies={['React', 'Tailwindcss', 'Shadcn/ui', 'Zod']}
              imageUrl={BuscaDoe}
              demoUrl="X"
            />

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="gradient-text">Vamos Trabalhar Juntos</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">Entre em Contato</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>andersonpinheiro.developer@gmail.com</span>
                </div>

                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>(98) 98449-7970</span>
                </div>

                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>Belém, Brasil</span>
                </div>
              </div>

              
            </div>

            <div className="md:w-1/2">
             <h4 className="text-xl font-semibold mb-4">Redes Sociais</h4>
              <SocialIcons/>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 dark:bg-gray-900 dark:text-gray-200 border-t border-gray-700">
        <div className="container mx-auto px-6 py-8 text-center space-y-2">
          <p className="text-lg font-semibold">
            © {new Date().getFullYear()} <span className="text-indigo-400">Anderson Pontes | Todos os direitos reservados.</span>
          </p>
          <p className="text-sm opacity-80 flex items-center justify-center gap-1">
            Desenvolvido com <span className="font-medium text-white">React</span>,
            <span className="font-medium text-white">TypeScript</span> e
            <span className="font-medium text-white">TailwindCSS</span>
          </p>
        </div>
      </footer>


    </div>
  )
}

export default App
