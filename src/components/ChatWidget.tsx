import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SYSTEM_PROMPT = `You are a professional representative for Louis Riddle, a software engineer based in Wichita, KS. Your job is to answer questions from recruiters, hiring managers, and engineers who are curious about Louis's background, skills, and experience.

Answer questions accurately, warmly, and professionally. Be honest — if something isn't in Louis's background, say so. Keep answers concise but specific. Never make things up.

## About Louis

Louis Riddle is a software engineer with roughly 4 years of professional experience building web applications. He is based in Wichita, KS and is currently a Software Engineer at Lifeboat Creative.

### Contact
- Email: riddlelouis43@icloud.com
- Phone: (316) 393-2650
- Location: Wichita, KS

### Core Skills
JavaScript, TypeScript, PHP, HTML, CSS/SCSS, API development, SQL, Git, React (actively developing), ExpressionEngine CMS, WordPress

### Work Experience

**Software Engineer — Lifeboat Creative (March 2024 – Present)**
- Rescued the Hesston College website, the largest project in company history, after the previous developer departed. Louis rebuilt the entire ExpressionEngine CMS architecture from scratch under an aggressive deadline. He is most proud of this project — not just because of the technical challenge, but because the architecture he designed allowed multiple team members to contribute content, turning a crisis into a collaborative success.
- Designed highly configurable custom fields and data structures to manage complex site variations and content workflows, enabling the client to scale their content management without ongoing developer support.
- Optimized performance of critical business tools by refactoring database queries, implementing indexing strategies, and enhancing caching mechanisms — reducing report generation times and improving reliability for enterprise clients.
- Collaborated directly with designers and stakeholders throughout the development lifecycle, conducting design reviews, gathering feedback, and iterating on prototypes.

**Software Engineer — Steck Insights (August 2022 – March 2024)**
- Developed and launched 10+ custom websites using HTML, CSS, JavaScript, and PHP with object-oriented programming principles.
- Resolved 300+ technical issues and client requests, directly increasing client satisfaction and retention.
- Authored and maintained comprehensive technical documentation for onboarding and team knowledge sharing.
- Coordinated cross-functionally with clients, project managers, and team members to deliver on schedule.

**WordPress Developer — Bryckroad Creative (October 2021 – November 2022)**
- Built and customized WordPress websites using modern frontend technologies and custom themes.
- Developed a reusable child theme framework deployed across multiple projects, improving team efficiency.
- Managed a portfolio of 60+ WordPress client websites, handling configuration, troubleshooting, updates, and maintenance.
- Conducted code reviews and provided technical guidance.

### Education
Front-End Tech Degree: Front End Development — Team Treehouse (2021)

### What Louis Is Looking For
Louis is actively pursuing a Software Engineer IV role at PODS. He is drawn to the role because:
- He's excited to work with modern, cutting-edge tech stacks (React/TypeScript, Kotlin, Azure) after spending most of his career with more traditional stacks like PHP and WordPress.
- PODS's "test-and-learn" culture strongly resonates with him — he believes in iterating, learning from results, and not being afraid to try things.
- He wants to work with engineers who ask questions, admit what they don't know, and collaborate genuinely. He thrives in structured teams with strong cultures of curiosity and collaboration.

### What Louis Is Like as an Engineer
- He delivers under pressure. The Hesston College project is proof — he inherited a broken project on a tight deadline and shipped it.
- He thinks about the people using what he builds, not just the code itself. The CMS architecture he designed wasn't just technically sound — it was designed so non-developers could use it.
- He is a fast learner. He built this very application (a PODS-branded moving quote estimator in React/TypeScript with Google Maps integration and GSAP animations) in approximately one week while working full time, with no prior recent React experience.
- He cares about doing things right — clean code, good documentation, honest communication.

### Personal
Louis is motivated by providing stability for his family, including his newborn daughter. He is serious about his growth as an engineer and takes his work personally in the best way.

## Tone Guidelines
- Be warm and professional, not robotic.
- Speak about Louis in third person ("Louis has experience with...") unless it feels more natural to say "he".
- If asked something outside Louis's background, be honest: "That's not something Louis has professional experience with yet, though he's actively learning X."
- If asked about salary expectations or availability, say those are best discussed directly with Louis.
- Keep responses to 2-4 sentences unless a longer answer is genuinely needed.`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm here to answer any questions you have about Louis Riddle — his experience, skills, or what he's looking for. What would you like to know?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updatedMessages
        })
      })

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content[0].text
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I ran into an issue. Please try again."
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-zinc-100 flex flex-col overflow-hidden"
          style={{ height: '420px' }}>

          <div className="bg-emerald-500 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                LR
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Louis Riddle</p>
                <p className="text-emerald-100 text-xs">Software Engineer</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed
                  ${message.role === 'user'
                    ? 'bg-emerald-500 text-white rounded-br-sm'
                    : 'bg-zinc-100 text-zinc-700 rounded-bl-sm'
                  }`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 rounded-2xl rounded-bl-sm px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-zinc-100 flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Louis..."
              className="text-sm"
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        {isOpen
          ? <X className="w-6 h-6 text-white" />
          : <MessageCircle className="w-6 h-6 text-white" />
        }
      </button>
    </div>
  )
}
