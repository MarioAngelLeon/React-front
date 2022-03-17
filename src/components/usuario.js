import axios from 'axios'
import '../App.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Usuario() {
  const { register, getValues } = useForm()
  const [todos, setTodos] = useState()
  const [saldos, setSaldos] = useState()

  const consumeApi = async (URL) => {
    const response = await axios.get(URL)
    console.log(response.data)
    setTodos(response.data)
  }

  const consumeApiSaldos = async (URL) => {
    const response = await axios.get(URL)
    console.log(response.data)
    setSaldos(response.data)
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
            <h1>Bienvenido Tal...</h1>
            <form class="row g-3 needs-validation" novalidate>
              <div class="col-md-4">
                <label for="validationCustom01" class="form-label">
                  Ingresa tu ID de cliente
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  {...register('idcliente')}
                />
              </div>
              <div class="col-12">
                <button
                  type="button"
                  onClick={() => {
                    const values = getValues()
                    console.log(values)
                    const url = `http://127.0.0.1:5000/usuario?idcliente=${values.idcliente}`
                    console.log(url)
                    consumeApi(url)
                  }}
                >
                  Buscar
                </button>
              </div>
            </form>
            <br />
            <p></p>
            <p></p>
            {!todos ? (
              ''
            ) : (
              <a href="http://localhost:3000/onboarding">
                <button type="button">Iniciar proceso</button>
              </a>
            )}
            <h2>{!todos ? '' : 'Lista de cuentas'}</h2>
            <table class="table table-borderless">
              <tbody>
                {!todos
                  ? ''
                  : todos.loans.map((todo, index) => {
                      return (
                        <tr key={index}>
                          <td>{`Prestamo:  ${todo.id}`}</td>
                          <td>{`Estado: ${todo.accountState}`}</td>
                          <td>{`Producto: ${todo.loanName}`}</td>
                          <td>{`Monto: ${todo.loanAmount}`}</td>
                          <td>
                            {!todos ? (
                              ''
                            ) : (
                              <button
                                id="buttonConsult"
                                type="button"
                                onClick={() => {
                                  const url = `http://127.0.0.1:5000/saldos?idprestamo=${todo.id}`
                                  console.log(url)
                                  consumeApiSaldos(url)
                                }}
                              >
                                Consultar
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  )
}
