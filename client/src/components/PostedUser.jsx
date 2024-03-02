import { Link } from "react-router-dom";


export default function Service({ data }) {
  return (
    <div className="text-white border flex flex-col items-center p-6 rounded-xl">
      <p className="font-bold text-[2rem] mb-4 text-center">{data.name}</p>
      <div className="w-[20rem]">
        <img
          className="w-full h-auto aspect-square"
          src={data.image.link}
          alt=""
        />
      </div>
      <p className="my-4 text-[1.2rem]">Descripción: {data.description}.</p>
      {
        data.pieces ? 
        <div className="flex gap-4 text-[1.2rem] w-full justify-center">
          <p>Precio: ${data.price} c/u</p>
          <p>Disponible: {data.pieces}</p>
        </div>
        :
        <div className="flex gap-4 text-[1.2rem] w-full justify-center">
          <p>Precio: ${data.price} por hora</p>
        </div>
      }
      <Link
        className="mt-8 text-[1.6rem] bg-[#31587A] hover:bg-[#457B9D] transition-colors w-full text-center rounded-lg py-2"
        to={`/publicados/${data._id}`}
      >
        Editar
      </Link>
    </div>
  );
}