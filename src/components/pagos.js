import axios from 'axios'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Pagos() {
  const { register, getValues } = useForm()
  const [todos, setTodos] = useState()
  const consumeApi = async (URL) => {
    const response = await axios.get(URL)
    console.log(response.data)
    setTodos(response.data)
  }

  const imagen =
    'https://solicitaloahora.financieramontedepiedad.com.mx/images/brand/financiera_monte_de_piedad_logo.png'


  return (
    <div>
      <header id="main-header">
        <img id="logo-header" src={`${imagen}`} />
        <nav>
          <ul>
            <li>
              <p>Inicio</p>
            </li>
          </ul>
        </nav>
      </header>
      <header id="line-header"></header>
      <section id="main-content">
        <article>
          <header>
            <h1>Pagos online</h1>
          </header>
          <div class="content">
            <form class="row g-3 needs-validation" novalidate>
              <div class="col-md-4">
                <label for="validationCustom01" class="form-label">
                Nombre del beneficiario
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  {...register('clientFullName')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom01" class="form-label">
                  Monto
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  {...register('monto')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom01" class="form-label">
                Fecha de operacion 
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  {...register('fechaoperacion')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom01" class="form-label">
                Cuenta clabe
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  {...register('clientCLABE')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom01" class="form-label">
                  Referencia de pago
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  {...register('referencianumerica')}
                />
              </div>
              <div class="col-12">
                <button
                  type="button"
                  onClick={() => {
                    const values = getValues()
                    console.log(values)
                    const fechaSalida = values.fechaoperacion
                    console.log(fechaSalida.replaceAll('-', ''))
                    const url = `http://127.0.0.1:5000/pagos-online?clientFullName=${values.clientFullName}&monto=${values.monto}&fechaoperacion=${fechaSalida.replaceAll('-', '')}&clientCLABE=${values.clientCLABE}&referencianumerica=${values.referencianumerica}`
                    console.log(url)
                    consumeApi(url)
                  }}
                >
                  Realizar pago
                </button>
              </div>
            </form>
            <br />
            <h3>{!todos ? '' : 'Operacion realizada'}</h3>
          </div>
        </article>
      </section>
    </div>
  )
}
