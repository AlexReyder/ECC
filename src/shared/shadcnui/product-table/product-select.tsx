"use client"
 
import MultipleSelector, { Option } from '@/shared/shadcnui/ui/multiple-select'
import * as React from "react"
 
const OPTIONS: Option[] = [
	{ label: 'nextjs', value: 'Nextjs' },
	{ label: 'React', value: 'react' },
	{ label: 'Remix', value: 'remix' },
	{ label: 'Vite', value: 'vite' },
	{ label: 'Nuxt', value: 'nuxt' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Svelte', value: 'svelte' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Ember', value: 'ember' },
	{ label: 'Gatsby', value: 'gatsby' },
	{ label: 'Astro', value: 'astro' },
];
 
export function ProductSelect({data}: {data:any}) {

	const [value, setValue] = React.useState<Option[]>([]);
  const option = data.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })
  console.log(data)

  return (
    <div className="col-span-4">
      {/* <p className="text-primary">Your selection: {value.map((val) => val.label).join(', ')}</p> */}
      <MultipleSelector
        value={value}
        onChange={setValue}
        defaultOptions={option}
        placeholder={value.length > 0 ? '' : "Выберите доступные размеры одежды"}
      />
    </div>
  );

}