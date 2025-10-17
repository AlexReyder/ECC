
import EditProfile from '@/features/EditProfile/EditProfile'
import { Section } from '@/shared/ui'


const ProfilePage = () =>{
	// const { getDefaultTextGenerator, getTextGenerator } =
  //   useBreadcrumbs('profile')
	return(
		<Section>
			<h2>Profile</h2>
			{/* <Breadcrumbs 
		 	getDefaultTextGenerator={getDefaultTextGenerator}
			getTextGenerator={getTextGenerator}
		/> */}
		<EditProfile/>
		</Section>
	)
}
export default ProfilePage;