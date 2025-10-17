import { Modal } from '@/entities/Modal/Modal'
import AuthPopupLogin from '@/features/AuthPopup/AuthPopupLogin'
import s from './styles.module.scss'
export default function ModalSignIn() {
  return (
		<div>
			<Modal>
			<AuthPopupLogin className={s.Modal} btnClass={s.Submit}/>
			</Modal>
		</div>
  )
}