import axios from 'axios'
import '../App.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Reportes() {
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
            <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
                <label for="validationCustom01" class="form-label">
                  Fecha de inicio
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  {...register('fechaInicio')}
                />
              </div>
              <div class="col-md-4">
                <label for="validationCustom01" class="form-label">
                  Fecha fin
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  {...register('fechaFin')}
                />
              </div>
              <div class="col-12">
                <button
                  type="button"
                  onClick={() => {
                    const values = getValues()
                    console.log(values)
                    console.log(obtenerDia(values.fechaInicio))
                    console.log(obtenerDia(values.fechaFin))
                    const url = `http://127.0.0.1:5000/reportes?fechaInicio=${obtenerDia(values.fechaInicio)}&fechaFin=${obtenerDia(values.fechaFin)}`
                    console.log(url)
                    consumeApi(url)
                  }}
                >
                  Buscar
                </button>
              </div>
            </form>
            <br/>
            <br />
            <h2>{!todos ? '' : 'Lista de cuentas'}</h2>
            <table class="table table-borderless">
              {!todos ? '' : (
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Saldo de capital</th>
                  <th scope="col">Capital pagado</th>
                  <th scope="col">Saldo de intereses</th>
                  <th scope="col">Intereses pagado</th>
                  <th scope="col">Saldo de penalizaciones</th>
                  <th scope="col">Penalizaciones pagado</th>
                  <th scope="col">Saldo de cargos</th>
                  <th scope="col">Cargos pagados</th>
                  <th scope="col">Centro de Beneficio</th>
                </tr>
              </thead>
              )}
              <tbody>
              {!todos
                  ? ''
                  : todos.map((todo, index) => {
                      return (
                        <tr key={index}>
                          <td align='right'>{`${todo.id}`}</td>
                          <td align='right'>{`${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(todo.balances.principalBalance))}`}</td>
                          <td align='right'>{`${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(todo.balances.principalDue))}`}</td>
                          <td align='right'>{`${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(todo.balances.interestBalance))}`}</td>
                          <td align='right'>{`${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(todo.balances.interestPaid))}`}</td>
                          <td align='right'>{`${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(todo.balances.penaltyBalance))}`}</td>
                          <td align='right'>{`${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(todo.balances.penaltyPaid))}`}</td>
                          <td align='right'>{`${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(todo.balances.feesBalance))}`}</td>
                          <td align='right'>{`${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(todo.balances.feesPaid))}`}</td>
                          <td>
                            {!todos ? (
                              ''
                            ) : (
                              <button
                                id="buttonConsult"
                                type="button"
                                onClick={() => {
                                  const url = `http://127.0.0.1:5000/sucursal?id=${todo.assignedBranchKey}`
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
            <div align="center">
            <br/>
            <h2>{!saldos ? '': `Centro de Beneficio`}</h2>
            <b>{!saldos ? '': 'ID'}</b>: {!saldos ? '': `${saldos.id}`}
            <br/>
            <b>{!saldos ? '': 'Nombre'}</b>: {!saldos ? '': `${saldos.name}`}
            <br/>
            <b>{!saldos ? '': 'Estado'}</b>: {!saldos ? '': `${saldos.state}`}
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}
