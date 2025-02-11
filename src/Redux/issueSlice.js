

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




export const fetchIssues = createAsyncThunk('issues', async ({ page, limit }) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/issues?page=${page}&limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },

  
    });
  
    const data = await response.json();


    // console.log(data,'c');
    return data;
  });



export const addIssue = createAsyncThunk('create-issue', async (issueData) => {
  
  console.log('test2')
  const formData = new FormData();
  formData.append('text', issueData.text);
  formData.append('file', issueData.file);
 
  const response = await fetch('https://br-backend-server.vercel.app/api/post/create-issue', {
    method: 'POST',
    headers: {
     Authorization: `Bearer ${localStorage.getItem('token')}`,
    
    },
    body: formData,
   
  });
  
  const data = await response.json();
 
  return data;
});





export const updateIssue = createAsyncThunk('issue/updateIssue', async ({ id, issueData }) => {
    const formData = new FormData();
    formData.append('text', issueData.text);
   
  
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/update-issue/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body:formData,
    });
  
    if (!response.ok) {
      // Handle non-OK responses (e.g., validation errors) here
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  
  
    const data = await response.json();
    return data;
  });
  
  export const deleteIssue = createAsyncThunk('delete-issue', async (id) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/delete-issue/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    const data = await response.json();
    return data;
  });




  export const callOpenAIPrompt = createAsyncThunk('issues/callOpenAIPrompt', async (prompt) => {
    const response = await fetch('https://br-backend-server.vercel.app/api/post/run-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'a3eftygst4s6gdgdyd',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    if (data.answer) return data.answer;
    if (data.error) return data.error;
    if (data.message) return data.message;
    if (data.response) return data.response;
    if (data.solution) return data.solution;
    if (data.steps) return data.steps;
    if (data.recommendation) return data.recommendation;
    if (data.tools) return data.tools;
    if (data.today_date) return data.today_date;
    if (data.date) return data.date;
    if (data.file_formats) return data.file_formats;
   
    return "No valid response key found";
  });


//   export const callOpenAiPrompt = createAsyncThunk('run-prompt', async(prompt)=>{

//   const response = await fetch('http://localhost:7000/api/post/run-prompt', {

//  method: 'POST',
//  headers: {
//   'Content-Type':'application/json',
//  },

//  body: JSON.stringify({ prompt }),




//   } )


  
//   const data = await response.json();
//   return data;



//   })




  export const likeIssue = createAsyncThunk('issues/likeIssue', async ({issueId}) => {
    const token = localStorage.getItem('token');
    // const queryParams = new URLSearchParams({ articleId }).toString();
    // const url = `http://localhost:7000/api/post/articles/${queryParams}`;
    const url = `https://br-backend-server.vercel.app/api/post/issues/${issueId}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
   
    return data;
  });






  export const likeComment  = createAsyncThunk('issues/likeComment', async ({issueId,commentId  }) => {
    const token = localStorage.getItem('token');
  
    const url = `https://br-backend-server.vercel.app/api/post/issues/${issueId}/comments/${commentId}/like`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
   
    return data;
  });
  
  
  
  
  export const commentIssue = createAsyncThunk('issues/commentIssue', async ({ issueId, text }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/issues/${issueId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
  
    const data = await response.json();
    return data;
  });
  
  
  
//   // Define your editComment async thunk
  export const editComment = createAsyncThunk('issues/editComment', async ({ issueId,commentId, newText }) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/issues/${issueId}/${commentId}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ newText }),
    });
  
    const data = await response.json();
    return data; // Return the response data from the API
  });
  
  // Define your deleteComment async thunk
  export const deleteComment = createAsyncThunk('issues/deleteComment', async ({issueId,commentId}) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/issues/${issueId}/${commentId}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    const data = await response.json();
    return data; // Return the deleted comment ID along with the response data
  });




// // Share Job Thunk
export const shareIssue = createAsyncThunk(
  'issues/shareissues',
  async ({ issueId, userId }, { rejectWithValue }) => {
    
    try {
      
      const response = await fetch(`https://br-backend-server.vercel.app/api/post/issues/${issueId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
        console.log(data,'log2')
      return data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);











const issueSlice = createSlice({
    name: 'issues',
    initialState: {
      token:"",
      issues:[],
      sharedIssues: [],
      loading: false,
      isSuccess:false,
      error: null,
      status: 'idle',
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      openAIResponse: null,
      openAIStatus:'idle',
        },
    reducers: {
  
    
    
      // You can add additional reducers here if needed
    },
    extraReducers: (builder) => {
      builder
  
     
    
      .addCase(fetchIssues.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchIssues.fulfilled, (state, action) => {
          // console.log('Fulfilled Action:', action);
          state.loading = false;
          state.issues = action.payload.issue;
          state.totalItems = action.payload.totalItems;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        })
        .addCase(fetchIssues.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
                
        .addCase(addIssue.pending, (state) => {
          state.loading = true;
        })
        .addCase(addIssue.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.loading = false;
          state.issues.push(action.payload);
        })
        .addCase(addIssue.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
  
  
                })


                 
      .addCase(deleteIssue.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const deletedIssueId = action.payload.id;
        state.issues = state.issues.filter((issue) => issue.id !== deletedIssueId);
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  
  

   
      .addCase(updateIssue.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const updatedIssue = action.payload;
        const index = state.issues.findIndex((issue) => issue.id === updatedIssue.id);
        if (index !== -1) {
          state.issues[index] = updatedIssue;
        }
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      


      .addCase(likeIssue.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const likedIssue = action.payload;
        const index = state.issues.findIndex((issue) => issue._id === likedIssue.issueId);
        // console.log('log3',state.jobs.filter((job) => job._id === likedJob.jobId),index)
        // console.log(shareJob.jobId)
        // console.log(likeJob)
        if (index !== -1) {
          state.issues[index].likes = likedIssue.likes;
          state.issues[index].likedBy = likedIssue.likedBy;
        }
      })
      .addCase(likeIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



// // Like Comment //
.addCase(likeComment.pending, (state) => {
  state.loading = true;
})

.addCase(likeComment.fulfilled, (state, action) => {
  state.loading = false;
  state.isSuccess = true;
  // Update the liked comment in the state
  const { issueId, commentId, likes, likedBy } = action.payload;
  const issue = state.issues.find((issue) => issue._id === issueId);
  if (issue) {
    const comment = issue.comments.find((comment) => comment._id === commentId);
    if (comment) {
      comment.likes = likes;
      comment.likedBy = likedBy;
    }
  }
})


.addCase(likeComment.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})




// Comment Issue
.addCase(commentIssue.pending, (state) => {
state.loading = true;
})
.addCase(commentIssue.fulfilled, (state, action) => {
state.loading = false;
state.isSuccess = true;

const { issueId, comment } = action.payload;
const issueIndex = state.issues.findIndex(issue => issue._id === issueId);
if (issueIndex !== -1) {
state.issues[issueIndex].comments.push(comment);
}
})
.addCase(commentIssue.rejected, (state, action) => {
state.loading = false;
state.error = action.error.message;


})


.addCase(editComment.pending, (state) => {
state.loading = true;

})

.addCase(editComment.fulfilled, (state, action) => {
state.loading = false;
state.isSuccess = true;

const { commentId, newText } = action.payload;

// Iterate over articles in state
state.issues.forEach((issue) => {
// Find the comment to edit in the article's comments array
const commentIndex = issue.comments.findIndex((comment) => comment._id === commentId);

// If the comment exists in the article, update its text
if (commentIndex !== -1) {
    issue.comments[commentIndex].text = newText;
}
});
})


.addCase(editComment.rejected, (state, action) => {
state.loading = false;
state.error = action.error.message;
})




.addCase(deleteComment.pending, (state) => {
  state.loading = true;
})
.addCase(deleteComment.fulfilled, (state, action) => {
  state.loading = false;
  state.isSuccess = true;
  // Remove the deleted comment from the articles array in the state
  const {commentId} = action.payload;
  state.issues.forEach((issue) => {
    issue.comments = issue.comments.filter((comment) => comment._id !== commentId);
  });
})
.addCase(deleteComment.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})

.addCase(shareIssue.pending, (state) => {
  state.status = 'loading';
})

.addCase(shareIssue.fulfilled, (state, action) => {
  state.loading = false;
  state.status = 'succeeded';
  state.sharedIssues.push(action.payload.sharedIssue);
 
  const issueIndex = state.issues.findIndex((issue) => issue._id === state.sharedIssues.issueId);

  if (issueIndex !== -1) {
    state.issues[issueIndex].shares = action.payload.sharedIssue;
  }


})
.addCase(shareIssue.rejected, (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
})








.addCase(callOpenAIPrompt.pending, (state) => {
  state.openAIStatus = 'loading';
})
.addCase(callOpenAIPrompt.fulfilled, (state, action) => {
  state.openAIStatus = 'succeeded';
  state.openAIResponse = action.payload;
})
.addCase(callOpenAIPrompt.rejected, (state, action) => {
  state.openAIStatus = 'failed';
  state.error = action.error.message;
})








  
  
    },
  });
  
  export default issueSlice.reducer;
  