// pages/index.tsx
import React from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TechRanking from '@components/TechRanking';
import Hero from "@components/Hero";
import AuditProcess from "@components/AuditProcess";
import Benefits from "@components/Benefits";
import SuccessCases from "@components/SuccessCases";
import FAQ from "@components/FAQ";

const Home = () => {

  const { t, i18n } = useTranslation('common');

  return (
    <div className="overflow-hidden">
      <Hero />
      <TechRanking />
      <AuditProcess />
      <Benefits />
      <SuccessCases />
      <FAQ />
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;