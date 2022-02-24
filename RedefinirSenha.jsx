import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@mui/styles";
import {useForm} from "./hooks/useForm";
import {useNotificacao, Alerta} from "./context/NotificacaoContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PainelMsg from "./PainelMsg";
import {get, isSucesso, post} from "./Api";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        padding: "0px 80px 0px 80px",
        [theme.breakpoints.down('sm')]: {
            padding: "0px 10px 0px 10px",
        }
    },
    formContainer: {
        padding: "20px 40px 20px 40px"
    },
    titulo: {
        marginBottom: theme.spacing(1)
    },
    form: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        "& div": {
            marginBottom: "2px"
        },
        "& button": {
            marginTop: "20px"
        }
    }
}))

const initialState = {
    senha: '',
    confirmacao: ''
}

export default function RedefinirSenha({client}) {
    let {token} = useParams();
    const {addField, formValues, errors, hasErro, on} = useForm(initialState);
    const {t} = useTranslation();
    const notificacao = useNotificacao();
    const classes = useStyles();
    const [usuarioToken, setUsuarioToken] = useState();
    const [erroToken, setErroToken] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const navigate = useNavigate();

    //busca token
    useEffect(() => {
        get(client, `/usuario-token/${token}/`)
            .then(response => {
                if (isSucesso(response)) {
                    setUsuarioToken(response.data.token);
                } else {
                    setErroToken(true);
                }
            })
            .catch(() => {
                setErroToken(true);
            });
    }, [client, token, setUsuarioToken, setErroToken]);

    const onSubmit = () => {
        const data = {...formValues};
        data.token = usuarioToken;
        post(client, '/usuario/senha/', data).then(response => {
            if (isSucesso(response)) {
                setSucesso(true);
            } else {
                notificacao(Alerta.warn("Falha ao redefinir a senha"));
            }
        }).catch(error => {
            console.log(error);
            notificacao(Alerta.warn("Falha ao redefinir a senha"));
        });
    };

    const msgSucesso = () => {
        let msg = t("usuario.senha-alterada") + (
            <Link href="#" color="secondary" onClick={() => navigate("/")}> login</Link>);
        return (<PainelMsg msg={msg}/>);
    }

    return (
        <Container className={classes.root} maxWidth="sm">
            {erroToken
                ? <PainelMsg erro msg={t("usuario.token-invalido")}/>
                : sucesso
                    ? msgSucesso()
                    :
                    <Paper className={classes.formContainer}>
                        <div className={classes.titulo}>
                            <Typography variant="h6" component="h6">
                                {t("usuario.nova-senha")}
                            </Typography>
                            <Typography variant="body2">
                                {t("usuario.senha-msg")}
                            </Typography>
                        </div>
                        <form className={classes.form} onSubmit={on.handleSubmit(onSubmit)}>
                            <TextField
                                name="senha"
                                value={formValues.senha}
                                inputref={(e) => addField(e, {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    hasNumber: true,
                                    hasCapitalLetter: true,
                                    hasEspecialCharacter: true
                                })}
                                inputProps={{maxLength: 20}}
                                type="password"
                                label={t("usuario.senha")}
                                error={hasErro('senha')}
                                helperText={errors['senha']}
                                onChange={on.handleChange}/>
                            <TextField
                                name="confirmacao"
                                value={formValues.confirmacao}
                                inputRef={(e) => addField(e, {required: true, equal: "senha"})}
                                inputProps={{maxLength: 20}}
                                type="password"
                                label={t("usuario.confirmacao")}
                                error={hasErro('confirmacao')}
                                helperText={errors['confirmacao']}
                                onChange={on.handleChange}/>
                            <Button variant="contained" type="submit" color="primary">
                                {t("acao.salvar")}
                            </Button>
                        </form>
                    </Paper>
            }
        </Container>
    )
}