import { Ban } from "lucide-react"
export const ErrorTemplate = () => {
	return(
		<div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
		<div className="flex flex-col items-center max-w-md mx-auto space-y-6">
			<div className="rounded-full bg-blue-100 p-4">
				<Ban className="h-10 w-10 text-blue-600" />
			</div>
			<h1 className="text-3xl font-bold tracking-tight">Произошла ошибка</h1>
			<p className="text-muted-foreground">Обновите страницу.</p>
		</div>
	</div>
	)
}