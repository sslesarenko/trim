import type { MouseEvent } from 'react'
import { isDikidiBooking } from '../booking.ts'
import type { ServiceCard as ServiceCardData } from '../data/services.ts'

type ServiceCardProps = {
  service: ServiceCardData
  onBook: (event: MouseEvent<HTMLElement>) => void
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  const photo = (
    <>
      <img src={service.image} alt={service.title} draggable={false} />
      <span className="book-chip">Записаться</span>
      <span className="card-copy">
        <span className="card-title">{service.title}</span>
        <span className="card-text">{service.description}</span>
      </span>
    </>
  )
  const widgetLink = isDikidiBooking(service.bookingUrl)

  return (
    <article className="card">
      {widgetLink ? (
        <a
          href={service.bookingUrl}
          className="card-photo"
          data-testid="book"
          aria-label={`Записаться: ${service.title}`}
          onClick={onBook}
          onDragStart={(event) => event.preventDefault()}
        >
          {photo}
        </a>
      ) : (
        <button
          type="button"
          className="card-photo"
          data-testid="book"
          aria-label={`Записаться: ${service.title}`}
          onClick={onBook}
          onDragStart={(event) => event.preventDefault()}
        >
          {photo}
        </button>
      )}
    </article>
  )
}
