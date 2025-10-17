import Image from 'next/image'
import Link from 'next/link'
import s from './Logo.module.scss'
 export const Logo = () => (
  <Link className={s.Logo} href='/'>
    <Image className='logo__img' src='/img/logo/maldito.svg' alt='Онлайн-магазин рок мерча Maldito' fill />
  </Link>
)

