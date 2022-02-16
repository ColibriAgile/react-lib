import React from "react";
import PainelMsg from "./PainelMsg";
import {useTranslation} from "react-i18next";

export default function PaginaNaoEncontrada() {
    const {t} = useTranslation();
    return (<PainelMsg erro={true} msg={t('erro.pagina-nao-encontrada')}/>)
}