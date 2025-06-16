import { useEffect } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

type Props = {
    tema: string;
    botoes: string[];
    seletorView: (tela: string, e: React.MouseEvent) => void;
};

const BarraNavegacao = ({ tema, botoes, seletorView }: Props) => {
    useEffect(() => {
        M.Sidenav.init(document.querySelectorAll('.sidenav'));
    }, []);

    return (
        <>
            <nav className={tema}>
                <div className="nav-wrapper">
                    <a className="brand-logo">WB</a>
                    <a href="#" data-target="mobile-menu" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        {botoes.map((valor) => (
                            <li key={valor}>
                                <a onClick={(e) => seletorView(valor, e)}>{valor}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-menu">
                {botoes.map((valor) => (
                    <li key={valor}>
                        <a onClick={(e) => seletorView(valor, e)}>{valor}</a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default BarraNavegacao;