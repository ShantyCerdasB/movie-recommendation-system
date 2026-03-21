/**
 * @fileoverview i18n configuration. Translations are embedded directly — no HTTP loading.
 * Supports English (en) and Spanish (es) with two namespaces:
 *  - "common": shared labels used across the app (nav links, loading states, etc.)
 *  - "pages": page-specific titles and descriptions
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: {
          nav_movies: 'Movies',
          nav_users: 'Users',
          nav_recommendations: 'Recommendations',
          nav_matrix: 'Matrix View',
          nav_math: 'Math',
          loading: 'Loading…',
          error_connection: 'Check your connection and try again.',
          error_load: 'Failed to load data.',
          empty_select_user: 'Select a user to see personalized recommendations',
          empty_no_ratings: 'No ratings found',
          language: 'Language',
          loading_users: 'Loading users…',
          error_load_users: 'Failed to load users. Please refresh the page.',
          select_user_label: 'Select a user',
          select_user_placeholder: 'Choose a user…',
          no_ratings_title: 'No ratings yet',
          no_ratings_desc: 'This user has not rated any movies.',
          ratings_title: 'Ratings',
          ratings_desc: 'All movies rated by this user',
          col_movie: 'Movie',
          col_genre: 'Genre',
          col_score: 'Score',
          predicted_score: 'Predicted score',
          similarity: 'Similarity:',
          sidebar_footer: 'Linear Algebra–based collaborative filtering recommendation engine.',
          results_label: 'Results',
          movies_recommended_one: 'movie recommended',
          movies_recommended_other: 'movies recommended',
          computing_recommendations: 'Computing recommendations…',
          error_load_recommendations: 'Failed to load recommendations',
          no_recommendations_title: 'No recommendations available',
          no_recommendations_desc: 'This user has already rated all movies, or there is insufficient neighbour data to generate recommendations.',
          choose_user_desc: 'Choose a user above to generate recommendations using the collaborative filtering algorithm.',
          similarity_match: '% match',
          recommendation_explanation: 'Recommended based on ratings from {{count}} similar users (avg. similarity: {{avg}})',
        },
        pages: {
          movies_title: 'Movies',
          movies_desc: 'Browse the complete movie catalog',
          users_title: 'Users',
          users_desc: 'User profiles and rating history',
          recommendations_title: 'Recommendations',
          recommendations_desc: 'User-based collaborative filtering powered by cosine similarity',
          matrix_title: 'Matrix View',
          matrix_desc: 'User-movie rating matrix and cosine similarity matrix',
          math_title: 'Mathematical Foundation',
          math_desc: 'Linear algebra concepts powering the recommendation engine',
          about_title: 'About',
          about_desc: 'Simple Movie Recommendation System using Linear Algebra',
          ratings_matrix_tab: 'Ratings Matrix',
          similarity_matrix_tab: 'Similarity Matrix',
          top_n_label: 'Top results',
          matrix_overview_title: 'What do these matrices represent?',
          matrix_ratings_label: 'Rating Matrix (R)',
          matrix_ratings_desc:
            'A matrix of shape (users × movies). Each cell R[i][j] holds the rating user i gave to movie j, or 0 if unrated. This is the core data structure of the recommendation engine.',
          matrix_similarity_label: 'Similarity Matrix (S)',
          matrix_similarity_desc:
            'A square m × m matrix derived from R. S[i][j] = cos(ri, rj) where ri is user i\'s rating vector. The matrix is symmetric and has ones on the diagonal. Higher values indicate stronger taste alignment between two users.',
          // Math page
          math_overview_title: 'Overview',
          math_overview_subtitle: 'User-based collaborative filtering at a glance',
          math_overview_p1:
            'This system uses user-based collaborative filtering. The core idea is to represent each user as a rating vector in an n-dimensional space, where n is the number of movies in the catalog. Each dimension corresponds to one movie; the value at that dimension is the user\'s rating (0 if unrated).',
          math_overview_p1_strong: 'user-based collaborative filtering',
          math_overview_p2:
            'Similarity between users is measured using cosine similarity — the cosine of the angle between two rating vectors. Users whose vectors point in the same direction have similar taste profiles, regardless of how generously or harshly they rate in absolute terms.',
          math_overview_p2_strong: 'cosine similarity',
          math_overview_p3:
            'Missing ratings are predicted as a weighted average of similar users\' known scores. The weights are the cosine similarities themselves, so more similar users have proportionally more influence over the final prediction.',
          math_overview_formula_caption: 'The cosine similarity formula — the central operation of the algorithm.',
          math_steps_title: 'Step-by-Step Process',
          math_worked_title: 'Worked Example',
          math_limitations_title: 'Limitations',
          // Algorithm steps
          step1_title: 'Build the User-Movie Matrix',
          step1_desc:
            'Collect all known ratings and arrange them into a matrix R of shape (m \u00d7 n), where m is the number of users and n is the number of movies. Each cell R[i][j] holds user i\u2019s rating for movie j as an integer from 1 to 5, or 0 when the user has not yet rated that movie. This matrix is the foundational data structure for the entire algorithm.',
          step1_example: 'R \u2208 \u211d\u1d50\u02e3\u207f \u2014 the raw ratings matrix. Zeros denote unrated entries that the algorithm will predict.',
          step2_title: 'Extract Rating Vectors',
          step2_desc:
            'Treat each row of R as a vector r\u1d62 \u2208 \u211d\u207f representing user i\u2019s taste profile across all n movies. Users who rated similar movies highly will have geometrically similar vectors \u2014 they point in approximately the same direction in the n-dimensional rating space. This geometric interpretation is what makes cosine similarity a natural fit for the problem.',
          step2_example: 'A user who rated action movies highly will have large components at action movie indices.',
          step3_title: 'Compute Cosine Similarity',
          step3_desc:
            'For each pair of users (i, j), compute the cosine of the angle between their rating vectors. Cosine similarity is scale-invariant: two users who always agree on relative quality, even if one rates higher in absolute terms, will achieve a similarity close to 1. The result lies in [0, 1] because all ratings are non-negative.',
          step3_example: 'sim(A, B) = 0.87 means A and B share 87% directional alignment in their taste vectors.',
          step4_title: 'Find K Nearest Neighbors',
          step4_desc:
            'For a target user u, sort the other users by their similarity to u in descending order. Retain only the top-K users (excluding u itself) to form the neighborhood N(u). Typical values are K = 3 to K = 10, balancing prediction accuracy against coverage for movies with few neighbor ratings.',
          step4_example: 'With K = 3, only the three users most similar to the target contribute to predictions.',
          step5_title: 'Generate Weighted Predictions',
          step5_desc:
            'For each movie j that user u has not yet rated, compute a weighted average of the ratings that neighbors in N(u) gave to movie j. Neighbors with higher cosine similarity contribute proportionally more weight to the final predicted score. If no neighbor has rated movie j, that movie is excluded from recommendations.',
          step5_example: 'A neighbor with similarity 0.9 contributes nearly twice as much as one with similarity 0.5.',
          step6_title: 'Rank and Return Top-N',
          step6_desc:
            'Collect all predicted scores P[u, j] for movies the user has not yet rated. Sort them in descending order by predicted score and return the highest-ranked entries up to the requested limit. Each recommendation is returned with its predicted score, the dominant similarity weight, and a human-readable explanation.',
          step6_example: 'Requesting top-5 returns the five unrated movies with the highest predicted scores for that user.',
          // Limitations
          lim_title: 'Known Limitations',
          lim1_title: 'Cold Start Problem',
          lim1_desc:
            'New users with no rating history have an empty vector, making cosine similarity undefined. The system cannot generate meaningful recommendations until sufficient ratings are collected.',
          lim2_title: 'Scalability',
          lim2_desc:
            'Computing pairwise cosine similarity for m users requires O(m\u00b2) operations. With millions of users this becomes computationally prohibitive without approximation techniques such as LSH.',
          lim3_title: 'Rating Matrix Sparsity',
          lim3_desc:
            'In practice, users rate only a tiny fraction of available movies, making the matrix highly sparse. Sparse vectors produce unreliable cosine similarities because few dimensions overlap.',
          lim4_title: 'Popularity Bias',
          lim4_desc:
            'Widely-rated movies dominate the dot product and tend to be recommended more often, regardless of their actual fit for the individual user. Niche preferences are underrepresented.',
          lim5_title: 'No Temporal Dynamics',
          lim5_desc:
            'User tastes evolve over time, but this model treats all ratings as equally current. A rating given five years ago carries the same weight as one given last week.',
          // Worked example
          worked_subtitle: 'Computing cosine similarity between Alice and Bob',
          worked_col_user: 'User',
          worked_step1_caption: 'Step 1 \u2014 Dot product: multiply corresponding elements and sum.',
          worked_step2_caption: 'Step 2 \u2014 L2 norms: square each element, sum, then take the square root.',
          worked_step3_caption: 'Step 3 \u2014 Cosine similarity: divide the dot product by the product of norms.',
          worked_result_label: 'Result:',
          worked_result_text:
            'Alice and Bob have a cosine similarity of approximately {{cosine}}, meaning they are roughly {{percent}}% similar in their movie preferences. Bob\'s ratings would therefore carry significant weight when predicting Alice\'s score for any movie she has not yet rated.',
        },
      },
      es: {
        common: {
          nav_movies: 'Pel\u00edculas',
          nav_users: 'Usuarios',
          nav_recommendations: 'Recomendaciones',
          nav_matrix: 'Vista Matriz',
          nav_math: 'Matem\u00e1ticas',
          loading: 'Cargando\u2026',
          error_connection: 'Verifica tu conexi\u00f3n e intenta de nuevo.',
          error_load: 'Error al cargar los datos.',
          empty_select_user: 'Selecciona un usuario para ver recomendaciones personalizadas',
          empty_no_ratings: 'No se encontraron valoraciones',
          language: 'Idioma',
          loading_users: 'Cargando usuarios\u2026',
          error_load_users: 'Error al cargar usuarios. Por favor recarga la p\u00e1gina.',
          select_user_label: 'Selecciona un usuario',
          select_user_placeholder: 'Elige un usuario\u2026',
          no_ratings_title: 'Sin valoraciones',
          no_ratings_desc: 'Este usuario no ha valorado ninguna pel\u00edcula.',
          ratings_title: 'Valoraciones',
          ratings_desc: 'Todas las pel\u00edculas valoradas por este usuario',
          col_movie: 'Pel\u00edcula',
          col_genre: 'G\u00e9nero',
          col_score: 'Puntuaci\u00f3n',
          predicted_score: 'Puntuaci\u00f3n estimada',
          similarity: 'Similitud:',
          sidebar_footer: 'Motor de recomendación basado en álgebra lineal y filtrado colaborativo.',
          results_label: 'Resultados',
          movies_recommended_one: 'película recomendada',
          movies_recommended_other: 'películas recomendadas',
          computing_recommendations: 'Calculando recomendaciones…',
          error_load_recommendations: 'Error al cargar recomendaciones',
          no_recommendations_title: 'Sin recomendaciones disponibles',
          no_recommendations_desc: 'Este usuario ya valoró todas las películas, o no hay suficientes datos de vecinos para generar recomendaciones.',
          choose_user_desc: 'Elige un usuario para generar recomendaciones usando el algoritmo de filtrado colaborativo.',
          similarity_match: '% coincidencia',
          recommendation_explanation: 'Recomendado basado en valoraciones de {{count}} usuarios similares (similitud prom.: {{avg}})',
        },
        pages: {
          movies_title: 'Pel\u00edculas',
          movies_desc: 'Explorar el cat\u00e1logo completo de pel\u00edculas',
          users_title: 'Usuarios',
          users_desc: 'Perfiles de usuario e historial de valoraciones',
          recommendations_title: 'Recomendaciones',
          recommendations_desc: 'Filtrado colaborativo basado en similitud coseno',
          matrix_title: 'Vista Matriz',
          matrix_desc: 'Matriz de valoraciones usuario-pel\u00edcula y matriz de similitud coseno',
          math_title: 'Fundamento Matem\u00e1tico',
          math_desc: 'Conceptos de \u00e1lgebra lineal que impulsan el motor de recomendaci\u00f3n',
          about_title: 'Acerca de',
          about_desc: 'Sistema simple de recomendaci\u00f3n de pel\u00edculas usando \u00e1lgebra lineal',
          ratings_matrix_tab: 'Matriz de Valoraciones',
          similarity_matrix_tab: 'Matriz de Similitud',
          top_n_label: 'Mejores resultados',
          matrix_overview_title: '\u00bfQu\u00e9 representan estas matrices?',
          matrix_ratings_label: 'Matriz de Valoraciones (R)',
          matrix_ratings_desc:
            'Una matriz de forma (usuarios \u00d7 pel\u00edculas). Cada celda R[i][j] contiene la valoraci\u00f3n del usuario i para la pel\u00edcula j, o 0 si no fue valorada. Es la estructura de datos central del motor de recomendaci\u00f3n.',
          matrix_similarity_label: 'Matriz de Similitud (S)',
          matrix_similarity_desc:
            'Una matriz cuadrada m \u00d7 m derivada de R. S[i][j] = cos(ri, rj) donde ri es el vector de valoraciones del usuario i. La matriz es sim\u00e9trica y tiene unos en la diagonal. Valores m\u00e1s altos indican mayor afinidad de gustos entre dos usuarios.',
          // Math page
          math_overview_title: 'Descripci\u00f3n General',
          math_overview_subtitle: 'Filtrado colaborativo basado en usuario de un vistazo',
          math_overview_p1:
            'Este sistema usa filtrado colaborativo basado en usuario. La idea central es representar a cada usuario como un vector de valoraciones en un espacio n-dimensional, donde n es el n\u00famero de pel\u00edculas en el cat\u00e1logo. Cada dimensi\u00f3n corresponde a una pel\u00edcula; el valor en esa dimensi\u00f3n es la valoraci\u00f3n del usuario (0 si no valorada).',
          math_overview_p1_strong: 'filtrado colaborativo basado en usuario',
          math_overview_p2:
            'La similitud entre usuarios se mide usando similitud coseno \u2014 el coseno del \u00e1ngulo entre dos vectores de valoraciones. Usuarios cuyos vectores apuntan en la misma direcci\u00f3n tienen perfiles de gusto similares, independientemente de cu\u00e1n generosa o estrictamente califiquen en t\u00e9rminos absolutos.',
          math_overview_p2_strong: 'similitud coseno',
          math_overview_p3:
            'Las valoraciones faltantes se predicen como un promedio ponderado de las puntuaciones conocidas de usuarios similares. Los pesos son las propias similitudes coseno, por lo que los usuarios m\u00e1s similares tienen proporcionalmente m\u00e1s influencia sobre la predicci\u00f3n final.',
          math_overview_formula_caption: 'La f\u00f3rmula de similitud coseno \u2014 la operaci\u00f3n central del algoritmo.',
          math_steps_title: 'Proceso Paso a Paso',
          math_worked_title: 'Ejemplo Pr\u00e1ctico',
          math_limitations_title: 'Limitaciones',
          // Algorithm steps
          step1_title: 'Construir la Matriz Usuario-Pel\u00edcula',
          step1_desc:
            'Recopila todas las valoraciones conocidas y ord\u00e9nalas en una matriz R de forma (m \u00d7 n), donde m es el n\u00famero de usuarios y n el n\u00famero de pel\u00edculas. Cada celda R[i][j] contiene la valoraci\u00f3n del usuario i para la pel\u00edcula j como entero del 1 al 5, o 0 si el usuario a\u00fan no ha valorado esa pel\u00edcula. Esta matriz es la estructura de datos fundamental de todo el algoritmo.',
          step1_example: 'R \u2208 \u211d\u1d50\u02e3\u207f \u2014 la matriz de valoraciones en bruto. Los ceros indican entradas no valoradas que el algoritmo predecir\u00e1.',
          step2_title: 'Extraer Vectores de Valoraci\u00f3n',
          step2_desc:
            'Trata cada fila de R como un vector r\u1d62 \u2208 \u211d\u207f que representa el perfil de gusto del usuario i en todas las n pel\u00edculas. Los usuarios que valoraron pel\u00edculas similares con puntuaciones altas tendr\u00e1n vectores geom\u00e9tricamente similares \u2014 apuntan aproximadamente en la misma direcci\u00f3n en el espacio n-dimensional. Esta interpretaci\u00f3n geom\u00e9trica es la que hace que la similitud coseno sea ideal para este problema.',
          step2_example: 'Un usuario que valor\u00f3 pel\u00edculas de acci\u00f3n con altas puntuaciones tendr\u00e1 grandes componentes en los \u00edndices de pel\u00edculas de acci\u00f3n.',
          step3_title: 'Calcular Similitud Coseno',
          step3_desc:
            'Para cada par de usuarios (i, j), calcula el coseno del \u00e1ngulo entre sus vectores de valoraci\u00f3n. La similitud coseno es invariante a la escala: dos usuarios que siempre coinciden en calidad relativa, aunque uno califique m\u00e1s alto en t\u00e9rminos absolutos, obtendr\u00e1n una similitud cercana a 1. El resultado est\u00e1 en [0, 1] porque todas las valoraciones son no negativas.',
          step3_example: 'sim(A, B) = 0.87 significa que A y B comparten un 87% de alineaci\u00f3n direccional en sus vectores de gusto.',
          step4_title: 'Encontrar K Vecinos M\u00e1s Cercanos',
          step4_desc:
            'Para un usuario objetivo u, ordena los dem\u00e1s usuarios por su similitud con u en orden descendente. Conserva solo los K usuarios superiores (excluyendo al propio u) para formar el vecindario N(u). Los valores t\u00edpicos son K = 3 a K = 10, equilibrando precisi\u00f3n de predicci\u00f3n con cobertura para pel\u00edculas con pocas valoraciones de vecinos.',
          step4_example: 'Con K = 3, solo los tres usuarios m\u00e1s similares al objetivo contribuyen a las predicciones.',
          step5_title: 'Generar Predicciones Ponderadas',
          step5_desc:
            'Para cada pel\u00edcula j que el usuario u a\u00fan no ha valorado, calcula un promedio ponderado de las valoraciones que los vecinos en N(u) dieron a la pel\u00edcula j. Los vecinos con mayor similitud coseno contribuyen proporcionalmente m\u00e1s peso a la puntuaci\u00f3n predicha final. Si ning\u00fan vecino ha valorado la pel\u00edcula j, esa pel\u00edcula queda excluida de las recomendaciones.',
          step5_example: 'Un vecino con similitud 0.9 contribuye casi el doble que uno con similitud 0.5.',
          step6_title: 'Clasificar y Devolver Top-N',
          step6_desc:
            'Recoge todas las puntuaciones predichas P[u, j] para pel\u00edculas que el usuario a\u00fan no ha valorado. Ord\u00e9nalas en orden descendente por puntuaci\u00f3n predicha y devuelve las entradas mejor clasificadas hasta el l\u00edmite solicitado. Cada recomendaci\u00f3n se devuelve con su puntuaci\u00f3n predicha, el peso de similitud dominante y una explicaci\u00f3n legible.',
          step6_example: 'Solicitar top-5 devuelve las cinco pel\u00edculas no valoradas con las puntuaciones predichas m\u00e1s altas para ese usuario.',
          // Limitations
          lim_title: 'Limitaciones Conocidas',
          lim1_title: 'Problema de Inicio en Fr\u00edo',
          lim1_desc:
            'Los nuevos usuarios sin historial de valoraciones tienen un vector vac\u00edo, lo que hace que la similitud coseno sea indefinida. El sistema no puede generar recomendaciones significativas hasta que se recopilen suficientes valoraciones.',
          lim2_title: 'Escalabilidad',
          lim2_desc:
            'Calcular la similitud coseno por pares para m usuarios requiere operaciones O(m\u00b2). Con millones de usuarios esto se vuelve computacionalmente inviable sin t\u00e9cnicas de aproximaci\u00f3n como LSH.',
          lim3_title: 'Dispersi\u00f3n de la Matriz de Valoraciones',
          lim3_desc:
            'En la pr\u00e1ctica, los usuarios solo valoran una peque\u00f1a fracci\u00f3n de las pel\u00edculas disponibles, haciendo la matriz muy dispersa. Los vectores dispersos producen similitudes coseno poco confiables porque pocas dimensiones se superponen.',
          lim4_title: 'Sesgo de Popularidad',
          lim4_desc:
            'Las pel\u00edculas muy valoradas dominan el producto punto y tienden a recomendarse con m\u00e1s frecuencia, independientemente de su ajuste real al usuario individual. Las preferencias de nicho est\u00e1n subrepresentadas.',
          lim5_title: 'Sin Din\u00e1mica Temporal',
          lim5_desc:
            'Los gustos de los usuarios evolucionan con el tiempo, pero este modelo trata todas las valoraciones como igualmente actuales. Una valoraci\u00f3n de hace cinco a\u00f1os tiene el mismo peso que una de la semana pasada.',
          // Worked example
          worked_subtitle: 'C\u00e1lculo de similitud coseno entre Alice y Bob',
          worked_col_user: 'Usuario',
          worked_step1_caption: 'Paso 1 \u2014 Producto punto: multiplica los elementos correspondientes y suma.',
          worked_step2_caption: 'Paso 2 \u2014 Normas L2: eleva al cuadrado cada elemento, suma y luego saca la ra\u00edz cuadrada.',
          worked_step3_caption: 'Paso 3 \u2014 Similitud coseno: divide el producto punto por el producto de las normas.',
          worked_result_label: 'Resultado:',
          worked_result_text:
            'Alice y Bob tienen una similitud coseno de aproximadamente {{cosine}}, lo que significa que son aproximadamente {{percent}}% similares en sus preferencias cinematogr\u00e1ficas. Las valoraciones de Bob por tanto tendr\u00e1n un peso significativo al predecir la puntuaci\u00f3n de Alice para cualquier pel\u00edcula que a\u00fan no haya valorado.',
        },
      },
    },
  })

export default i18n
