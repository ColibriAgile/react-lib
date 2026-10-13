import React from "react";
import marca from "../logos/colibri-marca.svg";

// Tela de entrada da linha Colibri UI (login, senha, páginas de erro): fora do shell, sobre o plano de trabalho,
// com a marca do kit e o nome do produto acima de um cartão de 360 px com título e linha de apoio
// (DESIGN.md, "Tela de entrada"). Sem degradê e sem marca-d'água.
export default function AuthLayout({productName, title, hint, version, children}) {
    return (
        <div className="cm-login">
            <main className="cm-login__area">
                <div className="cm-login__brand">
                    <img src={marca} alt="" width="36" height="36"/>
                    <span>{productName}</span>
                </div>
                <div className="cm-panel cm-form cm-login__card">
                    <div>
                        <h1 className="cm-login__title">{title ?? productName}</h1>
                        {hint && <p className="cm-login__text">{hint}</p>}
                    </div>
                    {children}
                </div>
                {version && <div className="cm-auth__foot">{version}</div>}
            </main>
        </div>
    );
}
