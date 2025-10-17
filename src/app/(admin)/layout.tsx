import { verifySession } from '@/shared/api/session'
import { isAdmin } from '@/shared/api/user'
import AppSidebar from '@/shared/shadcnui/layouts/app-sidebar'
import HeaderAdmin from '@/shared/shadcnui/layouts/header'
import { SidebarInset, SidebarProvider } from '@/shared/shadcnui/ui/sidebar'
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { cookies } from 'next/headers'
import './globals-admin.css'
import './quill.css'
const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin", "cyrillic"],
	weight:["400", "500", "600", "700", "800"]
});


export const metadata: Metadata = {
	title: {
			template: '%s | Панель администратора',
			default: 'Главная | Панель администратора',
		},
};

export const viewport: Viewport = {
	themeColor: 'light',
}


export default async function AdminRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
	await isAdmin()
	const {userName} = await verifySession()
	return (
		<html lang="ru">
			<body className={`${manrope.variable}`}>
				<SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar userName={userName as string} />
        <SidebarInset>
          <HeaderAdmin/>
          {children}
        </SidebarInset>
      </SidebarProvider>
			</body>
		</html>
	);
}
