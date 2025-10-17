import { MainPageTemplate } from "@/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Главная",
};

export default async function MainPage() {
  return (
    <main>
      <MainPageTemplate />
    </main>
  );
}
