import React, {useState, useEffect} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost } from '../../graphql/mutations';
import { listBlogs } from '../../graphql/queries';

//creste text editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const initialForm = {title: "", content: "", blogID: ""};

function CreatePost(){
  const [blogs, setBlogs] = useState([])
  const [formData, setFormData] = useState(initialForm);
  const [value, setValue] = useState('');
  

  useEffect(() => {
     fetchBlogs();
  })

  async function fetchBlogs(){
    const blogsData = await API.graphql(graphqlOperation(listBlogs));
    setBlogs(blogsData.data.listBlogs.items);
  }
  
  async function submitPost(){
      setFormData({...formData, 'content': value})
    try {
        if (!formData.title && !formData.blogID && !formData.content) return
        await API.graphql(graphqlOperation(createPost, {input: formData}))
        
        console.log("succesfully the post");
      } catch (err) {
        console.log('error creating posts:', err)
      }
  }
   
  return (
    
      <div>
          <select value={formData.blogID} onChange={e => setFormData({ ...formData, 'blogID': e.target.value})}>
             {blogs.map(blog => (
                 <option key={blog.id} value={blog.id}>
                     {blog.name}
                 </option>
             ))}
          </select>
          <input type="input" placeholder="title" value={formData.title} onChange={e => setFormData({ ...formData, 'title': e.target.value})}/>
          <input type="input" placeholder="content" value={formData.content} onChange={e => setFormData({ ...formData, 'content': e.target.value})}/>
         
          <ReactQuill theme="snow" value={value} onChange={setValue}/>
         
          <button onClick={submitPost}>
              Create Blog
          </button>
      </div>
  );
    
  }
  
  export default CreatePost;