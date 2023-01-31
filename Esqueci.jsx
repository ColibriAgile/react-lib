import React from "react";
import Paper from "@mui/material/Paper";
import {useTranslation} from "react-i18next";
import TextField from "@mui/material/TextField";
import {useForm} from "./index";
import PainelMsg from "./PainelMsg";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {isSucesso, post} from "./Api";
import LoadingButton from "./LoadingButton";
import {styled} from "@mui/material";

const ContainerPage = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(5)
}));


const FormEmail = styled('form') ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%"
});


const TextFieldEmail = styled(TextField)(({ theme }) => ({
    width: "100%",
    marginTop: "20px",
    padding: "10px",
    [theme.breakpoints.down('sm')]: {
        marginTop: "10px"
    }
}));

const PaperForm = styled(Paper)({
    height: "140px",
    marginTop: "20px",
    padding: "20px"
});

const DivButtonContainer = styled('div')({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center"
});

const LoadingButtonEnviar = styled(LoadingButton)({
    alignSelf: "flex-end",
    width: "100%"
});


export default function Esqueci({client, url = 'usuario/redefinir/'}) {
    const [erroEsqueci, setErroEsqueci] = React.useState(false);
    const [sucessoEsqueci, setSucessoEsqueci] = React.useState(false);
    const {addField, formValues, errors, hasErro, on} = useForm();
    const {t} = useTranslation();

    const onSubmit = () => {
        setErroEsqueci(false);
        setSucessoEsqueci(false);
        post(
            client,
            url,
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
            <PaperForm elevation={1} >
                <FormEmail onSubmit={on.handleSubmit(onSubmit)}>
                    <TextFieldEmail
                        inputRef={(e) => addField(e, {required: true, email: true})}
                        autoFocus
                        name="email"
                        label={t("login.email")}
                        error={hasErro("email")}
                        helperText={errors["email"]}
                        onChange={on.handleChange}/>
                    <DivButtonContainer>
                        <LoadingButtonEnviar variant="contained" type="submit" color="primary">
                            {t("login.enviar")}
                        </LoadingButtonEnviar>
                    </DivButtonContainer>
                </FormEmail>
            </PaperForm>
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
        <ContainerPage maxWidth="sm">
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {formEsqueci()}
                    </Grid>
                    <Grid item xs={12}>
                        {mensagemValidacao()}
                    </Grid>
                </Grid>
            </div>
        </ContainerPage>
    )
}


