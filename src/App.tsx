import { CardDeck } from './components/CardDeck.tsx'
import { services } from './data/services.ts'
import './styles/app.css'

export default function App() {
  return (
    <main className="app">
      <CardDeck services={services} />
    </main>
  )
}
