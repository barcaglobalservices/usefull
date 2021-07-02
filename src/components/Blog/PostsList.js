import React, {useEffect, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '../../graphql/queries';
import { deletePost as DeletePostMutation } from '../../graphql/mutations';
//create component for adding a blog post. 
//create components for listing blog posts. 
// create component for reading blog post. 



function PostsList(){
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetchPosts();
    console.log(posts);
  })
  
  async function deletePost({id}){
    console.log(id)
    try {
     
      await API.graphql(graphqlOperation(DeletePostMutation, { input: { id } }) );     
      console.log("succesfully deleted  post");
    } catch (err) {
      console.log('error deleting posts:', err)
    }
  
  }
  
  async function fetchPosts(){
     const postData = await API.graphql(graphqlOperation(listPosts));
     setPosts(postData.data.listPosts.items);
  }
   
  return (<>
    { posts.map(post => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>
                {post.content}
              </p>
              
              <button onClick={() => deletePost(post)}>
                  deletePost
              </button>
            </div>
          ))
      };
      
       
    </>);
  }
  
  export default PostsList;