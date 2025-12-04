import { Form, InputGroup, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

export default function AuthPage() {
    const user = JSON.parse(localStorage.getItem('user'))

    const [error, setError] = useState("");
    const [nickname, setNickname] = useState(user.nickname);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [validatedUp, setValidatedUp] = useState(false)
    const navigate = useNavigate();

    function logout() {
        localStorage.setItem('user', '')
        navigate('/')
    }

    const handleUpdate = async (e) => {
        // e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        e.preventDefault();
        setValidatedUp(true);

        try {
            const res = await api.put(`/users/${user.id}`, {
                nickname,
                email: user.email,
                oldpassword: oldPassword,
                newpassword: newPassword
            });

            console.log(e, res)

            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/');
            }
        } catch (err) {
            setError(err.response.data.error);
        }
    }

    return (
        <div className="position-absolute top-50 start-50 translate-middle col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3">
            <div className="d-flex align-items-center mb-3">
                <button className="btn-backpage me-3" onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
                <h2>Atualizar ou Sair</h2>
            </div>
            <Form onSubmit={handleUpdate} noValidate validated={validatedUp}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="nickname">@</InputGroup.Text>
                    <Form.Control id='user-nickname' type="text" defaultValue={user.nickname}
                        placeholder="Nickname" aria-describedby="nickname" required minLength={3}
                        onChange={(e) => setNickname(e.target.value)} />
                </InputGroup>
                <Form.Group className="mb-3">
                    <Form.Control id='user-email' type="email" placeholder="E-mail" required defaultValue={user.email} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control id='user-old-password' type="password" placeholder="Old Password" required minLength={6}
                        onChange={(e) => setOldPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control id='user-new-password' type="password" placeholder="New Password" required minLength={6}
                        onChange={(e) => setNewPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Button variant="outline-primary" type="submit" className='w-100 mb-3'
                        disabled={nickname.trim() === '' || oldPassword.length <= 5 || newPassword <= 5}>
                        Atualizar
                    </Button>
                    <Button variant="outline-danger " type="button" className='w-100 mb-3' onClick={logout}>
                        Logout
                    </Button>
                </Form.Group>
            </Form>
            {error && <p className='text-danger text-center'>{error}</p>}
        </div>
    )
}