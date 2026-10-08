export const appTitle = 'Trim'

export type ServiceCard = {
  id: string
  title: string
  description: string
  image: string
  bookingUrl: string
  siteUrl: string
}

const siteUrl = 'https://example.com'
const placeholder = (name: string) => `${import.meta.env.BASE_URL}placeholders/${name}.png`

export const services: ServiceCard[] = [
  {
    id: 'haircut',
    title: 'Стрижка',
    description: 'Форма, которая держится между визитами.',
    image: placeholder('trim'),
    bookingUrl: 'https://example.com/booking/haircut',
    siteUrl,
  },
  {
    id: 'color',
    title: 'Окрашивание',
    description: 'Оттенок под тон кожи и привычный уход.',
    image: placeholder('color'),
    bookingUrl: 'https://example.com/booking/color',
    siteUrl,
  },
  {
    id: 'contouring',
    title: 'Контуринг',
    description: 'Линия скул и мягкий объём.',
    image: placeholder('conturing'),
    bookingUrl: 'https://example.com/booking/contouring',
    siteUrl,
  },
  {
    id: 'manicure',
    title: 'Маникюр',
    description: 'Форма и покрытие ногтей.',
    image: placeholder('man'),
    bookingUrl: 'https://example.com/booking/manicure',
    siteUrl,
  },
  {
    id: 'makeup',
    title: 'Макияж',
    description: 'Глаза, тон и акценты на выход.',
    image: placeholder('mak'),
    bookingUrl: 'https://example.com/booking/makeup',
    siteUrl,
  },
  {
    id: 'complex',
    title: 'Комплекс',
    description: 'Стрижка и уход за один визит.',
    image: placeholder('complex'),
    bookingUrl: 'https://example.com/booking/complex',
    siteUrl,
  },
]
