export const style = theme => ({
    Container: {
        fontFamily:theme.typography.fontFamily.secondary,
        position: 'relative',
        minHeight: '300px',
        minWidth: '800px',
        overflow: 'hidden',
    },
    Video: {
        width: '100%',
        height: '100%',
      },
      Content: {
        position: 'absolute',
        top: '0',
        width:''
        
      },
      MainLabel:{
        // color: theme.palette.primary.main,
        width: '20%',
        height: '20%',
        marginLeft: '61px',
        marginTop: '11px',
      },
      Login:{
        fontWeight: 'bold',
        fontFamily:theme.typography.fontFamily.main,
        border: theme.palette.primary.main + '1px solid',
        fontSize: '1.25rem',
        height: '20%',
        
        marginTop: '11px',
    },
    Signup:{
        fontWeight: 'bold',
        fontFamily:theme.typography.fontFamily.main,
        border: theme.palette.primary.main + '1px solid',
        fontSize: '1.25rem',
        height: '20%',
        
        marginTop: '11px',
    },
    PopupExit:{
        marginLeft: '400px',
        marginTop: '11px',
    },
    NavBar:{
        position: 'absolute',
    top: '7vw',
    right: '15vw',
    color: '#fff',
    lineHeight: '0px',
    padding: '14px 6px 14px 6px',
    zIndex: '9',
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: '400px',
    marginTop: '-30px',
    },
    Motto:{
        color: theme.palette.tertiary.main,
        marginLeft: '37%',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        type: 'dark'

        //backgroundColor: theme.palette.primary.main,
    },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.quaternary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      Errorlabel:{
        minWidth: '287px',
      }
  })