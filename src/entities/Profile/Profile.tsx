import Link from 'next/link'
import cls from './Profile.module.scss'

interface ProfileProps{
	isAuth: boolean,
	username: string
}
 const Profile = ({isAuth, username}: ProfileProps) => {

	return (
	<div className={cls.Container}>
		{
			isAuth ? 
			<Link 
				href='/profile/general'
					className={cls.Profile}>
					<span className={cls.Username}>{username}</span>
			</Link>
			
			: 
			<Link 
				href='/signin'
				className={cls.Profile}>
					<span className={cls.Username}>Войти</span>
			</Link>
		}
	</div>
			
	)
}
export default Profile;
