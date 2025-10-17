import { Button, Container, Text } from "@react-email/components"
import { EmailTemplate } from './email-template'

interface Props{
	url: string
}
export const RecoveryEmailFC: React.FC<Readonly<Props>> = ({url}) => {
	return (
		<EmailTemplate preview='Сброс пароля'>
			<Container>
							<Text style={paragraph}>Здравствуйте!</Text>
							<Text style={paragraph}>
							Чтобы восстановить доступ к вашему аккаунту на нашем сайте, пожалуйста, перейдите по ссылке ниже:
							</Text>
							<Button style = { button } href = {url}> Сбросить пароль</Button>
				</Container>
		</EmailTemplate>
				
	);
};



const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const button = {
	backgroundColor:'#055a20'
	,borderRadius:'5px',
	color:'#fff',
	fontSize:'16px',
	fontWeight:'bold',
	textDecoration:'none',
	textAlign:'center' as const,
	display:'block',
	padding:'10px',}
  ;