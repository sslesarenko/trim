import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { appTitle, type ServiceCard as ServiceCardData } from '../data/services.ts'
import { openExternal } from '../telegram.ts'
import { ServiceCard } from './ServiceCard.tsx'

const SWIPE_THRESHOLD = 110
const FLY_MS = 320

type CardDeckProps = {
  services: ServiceCardData[]
}

type DragPoint = {
  x: number
  y: number
}

export function CardDeck({ services }: CardDeckProps) {
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState<DragPoint>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [leaving, setLeaving] = useState<1 | -1 | null>(null)

  const origin = useRef<DragPoint>({ x: 0, y: 0 })
  const draggingRef = useRef(false)
  const leavingRef = useRef(false)
  const suppressClick = useRef(false)

  const startFly = useCallback((direction: 1 | -1) => {
    if (leavingRef.current || index >= services.length) return
    leavingRef.current = true
    setDragging(false)
    draggingRef.current = false
    setLeaving(direction)
  }, [index, services.length])

  const goBack = useCallback(() => {
    if (leavingRef.current || index <= 0) return
    setDrag({ x: 0, y: 0 })
    setIndex((value) => Math.max(0, value - 1))
  }, [index])

  function restart() {
    leavingRef.current = false
    setLeaving(null)
    setDrag({ x: 0, y: 0 })
    setIndex(0)
  }

  useEffect(() => {
    if (leaving === null) return

    const timer = window.setTimeout(() => {
      leavingRef.current = false
      suppressClick.current = false
      setIndex((value) => value + 1)
      setLeaving(null)
      setDrag({ x: 0, y: 0 })
    }, FLY_MS)

    return () => window.clearTimeout(timer)
  }, [leaving])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') startFly(1)
      if (event.key === 'ArrowLeft') goBack()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goBack, startFly])

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || leavingRef.current) return
    draggingRef.current = true
    suppressClick.current = false
    origin.current = { x: event.clientX, y: event.clientY }
    setDragging(true)
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Захват указателя недоступен у синтетических событий. Слушатели на карточке остаются.
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return
    const next = {
      x: event.clientX - origin.current.x,
      y: event.clientY - origin.current.y,
    }
    if (Math.hypot(next.x, next.y) > 8) suppressClick.current = true
    setDrag(next)
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return
    draggingRef.current = false
    setDragging(false)

    const delta = event.clientX - origin.current.x
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      startFly(delta > 0 ? 1 : -1)
      return
    }

    setDrag({ x: 0, y: 0 })
    if (suppressClick.current) return

    const service = services[index]
    if (!service) return
    suppressClick.current = true
    openExternal(service.bookingUrl)
  }

  function book(service: ServiceCardData) {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    openExternal(service.bookingUrl)
  }

  const current = services[index]
  const topStyle: CSSProperties = leaving
    ? {
        transform: `translateX(${leaving * 130}%) rotate(${leaving * 16}deg)`,
        transition: `transform ${FLY_MS}ms ease-in`,
      }
    : dragging
      ? {
          transform: `translate(${drag.x}px, ${drag.y * 0.15}px) rotate(${drag.x / 20}deg)`,
          transition: 'none',
        }
      : {
          transform: 'translate3d(0, 0, 0)',
          transition: 'transform 320ms cubic-bezier(.2, .8, .2, 1)',
        }

  return (
    <div className="screen">
      <header className="header">
        <h1>{appTitle}</h1>
        {current ? (
          <p className="counter" data-testid="counter">
            {index + 1} / {services.length}
          </p>
        ) : null}
      </header>

      {current ? (
        <>
          <p className="hint">Свайпните в сторону, чтобы увидеть следующую услугу</p>
          <div className="stack" data-testid="stack">
            {[2, 1, 0].map((depth) => {
              const service = services[index + depth]
              if (!service) return null
              const isTop = depth === 0

              return (
                <div
                  key={service.id}
                  className="card-slot"
                  data-depth={depth}
                  data-testid={isTop ? 'card' : undefined}
                  style={isTop ? topStyle : undefined}
                  onPointerDown={isTop ? onPointerDown : undefined}
                  onPointerMove={isTop ? onPointerMove : undefined}
                  onPointerUp={isTop ? onPointerUp : undefined}
                  onPointerCancel={isTop ? onPointerUp : undefined}
                >
                  <ServiceCard
                    service={service}
                    onBook={isTop ? () => book(service) : () => undefined}
                  />
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="site-button"
            data-testid="site"
            onClick={() => openExternal(current.siteUrl)}
          >
            На сайт
          </button>

          <div className="nav">
            <button type="button" data-testid="prev" onClick={goBack} disabled={index === 0 || leaving !== null}>
              Назад
            </button>
            <button type="button" data-testid="next" onClick={() => startFly(1)} disabled={leaving !== null}>
              Дальше
            </button>
          </div>
        </>
      ) : (
        <section className="empty" data-testid="empty">
          <button type="button" data-testid="restart" onClick={restart}>
            Сначала
          </button>
        </section>
      )}
    </div>
  )
}
