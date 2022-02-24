import React from "react";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import {useTranslation} from "react-i18next";
import TextField from "@mui/material/TextField";
import {useForm} from "./index";
import PainelMsg from "./PainelMsg";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {isSucesso, post} from "./Api";
import LoadingButton from "./LoadingButton";

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(5),
    },
    form: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%"
    },
    input: {
        width: "100%",
        marginTop: "20px",
        padding: "10px",
        [theme.breakpoints.down('sm')]: {
            "margin-top": "10px"
        }
    },
    paper: {
        height: "140px",
        marginTop: "20px",
        padding: "20px",
    },
    buttonContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center"
    },
    button: {
        alignSelf: "flex-end",
        width: "100%"
    }
}));


export default function Esqueci({client}) {
    const [erroEsqueci, setErroEsqueci] = React.useState(false);
    const [sucessoEsqueci, setSucessoEsqueci] = React.useState(false);
    const {addField, formValues, errors, hasErro, on} = useForm();
    const {t} = useTranslation();
    const classes = useStyles();

    const onSubmit = () => {
        setErroEsqueci(false);
        setSucessoEsqueci(false);
        post(
            client,
            'usuario/redefinir/',
            formValues
        ).then(response => {
            if (isSucesso(response)) {
                setSucessoEsqueci(true);
            }
            else {
                setErroEsqueci(true);
            }
        });
    };

    const formEsqueci = () => {
        return (
            <Paper elevation={1} className={classes.paper}>
                <form className={classes.form} onSubmit={on.handleSubmit(onSubmit)}>
                    <TextField
                        inputRef={(e) => addField(e, {required: true, email: true})}
                        autoFocus
                        name="email"
                        label={t("login.email")}
                        error={hasErro("email")}
                        helperText={errors["email"]}
                        onChange={on.handleChange}
                        className={classes.input}/>
                    <div className={classes.buttonContainer}>
                        <LoadingButton variant="contained" type="submit" color="primary" className={classes.button}>
                            {t("login.enviar")}
                        </LoadingButton>
                    </div>
                </form>
            </Paper>
        )
    };

    const mensagemValidacao = () => {
        if (sucessoEsqueci) {
            return (<PainelMsg msg={t("login.esqueci-sucesso")}/>)
        }
        if (erroEsqueci) {
            return (<PainelMsg erro msg={t("login.esqueci-erro")}/>)
        }
        return ('');
    };

    return (
        <Container maxWidth="sm" className={classes.container}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {formEsqueci()}
                    </Grid>
                    <Grid item xs={12}>
                        {mensagemValidacao()}
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}


