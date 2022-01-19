import './filme-info.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if(response.data.length === 0){
                //tentou acessar id que não existe, jogo o user para a home
                navigate('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();

        //desmontar componente
        return () => {
            console.log("Componente Desmontado");
        }

    },[navigate, id]);

    function salvaFilme(){

        const minhaLista = localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(minhaLista) || []; //tratativa undefined

        //se tiver algum filme salvo com esse mesmo id precisa ignorar..
        const hasFilme = filmesSalvos.some( (filmeSalvos) => filmeSalvos.id === filme.id)

        if(hasFilme){
            toast.info("Você já salvou esse filme!");
            return;
        } 

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme Salvo com Sucesso!');

    }

    if(loading){ //renderização condicional
        return(
            <div className='filme-info'>
                <h1>Carregando seu filme...</h1>
            </div>
        );
    }
    return(
        <div className='filme-info'>
            <h1> {filme.nome} </h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className='botoes'>
                <button onClick={ salvaFilme }>Salvar</button>
                <button>
                    <a target="_blank" rel="noopener noreferrer" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}