import { Section } from '@/shared/ui'
import Link from 'next/link'
import s from './CatalogSection.module.scss'
const CatalogSection = () => {
	return(
		<Section className={s.Container}>
			<h2 className={s.TitleCategory}>Категории</h2>
			<ul className={s.List}>
				<li className={s.Item}>
						<img src='/img/categories/futbolki.jpg' alt='Футболки' className={s.Image}/>
						<div className={s.Content}>
								<h3>Футболки</h3>
								<Link href='/catalog/futbolki' className={s.Link}>Перейти &rarr;</Link>
						</div>
				</li>
				<li className={s.Item}>
						<img src='/img/categories/longslivy.jpg' alt='Лонгсливы' className={s.Image}/>
						<div className={s.Content}>
								<h3>Лонгсливы</h3>
								<Link href='/catalog/lognslivy' className={s.Link}>Перейти &rarr;</Link>
						</div>
				</li>
				<li className={s.Item}>
						<img src='/img/categories/flagi.jpg' alt='Флаги' className={s.Image}/>
						<div className={s.Content}>
								<h3>Флаги</h3>
								<Link href='/catalog/flagi' className={s.Link}>Перейти &rarr;</Link>
						</div>
				</li>
				<li className={s.Item}>
						<img src='/img/categories/nashivki.jpg' alt='Нашивки' className={s.Image}/>
						<div className={s.Content}>
								<h3>Нашивки</h3>
								<Link href='/catalog/nashivki' className={s.Link}>Перейти &rarr;</Link>
						</div>
				</li>
			</ul>
		</Section>
	)
}
export default CatalogSection