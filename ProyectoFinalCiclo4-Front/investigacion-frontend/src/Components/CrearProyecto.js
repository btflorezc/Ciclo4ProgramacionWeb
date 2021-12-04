import {
    gql, useMutation
} from "@apollo/client";
import React from "react";


const MUTATION_PROYECTO = gql`
    mutation creeProyecto($nombreProyecto: String, $lider: String, $objGe: String, $presupuesto: Int ){
        createProject(project:{nombre:$nombreProyecto, lider:$lider, objetivosGenerales:$objGe, presupuesto:$presupuesto})
    }
    
`;


const CrearProyecto = ()=>{
    const [creadorDeProyecto] = useMutation(MUTATION_PROYECTO,{
        context:{
            headers:{
                Authorization:123
            }
        }
    })
    let project={
        nombreProyecto:"",
        objetivos:"",
        lider:"",
        presupuesto:0
        
    }
    return <div>
        <h1>Crear proyecto</h1>
        <form className = "form-group" onSubmit={e=>{
            e.preventDefault();
            creadorDeProyecto({variables:{
                objGe: project.objetivos.value,
                presupuesto: parseInt(project.presupuesto.value),
                nombreProyecto: project.nombreProyecto.value,
                lider: project.lider.value
            }
            })
        }}>
            <div className = "form-group">
                <label>Nombre Proyecto </label>
                <input ref={nombre => project.nombreProyecto = nombre} placeholder="Nombre"/>
            </div>
            <div className = "form-group">
                <label>Objetivos </label>
                <input ref={objetivos => project.objetivos = objetivos} placeholder="Objetivos"/>
            </div>
            <div className = "form-group">
                <label>Líder </label>
                <input ref={lider => project.lider = lider} placeholder="Líder"/>
            </div>
            <div className = "form-group">
                <label>Presupuesto </label>
                <input ref={presupuesto => project.presupuesto = presupuesto} placeholder="Presupuesto"/>
            </div>
           
            <div><button className="btn btn-primary" type ="submit">Registrar Proyecto</button></div>
        </form>
    </div>
}

export default CrearProyecto