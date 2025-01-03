import React from "react";

const RenderStartInterfce: React.FC = () => {
  return (
    <section className="w-full h-auto flex flex-col justify-center items-center  relative">
      <h2 className="text-3xl font-K2D font-extrabold relative top-10">Cree sus tableros</h2>
      <img
        src="https://cdn.prod.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e29876a6b93cf9_puzzle-compress.gif"
        alt="Crea tus tableros"
        className="w-72 h-72 md:h-96 md:w-96"
      />
    </section>
  );
};
export default RenderStartInterfce;
