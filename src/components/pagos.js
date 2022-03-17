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

  return (
    <div>
      <br />
      <p class="h1">Generar pagos</p>
      <br />
      <form class="row g-3 needs-validation" novalidate>
        <div class="col-md-4">
          <label for="validationCustom01" class="form-label">
            ID del prestamo
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            required
            {...register('id')}
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
        <div class="col-12">
          <button
            class="btn btn-primary"
            type="button"
            onClick={() => {
              const values = getValues()
              console.log(values)
              const url = `http://127.0.0.1:5000/pagos?monto=${values.monto}&id=${values.id}`
              console.log(url)
              consumeApi(url)
            }}
          >
            Registrar
          </button>
        </div>
      </form>
      <br />
      <div class="card">
        <div class="card-header">Resultado</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>{!todos ? '' : `ID de transaccion:  ${todos.id}`}</p>
            <p>
              {!todos
                ? ''
                : `Canal de desembolso: ${todos.transactionDetails.transactionChannelId}`}
            </p>
            <p>{!todos ? '' : `Monto del pago: $${todos.amount}`}</p>
            <p>
              {!todos
                ? ''
                : `Fecha de operacion ${new Date(
                    todos.valueDate
                  ).toDateString()}`}
            </p>
            <p>
              {!todos
                ? ''
                : `Fecha de registro contable: ${new Date(
                    todos.bookingDate
                  ).toDateString()}`}
            </p>
            <br />
            <footer class="blockquote-footer">
              {!todos ? '' : `>Estado del prestamo: ${todos.type}`}
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
