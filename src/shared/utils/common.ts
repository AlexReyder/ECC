import { BonusType } from '@prisma/client'


export function gResponse(success: any, error: any){
	return {
		success,
		error
	}
}

export const mergeArrays = (a, b, predicate = (a, b) => a === b) => {
  console.log('A ', a)
  console.log('B ', b)
  if(!a && b.length === 0){
		return [];
	}

  const c = [...a];
  b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
  return c;
}



export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}

export const addOverflowHiddenToBody = (paddingRight = '') => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
  paddingRight && (body.style.paddingRight = paddingRight)
}



export const formatPrice = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')


export const getSearchParamsUrl = () => {
  const paramsString = window.location.search
  const urlParams = new URLSearchParams(paramsString)

  return urlParams
}



export const updateSearchParam = (
  key: string,
  value: string | number,
  pathname: string
) => {
  const urlParams = getSearchParamsUrl()
  urlParams.set(key, `${value}`)
  const newPath = `${pathname}?${urlParams.toString()}`
  // window.history.pushState({ path: newPath }, '', newPath)
  return newPath
}




export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}

export const formatDate = (date: Date) => {
  return date.toLocaleString('ru-RU',{year: 'numeric', month: '2-digit', day: '2-digit', hour:'numeric', minute:'numeric'}) 
}

export  function calculateBonusDiscount(total: number, status: BonusType, minus: number){
  let discount = 0;
  if(status === BonusType.BRONZE){
    discount = (total - (total * 0.01)) - minus
  }

  if(status === BonusType.SILVER){
    discount = (total - (total * 0.03)) - minus
  }

  if(status === BonusType.GOLD){
    discount = (total - (total * 0.05)) - minus
  }

  if(status === BonusType.PLATINUM){
    discount = (total - (total * 0.10)) - minus
  }

  return discount;
}


export function getFirstObjectKey(obj){
  return Object.keys(obj)[0]
}

export function addProps(obj, arr, val) {

  if (typeof arr == 'string')
      arr = arr.split(".");

  obj[arr[0]] = obj[arr[0]] || {};

  var tmpObj = obj[arr[0]];

  if (arr.length > 1) {
      arr.shift();
      addProps(tmpObj, arr, val);
  }
  else
      obj[arr[0]] = val;

  return obj;

}