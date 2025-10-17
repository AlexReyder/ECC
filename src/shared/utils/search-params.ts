import { ReadonlyURLSearchParams } from 'next/navigation'



export function createQueryString (searchParams: ReadonlyURLSearchParams | null, name: string, value: string){
	const params = new URLSearchParams(searchParams?.toString())
	params.set(name, value)
	if(value === '') {
		params.delete(name)
	} 
	return params.toString()
}

// export function createQueryProductSize (searchParams: ReadonlyURLSearchParams | null, name: string, value: string){
// 	const params = new URLSearchParams(searchParams?.toString())
// 	params.set(name, value)
// 	return params.toString()
// }

export function getQueryParamValue(searchParams: ReadonlyURLSearchParams | null, name: string){
	const params = new URLSearchParams(searchParams?.toString())
	const value = params.get(name)
	return value;
}