import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import BankCard from './BankCard'
import { Card } from '../typescript/types'

type Props = {
  cardsList: Card[] //maybe specify the type
}

export default function Slider({ cardsList }: Props) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      slidesPerGroup={1}
      rewind
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1050: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="SliderContainer"
    >
      {cardsList?.map((el) => (
        <SwiperSlide className="slide">
          <BankCard number={el.number} type={el.type} amount={el.amount} currency={el.currency} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
