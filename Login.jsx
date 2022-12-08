import React from "react";
import {AuthContext} from "./context/AuthContext";
import {useTranslation} from "react-i18next";
import TextField from "@mui/material/TextField";
import {useForm} from "./hooks/useForm";
import CustomForm from "./CustomForm";
import {Link} from "react-router-dom"
import {isSucesso, post} from "./Api";
import LoadingButton from "./LoadingButton";
import {IconButton, Alert, styled, Box} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Paper from "@mui/material/Paper";

const DivContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}));

const PaperLogin = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    minWidth: "350px"
}));

const ButtonLogin = styled(LoadingButton)({
    width: "100%",
});

const BoxAction = styled(Box)(({ theme }) => ({
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
}));


const initialState = {login: "", email: "", senha: ""};

export default function Login({client, permiteRedefinicao, permiteCadastrarNovoUsuario, loginEndPoint = "/login/", useUsername}) {
    const {authDispatcher} = React.useContext(AuthContext);
    const [erroLogin, setErroLogin] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const {addField, formValues, errors, hasErro, on} = useForm(initialState);
    const {t} = useTranslation();

    const onSubmit = async () => {
        setErroLogin(false);
        let response = await post(client, loginEndPoint, formValues);
        if (isSucesso(response)) {
            authDispatcher({type: "login", user: response.data});
        } else {
            setErroLogin(true);
        }
    };

    return (
        <DivContainer>
            {erroLogin && <Alert severity="error">{t("login.erro")}</Alert>}
            <PaperLogin elevation={3}>
                <CustomForm submit={on.handleSubmit(onSubmit)}>
                    <TextField
                        inputRef={(e) => addField(e, {required: true, email: !useUsername})}
                        name={useUsername ? "login" : "email"}
                        label={useUsername ? t("login.login") : t("login.email")}
                        variant={"outlined"}
                        value={useUsername ? formValues["login"] : formValues["email"]}
                        error={hasErro(useUsername ? formValues["login"] : formValues["email"])}
                        helperText={useUsername ? errors["login"] : errors["email"]}
                        onChange={on.handleChange}
                        autoFocus
                    />
                    <TextField
                        inputRef={(e) => addField(e, {required: true})}
                        name="senha"
                        label={t("login.senha")}
                        variant={"outlined"}
                        type={showPassword ? 'text' : 'password'}
                        value={formValues["senha"]}
                        error={hasErro("senha")}
                        helperText={errors["senha"]}
                        onChange={on.handleChange}
                        InputProps={{
                            endAdornment:
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onMouseDown={() => setShowPassword(true)}
                                        onMouseUp={() => setShowPassword(false)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                            }}
                    />
                    <BoxAction>
                        <ButtonLogin
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            {t("login.entrar")}
                        </ButtonLogin>

                        {permiteRedefinicao && <Link to={{pathname: "/esqueci", hash: "#"}}>{t("login.esqueci")}</Link>}
                        {permiteCadastrarNovoUsuario && <Link to={{pathname: "/cadastro", hash: "#"}}>{t("login.cadastro")}</Link>}
                    </BoxAction>
                </CustomForm>
            </PaperLogin>
        </DivContainer>
    )

}


