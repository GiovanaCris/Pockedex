import { useNavigate } from 'react-router-dom';
import estilo from './Card.module.css';

export function Card({ pokemon }) {
  const navigate = useNavigate();

  function abrirDetalhes() {
    navigate(`/pokemon/${pokemon.id}`);
  }

  return (
    <div className={estilo.container} onClick={abrirDetalhes}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className={estilo.imagem} />
      <h3 className={estilo.nome}>{pokemon.name.toUpperCase()}</h3>
      <p className={estilo.tipo}>Tipo: {pokemon.types.map(t => t.type.name).join(', ')}</p>
    </div>
  );
}