"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import s from './Breadcrumbs.module.scss'
import Crumb from './Crumb'

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0]
  return pathWithoutQuery.split('/').filter((v) => v.length > 0)
}


export const Breadcrumbs = ({name}: {name?: string}) => {
  const pathname = usePathname() as string
  const paths = generatePathParts(pathname)
  const matchStr: any = {
    catalog:{
      text: 'Каталог',
      href: '/catalog'
    },
    flagi:{
        text: 'Флаги',
        href: '/catalog/flagi'
    },
    futbolki:{
      text: 'Футболки',
      href: '/catalog/futbolki'
    },
    longslivy:{
      text: 'Лонгсливы',
      href: '/catalog/longslivy'
      },
    signin: {
      text:'Вход',
      href: '/signin'
    },
    signup: {
      text:'Регистрация',
      href: '/signin'
    },
    "password-recovery": {
      text:'Восстановления пароля',
      href: '/password-recovery'
    },
    order:{
      text: 'Оформление заказа',
      href: '/order'
    },
    contacts:{
      text: 'Контакты',
      href: '/contacts'
    },
    return:{
      text: 'Обмен / Возврат',
      href: '/return'
    },
    delivery:{
      text: 'Доставка / Оплата',
      href: '/delivery'
    },
    faq:{
      text: 'Ответы на вопросы',
      href: '/faq'
    },
    profile:{
      text:'Профиль',
      href:'/profile'
    },
    general:{
      text:'Общая информация',
      href:'/general'
    },
    password:{
      text:'Смена пароля',
      href:'/password'
    },
    orders:{
      text:'История заказов',
      href:'/orders'
    },
    cart:{
      text:'Корзина',
      href:'/cart'
    },

  }

  // const isProductName =

  return (
    <div>
      <ul className='list-reset breadcrumbs'>
        <li className={s.Item}>
          <Link href='/' className={`${s.FirstCrumb} ${s.ItemLink}`}>
            Главная
          </Link>
        </li>
        {paths.map((crumb, idx) =>
            <li key={idx} className={s.Item}>
              <Crumb
                text={matchStr[crumb] ? matchStr[crumb].text : crumb }
                href={matchStr[crumb] ? matchStr[crumb].href : crumb}
                key={idx}
                last={idx === paths.length - 1}
                name = {name ? name : null}
              />
            </li>
        )}
      </ul>
    </div>
  )
}
