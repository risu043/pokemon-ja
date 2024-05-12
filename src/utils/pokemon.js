export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const loadPokemonDetails = async (data) => {
  // ポケモン配列から1階層目の詳細データを取得
  let _pokemonData = await Promise.all(
    data.map((pokemon) => {
      let pokemonRecord = getPokemon(pokemon.url);
      return pokemonRecord;
    })
  );

  // ポケモン配列から2階層目の詳細データを取得
  let _pokemonDetails = await Promise.all(
    _pokemonData.map((pokemon) => {
      let pokemonRecord = getPokemon(pokemon.species.url);
      return pokemonRecord;
    })
  );

  // ポケモンの日本語プロパティを取得（名前・テキスト）
  let pokemonNamesAndText = _pokemonDetails.map((pokemon) => {
    let jaName = pokemon.names.find(
      (entry) => entry.language.name === 'ja-Hrkt'
    ).name;
    let jaText = '';
    if (pokemon.flavor_text_entries) {
      let flavorTextEntry = pokemon.flavor_text_entries.find(
        (entry) => entry.language.name === 'ja-Hrkt'
      );
      if (flavorTextEntry && flavorTextEntry.flavor_text) {
        jaText = flavorTextEntry.flavor_text;
      }
    }

    return {
      name: jaName,
      text: jaText,
    };
  });

  // タイプに関する詳細なデータを含むurlを取得
  let pokemonTypesUrl = _pokemonData.map((pokemon) => {
    let typesURL = pokemon.types.map((type) => type.type.url);
    return typesURL;
  });

  // ポケモンの日本語プロパティを取得（タイプ）
  let pokemonTypes = await Promise.all(
    pokemonTypesUrl.map(async (urlArray) => {
      let pokemonTypesData = await Promise.all(
        urlArray.map(async (url) => {
          let pokemonTypeDetail = await getPokemon(url);
          let jaName = pokemonTypeDetail.names.find(
            (name) => name.language.name === 'ja-Hrkt'
          ).name;
          return jaName;
        })
      );
      return pokemonTypesData;
    })
  );

  // アビリティに関する詳細なデータを含むurlを取得
  let pokemonAbilitiesUrl = _pokemonData.map((pokemon) => {
    let abilityURL = pokemon.abilities.map((ability) => ability.ability.url);
    return abilityURL;
  });

  // ポケモンの日本語プロパティを取得（アビリティ）
  let pokemonAbilities = await Promise.all(
    pokemonAbilitiesUrl.map(async (urlArray) => {
      let pokemonAbilitiesData = await Promise.all(
        urlArray.map(async (url) => {
          let pokemonAbilityDetail = await getPokemon(url);
          let jaName = pokemonAbilityDetail.names.find(
            (name) => name.language.name === 'ja-Hrkt'
          ).name;
          return jaName;
        })
      );
      return pokemonAbilitiesData;
    })
  );

  // ポケモンの詳細データに日本語プロパティを追加
  const _pokemonDetailsData = _pokemonData.map((pokemon, index) => {
    return {
      ...pokemon,
      janame: pokemonNamesAndText[index].name,
      text: pokemonNamesAndText[index].text,
      jatypes: pokemonTypes[index],
      jaabilities: pokemonAbilities[index],
    };
  });
  return _pokemonDetailsData;
};
