import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router"
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = () => {
  const router = useRouter();
  // Usar el hook useTranslation. Si no pasas un namespace, usa el default.
  // Es una buena práctica especificar el namespace si tus traducciones están divididas.
  const { t, i18n } = useTranslation('common');
  console.log('Idioma actual detectado:', i18n.language);
  // Función para cambiar el idioma
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    console.log('Idioma actual detectado por useEffect:', i18n.language);
  }, [i18n.language]); // This will log every time i18n.language changes

  return (
    <div>
      <div className="hero h-[90vh] bg-black items-center flex justify-center ">
        <div className="w-[50%] flex justify-center flex-column">
          <p className='mx-10 text-white michroma-regular'>{t('auditWeb3')}</p>
          <h1 className="text-white hero-title mx-10 p-0">{t('blockchainSecurityAuditorTitle')}</h1>
          <p className='mx-10 text-white michroma-regular'>{t('certifyTechnology')}</p>
          <div className='flex'>
            <Link href="/form">
              {t('talkToAdvisor')}
            </Link>
          </div>
        </div>
        <div className="w-[50%] flex justify-center">
          <Image className="block" height={620} width={620} src={'/sentinel.png'} alt={'sentinel'} />
        </div>
      </div>
      <div className="hero h-screen bg-white">

      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      // Pass the translations for the 'common' namespace to the page component
      ...(await serverSideTranslations(locale, ['common'])),
      // You can add other props here if your page needs them
    },
  };
};

export default Home;
