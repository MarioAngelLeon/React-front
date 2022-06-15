import '../App.css'
import axios from 'axios'
import Select from 'react-select'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'


export default function Prestamo() {
  const [productos, setProductos] = useState(0)
  const [prestamo, setPrestamo] = useState(0)
  const [cuotas, setCuotas] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const { register, getValues } = useForm()
  const didMount = useRef(null)
  const urlBase = 'http://localhost:5000/example/v1'

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      obtenerProductos()
    }
  })

  const obtenerProductos = async () => {
    const { data } = await axios.get(urlBase + '/product/search')
    console.log(data)
    setProductos(data)
  }

  const options = !productos ? [] : (
    productos.map((producto, index) => {
        return ( { value: index, label: producto.name } )
    })
  )

  function diaHoy() {
    let days = new Date()
    days.setDate(days.getDate())
    const result = `${days.toJSON().split('T')[0]}`
    return result
  }

  function obtenerMoneda(value){
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(value))
  }

  function obtenerDia(fecha) {
    let days = new Date(fecha)
    days.setDate(days.getDate())
    const resultl = days.toISOString().split('T')[0]
    return resultl
  }

  const orquestacion = async (producto, formulario) => {
    console.log(producto.encodedKey)
    console.log(formulario)
    //Obtener el encodedKey del cliente
    const validacionCliente = await axios.get(`${urlBase}/client-validation/${formulario.idCliente}`)
    const { encodedKey } = JSON.parse(JSON.stringify(validacionCliente.data))
    //Solo funciona para el Credito simple dinamico mensual v1.0
    const payload = {
        accountHolderKey: encodedKey,
        accountHolderType: 'CLIENT',
        loanAmount: formulario.monto,
        productTypeKey: producto.encodedKey,
        scheduleSettings: {
            gracePeriod: 0,
            repaymentInstallments: formulario.plazo
        },
        disbursementDetails: {
            expectedDisbursementDate: `${formulario.desembolso}T00:00:00-05:00`,
            firstRepaymentDate: `${formulario.primer_pago}T00:00:00-05:00`,
            transactionDetails: {
                transactionChannelKey: '8a44b4917d901148017da066597114fd',
                transactionChannelId: 'stp'
            }
        },
        interestSettings: {
            interestRate: formulario.interes
        }
    }
    console.log(payload)
    //Creacion de la cuenta de prestamo
    const creacionPrestamo = await axios.post(urlBase + '/loan', payload)
    const prestamoValidacion = JSON.parse(JSON.stringify(creacionPrestamo.data))
    setPrestamo(prestamoValidacion)
    console.log(creacionPrestamo.status)
    //Obtenemos el esquema de pagos
    const { data } = await axios.get(urlBase + `/loan-schema/${prestamoValidacion.id}`)
    console.log(data)
    setCuotas(data)
  }

  const imagen =
    'https://solicitaloahora.financieramontedepiedad.com.mx/images/brand/financiera_monte_de_piedad_logo.png'

  return (
    <div>
      <header id="main-header">
        <img id="logo-header" src={`${imagen}`} alt="" />
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
            <h1>Crear una cuenta de prestamo</h1>
          </header>
          <div className="content">
          <h3>Seleccionar producto</h3>
          <br />
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />
            {!selectedOption ? '': console.log(productos[selectedOption.value].name)}
            <br />
            <h3>Condiciones del crédito</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Minimo</th>
                  <th scope="col">Maximo</th>
                  <th scope="col">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr key="1">
                  <th scope="row">Tasa</th>
                  <td>{!selectedOption ? '' : `${productos[selectedOption.value].interestRate.minValue}%`}</td>
                  <td>{!selectedOption ? '' : `${productos[selectedOption.value].interestRate.maxValue}%`}</td>
                  <td>{!selectedOption ? '' : `${productos[selectedOption.value].interestRate.defaultValue}%`}</td>
                </tr> 
                <tr key="2">
                  <th scope="row">Disposiciones</th>
                  <td>{!selectedOption ? '' : productos[selectedOption.value].numInstallments.minValue}</td>
                  <td>{!selectedOption ? '' : productos[selectedOption.value].numInstallments.maxValue}</td>
                  <td>{!selectedOption ? '' : productos[selectedOption.value].numInstallments.defaultValue}</td> 
                </tr>  
                <tr key="3">
                  <th scope="row">Importe</th>
                  <td>{!selectedOption ? '' : `${obtenerMoneda(productos[selectedOption.value].loanAmount.minValue)}`}</td>
                  <td>{!selectedOption ? '' : `${obtenerMoneda(productos[selectedOption.value].loanAmount.maxValue)}`}</td>
                  <td>{!selectedOption ? '' : `${obtenerMoneda(productos[selectedOption.value].loanAmount.defaultValue)}`}</td>
                </tr>       
              </tbody>
            </table>
            <br />
            <form className="row g-3 needs-validation">
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">
                  Identificador del cliente
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="Esperando informacion"
                  required
                  {...register('idCliente')}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom11" className="form-label">
                  Monto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom11"
                  placeholder={!selectedOption ? 'Esperando informacion' : `${productos[selectedOption.value].loanAmount.defaultValue}`}
                  required
                  {...register('monto')}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom12" className="form-label">
                  Plazo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom12"
                  placeholder={!selectedOption ? 'Esperando informacion' : `${productos[selectedOption.value].numInstallments.defaultValue}`}
                  required
                  {...register('plazo')}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom14" className="form-label">
                  Tasa de interes
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom14"
                  placeholder={!selectedOption ? 'Esperando informacion' : `${productos[selectedOption.value].interestRate.defaultValue}`}
                  required
                  {...register('interes')}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom15" className="form-label">
                  Fecha de desembolso
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom15"
                  placeholder={diaHoy()}
                  required
                  {...register('desembolso')}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom16" className="form-label">
                  Fecha de primer pago
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom16"
                  placeholder={diaHoy()}
                  required
                  {...register('primer_pago')}
                />
              </div>
              <div className="col-12">
                <button
                  type="button"
                  onClick={() => {
                    const values = getValues()
                    orquestacion(productos[selectedOption.value], values)
                  }}
                >
                  Generar
                </button>
              </div>
            </form>
            <br />
            <h3>{!prestamo ? '' : 'Informacion del prestamo'}</h3>
            <br />
            <p><b>{!prestamo ? '' : 'Identificador: '}</b>{!prestamo ? '' : `${prestamo.id}`}</p>
            <p><b>{!prestamo ? '' : 'Nombre del prestamo: '}</b>{!prestamo ? '' : `${prestamo.loanName}`}</p>
            <p><b>{!prestamo ? '' : 'Estado del prestamo: '}</b>{!prestamo ? '' : `${prestamo.accountState}`}</p>
            <br />
            <h3>{!cuotas ? '' : 'Tabla de amortizacion'}</h3>
            <table className="table table-striped">
            {!cuotas ? '' : (
              <thead>
                <tr>
                  <th scope="col"># Cuota</th>
                  <th scope="col">Fecha de pago</th>
                  <th scope="col">Capital Pendiente</th>
                  <th scope="col">Interés A Pagar</th>
                  <th scope="col">Impuestos Pendientes</th>
                  <th scope="col">Total A Pagar</th>
                </tr>
              </thead>
            )}
              <tbody>
                {!cuotas ? '' : (
                  cuotas.installments.map((cuota, index) => {
                    return (
                      <tr key={index}>
                        <td center="true">{cuota.number}</td>
                        <td center="true">{obtenerDia(cuota.dueDate)}</td>
                        <td center="true">{`${obtenerMoneda(cuota.principal.amount.expected)}`}</td>
                        <td center="true">{`${obtenerMoneda(cuota.interest.amount.expected)}`}</td>
                        <td center="true">{`${obtenerMoneda(cuota.interest.tax.expected)}`}</td>
                        <td center="true">
                          {obtenerMoneda(Math.ceil(
                            parseFloat(cuota.principal.amount.expected, 10) +
                              parseFloat(cuota.interest.amount.expected, 10) +
                              parseFloat(cuota.interest.tax.expected, 10)
                          ))}
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
