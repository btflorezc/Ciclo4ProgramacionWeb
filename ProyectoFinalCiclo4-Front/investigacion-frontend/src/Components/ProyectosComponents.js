import React, {useState} from 'react';
import { useQuery, gql } from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';


// import Dependiente from "./Dependiente";

const Proyectos = () => {
  const PROYECTOS = gql`
    query{
      proyectos{
        lider
        nombre
        objetivosGenerales
        presupuesto

      }
    }
  `;

  const [autenticado, setAutenticado] = useState("NO")
  const autenticar = ()=>{
      setAutenticado("SI")
  }
  const { loading, error, data } = useQuery(PROYECTOS,{context:{
    headers:{
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mzg0OTI3NTQsImV4cCI6MTYzODQ5OTk1NH0.kGYBy-H23TDq75GMGyLPi6_Za2A_xqgiXuI0_1yaDC4" 
    }
  }})
  if (loading) return "<h1>Cargando</h1>"
  if (error) return "<h1>problemas con el server de graphql</h1>"
  
  const datosTabla = data.proyectos.map(({ lider, nombre, objetivosGenerales, presupuesto }) => (
    <tr>
      <td>{lider}</td>
      <td>{nombre}</td>
      <td>{objetivosGenerales}</td>
      <td>{presupuesto}</td>
    </tr>
  ));

  return (
    <div><h1>Listar Proyectos </h1><table class="table">
      <thead>
        <th>Líder</th>
        <th>Nombre Proyecto</th>
        <th>Objetivos Generales</th>
        <th>Presupuesto</th>
      </thead>
      {datosTabla}
    </table><button onClick ={autenticar}>Autenticar</button>valor: {autenticado}</div>
  )
}

export default Proyectos
