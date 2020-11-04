export const styles = theme => ({
  header: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'red'
  },
  PostList: {
    marginTop: '20%',
    marginBottom: '20%',
  },
  PostRow: {
    marginBottom: '5px',
    margin: theme.spacing(2),
    borderStyle: 'double',
    fontSize: '150%',
    backgroundColor: theme.palette.action.hover
  },
  PostTitle:{
    fontSize: 25,
    
  },
  Poster:{
    fontSize: 12,
    color: '#00000',
    align:'center',
  },
  Postdata:{
    textAlign:'center',
  },

  Postdate:{
    display:'inline',
    fontSize: 12,
    color: '#00000',
    float: 'right',
  },
  paper: {
    display:'inline',
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
