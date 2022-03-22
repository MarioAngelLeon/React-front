import axios from 'axios'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Onboarding() {
  const { register, getValues } = useForm()
  const [todos, setTodos] = useState()
  const [aprobaciones, setAprobaciones] = useState()
  const consumeApi = async (URL) => {
    const response = await axios.get(URL)
    console.log(response.data)
    setTodos(response.data)
  }

  const consumeApiAprobacion = async (URL) => {
    const response = await axios.get(URL)
    console.log(response.data)
    setAprobaciones(response.data)
  }

  function obtenerDia(fecha) {
    let days = new Date(fecha)
    days.setDate(days.getDate())
    const resultl = days.toISOString().split('T')[0]
    console.log(fecha)
    return resultl
  }

  function calcularDia(fecha) {
    let days = new Date(fecha)
    days.setDate(days.getDate())
    let getUTC = days.toTimeString().split(' ')[1].split('-')[1]
    const result = `${days.toJSON().split('.')[0]}-${getUTC.substring(
      0,
      getUTC.length - 2
    )}:00`
    console.log(result)
    return result
  }

  function diaHoy() {
    let days = new Date()
    days.setDate(days.getDate())
    const result = `${days.toJSON().split('T')[0]}`
    return result
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
            <h1>Creacion del cliente y credito</h1>
          </header>
          <div class="content">
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
                  {...register('idcliente')}
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
                  {...register('a_p')}
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
                  {...register('a_m')}
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
                <label for="validationCustom11" class="form-label">
                  Monto
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom11"
                  required
                  {...register('monto')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom12" class="form-label">
                  Plazo
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom12"
                  required
                  {...register('plazo')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom13" class="form-label">
                  Dia
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom13"
                  required
                  {...register('dia')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom14" class="form-label">
                  Tasa de interes
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom14"
                  required
                  {...register('interes')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom15" class="form-label">
                  Fecha de desembolso
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom15"
                  value={diaHoy()}
                  required
                  {...register('desembolso')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom16" class="form-label">
                  Fecha de primer pago
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom16"
                  required
                  {...register('primer_pago')}
                />
              </div>
              <div class="col-12">
                <button
                  type="button"
                  onClick={() => {
                    const values = getValues()
                    console.log(values)
                    const url = `http://127.0.0.1:5000/onboarding_v2?nombre=${
                      values.nombre
                    }&a_p=${values.a_p}&a_m=${values.a_m}&telefono=${
                      values.telefono
                    }&correo=${values.correo}&rfc=${values.rfc}&curp=${
                      values.curp
                    }&banco=${values.banco}&clabe=${
                      values.clabe
                    }&segundo_nombre=${values.segundo_nombre}&monto=${
                      values.monto
                    }&plazo=${values.plazo}&dia=${values.dia}&interes=${
                      values.interes
                    }&desembolso=${calcularDia(
                      values.desembolso
                    )}&primer_pago=${
                      !values.primer_pago ? '' : calcularDia(values.primer_pago)
                    }&idcliente=${values.idcliente}`
                    console.log(url)
                    consumeApi(url)
                  }}
                >
                  Generar
                </button>
              </div>
            </form>
            <br />
            <p>{!todos ? '' : 'Datos Importantes'}</p>
            <p>{!todos ? '' : `   Cuenta clabe: ${todos.clabe}`}</p>
            <p>{!todos ? '' : `   Referencia de pago: ${todos.referencia}`}</p>
            <p>{!todos ? '' : `   ID del prestamo: ${todos.id}`}</p>
            <p>{!todos ? '' : `   ID del cliente: ${todos.idClient}`}</p>
            <p>{!todos ? '' : <button type="button">Generar kit</button>}</p>
            <p>
              {!todos ? (
                ''
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const values = getValues()
                    const url = `http://127.0.0.1:5000/aprobacion?id_prestamo=${todos.id}&clabe=${todos.clabe}&fecha=${calcularDia(values.desembolso)}`
                    console.log(url)
                    consumeApiAprobacion(url)
                  }}
                >
                  {!aprobaciones ? 'Contrato Firmado' : 'Prestamo aprobado'}
                </button>
              )}
            </p>
            <p>
              {!aprobaciones
                ? ''
                : `Estado de la cuenta: ${aprobaciones.accountState}`}
            </p>
            <p>{!aprobaciones ? '' : `Monto: ${aprobaciones.loanAmount}`}</p>
            <p>
              {!aprobaciones ? (
                ''
              ) : (
                <a
                  href={`http://localhost:3000/desembolso?idcuenta=${todos.id}&monto=${todos.montoPrestamo}&idcliente=${todos.idClient}`}
                >
                  <button type="button">Desembolsar</button>
                </a>
              )}
            </p>
            <p class="h2">Tabla de amortizacion </p>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col"># Pago</th>
                  <th scope="col">Fecha de pago</th>
                  <th scope="col">Capital</th>
                  <th scope="col">Interes a pagar</th>
                  <th scope="col">IVA del interes</th>
                  <th scope="col">Pago a realizar</th>
                </tr>
              </thead>
              <tbody>
                {!todos ? (
                  <tr key="1">
                    <th scope="row">0</th>
                    <td>Esperando información</td>
                    <td>Esperando información</td>
                    <td>Esperando información</td>
                    <td>Esperando información</td>
                    <td>Esperando información</td>
                  </tr>
                ) : (
                  todos.installments.map((todo, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{todo.number}</th>
                        <td>{obtenerDia(todo.dueDate)}</td>
                        <td>{`$${todo.principal.amount.expected}`}</td>
                        <td>{`$${todo.interest.amount.expected}`}</td>
                        <td>{`$${todo.interest.tax.expected}`}</td>
                        <td>
                          $
                          {Math.ceil(
                            parseFloat(todo.principal.amount.expected, 10) +
                              parseFloat(todo.interest.amount.expected, 10) +
                              parseFloat(todo.interest.tax.expected, 10)
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  )
}
