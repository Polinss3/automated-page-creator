
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando los Temas de Interés en la Actualidad: Noticias y Artículos Relevantes";
  const meta_description = "Explorando los Temas de Interés en la Actualidad: Noticias y Artículos Relevantes - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "noticias, artículos, actualidad, información, temas de interés";
  const meta_robots = "index, follow";
  const body_content = "\u003ch1 class=\"h1_2\"\u003eExplorando los Temas de Inter\u00e9s en la Actualidad: Noticias y Art\u00edculos Relevantes\u003c/h1\u003e\n\u003cp class=\"p_4\"\u003eEn un mundo en constante cambio, mantenerse informado sobre lo que sucede a nuestro alrededor es vital. Nuestro sitio web se dedica a ofrecer art\u00edculos y noticias que abordan una variedad de \u003cstrong\u003etemas de inter\u00e9s\u003c/strong\u003e, proporcionando informaci\u00f3n valiosa y actualizada. Desde avances cient\u00edficos hasta tendencias culturales, aqu\u00ed encontrar\u00e1s contenido que enriquece tu conocimiento y te ayuda a estar al tanto de la \u003cstrong\u003eactualidad\u003c/strong\u003e.\u003c/p\u003e\n\u003ch2\u003eTemas Destacados\u003c/h2\u003e\n\u003cul class=\"ul_5\"\u003e\n\u003cli class=\"li_5\"\u003eSalud y Bienestar\u003c/li\u003e\n\u003cli class=\"li_1\"\u003eTecnolog\u00eda y Innovaci\u00f3n\u003c/li\u003e\n\u003cli class=\"li_5\"\u003eMedio Ambiente\u003c/li\u003e\n\u003cli class=\"li_2\"\u003eCultura y Sociedad\u003c/li\u003e\n\u003cli class=\"li_3\"\u003eEconom\u00eda y Finanzas\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2\u003e\u00daltimas Noticias\u003c/h2\u003e\n\u003ctable class=\"table_2\"\u003e\n\u003ctr\u003e\n\u003cth\u003eT\u00edtulo\u003c/th\u003e\n\u003cth\u003eFecha\u003c/th\u003e\n\u003cth\u003eResumen\u003c/th\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003eNueva Investigaci\u00f3n sobre el Cambio Clim\u00e1tico\u003c/td\u003e\n\u003ctd\u003e15 de octubre de 2023\u003c/td\u003e\n\u003ctd\u003eSe han publicado nuevos hallazgos que revelan la magnitud de los efectos del cambio clim\u00e1tico en los ecosistemas.\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003eTendencias Tecnol\u00f3gicas para 2024\u003c/td\u003e\n\u003ctd\u003e12 de octubre de 2023\u003c/td\u003e\n\u003ctd\u003eUn an\u00e1lisis de las tecnolog\u00edas emergentes que transformar\u00e1n nuestra vida cotidiana el pr\u00f3ximo a\u00f1o.\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003eImpacto de la Inteligencia Artificial en el Trabajo\u003c/td\u003e\n\u003ctd\u003e10 de octubre de 2023\u003c/td\u003e\n\u003ctd\u003eUn estudio examina c\u00f3mo la IA est\u00e1 cambiando el panorama laboral y las habilidades necesarias para el futuro.\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/table\u003e\n\u003cp class=\"p_2\"\u003eTe invitamos a explorar nuestros art\u00edculos y noticias, donde podr\u00e1s profundizar en cada uno de estos \u003cstrong\u003etemas de inter\u00e9s\u003c/strong\u003e. Mantente informado y participa en la conversaci\u00f3n sobre la \u003cstrong\u003eactualidad\u003c/strong\u003e que nos afecta a todos.\u003c/p\u003e";
  
  const caracteristicas = body_content.match(/<li>.*?<\/li>/g)?.map(li => li.replace(/<\/?li>/g, '')) || [];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={meta_description} />
        <meta name="keywords" content={meta_keywords} />
        <meta name="robots" content={meta_robots} />
      </Head>
      <Header
        introduccion={meta_description}
        caracteristicas={caracteristicas}
        globalFotos={[/* Añade URLs de imágenes si es necesario */]}
        marcaPadre={title}
      />
      <PostDetails content={body_content} />
    </>
  );
};

export default PostPage;