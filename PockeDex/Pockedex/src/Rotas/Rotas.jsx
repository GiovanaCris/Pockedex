import { Routes, Route } from "react-router-dom";
import { Pokemons } from '../componentes/Pokemons';
import { Modal } from "../componentes/Modal";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Pokemons />} />
      <Route path="/pokemon/:id" element={<Modal />} />
    </Routes>
  );
}
