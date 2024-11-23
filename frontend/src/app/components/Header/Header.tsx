// src/components/atoms/Header/Header.tsx
import React from "react";
import { HeaderProps } from "./Header.Types";
import styles from "./Header.module.css";

const Header: React.FC<HeaderProps> = ({
  introduccion,
  caracteristicas,
  globalFotos,
  marcaPadre,
  modeloPadre,
  carroceriaPadre,
  globalMarca,
  globalModelo,
}) => {
  // Función para formatear el texto
  const formatString = (input: string): string =>
    input
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const imagen = globalFotos[0] || "";
  const fotosArray = [
    "https://totalrenting.es/wp-content/uploads/2024/06/1icono-pyt.png",
    "https://totalrenting.es/wp-content/uploads/2024/06/2icono-pyt.png",
    "https://totalrenting.es/wp-content/uploads/2024/06/3icono-pyt.png",
  ];

  // Prioriza globalMarca/globalModelo si no están marcaPadre/modeloPadre
  const titulo = `${formatString(marcaPadre || globalMarca || "")} ${
    modeloPadre || globalModelo
      ? formatString(modeloPadre || globalModelo || "")
      : ""
  } ${carroceriaPadre ? formatString(carroceriaPadre) : ""}`.trim() || "Información del vehículo";

  const subtitulo = `Características y review del ${titulo}`;

  console.log("Ha pasado por el header");

  return (
    <section className={styles.cabeceraPadre}>
      <article className={styles.imagenCabeceraPadre}>
        <img src={imagen || "https://placehold.co/400"} alt="Imagen cabecera" />
      </article>
      <article className={styles.textosCabeceraPadre}>
        <h1>{titulo}</h1>
        <h2>{subtitulo}</h2>
        <p>{introduccion}</p>
        <div className={styles.gridCabeceraPadre}>
          {caracteristicas.map((caracteristica, index) => (
            <div key={index} className={styles.textoGridCabeceraPadre}>
              <img
                src={fotosArray[index % fotosArray.length]}
                alt={`Icono ${index + 1}`}
              />
              <p>{caracteristica}</p>
            </div>
          ))}
        </div>
        <div className={styles.configuracionCabeceraPadre}>
          <a href="#">
            Configura tu {titulo}
          </a>
        </div>
      </article>
    </section>
  );
};

export default Header;
