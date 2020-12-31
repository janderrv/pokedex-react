import React from 'react';
import { GET_FIRST_GENERATION } from '../api';
import useFetch from '../Hooks/useFetch';
import PokeCard from './PokeCard';
import styles from './Home.module.css';
import { Button, Input } from '@material-ui/core';
import logo from '../Assets/pokemon-logo.png';
import useForm from '../Hooks/useForm';

const Home = () => {
  const { data, request } = useFetch();
  const [pokeBusca, setPokeBusca] = React.useState(null);
  const busca = useForm();

  const buscarPoke = (event) => {
    event.preventDefault();
    setPokeBusca(null);
    data.results.filter((poke) => {
      if (poke.name === busca.value) setPokeBusca(poke);
      return poke;
    });
  };

  React.useEffect(() => {
    async function fetchPokemons() {
      const { url, options } = GET_FIRST_GENERATION();
      await request(url, options);
    }
    fetchPokemons();
  }, [request]);

  if (data)
    return (
      <>
        <header>
          <img src={logo} alt="logo" />
        </header>
        <form className={styles.busca} onSubmit={buscarPoke}>
          <Input
            className={styles.input}
            id="standard-basic"
            placeholder="Buscar pokemon pelo nome"
            label="Buscar pokemon"
            {...busca}
          />
          <Button
            className={styles.btnBuscar}
            variant="contained"
            color="primary"
            onClick={buscarPoke}
          >
            Buscar
          </Button>
        </form>
        <div className={styles.container}>
          {pokeBusca ? (
            <PokeCard urlpoke={pokeBusca.url} key={pokeBusca.url} />
          ) : (
            data.results.map((poke) => (
              <PokeCard urlpoke={poke.url} key={poke.url} />
            ))
          )}
        </div>
      </>
    );
  else return null;
};

export default Home;
