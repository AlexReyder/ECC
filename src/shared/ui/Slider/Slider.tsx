"use client"
import { CatalogCardItem } from '@/entities'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { useId } from 'react'
import s from './Slider.module.scss'
import { NextButton, PrevButton, usePrevNextButtons } from './SliderBtns'

interface Props{
	images: string[],
	ids: string[]
	alts: string[]
}

export const Slider = ({data}: {data:any}) => {
	const [emblaMainRef, emblaApi] = useEmblaCarousel()
	const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)


	return(
		<div className={s.embla}>
			<Link href='/catalog' className={s.Link}>
				<span>Все</span>
			</Link>
			<div className={s.viewport} ref={emblaMainRef}>
				<div className={s.embla__container}>
					{data.map((product:any) => (
						<div className={s.Slide} key={useId()}>
							{/* <div className={s.SlideWrapper}> */}
									<CatalogCardItem item={product} />
							{/* </div> */}
						</div>
					))}
				</div>
			</div>
			<div className={s.embla__controls}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
		</div>
		</div>
	)
}