import axios from 'axios'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Cliente() {
  const { register, getValues } = useForm()
  const [clientes, setClientes] = useState()
  const urlBase = 'http://localhost:5000/example/v1'

  const consumeApi = async (payload) => {
    let respuesta
    //Paso de validacion
    const jsonValidacion = await axios.get(`${urlBase}/client-validation/${payload.id}`)
    const respuestaValidacion = JSON.parse(JSON.stringify(jsonValidacion.data))
    //Determina si se agrega o se actualiza
    if (respuestaValidacion.exist === true){
        console.log('Se actualiza')
        respuesta = await axios.put(`${urlBase}/client`, payload)
    }
    else{
        console.log('Se registra')
        respuesta = await axios.post(`${urlBase}/client`, payload)
    }
    console.log(`Status de respuesta: ${respuesta.status}`)
    setClientes(respuesta.status)
  }

  const estructuraCliente = payload => {
      const propertys = payload
      const { id, nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono, correo, rfc, curp, clabe , banco } =  propertys
      const resultado = {
          id,
          firstName: nombre,
          segundo_nombre,
          lastName: apellido_paterno,
          apellido_materno,
          telefono,
          correo,
          rfc,
          curp,
          'infomacion_bancaria':{
              banco,
              clabe
          }
      }
      return resultado
  }

  const operacionRealizada = status => {
      let resultado = 'Operacion no encontrada hizo algo raro'
      if (status === 201) resultado = 'Cliente agregado correctamente'
      else if (status === 204) resultado = 'Cliente actualizado correctamete'
      return resultado
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
            <h1>Creacion del cliente</h1>
          </header>
          <div class="content">
            <h3>Falta relacion centro de beneficio con clientes (Vinculacion del prestamo)</h3>
            <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
                <label for="validationCustom17" class="form-label">
                  ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom17"
                  required
                  {...register('id')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom01" class="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  {...register('nombre')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom10" class="form-label">
                  Segundo nombre
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom10"
                  required
                  {...register('segundo_nombre')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom02" class="form-label">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom02"
                  required
                  {...register('apellido_paterno')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom03" class="form-label">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom03"
                  required
                  {...register('apellido_materno')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom04" class="form-label">
                  Telefono
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom04"
                  required
                  {...register('telefono')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom05" class="form-label">
                  Correo electronico
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom05"
                  required
                  {...register('correo')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom06" class="form-label">
                  RFC
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom06"
                  required
                  {...register('rfc')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom07" class="form-label">
                  CURP
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom07"
                  required
                  {...register('curp')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom08" class="form-label">
                  Banco
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom08"
                  required
                  {...register('banco')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom08" class="form-label">
                  Cuenta clabe
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom08"
                  required
                  {...register('clabe')}
                />
              </div>
              <div class="col-12">
                <button
                  type="button"
                  onClick={() => {
                    const values = getValues()
                    console.log(`Valores obtenidos del formulario: ${JSON.stringify(values)}`)
                    const payload = estructuraCliente(values)
                    console.log(`Body de la peticion: ${JSON.stringify(payload)}`)
                    consumeApi(payload)
                  }}
                >
                  Registrar
                </button>
              </div>
            </form>
            <br />
            <p>{!clientes ? '' : `${operacionRealizada(clientes)}`}</p>
          </div>
        </article>
      </section>
    </div>
  )
}
