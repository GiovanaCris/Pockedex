import estilos from '../componentes/Modal.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Modal() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => setPokemon(response.data))
            .catch(console.error);
    }, [id]);

    if (!pokemon) return <p>Carregando...</p>;

    return (
        <div className={estilos.modalback}>
            <div className={estilos.modalContainer}>
                <button className={estilos.botaoModal} onClick={() => navigate(-1)}>x</button>
                <h2>{pokemon.name.toUpperCase()}</h2>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p className={estilos.Details}>Tipo(s): {pokemon.types.map(t => t.type.name).join(', ')}</p>
            </div>
        </div>
    );
}