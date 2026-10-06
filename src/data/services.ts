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
const placeholder = (name: string) => `${import.meta.env.BASE_URL}placeholders/${name}.svg`

export const services: ServiceCard[] = [
  {
    id: 'haircut',
    title: 'Стрижка',
    description: 'Форма, которая держится между визитами.',
    image: placeholder('haircut'),
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
    id: 'styling',
    title: 'Укладка',
    description: 'Объём и линия на выход или на каждый день.',
    image: placeholder('styling'),
    bookingUrl: 'https://example.com/booking/styling',
    siteUrl,
  },
  {
    id: 'beard',
    title: 'Борода',
    description: 'Контур, длина и уход за кожей.',
    image: placeholder('beard'),
    bookingUrl: 'https://example.com/booking/beard',
    siteUrl,
  },
  {
    id: 'care',
    title: 'Уход',
    description: 'Восстановление после окрашивания и сушки.',
    image: placeholder('care'),
    bookingUrl: 'https://example.com/booking/care',
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
