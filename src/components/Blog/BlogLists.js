import React, {useEffect, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listBlogs } from '../../graphql/queries';
import { deleteBlog as DeleteBlogMutation } from '../../graphql/mutations';

//create easy text editor



function BlogLists(){
  const [blogs, setBlogs] = useState([])

  
  useEffect(() => {
    fetchBlogs();
  })
  
  async function fetchBlogs(){
     const blogsData = await API.graphql(graphqlOperation(listBlogs));
     setBlogs(blogsData.data.listBlogs.items);
  }
  
  async function deleteBlog({id}){
    try {
     
      await API.graphql(graphqlOperation(DeleteBlogMutation, { input: { id } }) );     
      console.log("succesfully deleted  post");
    } catch (err) {
      console.log('error deleting posts:', err)
    }
  
  }
   
  return (<>
    { blogs.map(blog => (
            <div key={blog.id}>
              {blog.name}  {blog.id}
              <button onClick={ () => deleteBlog(blog)}>
                DeleteBlog
              </button>
            </div>
          ))
      };
      
       
    </>);
  }
  
  export default BlogLists;