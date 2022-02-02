import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import '../styles/auth.scss';
import { Button } from "../components/Button";
import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
   const { user } = useAuth();
   const navigate = useNavigate();
   const [newRoom, setNewRoom] = useState('');
   
   async function handleCreateRoom(event: FormEvent) { // event acessa as informacoes dentro do form
        event.preventDefault(); // não da reload na página quando clica no botao
        // console.log(newRoom); -> Digita no input, aperta o botão e aparece o valor

        if (newRoom.trim() === ''){ // se existe algum texto. trim() -> remove os espaços
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })
    
        navigate(`/rooms/${firebaseRoom.key}`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo </strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            // digita no input, pega o evento e atualiza o estado
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? 
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}