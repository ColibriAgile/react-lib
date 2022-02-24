import React from "react";
import {AuthContext} from "./context/AuthContext";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/styles";
import {useTranslation} from "react-i18next";
import TextField from "@mui/material/TextField";
import {useForm} from "./hooks/useForm";
import CustomForm from "./CustomForm";
import {Link} from "react-router-dom"
import {isSucesso, post} from "./Api";
import LoadingButton from "./LoadingButton";
import {Box} from "@mui/material";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        minWidth: "350px",
    },
    button: {
        width: "100%",
    },
    actionContainer: {
        display: "flex",
        flexDirection: "column",
        "& button": {
            marginBottom: theme.spacing(1)
        },
        "& a": {
            marginTop: theme.spacing(1),
            color: theme.palette.primary.dark
        },
        alignItems: "center"
    }
}));


const initialState = {email: "", senha: ""};

export default function Login({client, permiteRedefinicao}) {
    const {authDispatcher} = React.useContext(AuthContext);
    const [erroLogin, setErroLogin] = React.useState(false);
    const {addField, formValues, errors, hasErro, on} = useForm(initialState);
    const {t} = useTranslation();
    const classes = useStyles();

    const onSubmit = () => {
        setErroLogin(false);
        post(client, "/login/", formValues)
            .then((response) => {
                if (isSucesso(response)) {
                    authDispatcher({type: "login", user: response.data});
                } else {
                    setErroLogin(true);
                }
            })
    };

    return (
        <div className={classes.container}>
            {erroLogin && <Alert severity="error">{t("login.erro")}</Alert>}
            <Paper elevation={3} className={classes.paper}>
                <CustomForm submit={on.handleSubmit(onSubmit)}>
                    <TextField
                        inputRef={(e) => addField(e, {required: true})}
                        name="email"
                        label={t("login.email")}
                        variant={"outlined"}
                        value={formValues["email"]}
                        error={hasErro("email")}
                        helperText={errors["email"]}
                        onChange={on.handleChange}
                        autoFocus
                    />
                    <TextField
                        inputRef={(e) => addField(e, {required: true})}
                        name="senha"
                        label={t("login.senha")}
                        variant={"outlined"}
                        type="password"
                        value={formValues["senha"]}
                        error={hasErro("senha")}
                        helperText={errors["senha"]}
                        onChange={on.handleChange}
                    />
                    <Box className={classes.actionContainer}>
                        <LoadingButton
                            variant="contained"
                            type="submit"
                            color="primary"
                            className={classes.button}
                        >
                            {t("login.entrar")}
                        </LoadingButton>

                        {permiteRedefinicao && <Link to={{pathname: "/esqueci", hash: "#"}}>{t("login.esqueci")}</Link>}
                    </Box>
                </CustomForm>
            </Paper>
        </div>
    )

}


