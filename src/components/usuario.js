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
    return resultl
  }

  const imagen =
    'https://solicitaloahora.financieramontedepiedad.com.mx/images/brand/financiera_monte_de_piedad_logo.png'

  return (
    <div>
      <header id="main-header">
        <img id="logo-header" src={`${imagen}`} alt=""/>
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
            <br/>
            {!todos ? '' : (<div class="card">
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <h2>{`Bienvenido ${todos.user.firstName} ${todos.user.lastName}`}</h2>
                  <p></p>
                  <p><b>Correo electrónico: </b>{todos.user.emailAddress}</p>
                  <p><b>Teléfono: </b>{todos.user.mobilePhone}</p>
                </blockquote>
              </div>
            </div>)}
            <br />
            <h2>{!todos ? '' : 'Lista de cuentas'}</h2>
            <br/>
            <table class="table table-borderless">
              {!todos ? '' : (
                <thead>
                <tr>
                  <th scope="col">Prestamo</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Cuotas</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Atraso</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              )}
              <tbody>
                {!todos
                  ? ''
                  : todos.loans.map((todo, index) => {
                      return (
                        <tr key={index}>
                          <td>{`${todo.id}`}</td>
                          <td>{`${todo.accountState}`}</td>
                          <td>{`${todo.scheduleSettings.repaymentInstallments}`}</td>
                          <td>{`$${todo.loanAmount}`}</td>
                          <td>{`$${todo.due_mount}`}</td>
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
                          <td>
                          {!todos ? (
                                      ''
                                    ) : (
                                      <a href={`http://localhost:3000/pagos?nombre=${todos.user.firstName} ${todos.user.lastName}`}>
                                        <button id="buttonPayment" type="button">Pagar</button>
                                      </a>
                                    )}
                          </td>
                        </tr>
                      )
                    })}
              </tbody>
            </table>
            <br />
            <br />
            <table class="table table-striped">
              <thead>
                {!saldos ? '' : (<tr>
                  <th scope="col"># </th>
                  <th scope="col">Pendiente</th>
                  <th scope="col">Capital pendiente</th>
                  <th scope="col">Interes a pagar</th>
                  <th scope="col">Cargos a pagar</th>
                  <th scope="col">Penalizacion pendiente</th>
                  <th scope="col">Impuestos pendientes</th>
                  <th scope="col">Total a pagar</th>
                  <th scope="col">Estado</th>
                </tr>)}
              </thead>
              <tbody>
              {!saldos ? '': (
                  saldos.installments.map((saldo, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{saldo.number}</th>
                        <td>{obtenerDia(saldo.dueDate)}</td>
                        <td>{`$${saldo.principal.amount.due}`}</td>
                        <td>{`$${saldo.interest.amount.due}`}</td>
                        <td>{`$${saldo.fee.amount.due}`}</td>
                        <td>{`$${saldo.fee.tax.due}`}</td>
                        <td>{`$${saldo.interest.tax.due}`}</td>
                      <td>
                      {`$${Math.ceil(
                            parseFloat(saldo.principal.amount.due, 10) +
                            parseFloat(saldo.interest.amount.due, 10) +
                            parseFloat(saldo.fee.amount.due, 10) +
                            parseFloat(saldo.fee.tax.due, 10) +
                            parseFloat(saldo.interest.tax.due, 10)
                          )}`}
                        </td>
                        <td>{saldo.state}</td>
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
