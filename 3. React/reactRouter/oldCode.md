```jsx
  useEffect(() => {
      const fetchPosts = async () => {
        try {
          //crud get = read
          const response =  await api.get('/posts')
          /**
           * *refers to the base url en then /posts is your json object
           * *axios whichs is the method use here automatically creates json
           * *(!if response.ok) not needed, axios catches erros automaticcally
           */

          if (response && response.data) setPosts(response.data);



        } catch (e) {
          if (e.response) {
            console.log(`data: ${e.response.data}, status: ${e.response.data}`);
            console.log(`headers: ${e.resopnse.headers}`);
          } else {
            console.log(`err: ${e.message}`);
          }
        }
  
      }
      fetchPosts();


  }, [])

  ```
  