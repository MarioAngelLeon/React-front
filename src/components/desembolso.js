import axios from 'axios'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Desmbolso() {
  const querystring = window.location.search
  const params = new URLSearchParams(querystring)
  const value_idcuenta = params.get('idcuenta')
  console.log(`ID cuenta: ${value_idcuenta}`)
  const value_monto = params.get('monto')
  console.log(`Monto: ${value_monto}`)
  const value_idcliente = params.get('idcliente')
  console.log(`ID cliente: ${value_idcliente}`)

  const { register, getValues } = useForm()
  const [todos, setTodos] = useState()
  const consumeApi = async (URL) => {
    const response = await axios.get(URL)
    console.log(response.data)
    setTodos(response.data)
  }

  return (
    <div>
      <header id="main-header">
        <img
          id="logo-header"
          src="https://solicitaloahora.financieramontedepiedad.com.mx/images/brand/financiera_monte_de_piedad_logo.png"
        />
        <nav>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
          </ul>
        </nav>
      </header>
      <header id="line-header"></header>
      <section id="main-content">
        <article>
          <div class="content">
            <h1>Desembolso del prestamo</h1>
            <form class="row g-3 needs-validation" novalidate>
              <div class="col-12">
                <button
                  type="button"
                  onClick={() => {
                    const values = getValues()
                    console.log(values)
                    const url = `http://127.0.0.1:5000/desembolso?idcuenta=${value_idcuenta}&monto=${value_monto}&idcliente=${value_idcliente}`
                    console.log(url)
                    consumeApi(url)
                  }}
                >
                  Desembolsar
                </button>
              </div>
            </form>
            <br />
            <div class="card">
              <div class="card-header">Resultado</div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>
                    {!todos
                      ? ''
                      : `Estado del desembolso:  ${todos.statusRS.description}`}
                  </p>
                  <p>
                    {!todos
                      ? ''
                      : `ID de la cuenta de transaccion:  ${todos.messageRS.response[0].transactionId}`}
                  </p>
                  <p>{!todos ? '' : `Monto:  ${value_monto}`}</p>
                  <p>
                    {!todos
                      ? ''
                      : `Numero de confirmacion:  ${todos.messageRS.response[0].confirmations[1].confirmationNumber}`}
                  </p>
                  <br />
                  <footer class="blockquote-footer">
                    {!todos
                      ? ''
                      : `ID en PTS:  ${todos.messageRS.response[0].PTSId}`}
                  </footer>
                </blockquote>
              </div>
            </div>
            <br />
            {!todos ? (
              ''
            ) : (
              <a href="http://localhost:3000/usuario">
                <button type="button">
                  Usuario
                </button>
              </a>
            )}
          </div>
        </article>
      </section>
    </div>
  )
}
