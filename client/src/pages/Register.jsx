import Logo from "../assets/logoLogin.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <main className="bg-[#01021C]">
      <div className="grid grid-cols-2 items-center">
        <div className="">
          <img className="w-full" src={Logo} alt="" />
        </div>
        <div className="flex p-8">
          <div>
            {
                RegisterErrors.map((error, i) => (
                    <div className="bg-red-500 text-white" key={i}>
                        {error}
                    </div>
                ))
            }
            <form
              onSubmit={handleSubmit(async (values) => {
                values.image = values.image[0];
                await signUp(values);
              })}
            >
              <div>
                <input
                  placeholder="Ingresa tu nombre"
                  type="text"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500">Ingrese un nombre</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Ingresa tu correo"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500">Ingrese un correo</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500">Ingrese una contraseña</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Coloca tu foto de perfil"
                  type="file"
                  {...register("image", { required: true })}
                />
                {errors.image && (
                  <p className="text-red-500">Ingrese una imagen</p>
                )}
              </div>
              <button className="text-white" type="submit">
                Enviar
              </button>
            </form>
          </div>
          <div className="text-white">
            <h2 className="font-black uppercase">registrar una cuenta</h2>
            <p className="">
              Este es el momento en que como estudiante puedes obtener un acceso
              inicial en el que puedas entrar a nuestro sitio web para ver
              algunos de los productos y servicios que nos puede ofrecer nuestra
              comunidad universitaria y que ademas, tenga un facil acceso.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
