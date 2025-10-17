"use client"
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { useId } from 'react'
import s from './HeroSection.module.scss'
export const HeroSection = ({data}: {data:any}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({loop:true}, [
		Autoplay({ playOnInit: true, delay: 3000 })
	])
	// console.log(data)
	return(
	<>
		{
			data && data?.success?.length > 0 ? (
				<section className={s.Carousel}>
				<div className={s.embla}>
				<div className={s.viewport} ref={emblaRef}>
					<div className={s.embla__container}>
						{data.success.map((item:any) => (
							<div className={s.Slide} key={useId()}>
								{/* <Image src={item.url} alt={item.alt} fill style={{objectFit:'cover'}}/> */}
								 <picture>
										<source media="(max-width: 900px)" srcSet={item.mobileUrl} />
										<img src={item.url} style={{ width: '100%', height: 'auto', objectFit:'cover' }} alt={item.alt} />
    						 </picture>
								<Link href={item.link} className={s.Link}></Link>
							</div>
						))
					}
					</div>
				</div>
				</div>
			</section>
			) : null
		}
	</>
	)
}