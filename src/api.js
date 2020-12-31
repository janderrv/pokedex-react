export const API_URL = 'https://pokeapi.co/api/v2';

export function GET_POKEMON_BY_ID(id) {
  return {
    url: `${API_URL}/pokemon/${id}`,
    options: {
      method: 'GET',
    },
  };
}

export function GET_FIRST_GENERATION() {
  return {
    url: `${API_URL}/pokemon/?limit=151&offset=0`,
    options: {
      method: 'GET',
    },
  };
}

export function GET_POKEMON_DATA(url) {
  return {
    url: url,
    options: {
      method: 'GET',
    },
  };
}
