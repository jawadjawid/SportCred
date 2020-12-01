export const getAllPosts = (postComp) => {
    const request = new Request('http://localhost:5000/api/post/getAllPosts', {
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      }
    });
    // Send the request with fetch()
    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json) {
          const formattedJson = json.map((message) => {
            const result = { ...message };

            return result;
          });
        postComp.setState({
            posts: [...formattedJson]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };


  export const getRadarPosts = (username, postComp) => {
    const request = new Request('http://localhost:5000/api/post/getFriendsPosts/' + username, {
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      }
    });
    // Send the request with fetch()
    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json) {
          const formattedJson = json.map((message) => {
            const result = { ...message };

            return result;
          });
        postComp.setState({
            posts: [...formattedJson]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  export const getUserPosts = (username, postComp) => {
    const request = new Request('http://localhost:5000/api/post/getPosts/' + username, {
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      }
    });
    // Send the request with fetch()
    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json) {
          const formattedJson = json.map((message) => {
            const result = { ...message };

            return result;
          });
        postComp.setState({
            posts: [...formattedJson]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  export const AgreeDisagree = (username, post,favstate) => {
    const request = new Request('http://localhost:5000/api/post/updateAgreeOrDisagree/' + username, {
      method: 'post',
      body: post,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      }
    });
    // Send the request with fetch()
    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json) {
            // console.log(parseInt(json.agreeCount))
            // console.log(json.disagreeCount)
          favstate.setState({
            agree_count : parseInt(json.agreeCount),
            disagree_count : parseInt(json.disagreeCount),
          });
        }
        // console.log(favstate)
      })
      .catch(error => {
        console.log(error);
      });
  };