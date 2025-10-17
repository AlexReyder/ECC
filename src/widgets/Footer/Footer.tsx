import { Typography } from '@/shared/ui/Typography/Typography'
import cls from './Footer.module.scss'

import { MessangerLink } from '@/shared/ui/Link/MessangerLink/MessangerLink'

import { Logo, Section } from '@/shared/ui'

import { TelegramIcon } from '@/shared/ui/Icons/TelegramIcon/TelegramIcon'
import { VkIcon } from '@/shared/ui/Icons/VkIcon/VkIcon'
import { WhatsAppIcon } from '@/shared/ui/Icons/WhatsAppIcon/WhatsAppIcon'
import Link from 'next/link'
interface FooterProps {}

export const Footer = ({}: FooterProps) => {
	return (
		<footer className={cls.Footer}>
			<Section className={cls.Prefooter}>
				<div className={cls.General}>
						<Logo/>
					<Typography variant='text'>
			«Maldito» - легендарный питерский рок магазин метал мерча из Перу. Самый большой ассортимент футболок, лонгсливов и постеров для любителей тяжелой музыки и не только.
					</Typography>
				</div>
				<div className={cls.Navigation}>
					<Typography variant='text' size='s24' className={cls.Heading}>
						О компании
					</Typography>
					<ul>
						<li className={cls.Item}>
							<Link href='/'>
								<Typography variant='text'>Главная</Typography>
							</Link>
						</li>
						<li className={cls.Item}>
							<Link href='/catalog'>
								<Typography variant='text'>Каталог</Typography>
							</Link>
						</li>
						<li className={cls.Item}>
							<Link href='/agreement'>
								<Typography variant='text'>Пользовательское 
								соглашение</Typography>
							</Link>
						</li>
						<li className={cls.Item}>
							<Link href='/policy'>
								<Typography variant='text'>Политика 
								конфиденциальности</Typography>
							</Link>
						</li>
					</ul>
				</div>
				<div className={cls.Navigation}>
					<Typography variant='text' size='s24' className={cls.Heading}>
						Покупателям
					</Typography>
					<ul>
						<li className={cls.Item}>
							<Link href='/contacts'>
								<Typography variant='text'>Контакты</Typography>
							</Link>
						</li>
						<li className={cls.Item}>
							<Link href='/delivery'>
								<Typography variant='text'>Доставка / Оплата</Typography>
							</Link>
						</li>
						<li className={cls.Item}>
							<Link href='/return'>
								<Typography variant='text'>Обмен / Возврат</Typography>
							</Link>
						</li>
						<li className={cls.Item}>
							<Link href='/faq'>
								<Typography variant='text'>Вопрос - ответ</Typography>
							</Link>
						</li>
					</ul>
				</div>
				<div className={cls.Contacts}>
					<Typography variant='text' size='s24' className={cls.Heading}>
						Свяжитесь с нами
					</Typography>
					<ul>
						<li className={cls.Item}>
							<Link href='tel:+79500178989'>
								<Typography variant='text'>+7 (950) 017 89 89</Typography>
							</Link>
						</li>

						<li className={cls.Item}>
							<Link href='mailto:info@maldito.ru'>
								<Typography variant='text'>info@maldito.ru</Typography>
							</Link>
						</li>
					</ul>
					<div className={cls.Messangers}>
						<MessangerLink
							to='https://wa.me/79500178989'
							className='f-c'
							icon={<WhatsAppIcon className='nav__list-icon' />}
						/>
						<MessangerLink
							to='https://t.me/+79500178989'
							className='f-c'
							icon={<TelegramIcon className='nav__list-icon' />}
						/>
						<MessangerLink
							to='https://vk.com/maldito666'
							className='f-c'
							icon={<VkIcon className='nav__list-icon' />}
						/>
					</div>
				</div>
			</Section>
			<Typography variant='text' className={cls.Copyright}>
				2025 © Все права защищены.
			</Typography>
		</footer>
	)
}
