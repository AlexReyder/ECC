import { Button, Container, Text } from "@react-email/components"
import { EmailTemplate } from './email-template'

interface Props{
	url: string
}
export const ConfirmEmailFC: React.FC<Readonly<Props>> = ({url}) => {
  return (
    <EmailTemplate preview='Подтверждение регистрации'>
      <Container>
              <Text style={paragraph}>Здравствуйте!</Text>
              <Text style={paragraph}>
              Благодарим вас за регистрацию на нашем сайте. Ваши даннуспешно сохранены. Теперь вы можете пользоваться всепреимуществами личного кабинета: накапливать бонусы, быстро авторизоваться, просматривать историю заказов, получаперсональные скидки и предложения, а также отслеживать заказы.
              </Text>
              <Button style = { button } href = {url}> Подтвердить регистрацию</Button>
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