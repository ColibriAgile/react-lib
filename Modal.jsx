import React, { forwardRef, useImperativeHandle } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    useMediaQuery, useTheme, styled,
} from "@mui/material";
import ModalTitulo from "./ModalTitulo";
import { useTranslation } from "react-i18next";
import LoadingButton from "./LoadingButton";

const DialogActionsContainer = styled(DialogActions)(({ theme }) => ({
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
      children,
      autoFocus = false,
      fullScreen = false,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const full = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = React.useState(false);

    const handleClose = item => {
      setOpen(false);
      if (onClose) {
        onClose(item);
      }
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
        scroll="body"
        TransitionProps={{
          onEntered: onEntered,
          onExited: onExited,
        }}
        onClose={(event, reason) => {
          if (reason === "escapeKeyDown") {
            handleClose();
          }
        }}
      >
        <ModalTitulo titulo={titulo} onClose={() => handleClose()} />
        <DialogContent dividers>{children}</DialogContent>
        <DialogActionsContainer>
          <LoadingButton
            variant="contained"
            onClick={onConfirm}
            color="primary"
            autoFocus={autoFocus}
          >
            {actionName ?? t("acao.ok")}
          </LoadingButton>
          <Button
            variant="outlined"
            onClick={() => handleClose()}
            color="primary"
          >
            {t("acao.cancelar")}
          </Button>
        </DialogActionsContainer>
      </Dialog>
    );
  }
);

export default Modal;
