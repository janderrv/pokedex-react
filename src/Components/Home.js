import React from 'react';
import { GET_FIRST_GENERATION } from '../api';
import useFetch from '../Hooks/useFetch';
import PokeCard from './PokeCard';
import styles from './Home.module.css';
import { TextField, Button, Input } from '@material-ui/core';
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
        <div>
          <form className={styles.busca} onSubmit={buscarPoke}>
            <Input
              className={styles.input}
              id="standard-basic"
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
        </div>
        <div className={styles.container}>
          {pokeBusca ? (
            <div className={styles.card} key={pokeBusca.url}>
              <PokeCard urlpoke={pokeBusca.url} />
            </div>
          ) : (
            data.results.map((poke) => (
              <div className={styles.card} key={poke.url}>
                <PokeCard urlpoke={poke.url} />
              </div>
            ))
          )}
        </div>
      </>
    );
  else return null;
};

export default Home;
