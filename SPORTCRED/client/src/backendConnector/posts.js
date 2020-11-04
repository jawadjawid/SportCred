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
            // console.log(result)
            return result;
          });
        //   const jsonFiltered = formattedJson.filter(({ username }) => {
        //     return username.toUpperCase().includes(text.toUpperCase())
        //   });
        postComp.setState({
            posts: [...formattedJson]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };