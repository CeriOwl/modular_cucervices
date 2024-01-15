import { useForm } from "react-hook-form";
import { login } from "../api/auth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  return (
    <main>
      <form
        onSubmit={handleSubmit(async (values) => {
          const res = await login(values);
          console.log(res);
        })}
      >
        <input
          type="email"
          placeholder="Ingresa tu correo"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          {...register("password", { required: true })}
        />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}
