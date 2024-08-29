export type Items = {
  name: string;
  jaName: string;
};

export type Names = {
  name: string;
  jaName: string;
};

export type PokemonNamesAndText = {
  name: string;
  text?: string;
};

export type PokemonProperties = {
  id: number;
  thumbnail: string;
  image: string;
  name: string;
  text?: string;
  types: string[];
  abilities: string[];
  weight: number;
  height: number;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export type CardProps = {
  pokemon: PokemonProperties;
};

export interface PokemonDetailsResponse {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  species: {
    url: string;
  };
  types: {
    type: {
      url: string;
      name: string;
    };
  }[];
  abilities: {
    ability: {
      url: string;
      name: string;
    };
  }[];
  flavor_text_entries?: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];
}

export type TranslateData = { id?: string; name: string; jaName: string };
