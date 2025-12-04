import { Tabs, Tab, Form, InputGroup, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

export default function AuthPage() {
    const [errorIn, setErrorIn] = useState("");
    const [errorUp, setErrorUp] = useState("");
    const [validatedIn, setValidatedIn] = useState(false)
    const [validatedUp, setValidatedUp] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // e.preventDefault();
        const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
		}
		
		e.preventDefault();
		setValidatedIn(true);

        const email = document.getElementById('login-email').value.trim()
        const password = document.getElementById('login-password').value.trim()

        try {
            const res = await api.post("/users/login", {
                email,
                password
            })

            console.log(e, res)

            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/');
            }
        } catch (err) {
            console.log(err)
            setErrorIn(err.response.data.error);
        }
    }

    const handleRegister = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        setValidatedUp(true);
		if (form.checkValidity() === false) {
			e.stopPropagation();
            return
		}

        const email = document.getElementById('register-email').value.trim()
        const nickname = document.getElementById('register-nickname').value.trim()
        const password = document.getElementById('register-password').value.trim()

        try {
            const res = await api.post("/users/register", {
                nickname,
                email,
                password
            });

            console.log(e, res)

            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/');
            }
        } catch (err) {
            setErrorUp(err.response.data.error);
        }
    }

    return (
        <div className="position-absolute top-50 start-50 translate-middle col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 fade-in">
            <Tabs id="tab-auth" className="mb-3" justify>
                <Tab eventKey="Sign-in" title="Entrar">
                    <Form onSubmit={handleLogin} noValidate validated={validatedIn}>
                        <Form.Group className="mb-3">
                            <Form.Control id='login-email' type="email" placeholder="E-mail" required  />
                            <Form.Control.Feedback type="invalid">
                                Insira seu e-mail
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control id='login-password' type="password" placeholder="Password" required minLength={6} />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="outline-primary" type="submit" className='w-100 mb-3'>
                                Entrar
                            </Button>
                        </Form.Group>
                    </Form>
                    {errorIn && <p className='text-danger text-center'>{errorIn}</p>}
                </Tab>
                
                <Tab eventKey="Sign-up" title="Cadastrar">
                    <Form onSubmit={handleRegister} noValidate validated={validatedUp}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="email">@</InputGroup.Text>
                            <Form.Control id='register-email' type="email" placeholder="E-mail" aria-describedby="email" required minLength={3} />
                        </InputGroup>
                        <Form.Group className="mb-3">
                            <Form.Control id='register-nickname' type="text" placeholder="Nickname" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control id='register-password' type="password" placeholder="Password" required minLength={6} />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="outline-primary" type="submit" className='w-100 mb-3'>
                                Cadastrar
                            </Button>
                        </Form.Group>
                    </Form>
                    {errorUp && <p className='text-danger text-center'>{errorUp}</p>}
                </Tab>
            </Tabs>
        </div>
    )
}