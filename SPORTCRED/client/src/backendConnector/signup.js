
import axios from 'axios';


// A function to send a POST request with the new user info
export const register = async (currPage) => {
    // const request = new Request('http://localhost:5000/api/register', {
    //     method: 'POST',
    //     body: JSON.stringify(currPage.state),
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // });
    // console.log(JSON.stringify(currPage.state));

    // axios.post('http://localhost:5000/api/register', currPage.state)
    //     .then(res => console.log(res.data));

    let asd = JSON.stringify(currPage.state);
    fetch("http://localhost:5000/api/register", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9,ar;q=0.8,fr;q=0.7",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "http://localhost:3000/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"username\":\"m\"}",
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });

    console.log("{\"username\":\"m\"}");
    console.log(JSON.stringify(currPage.state))


    // fetch(request)
    //     .then(res => {
    //         if (res.status !== 200) {
    //             return res.json();
    //         }
    //     })
    //     .then(json => {
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });


};



