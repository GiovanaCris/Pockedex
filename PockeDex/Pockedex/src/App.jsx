// import estilos from './App.module.css';
//Estrutura básica para usar React é através das funções
// function App() {
  //Para trazer o resultado da função eu coloco o que quero no Return que deve ter apenas 1 componente
  // return (
    //Para chamar o css dei um apaelido de estilos e chamei usando o classname
    //Tags fantasmas servem para que eu consiga usar tags no mesmo componente

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Rotas } from './Rotas/Rotas';

export function App(){
  return (
    <BrowserRouter>
      <Rotas/>
    </BrowserRouter>
  );
}

export default App