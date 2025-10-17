import s from './styles.module.scss'

interface Props{
	count?: number,
	title: string,
  doCount?: boolean
}

export const HeadingWithCount = ({
  count,
  title,
  doCount = true
}: Props) => {
	
	return( 
	<h1 className={`site-title ${s.title}`}>
		<span>{title}</span>
		{
      doCount ? (
        <span className={s.title__count}>
			{count}{' '}
			{showCountMessage(`${count}`)}
		</span>
      )
      : 
      ''
    }
	</h1>
	)
}


 export function showCountMessage(count: string){
  if (count == '11' || count == '12' || count == '13' || count == '14') {
    return 'товаров'
  }

  if (count.endsWith('1')) {
    return 'товар'
  }

  if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
    return 'товара'
  }

  return 'товаров'
}