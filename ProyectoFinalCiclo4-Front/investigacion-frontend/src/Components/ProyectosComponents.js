
import { useQuery, gql } from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dependiente from "./Dependiente";

const Proyectos = () => {
  const PROYECTOS = gql`
    query{
      proyectos{
        lider
        facultad
        nombre
      }
    }
  `;


  const { loading, error, data } = useQuery(PROYECTOS)
  if (loading) return "<h1>Cargando</h1>"
  console.log(data)

  const datosTabla = data.proyectos.map(({ lider, facultad, nombre }) => (
    <tr>
      <td>{lider}</td>
      <td>{facultad}</td>
      <td>{nombre}</td>
    </tr>
  ));

  return (
    <div><table class="table">
      <thead>
        <th>Nombre</th>
        <th>Facultad</th>
        <th>Nombre Proyecto</th></thead>
      {datosTabla}
    </table><Dependiente detalleProyecto = {1} /></div>
  )
}

export default Proyectos
