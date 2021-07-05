import React from 'react';
import BlogLists from '../components/Blog/BlogLists';
import PostList from '../components/Blog/PostsList';
import CreateBlog from '../components/Blog/CreateBlog';
import CreatePost from '../components/Blog/CreatePost';
//create component for adding a blog post. 
//create components for listing blog posts. 
// create component for reading blog post. 

function Blog() {
    
    return (
        <>
    <div className="container">
    <div>
            <CreateBlog />
        </div>
        <div>
            <BlogLists />
        </div>
        
        <div>
            <CreatePost />
        </div>
        <div>
            <PostList />
        </div>
    </div>
       
        </>
    );
}
  
  export default Blog;