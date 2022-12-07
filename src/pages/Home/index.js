import { useEffect, useState } from "react";
import api from "../../services/api";
import {Link} from 'react-router-dom';

import './home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "95cb821e91948fb8d3f9d1ab60230269",
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 20));
      setLoading(false);
    }
    loadFilmes();
  }, []);

  if(loading){
    return(
        <div className="loading">
            <h2>Carregando lista</h2>
        </div>
    )
  }

  return (
    <div className="container">
      <div className="listMovies">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
              <Link to={`/filme/${filme.id}`}>Veja Mais</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
