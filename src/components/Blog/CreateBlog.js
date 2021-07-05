import React, {useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createBlog } from '../../graphql/mutations';


const initialForm = {name: ""};

function CreateBlog(){
  const [formData, setFormData] = useState(initialForm);

  

  
  async function submitBlog(){
      console.log(formData);
    try {
        if (!formData.name) return
        await API.graphql(graphqlOperation(createBlog, {input: formData}))
        console.log("succesfully added");
      } catch (err) {
        console.log('error creating todo:', err)
      }
  }
   
  return (
    
      <div>
          <input type="input" placeholder="blog name" value={formData.name} onChange={e => setFormData({ ...formData, 'name': e.target.value})}/>
          <button onClick={submitBlog}>
              Create Blog
          </button>
      </div>
  );
    
  }
  
  export default CreateBlog;