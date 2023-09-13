const COHORT_NAME = '2305-FTB-PT-WEB-PT-JP';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export async function registerUser(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: { "username": username,
                        "password": password}
            })
        });
        const result = await response.json();
        console.log("sign up response: ", result);
        return result.data.token;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const login = async (username, password) => {

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            "username": username,
            "password": password 
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result.data.token;
    } catch (err) {
      console.error(err);
    }
  }

export const myData = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

export const fetchPosts = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
  
      const result = await response.json();
      console.log(result);
      return result.data.posts
    } catch (err) {
      console.error(err);
    }
  }

export const makePost = async (token, postObj) => {

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title: postObj.title,
            description: postObj.description,
            price: postObj.price,
            location: postObj.location,
            willDeliver: postObj.willDeliver
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

export const updatePost = async (token, postObj) => {
  try {
    // You will need to insert a variable into the fetch template literal 
    // in order to make the POST_ID dynamic. 
    // 5e8d1bd48829fb0017d2233b is just for demonstration.
    const response = await fetch(`${BASE_URL}/posts/${postObj._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title: postObj.title,
          description: postObj.description,
          price: postObj.price,
          location: postObj.location,
          willDeliver: postObj.willDeliver
        }
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const deletePost = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const postMessage = async (token, messageObj, postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: {
          content: messageObj.content
        }
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}
