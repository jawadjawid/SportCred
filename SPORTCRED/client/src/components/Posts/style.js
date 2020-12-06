export const styles = theme => ({
    
    ToggleDiv:{
        margin: '2% 40%',
    },
  header: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'red'
  },
  PostList: {
    marginTop: '30px',
    marginBottom: '20px',
  },
  CommentList:{
    borderRadius: '4px',
      borderStyle: 'solid',
      marginTop: '5px',
      marginBottom: '8px',
      marginLeft: '5px',
      marginRight: '5px',
      
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
    marginLeft:'10px',
    marginRight:'0px'
  },
  PosterNumber:{
    color: '#ffffff',
    fontSize: 17,
    marginLeft:'10px',
    marginRight:'0px'
  },
  Poster:{
    fontSize: 12,
    color: '#ffffff',
    align:'center',
  },
  ACSScore:{
      fontSize: 12,
    color: '#ffffff',
    align:'center',
  },
  Postdata:{
    textAlign:'center',
  },

  Postdate:{
    fontSize: 12,
    color: '#ffffff',
    float: 'right',
  },
  paper: {
    // padding: theme.spacing(2),
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
