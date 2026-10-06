import type { ServiceCard as ServiceCardData } from '../data/services.ts'

type ServiceCardProps = {
  service: ServiceCardData
  onBook: () => void
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <article className="card">
      <button
        type="button"
        className="card-photo"
        data-testid="book"
        aria-label={`Записаться: ${service.title}`}
        onClick={onBook}
        onDragStart={(event) => event.preventDefault()}
      >
        <img src={service.image} alt={service.title} draggable={false} />
        <span className="book-chip">Записаться</span>
        <span className="card-copy">
          <span className="card-title">{service.title}</span>
          <span className="card-text">{service.description}</span>
        </span>
      </button>
    </article>
  )
}
