export const styles = theme => ({
  header: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'red'
  },
  queueList: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  PostRow: {
    marginBottom: '5px',
    margin: theme.spacing(2),
    fontSize: '150%',
    '& th': {
      fontSize: '0.75em',
      color: 'darkslategray'
    },
    // backgroundColor: theme.palette.action.hover
  },
  PostTitle:{
    fontSize: 20,
    
  },
  Postdata:{
    fontSize: 12,
    color: 'gray',
    align:'center',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  tableCellCollapse: {
    paddingBottom: 0,
    paddingTop: 0
  },
  tableCellHead: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  tableCellBody: {
    fontSize: 14
  },
});
