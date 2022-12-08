import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
//importações criadas
import "./favoritos.css";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@filmesFlix");
    setFilmes(JSON.parse(myList) || []);
  }, []);


  function handleClear(id){
    let filterMovies = filmes.filter((item) => {
        return(item.id !== id);
    })

    setFilmes(filterMovies);
    localStorage.setItem("@filmesFlix", JSON.stringify(filterMovies));
    toast.success('Filme removido com sucesso!')
  }


  return (
    <div className="meus-filmes">
      <h1>Meus filmes favoritos</h1>
      {filmes.length === 0 && <span>Nenhum filme favoritado :( !!</span>}
      <ul>
        {filmes.map((item) => {
            return(
                <li key={item.id}>
                    <span>{item.title}</span>
                    <div>
                        <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                        <button onClick={() => handleClear(item.id)}>Deletar</button>
                    </div>
                </li>
            )
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
