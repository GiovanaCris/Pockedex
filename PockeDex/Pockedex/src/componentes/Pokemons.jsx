import axios from "axios";
import React, { useState, useEffect } from "react";
import estilos from '../componentes/Pokemons.module.css';
import { Card } from './Card';
import { Modal } from './Modal';

export function Pokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [pokemonSelecionado, setPokemonSelecionado] = useState(null);

    useEffect(() => {
        async function buscarPokemons() {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
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

    const pokemonsFiltrados = pokemons.filter(pokemon => {
        const nomeCondiz = pokemon.name.toLowerCase().includes(filtroNome.toLowerCase());
        const tipoCondiz = filtroTipo === '' || pokemon.types.some(t => t.type.name === filtroTipo);
        return nomeCondiz && tipoCondiz;
    });

    return (
        <div className={estilos.container}>
            <h1>POCKEDEXGI</h1>

            {/*Filtros por nome e tipo*/}
            <div className={estilos.filtros}>
                <input
                    type="text"
                    placeholder="Buscar por nome:"
                    value={filtroNome}
                    onChange={e => setFiltroNome(e.target.value)}
                />
                <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
                    <option value="">Todos os tipos</option>
                    <option value="fire">Fogo</option>
                    <option value="water">Água</option>
                    <option value="grass">Grama</option>
                    <option value="electric">Elétrico</option>
                    <option value="bug">Inseto</option>
                    <option value="normal">Normal</option>
                    <option value="poison">Venenoso</option>
                    <option value="ground">Terra</option>
                    <option value="psychic">Psíquico</option>
                    <option value="rock">Pedra</option>
                    <option value="fighting">Lutador</option>
                    <option value="ghost">Fantasma</option>
                </select>
            </div>

            <div className={estilos.grid}>
                {pokemonsFiltrados.map(pokemon => (
                    <Card key={pokemon.id} pokemon={pokemon} onOpenModal={setPokemonSelecionado} />
                ))}
            </div>

            {pokemonSelecionado && (
                <Modal pokemon={pokemonSelecionado} onClose={() => setPokemonSelecionado(null)} />
            )}
        </div>
    );
}