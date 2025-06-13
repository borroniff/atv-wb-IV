/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

type props = {
    tema: string,
    botoes: string[],
    seletorView: Function
}

export default class BarraNavegacao extends Component<props> {
    componentDidMount() {
        M.Sidenav.init(document.querySelectorAll('.sidenav'));
    }

    gerarListaBotoes = () => {
        return this.props.botoes.map(valor => (
            <li key={valor}><a onClick={(e) => this.props.seletorView(valor, e)}>{valor}</a></li>
        ))
    }

    render() {
        return (
            <>
                <nav className={this.props.tema}>
                    <div className="nav-wrapper">
                        <a className="brand-logo">WB</a>
                        <a href="#" data-target="mobile-menu" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            {this.gerarListaBotoes()}
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-menu">
                    {this.gerarListaBotoes()}
                </ul>
            </>
        )
    }
}