import axios from 'axios'
import '../App.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Explotacion() {
    const { register, getValues } = useForm()
    const [clients, setClients] = useState()
    const [loans, setLoans] = useState()
    const [transactions, setTransactions] = useState()
    const [gljournalentries, setGljournalentries] = useState()

    const consumeApi = async (URL,option) => {
        const url = 'http://localhost:5000/example/v1' + URL
        const response = await axios.post(url,{})
        if(option === 1){
            //Opcion de clientes
            console.log(response.data)
            setClients(response.data)
        }
        else if(option === 2){
            //Opcion de cuentas de prestamo
            console.log(response.data)
            setLoans(response.data)
        }
        else if(option === 3){
            //Opcion de transacciones
            console.log(response.data)
            setTransactions(response.data)
        }
        else if(option === 4){
            //Opcion de entradas de diario
            console.log(response.data)
            setGljournalentries(response.data)
        }
        console.log('Consumo ejecutado')
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
                <h1>Explotacion de datos</h1>
                {/* Clientes */}
                <p>Obtener clientes creados y modificados hoy</p>
                <button
                    type="button"
                    onClick={() => {
                        const url = '/clients/modification-today'
                        console.log(url)
                        consumeApi(url,1)
                        }
                    }
                >
                    {!clients ? 'Buscar' : 'Obtenidos correctamente'}
                </button>
                <br/>
                <br/>
                <p>{!clients ? '' : `Resultado de la busqueda: ${clients.length} registros`}</p>
                <br/>
                {/* Cuentas de prestamo */}
                <p>Obtener cuentas de prestamo creadas y modificadas hoy</p>
                <button
                    type="button"
                    onClick={() => {
                        const url = '/loans/modification-today'
                        console.log(url)
                        consumeApi(url,2)
                        }
                    }
                >
                    {!loans ? 'Buscar' : 'Obtenidos correctamente'}
                </button>
                <br/>
                <br/>
                <p>{!loans ? '' : `Resultado de la busqueda: ${loans.length} registros`}</p>
                <br/>
                {/* Transacciones */}
                <p>Obtener transacciones creadas hoy</p>
                <button
                    type="button"
                    onClick={() => {
                        const url = '/transactions/creation-today'
                        console.log(url)
                        consumeApi(url,3)
                        }
                    }
                >
                    {!transactions ? 'Buscar' : 'Obtenidos correctamente'}
                </button>
                <br/>
                <br/>
                <p>{!transactions ? '' : `Resultado de la busqueda: ${transactions.length} registros`}</p>
                <br/>
                {/* Entradas de diario */}
                <p>Obtener entradas de diario creadas hoy</p>
                <button
                    type="button"
                    onClick={() => {
                        const url = '/transactions/creation-today'
                        console.log(url)
                        consumeApi(url,4)
                        }
                    }
                >
                    {!gljournalentries ? 'Buscar' : 'Obtenidos correctamente'}
                </button>
                <br/>
                <br/>
                <p>{!gljournalentries ? '' : `Resultado de la busqueda: ${gljournalentries.length} registros`}</p>
                <br/>
            </div>
        </article>
      </section>
    </div>
  )
}
