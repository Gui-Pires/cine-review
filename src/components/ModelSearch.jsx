import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { api } from '../api/api';

function ModelSearch() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        if (!show) return;

        const fitText = text.trim()

        api.get(`/movies/search/?q=${fitText}`)
            .then((res) => setData(res.data))
            .catch(console.error)
        
    }, [text, show])

    return (
        <>
            <Button onClick={() => setShow(true)} type='button' variant='outline-primary' className='me-3'>
                Pesquisar <i className="bi bi-search"></i>
            </Button>
            <Modal size="lg" show={show} onHide={() => setShow(false)} aria-labelledby="model-search">
                <Modal.Header closeButton>
                    <Modal.Title id="model-search">
                        <i className="bi bi-search"></i> Pesquisar Filme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type='text' defaultValue={text} placeholder="Digite aqui o que busca..." 
                        onChange={(e) => setText(e.target.value)} maxLength={70} />
                    {data && data.map((movie, i) => {
                        return (
                            <div className="card card-search my-3" onClick={() => {
                                navigate(`/movies/${movie.id}`)
                                setShow(false)
                                }}>
                                <div className="card-body">
                                    <h6 key={i}>{movie.title}</h6>
                                    <div className='d-flex flex-wrap gap-3'>
                                        <span><i class="bi bi-dot"></i>{movie.director}</span>
                                        <span><i class="bi bi-dot"></i>{movie.genre}</span>
                                        <span><i class="bi bi-dot"></i>{movie.cast}</span>
                                        <span><i class="bi bi-dot"></i>{movie.country}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModelSearch;