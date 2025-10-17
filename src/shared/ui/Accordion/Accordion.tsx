import { ReactNode } from 'react'
import s from './Accordion.module.scss'

export const Accordion = ({title, children, id}: {title: string, children: ReactNode, id: string}) => {

  return (
    	<div className={s.Accordion}>
      <input type="checkbox" name="accordion" id={id} className={s.AccordionInput}/>
      <label htmlFor={id} className={s.AccordionLabel}>{title}</label>
      <div className={s.AccordionContent}>
        {children}
      </div>
    </div>
  )
}
