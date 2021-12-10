import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Usuario from "./Usuario";



const ListaUsuarios = () => {
    const USUARIOS = gql`
    query{
        usuarios{
            nombre_completo
            identificacion
            estado
            correo
            tipo_usuario
    }
}
`;
    const { loading, error, data } = useQuery(USUARIOS)
    if (loading) {
        return <div>
            <p>Estoy cargando aun</p>
        </div>
    }
    if (error) {
        return <div>
            <p>Hubo un error</p>
        </div>
    }

    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Identificación</th>
                    <th>Estado</th>
                    <th>Correo</th>
                    <th>Tipo Usuario</th>
                </tr>
                {data.usuarios.map((usuario) => {
                    return <Usuario user={usuario} />
                })}
            </thead>
        </table>
    </div>
}

export default ListaUsuarios