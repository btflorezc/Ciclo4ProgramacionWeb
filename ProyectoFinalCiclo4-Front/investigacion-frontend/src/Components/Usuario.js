const Usuario = ({user}) =>{
    return <tr>
        <td>{user.nombre_completo}</td>
        <td>{user.identificación}</td>
        <td>{user.estado}</td>
        <td>{user.correo}</td>
        <td>{user.tipo_usuario}</td>
    </tr>
}

export default Usuario