const spanishMovieCatalog: Record<string, { title: string; description: string }> = {
  'The Shawshank Redemption': {
    title: 'Cadena perpetua',
    description:
      'Dos hombres encarcelados forjan un vinculo a lo largo de los anos, encontrando consuelo y redencion a traves de actos de decencia.',
  },
  'The Godfather': {
    title: 'El padrino',
    description:
      'El patriarca envejecido de una dinastia del crimen organizado transfiere el control a su hijo renuente.',
  },
  'The Dark Knight': {
    title: 'El caballero de la noche',
    description:
      'Batman se enfrenta al Joker, un criminal brillante que sumerge a Gotham en la anarquia.',
  },
  'Pulp Fiction': {
    title: 'Tiempos violentos',
    description:
      'Las vidas de dos sicarios, un boxeador, un gangster y su esposa se entrelazan en cuatro historias de violencia y redencion.',
  },
  'Forrest Gump': {
    title: 'Forrest Gump',
    description:
      'Las presidencias de Kennedy y Johnson, la guerra de Vietnam y Watergate se muestran a traves de los ojos de un hombre de Alabama.',
  },
  Inception: {
    title: 'El origen',
    description:
      'Un ladron que roba secretos corporativos al entrar en el subconsciente recibe la tarea inversa de implantar una idea.',
  },
  'The Matrix': {
    title: 'Matrix',
    description:
      'Un hacker descubre que la realidad es una simulacion creada por maquinas y se une a una rebelion.',
  },
  Interstellar: {
    title: 'Interestelar',
    description:
      'Un equipo de exploradores viaja a traves de un agujero de gusano en el espacio para intentar asegurar la supervivencia de la humanidad.',
  },
  Goodfellas: {
    title: 'Buenos muchachos',
    description:
      'La historia de Henry Hill y su vida en la mafia, incluyendo su relacion con su esposa y sus amigos.',
  },
  'Fight Club': {
    title: 'El club de la pelea',
    description:
      'Un oficinista con insomnio y un fabricante de jabon despreocupado forman un club de pelea clandestino.',
  },
  'The Silence of the Lambs': {
    title: 'El silencio de los inocentes',
    description:
      'Una joven cadete del FBI debe recibir ayuda de un asesino canibal encarcelado y manipulador para atrapar a otro asesino serial.',
  },
  "Schindler's List": {
    title: 'La lista de Schindler',
    description:
      'En la Polonia ocupada por los alemanes, Oskar Schindler empieza a preocuparse por su fuerza laboral judia tras presenciar su persecucion.',
  },
  'The Lord of the Rings: The Fellowship of the Ring': {
    title: 'El senor de los anillos: La comunidad del anillo',
    description:
      'Un hobbit humilde y ocho companeros emprenden un viaje para destruir el Anillo Unico y al senor oscuro Sauron.',
  },
  'Spirited Away': {
    title: 'El viaje de Chihiro',
    description:
      'Durante la mudanza de su familia a los suburbios, una nina malhumorada de diez anos entra en un mundo gobernado por dioses y brujas.',
  },
  Parasite: {
    title: 'Parasitos',
    description:
      'La codicia y la discriminacion de clases amenazan la relacion simbiotica entre la adinerada familia Park y la empobrecida familia Kim.',
  },
}

const spanishGenreMap: Record<string, string> = {
  Action: 'Accion',
  Adventure: 'Aventura',
  Animation: 'Animacion',
  Biography: 'Biografia',
  Comedy: 'Comedia',
  Crime: 'Crimen',
  Drama: 'Drama',
  Family: 'Familiar',
  Fantasy: 'Fantasia',
  History: 'Historia',
  Horror: 'Terror',
  Mystery: 'Misterio',
  Romance: 'Romance',
  'Sci-Fi': 'Ciencia ficcion',
  Thriller: 'Suspenso',
}

function isSpanish(language: string): boolean {
  return language.toLowerCase().startsWith('es')
}

export function localizeMovieTitle(title: string, language: string): string {
  if (!isSpanish(language)) {
    return title
  }

  return spanishMovieCatalog[title]?.title ?? title
}

export function localizeMovieDescription(
  title: string,
  description: string,
  language: string,
): string {
  if (!isSpanish(language)) {
    return description
  }

  return spanishMovieCatalog[title]?.description ?? description
}

export function localizeGenreList(genre: string, language: string): string {
  if (!isSpanish(language)) {
    return genre
  }

  return genre
    .split(',')
    .map((part) => part.trim())
    .map((part) => spanishGenreMap[part] ?? part)
    .join(', ')
}
