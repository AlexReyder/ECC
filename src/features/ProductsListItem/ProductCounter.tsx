"use client"
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import s from './ProductCounter.module.scss'
const ProductCounter = ({
  className,
  count,
  totalCount,
  setCount,
  initCount = 1,
}: any) => {
  const [spinner, setSpinner] = useState(false)
  const [disableIncrease, setDisableIncrease] = useState(false)
  const [disableDecrease, setDisableDecrease] = useState(false)
  const currentTotalCount = totalCount
  const currentInitialCount =  initCount

  useEffect(() => {
    if (count === 1) {
      setDisableDecrease(true)
    } else {
      setDisableDecrease(false)
    }

    if (count === currentTotalCount) {
      setDisableIncrease(true)
    } else {
      setDisableIncrease(false)
    }
  }, [count, currentTotalCount])

  useEffect(() => {
    setCount(currentInitialCount as number)
  }, [currentInitialCount])

  const increase = () => {
    setDisableDecrease(false)
    setCount(count + 1)
  }

  const decrease = () => {
    setDisableIncrease(false)
    setCount(count - 1)
  }

  return (
    <div className={s.Counter}>
      <button
        className={s.Btn}
        type='button'
        onClick={decrease}
        disabled={disableDecrease || spinner}
      >-</button>
      <span>{spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : count}</span>
      <button
        className={s.Btn}
        type='button'
        onClick={increase}
        disabled={disableIncrease || spinner}
      >+</button>
    </div>
  )
}
export default ProductCounter