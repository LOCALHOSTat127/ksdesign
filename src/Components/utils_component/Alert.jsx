import Slide from '@mui/material/Slide';
import { Snackbar } from '@mui/material';

function TransitionLeft(props) {
  return <Slide {...props} direction="up" />;
}


export default function Alert({ msg,isOpen }) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={1200}
      message={msg}
    
    />
  )
}