import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NavbarMenu () {
    const [scrollPage, setScrollPage] = useState('bg-nav-scroll');
    const navigate = useNavigate();
    const location = useLocation();
    const homePath = location.pathname === '/'
    const authPath = location.pathname === '/auth'
    const authUser = localStorage.getItem('user')
    const jsonUser = authUser ? JSON.parse(authUser) : ''


    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                setScrollPage('bg-dark-subtle');
            } else {
                setScrollPage('bg-nav-scroll');
            }
        })
    }, [])

    // localStorage.setItem('user', '')

    return (
        <nav id="navbar" className={`${homePath ? 'fixed' : 'sticky'}-top navbar z-3 ` + scrollPage}>
            <div className="container-fluid d-flex justify-content-between">
                <div className="navbar-brand btn" onClick={() => navigate('/')}>
                    <h2>Cine Review 🎥</h2>
                </div>
                <div onClick={() => navigate('/auth')} className={authPath || authUser !== "" ? 'd-none' : ''}>
                    <h4 className="icon-nav"><i className="bi bi-person-circle"></i></h4>
                </div>
                <div onClick={() => navigate('/me')} className={jsonUser === '' ? 'd-none' : 'btn me-3'}>
                    <h6 className="text-light">{jsonUser.nickname}</h6>
                </div>
            </div>
        </nav>
    )
}

export default NavbarMenu;
