const Usuario = ({usua}) =>{
    return <tr>
        <td>{usua.nombre_completo}</td>
        <td>{usua.identificacion}</td>
        <td>{usua.estado}</td>
        <td>{usua.correo}</td>
        <td>{usua.tipo_usuario}</td>
    </tr>
}

export default Usuario