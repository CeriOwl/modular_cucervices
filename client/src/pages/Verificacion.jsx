import React from 'react'
import Header from '../components/Header'
import { useForm } from 'react-hook-form'

export default function Verificacion() {
    const {register, handleSubmit, formState: { errors}} = useForm();

  return (
    <main className='bg-[#01021C] h-screen'>
        <Header />
        <section className='text-white'>
            <form action="" method="post">
                <div>
                    <label htmlFor="description">Describe tu pefil:</label>
                    <input type="text" name="description" id="description" />
                </div>
                <div>
                    <label htmlFor=""></label>
                </div>
                <div>
                    <button>Verificar mi perfil</button>
                </div>
            </form>
        </section>
    </main>
  )
}
