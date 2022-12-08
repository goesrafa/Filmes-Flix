import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {toast} from 'react-toastify';

//importações criadas
import api from "../../services/api";
import "./movie_info.css";

function Movies() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "95cb821e91948fb8d3f9d1ab60230269",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigation("/", { replace: true });
        });
    }

    loadFilme();

    return () => {
      console.log("componente desmontado");
    };
  }, [navigation, id]);


function saveMovie(){
  const myList = localStorage.getItem('@filmesFlix');

  let moviesSaves = JSON.parse(myList) || [];

  const hasMovie = moviesSaves.some( (moviesSave) => moviesSave.id === filme.id)

  if(hasMovie){
    toast.warn('Filme já se encontra na sua lista')
    return;
  }

  moviesSaves.push(filme);
  localStorage.setItem('@filmesFlix', JSON.stringify(moviesSaves));
  toast.success('Filme favoritado com sucesso');
  
}

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando os detalhes</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sobre</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação do filme: {filme.vote_average} / 10 </strong>

      <div className="area-buttom">
        <button onClick={saveMovie}>Favoritar</button>
        <button>
          <a
            target="_blank"
            rel="external noreferrer"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Movies;
