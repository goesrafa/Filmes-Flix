import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//importações criadas
import api from "../../services/api";

function Movies() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "95cb821e91948fb8d3f9d1ab60230269",
          language: "pt-BR",
        },
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() =>{
        console.log('filme não encontrado')
      })
    }

    loadFilme();

    return() =>{
        console.log('componente desmontado');
    }
  }, [])
  if(loading){
    return(
        <div className="filme-info">
            <h1>Carregando os detalhes</h1>
        </div>
    )
  }

  return (
    <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

        <h3>Sobre</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação do filme: {filme.vote_average} / 10 </strong>
    </div>
  );
}

export default Movies;
