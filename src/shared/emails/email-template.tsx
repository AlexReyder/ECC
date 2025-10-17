import { Body, Column, Container, Head, Html, Img, Preview, Row, Section, Text } from "@react-email/components"
import { ReactNode } from 'react'

interface Props{
	preview: string,
	children: ReactNode
}

export const EmailTemplate: React.FC<Readonly<Props>> = ({preview, children}) => {
	return(
				<Html lang="ru">
					<Head />
					<Body style={main}>
						<Preview>{preview}</Preview>
						<Container style={container}>
							<Section style={logo}>
								<Img
									width={114}
									// m1IXNDMo**R%
									// src={`${baseUrl}/public/maldito.svg`}
									src={'https://maldito.ru/img/logo/maldito.png'}
									alt="Maldito"
									style={logoImg}
								/>
							</Section>
							<Section style={sectionsBorders}>
								<Row>
									<Column style={sectionBorder} />
									<Column style={sectionCenter} />
									<Column style={sectionBorder} />
								</Row>
							</Section>
							<Section style={content}>
											{children}
								<Text style={paragraph}>
									С уважением,
									<br />
									Команда интернет-магазина Maldito
								</Text>
							</Section>
						</Container>
		
						<Section style={footer}>
							<Row>
								<Text style={{ textAlign: 'center', color: '#706a7b' }}>
									© 2025 Maldito, Все права защищены
								</Text>
							</Row>
						</Section>
					</Body>
				</Html>
	)
}


const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: '#efeef1',
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
};

const footer = {
  maxWidth: '580px',
  margin: '0 auto',
};

const content = {
  padding: '5px 20px 10px 20px',
};

const logo = {
  padding: 30,
};

const logoImg = {
  margin: '0 auto',
};

const sectionsBorders = {
  width: '100%',
};

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px',
};

const sectionCenter = {
  borderBottom: '1px solid #055a20',
  width: '102px',
};


