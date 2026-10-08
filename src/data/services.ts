export const appTitle = 'ТримСтайл'

export type ServiceCard = {
  id: string
  title: string
  description: string
  image: string
  bookingUrl: string
  phone: string
}

const phone = '+375447924404'
const placeholder = (name: string) => `${import.meta.env.BASE_URL}placeholders/${name}.jpg`

export const services: ServiceCard[] = [
  {
    id: 'haircut',
    title: 'Стрижка',
    description: 'Форма, которая держится между визитами.',
    image: placeholder('haircut'),
    bookingUrl: 'https://dikidi.ru/#widget=219784',
    phone,
  },
  {
    id: 'color',
    title: 'Окрашивание',
    description: 'Оттенок под тон кожи и привычный уход.',
    image: placeholder('color'),
    bookingUrl: 'https://example.com/booking/color',
    phone,
  },
  {
    id: 'contouring',
    title: 'Контуринг',
    description: 'Линия скул и мягкий объём.',
    image: placeholder('conturing'),
    bookingUrl: 'https://example.com/booking/contouring',
    phone,
  },
  {
    id: 'manicure',
    title: 'Маникюр',
    description: 'Форма и покрытие ногтей.',
    image: placeholder('man'),
    bookingUrl: 'https://dikidi.ru/#widget=219785',
    phone,
  },
  {
    id: 'makeup',
    title: 'Макияж',
    description: 'Глаза, тон и акценты на выход.',
    image: placeholder('mak'),
    bookingUrl: 'https://dikidi.ru/#widget=219786',
    phone,
  },
  {
    id: 'complex',
    title: 'Комплекс',
    description: 'Стрижка и уход за один визит.',
    image: placeholder('complex'),
    bookingUrl: 'https://example.com/booking/complex',
    phone,
  },
]
