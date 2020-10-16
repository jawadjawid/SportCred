export const style = theme => ({
    Container: {
        position: 'relative',
        minHeight: '300px',
        minWidth: '800px',
        overflow: 'hidden',
        marginBottom: '500px',
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
        width: 'auto',
        height: '22px',
        marginLeft: '61px',
        marginTop: '98px',
      },
      Login:{
          float: 'right',
        fontWeight: 'bold',
        marginTop: '30px',
        color: theme.palette.primary.main,
        border: theme.palette.primary.main + '1px solid',
        padding: '10px 5px',
        backgroundColor: 'hsla(0, 0%, 0%, 0)',
        fontSize: '1.25rem',
        borderRadius: '5px',
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
    }
    // SubContentbutton:hover {
    //     background-color: #f1f1f1,
    //     color: #000000c0,
    // }
  
  })