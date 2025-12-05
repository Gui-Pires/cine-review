import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModelSearch from "./ModelSearch";

function NavbarMenu () {
    const [scrollPage, setScrollPage] = useState('bg-nav-scroll');
    const navigate = useNavigate();
    const location = useLocation();
    const homePath = location.pathname === '/'
    const authPath = location.pathname === '/auth'
    const authUser = localStorage.getItem('user')
    const jsonUser = authUser ? JSON.parse(authUser) : ''
    const toAuth = authPath || authUser !== "" ? 'd-none' : ''
    const isUser = jsonUser === '' ? 'd-none' : ''

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                setScrollPage('bg-dark-subtle');
            } else {
                setScrollPage('bg-nav-scroll');
            }
        })
    }, [])

    return (
        <nav id="navbar" className={`${homePath ? 'fixed' : 'sticky'}-top navbar z-3 ` + scrollPage}>
            <div className="container-fluid d-flex justify-content-between">
                <div className="navbar-brand btn" onClick={() => navigate('/')}>
                    <h2>Cine Review 🎥</h2>
                </div>
                <div>
                    {/* <button className={`btn btn-outline-primary me-3`}>
                        Pesquisar <i class="bi bi-search"></i>
                    </button> */}
                    <ModelSearch />
                    <button onClick={() => navigate('/auth')} className={`${toAuth} btn fs-4 me-3`}>
                        <i className="bi bi-person-circle"></i>
                    </button>
                    <button onClick={() => navigate('/add')} className={`${isUser || !homePath ? 'd-none' : ''} btn btn-outline-success me-3`}>
                        Filme <i className="bi bi-plus-circle"></i>
                    </button>
                    <button onClick={() => navigate('/me')} className={`${isUser} btn btn-outline-warning me-3`}>
                        {jsonUser.nickname} <i className="bi bi-person-circle"></i>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavbarMenu;
