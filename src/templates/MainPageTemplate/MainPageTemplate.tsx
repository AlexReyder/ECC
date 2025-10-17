import { AdvantagesSection } from "./Sections/AdvantagesSection/AdvantagesSection";
import CatalogSection from "./Sections/CatalogSection/CatalogSection";
import { FiltredProductsSection } from "./Sections/FiltredProductsSection/FiltredProductsSection";
import { HeroSection } from "./Sections/HeroSection/HeroSection";

export async function MainPageTemplate() {
  //const bannersData = await fetch(`${process.env.SITE_DOMAIN}/api/hero/getBanners`)
  //const banners = await bannersData.json()

  const bestsellersData = await fetch(
    `${process.env.SITE_DOMAIN}/api/hero/getBestsellers`,
  );
  const bestsellers = await bestsellersData.json();

  const newsData = await fetch(`${process.env.SITE_DOMAIN}/api/hero/getNew`);
  const news = await newsData.json();

  return (
    <>
      {/*
			bannersData.ok ? 
			<HeroSection data={banners}/>
			: null	
		*/}
      {/*  <CatalogSection /> */}
      {bestsellersData.ok ? (
        <FiltredProductsSection title="Новинки" data={news} />
      ) : null}
      {newsData.ok ? (
        <FiltredProductsSection title="Хиты" data={bestsellers} />
      ) : null}
      <AdvantagesSection title="Нас выбирают" />
    </>
  );
}
