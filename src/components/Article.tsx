/* Components */
import { Image } from "@nextui-org/react";

interface Props {
  title: string;
  desc: string;
  iPath: {
    img: string;
    alt: string;
  }; // illustration Path
  flip: boolean;
}

function Article({ title, desc, iPath, flip }: Props) {
  return (
    <article
      className={`w-full h-5/6 lg:h-80v grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-4`}
    >
      <section
        className={`mx-auto w-2/3 lg:w-full text-center p-4 m-4 flex flex-col justify-center items-center ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 sm:p-2 w-full text-center">
          {title}
        </h2>

        <p className="text-lg lg:text-xl mb-9 p-3">{desc}</p>
      </section>

      <aside
        className={`flex items-center justify-center m-4 ${
          flip ? "lg:order-1" : ""
        }`}
      >
        <Image
          src={iPath.img}
          alt={iPath.alt}
          isBlurred
          className="w-full h-auto anime-float relative right-4 lg:right-0 hidden lg:flex lg:mr-0"
        />
      </aside>
    </article>
  );
}

export default Article;
