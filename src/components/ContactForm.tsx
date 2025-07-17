import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para enviar o formulário
    console.log('Form submitted:', formData)
    alert('Mensagem enviada com sucesso!')
    setFormData({
      name: '',
      email: '',
      message: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-dark/20 dark:border-light/20 bg-light dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-dark/20 dark:border-light/20 bg-light dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-dark/20 dark:border-light/20 bg-light dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>
      
      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Enviar Mensagem
      </button>
    </form>
  )
}

export default ContactForm