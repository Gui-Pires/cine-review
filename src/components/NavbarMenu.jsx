import { useEffect, useState } from "react";

const NavbarMenu = () => {
    const [scrollPage, setScrollPage] = useState('bg-nav-scroll');

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                setScrollPage('bg-dark-subtle');
            } else {
                setScrollPage('bg-nav-scroll');
            }
        });
    }, [])

    return (
        <nav id="navbar" className={`fixed-top navbar z-3 ` + scrollPage}>
            <div className="container-fluid d-flex justify-content-between">
                <a className="navbar-brand">
                    <h2>Cine Review 🎥</h2>
                </a>
            </div>
        </nav>
    );
};

export default NavbarMenu;
