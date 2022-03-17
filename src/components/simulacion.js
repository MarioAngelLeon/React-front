import axios from 'axios'
import '../App.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Simulacion() {
  const { register, getValues } = useForm()
  const [todos, setTodos] = useState()
  const consumeApi = async (URL) => {
    const response = await axios.get(URL)
    console.log(response.data)
    setTodos(response.data)
  }

  function obtenerDia(fecha) {
    let days = new Date(fecha)
    days.setDate(days.getDate())
    const resultl = days.toISOString().split('T')[0]
    console.log(fecha)
    return resultl
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
          <div class="content">
            <h1>Simulador de crédito</h1>
            <form class="row g-3 needs-validation" novalidate>
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
                <label for="validationCustom02" class="form-label">
                  Plazo
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom02"
                  required
                  {...register('plazo')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom03" class="form-label">
                  Dia
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom03"
                  required
                  {...register('dia')}
                />
              </div>
              <div class="col-12">
                <button
                  type="button"
                  onClick={() => {
                    const values = getValues()
                    console.log(values)
                    const url = `http://127.0.0.1:5000/simulacion?monto=${values.monto}&plazo=${values.plazo}&dia=${values.dia}`
                    console.log(url)
                    consumeApi(url)
                  }}
                >
                  Calcular
                </button>
              </div>
            </form>
            <br />
            <h2>Tabla de amortizacion</h2>
            <p>
              {!todos ? (
                ''
              ) : (
                <a href="http://localhost:3000/onboarding">
                  <button type="button">Iniciar proceso</button>
                </a>
              )}
            </p>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col"># Cuota</th>
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
                    <td>Esperando consulta</td>
                    <td>Esperando consulta</td>
                    <td>Esperando consulta</td>
                    <td>Esperando consulta</td>
                    <td>Esperando consulta</td>
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
