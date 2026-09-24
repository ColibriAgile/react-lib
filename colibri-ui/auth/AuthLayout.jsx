import React from "react";

// Telas públicas da linha Colibri UI (login e senha): sem lateral nem barra superior,
// um painel centralizado com o nome do produto em texto (DESIGN.md, seção 9).
export default function AuthLayout({productName, hint, version, children}) {
    return (
        <div className="cm-auth">
            <main className="cm-panel cm-auth__panel">
                <h1 className="cm-auth__brand">{productName}</h1>
                {hint && <p className="cm-auth__hint">{hint}</p>}
                {children}
                {version && <div className="cm-auth__foot">{version}</div>}
            </main>
        </div>
    );
}
