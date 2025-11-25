import { useEffect, useState } from "react";

const NavbarMenu = () => {
    const [scrollPage, setScrollPage] = useState('bg-nav-scroll');

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                setScrollPage('bg-dark-subtle');
                console.log('Rolagem acima de 100px detectada');
            } else {
                setScrollPage('bg-nav-scroll');
            }
        });
    }, [])

    return (
        <nav id="navbar" class={`fixed-top navbar z-3 ` + scrollPage}>
            <div class="container-fluid bg-sucess">
                <a class="navbar-brand" href="#">
                    <h2>Cine Review 🎥</h2>
                </a>
            </div>
        </nav>
    );
};

export default NavbarMenu;
