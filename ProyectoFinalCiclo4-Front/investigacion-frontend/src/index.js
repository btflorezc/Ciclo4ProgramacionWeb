import React from 'react';
import ReactDOM from 'react-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:9090/graphql',
  cache: new InMemoryCache()
});

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

  return <table>{datosTabla}</table>
}

const inicio = document.getElementById("root")
ReactDOM.render(
  <ApolloProvider client={client}>
    <Proyectos />
  </ApolloProvider>
  , inicio)
