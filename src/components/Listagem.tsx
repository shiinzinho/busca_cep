import axios from 'axios';
import React, {
    Component, useState, ChangeEvent, FormEvent, useEffect
} from 'react';
import { Link } from 'react-router-dom';
import styles from "../App.module.css";
import { CadastroInterface } from '../interfaces/CadastroInterface';

const Listagem = () => {
    const [usuarios, setUsuarios] = useState<CadastroInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "pesquisa"){
            setPesquisa(e.target.value);
        }
    }
    const buscar = (e:FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try{
                const response = await axios.post('http://10.137.9.134:8000/api/findNome',
                {nome: pesquisa},
                {
                    headers: {
                        "Accept" : "application/json",
                        "Content-Type" : "application/json"
                    }
                }).then(function(response){
                    setUsuarios(response.data.data);
                }).catch(function(error){
                    console.log(error);
                })
            } catch(error){
                console.log(error);
            }
        }
        fetchData();
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://10.137.9.134:8000/api/find');
                setUsuarios(response.data.data)
            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <main className={styles.main}>
                <div className='container'>
                    <div className='col-md mb-4'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-title'>
                                    <h5>Pesquisar</h5>
                                    <form className='row' onSubmit={buscar}>
                                        <div className='col-10'>
                                            <input type="text" name='pesquisa' className='form-control' onChange={handleState}/>
                                        </div>
                                        <div className='col-1'>
                                            <button type='submit' className='btn btn-success'>Pesquisar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Listagem de usuários</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>E-mail</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map(usuario => (
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.nome}</td>
                                            <td>{usuario.cpf}</td>
                                            <td>{usuario.email}</td>
                                            <td>
                                                <Link to={"/editar/" + usuario.id} className='btn btn-primary btn-sm'>Editar</Link>
                                                <Link to={""} className='btn btn-danger btn-sm'>Excluir</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Listagem;