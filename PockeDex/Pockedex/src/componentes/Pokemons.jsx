import axios from "axios";
import React, { useState, useEffect } from "react";
import estilos from '../componentes/Pokemons.module.css';
import { Card } from './Card';
import { Modal } from './Modal';

export function Pokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonSelecionado, setPokemonSelecionado] = useState(null);

    useEffect(() => {
        async function buscarPokemons() {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
                const resultados = response.data.results;

                const detalhes = await Promise.all(
                    resultados.map(p => axios.get(p.url).then(r => r.data))
                );
                setPokemons(detalhes);
            } catch (erro) {
                console.error("Erro ao buscar pokémons:", erro);
            }
        }

        buscarPokemons();
    }, []);

    return (
        <div className={estilos.container}>
            <h1>POCKEDEXGI</h1>
            <div className={estilos.grid}>
                {pokemons.map(pokemon => (
                    <Card key={pokemon.id} pokemon={pokemon} onOpenModal={setPokemonSelecionado} />
                ))}
            </div>

            {pokemonSelecionado && (
                <Modal pokemon={pokemonSelecionado} onClose={() => setPokemonSelecionado(null)} />
            )}
        </div>
    );
}