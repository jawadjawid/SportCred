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
    Background:{
        backgroundColor: "#bebdbd"
    },
    Card:{
       //backgroundColor: theme.palette.primary.light,
        margin:'1rem'
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

})
