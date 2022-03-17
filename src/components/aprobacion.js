import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
export default function Aprobacion() {
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
      <p class="h1">Aprobacion del prestamo</p>
      <br />
      <form class="row g-3 needs-validation" novalidate>
        <div class="col-md-4">
          <label for="validationCustom01" class="form-label">
            ID del cliente
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            required
            {...register('id_client')}
          />
        </div>
        <div class="col-md-4">
          <label for="validationCustom01" class="form-label">
            ID del prestamo
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            required
            {...register('id_loan')}
          />
        </div>
        <div class="col-12">
          <button
            class="btn btn-primary"
            type="button"
            onClick={() => {
              const values = getValues()
              console.log(values)
              const url = `http://127.0.0.1:5000/aprobacion?id_loan=${values.id_loan}&id_client=${values.id_client}`
              console.log(url)
              consumeApi(url)
            }}
          >
            Aprobar
          </button>
        </div>
      </form>
      <br />
      <div class="card">
        <div class="card-header">Resultado</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>{!todos ? '' : `Tipo del prestamo:  ${todos.loanName}`}</p>
            <p>{!todos ? '' : `Monto del prestamo: $${todos.loanAmount}`}</p>
            <p>
              {!todos
                ? ''
                : `Fecha de Aprobacion del prestamo: ${new Date(
                    todos.approvedDate
                  ).toDateString()}`}
            </p>
            <br />
            <footer class="blockquote-footer">
              {!todos ? '' : `>Estado del prestamo: ${todos.accountState}`}
            </footer>
          </blockquote>
        </div>
      </div>
      <br />
      {!todos ? (
        ''
      ) : (
        <a href="http://localhost:3000/desembolso">
          <button class="btn btn-primary" type="button">
            Desembolsar
          </button>
        </a>
      )}
    </div>
  )
}
