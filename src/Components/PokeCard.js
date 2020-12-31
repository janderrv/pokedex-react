import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_POKEMON_DATA } from '../api';
import styles from './PokeCard.module.css';
import { Button } from '@material-ui/core';

const PokeCard = ({ urlpoke }) => {
  const { data, request } = useFetch();

  React.useEffect(() => {
    async function fetchPokemonData() {
      const { url, options } = GET_POKEMON_DATA(urlpoke);
      await request(url, options);
    }
    fetchPokemonData();
  }, [request, urlpoke]);

  if (data)
    return (
      <>
        <div className={styles.card}>
          <div className={styles.card_title}>{data.name}</div>
          <div className={styles.card_img}>
            <img src={data.sprites.front_default} alt={data.name} />
          </div>
          <div className={styles.bottom}>
            <Button
              className={styles.btnMudarSprite}
              variant="outlined"
              color="primary"
            >
              MUDAR SPRITE
            </Button>
          </div>
        </div>
      </>
    );
  else return null;
};

export default PokeCard;
