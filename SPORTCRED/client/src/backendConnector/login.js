
export const readCookie = (app) => {
    const url = 'http://localhost:5000/api/profile/user/check-session';
  
    fetch(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(json => {
        if (json && json.currentUser) {
          app.setState({
            currentUser: json.currentUser,
            
            isLoggedIn: true,
            isReadingCookie: false
          });
        } else {
          app.setState({
            isReadingCookie: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  




export const login = (loginComp, app) => {
    const request = new Request('http://localhost:5000/api/profile/login', {
      method: 'post',
      body: JSON.stringify(loginComp.state),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      }
    });
    // Send the request with fetch()
    fetch(request,loginComp.state)
      .then(res => {
        return res.json();
      })
      .then(json => {
          console.log(json)
        if (json.message !== undefined) {
          loginComp.setState({
            displayError: true,
            errorMessage: json.message
          });
        } else {
            localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("currentUser", loginComp.state.username);
            console.log('loginsucess')
            console.log(json.message)
          app.setState({
            currentUser:loginComp.state.username,
            isLoggedIn: true,
            isReadingCookie: false
          });
          console.log(app);
          console.log(app.state.currentUser);
        }
      })
      .catch(error => {
        // console.log(error);
      });
  };

  export const logout = (app) => {
    const url = 'http://localhost:5000/api/profile/logout';
  
    fetch(url)
      .then(() => {
        app.setState({
          currentUser: null,
          userType: null,
          isLoggedIn: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
