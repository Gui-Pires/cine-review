import { Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

function Review() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [validated, setValidated] = useState(false)
    const authUser = localStorage.getItem('user')
    const jsonUser = authUser ? JSON.parse(authUser) : ''
    const [review, setReview] = useState({ userId: jsonUser.id });

    const handleUpdate = async (e) => {
        const form = e.currentTarget;
        const checkComment = String(review.comment).trim()
        setReview({ ...review, comment: checkComment})
        setValidated(true);
        if (form.checkValidity() === false || !checkComment) {
            e.stopPropagation();
            e.preventDefault();
            return
        }


        try {
            const res = await api.post(`/reviews/${id}`, review);

            console.log(e, res)

            if (res.status === 200) {
                navigate(-1);
            }
        } catch (err) {
            setError(err.response.data.error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="d-flex align-items-center mb-3">
                        <button className="btn-backpage me-3" onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
                        <h2>Comentário</h2>
                    </div>
                    <Form onSubmit={handleUpdate} noValidate validated={validated}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nota (1 - 10)</Form.Label>
                            <Form.Control id='rating' type="number" placeholder="Nota" required 
                                min={1} max={10} maxLength={2} value={review.rating}
                                onChange={(e) => setReview({ ...review, rating: Number(e.target.value)})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comentário</Form.Label>
                            <Form.Control id='comment' as="textarea" placeholder="Comentário" required 
                                rows={3} minLength={10} value={review.comment}
                                onChange={(e) => setReview({ ...review, comment: e.target.value})} />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="outline-success" type="submit" className='w-100 mb-3'>
                                Comentar
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            {error && <p className='text-danger text-center'>{error}</p>}
        </div>
    )
}

export default Review;