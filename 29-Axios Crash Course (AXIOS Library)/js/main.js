  // AXIOS GLOBALS
  axios.defaults.headers.common['X-Auth-Token'] = 
  'wdvefvgfvssdbefbdf';  //This is a global, i.e. if there are several protected routes that need a storage or anything similar like that, then instead of adding it to each and every route we can have this global and in this way it will be included in the config of all requests
  
  // GET REQUEST
  function getTodos() {
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit: 5
    //     }
    // })
    // .then(res => showOutput(res))
    // .catch(err => console.error(err));

    axios
        .get('https://jsonplaceholder.typicode.com/todos', {params: { _limit: 5}})
        .then(res => showOutput(res))
        .catch(err => console.error(err));

  }
  
  // POST REQUEST
  function addTodo() {
    //  axios({
    //      method: 'post',
    //      url: 'https://jsonplaceholder.typicode.com/todos',
    //      data: {
    //          title: 'Learn Axios',
    //          completed: true
    //      }
    //  })
    //  .then(res => showOutput(res))
    //  .catch(err => console.error(err));

     axios.post('https://jsonplaceholder.typicode.com/todos', {
         title: 'Learn Axios',
         completed: false
     })
     .then(res => showOutput(res))
     .catch(err => console.error(err));
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
         title: 'Updated todo',
         completed: true
     })
     .then(res => showOutput(res))
     .catch(err => console.error(err));
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
     .then(res => showOutput(res))
     .catch(err => console.error(err));
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos', {params : {_limit : 5}}),
        axios.get('https://jsonplaceholder.typicode.com/posts')
    ])
    .then(axios.spread((todos, posts) => showOutput(todos))) //the response is an array of responses and we can also do res[0], res[1], etc. but this axios.spread method allows us to give names to the responses in order so that we can use them conveniently
    .catch(err => console.error(err));
  }
  
  // CUSTOM HEADERS
  // Custom headers are requied when we need some important info like authorization token for viewing restricted pages, etc so while making a get request to that page we need to have that token in our request header so that our backend can see it and use that token

  function customHeaders() {
      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: 'token'
          }
      }
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'Learn Axios',
        completed: false
    }, config)
    .then(res => showOutput(res))
    .catch(err => console.error(err));
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
          title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
          data.title = data.title.toUpperCase();
          return data;
        })
      };

    axios(options).then(res => showOutput(res));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
    .get('https://jsonplaceholder.typicode.com/todoss')
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          alert('Error: Page Not Found');
        }
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();
    axios
    .get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
        if(axios.isCancel(thrown)) {
            console.log('Resquest cancelled', thrown.message);
        }
    })

    if(true) {
        source.cancel('Request canceled');
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES

  axios.interceptors.request.use(
    config => {
      console.log(
        `${config.method.toUpperCase()} request sent to ${
          config.url
        } at ${new Date().getTime()}`
      );
  
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  // AXIOS INSTANCES

  const axiosInstance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com'
  });

  axiosInstance.get('/comments')
  .then(res => showOutput(res))
  .catch(err => console.error(err));
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document.getElementById('transform').addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);