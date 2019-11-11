import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';

const StyledTextField = withStyles(theme => ({
    root: {
        '& label.Mui-focused': {
            color: '2A4B7C',
           },
           '& .MuiInput-underline:after': {
            borderBottomColor: '2A4B7C',
           },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '1px solid #F8F8F8',
              boxShadow: '0 1px 1px darkgrey'
            },
            '&:hover fieldset': {
              borderColor: '2A4B7C',
            },
            '&.Mui-focused fieldset': {
              borderColor: '2A4B7C',
            },
          }
    },
    label: {
        color: theme.palette.secondary
    }
}))(TextField);

export default StyledTextField