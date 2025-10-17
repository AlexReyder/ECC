import { Modal } from '@/entities/Modal/Modal'
import AuthPopupRegistration from '@/features/AuthPopup/AuthPopupRegistration'
import s from './styles.module.scss'
export default function ModalSignIn() {
  return (
		<>
			<Modal>
			<AuthPopupRegistration className={s.Modal} btnClass={s.Submit}/>
			</Modal>
		</>
  )
}
