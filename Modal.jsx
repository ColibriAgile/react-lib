import React, {forwardRef, useImperativeHandle} from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    useMediaQuery, useTheme, styled,
} from "@mui/material";
import ModalTitulo from "./ModalTitulo";
import {useTranslation} from "react-i18next";
import LoadingButton from "./LoadingButton";

const DialogActionsContainer = styled(DialogActions)(({theme}) => ({
    [theme.breakpoints.down("sm")]: {
        justifyContent: "flex-start",
        "& button": {
            flexGrow: 1,
        },
    }
}));


const Modal = forwardRef(
    (
        {
            onClose,
            onEntered,
            fullWidth,
            maxWidth,
            onExited,
            titulo,
            onConfirm,
            actionName,
            actionColor = "primary",
            children,
            autoFocus = false,
            fullScreen = false,
            hideActions = false,
            // Opcionais (padrão = comportamento anterior):
            // scroll="paper" rola só o corpo, com cabeçalho e rodapé fixos;
            // onRequestClose é consultado antes de fechar por Esc, X ou Cancelar e devolve false para manter aberto;
            // aside vai à esquerda do rodapé, fora do grupo Cancelar | Confirmar (.cm-dialog__aside);
            // paperClassName e contentClassName dão classe ao papel e ao corpo sem mirar classes internas do MUI.
            scroll = "body",
            onRequestClose,
            aside,
            paperClassName,
            contentClassName
        },
        ref
    ) => {
        const {t} = useTranslation();
        const theme = useTheme();
        const full = useMediaQuery(theme.breakpoints.down("sm"));
        const [open, setOpen] = React.useState(false);

        const handleClose = item => {
            setOpen(false);
            if (onClose) {
                onClose(item);
            }
        };

        // Fechamento pedido pela pessoa (Esc, X, Cancelar): pode ser vetado; closeModal() fecha sempre.
        const requestClose = () => {
            if (onRequestClose && onRequestClose() === false) return;
            handleClose();
        };

        const handleOpen = () => {
            setOpen(true);
        };

        useImperativeHandle(ref, () => ({
            openModal() {
                handleOpen();
            },
            closeModal(item) {
                handleClose(item);
            },
        }));

        return (
            <Dialog
                fullScreen={fullScreen || full}
                open={open}
                fullWidth={fullWidth || full}
                maxWidth={maxWidth}
                scroll={scroll}
                PaperProps={paperClassName ? {className: paperClassName} : undefined}
                TransitionProps={{
                    onEntered: onEntered,
                    onExited: onExited,
                }}
                onClose={(event, reason) => {
                    if (reason === "escapeKeyDown") {
                        requestClose();
                    }
                }}
            >
                <ModalTitulo titulo={titulo} onClose={requestClose}/>
                <DialogContent dividers className={contentClassName}>{children}</DialogContent>
                {!hideActions &&
                    (
                        <DialogActionsContainer>
                            {aside && <div className="cm-dialog__aside">{aside}</div>}
                            <Button
                                variant="outlined"
                                onClick={requestClose}
                                color="primary"
                            >
                                {t("acao.cancelar")}
                            </Button>
                            <LoadingButton
                                variant="contained"
                                onClick={onConfirm}
                                color={actionColor}
                                autoFocus={autoFocus}
                            >
                                {actionName ?? t("acao.ok")}
                            </LoadingButton>
                        </DialogActionsContainer>
                    )
                }
            </Dialog>
        );
    }
);

export default Modal;
