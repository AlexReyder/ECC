import Link from "next/link"
import s from './CartCount.module.scss'

const CartCount = ({cartLength}: any) => {

    return(
        <div className={s.Container}>
            <Link 
                href={'/cart'}
                className={s.CartCount}>
                <span className={`${s.Counter} ${cartLength !== 0 ? s.CounterVisible : ''}`}>
                {' '}
                {cartLength !== 0 ? cartLength : ''}
                </span>
            </Link>
        </div>
    )
}
export default CartCount