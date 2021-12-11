import React from 'react';
import ReactDOM from 'react-dom';
import Proyectos from './Components/ProyectosComponents';
import ListaUsuarios from './Components/ListaUsuario';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  } from "@apollo/client";
import CrearProyecto from './Components/CrearProyecto';

const client = new ApolloClient({
  uri: 'http://localhost:9090/graphql',
  cache: new InMemoryCache()
});
  

const inicio = document.getElementById("root")
ReactDOM.render(
  <ApolloProvider client={client}>
  
    <Proyectos />
    <CrearProyecto/>
    <ListaUsuarios/>
  </ApolloProvider>
  , inicio)
