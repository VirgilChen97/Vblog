import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';

const ConfirmButton = ({action, children, alertTitle, alertText, ...rest}) => {
  const {t} = useTranslation()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    action()
    setOpen(false)
  }

  return (
    <div style={{display: "inline"}}>
      <Button {...rest} onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('ConfirmButton.no')}
          </Button>
          <Button {...rest} onClick={handleConfirm} autoFocus>
            {t('ConfirmButton.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmButton
