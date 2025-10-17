import { cn } from '@/shared/utils/cn'
import { Slot } from '@radix-ui/react-slot'
import cls from './Section.module.scss'
interface SectionProps{
	className?: string,
	asChild?: boolean,
	ref?: any,
	children: React.ReactNode
}

 export const Section:React.FC<SectionProps> = (
	{className, asChild = false, ref, ...props}) => {
	const Comp = asChild ? Slot : 'section'
	return (
  <Comp className={cn(cls.Padding,className!)} ref={ref} {...props}/>
	)
}

Section.displayName = 'Section'

