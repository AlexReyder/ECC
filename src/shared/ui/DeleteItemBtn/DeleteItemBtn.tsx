import { IDeleteCartItemBtnProps } from '@/shared/types/cart'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DeleteItemBtn = ({
  btnDisabled,
  callback,
  className,
}: IDeleteCartItemBtnProps) => (
  <button
    className={`btn-reset cart-list__item__delete ${className}`}
    onClick={callback}
    disabled={btnDisabled}
  >
    {btnDisabled ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
    ) : (
      <span />
    )}
  </button>
)

