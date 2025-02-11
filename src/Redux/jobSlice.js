

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Add your API endpoints for article CRUD operations
// const API_URL = 'http://localhost:7000/api/articles';




export const searchJobs = createAsyncThunk('jobs/searchJobs', async ({ term, location }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/search-job/term?term=${term}&location=${location}`,{



  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  const data = await response.json();
  return data.data; // Adjust based on the API response structure
});








export const fetchJobs = createAsyncThunk('jobs', async ({page,limit}) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/jobs?page=${page}&limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },

  
    });
  
    const data = await response.json();


    // console.log(data,'c');
    return data;
  });




  



export const addJob = createAsyncThunk('create-article', async (jobData) => {
  
  console.log('test2')
  const formData = new FormData();
  formData.append('text', jobData.text);
  formData.append('file', jobData.file);
 
  const response = await fetch('https://br-backend-server.vercel.app/api/post/create-job', {
    method: 'POST',
    headers: {
     Authorization: `Bearer ${localStorage.getItem('token')}`,
    
    },
    body: formData,
   
  });
  
  const data = await response.json();
 
  return data;
});





export const updateJob = createAsyncThunk('job/updatejob', async ({ id, jobData }) => {
    const formData = new FormData();
    formData.append('text', jobData.text);
   
  
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/update-job/${id}`, {
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
  
  export const deleteJob = createAsyncThunk('delete-job', async (id) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/delete-job/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    const data = await response.json();
    return data;
  });
  






  export const likeJob = createAsyncThunk('jobs/likeJob', async ({jobId}) => {
    const token = localStorage.getItem('token');
    // const queryParams = new URLSearchParams({ articleId }).toString();
    // const url = `http://localhost:7000/api/post/articles/${queryParams}`;
    const url = `https://br-backend-server.vercel.app/api/post/jobs/${jobId}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
   
    return data;
  });






  export const likeComment  = createAsyncThunk('jobs/likeComment', async ({jobId,commentId  }) => {
    const token = localStorage.getItem('token');
  
    const url = `https://br-backend-server.vercel.app/api/post/jobs/${jobId}/comments/${commentId}/like`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
   
    return data;
  });
  
  
  
  
  export const commentJob = createAsyncThunk('jobs/commentJob', async ({ jobId, text }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/jobs/${jobId}/comment`, {
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
  
  
  
  // Define your editComment async thunk
  export const editComment = createAsyncThunk('jobs/editComment', async ({ jobId,commentId, newText }) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/jobs/${jobId}/${commentId}/update`, {
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
  export const deleteComment = createAsyncThunk('jobs/deleteComment', async ({jobId,commentId}) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/jobs/${jobId}/${commentId}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    const data = await response.json();
    return data; // Return the deleted comment ID along with the response data
  });




// Share Job Thunk
export const shareJob = createAsyncThunk(
  'jobs/shareJobs',
  async ({ jobId, userId }, { rejectWithValue }) => {
    debugger
    try {
      
      const response = await fetch(`https://br-backend-server.vercel.app/api/post/jobs/${jobId}/share`, {
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



export const getAllJobs = createAsyncThunk('jobs/getAllJobs', async () => {
  const response = await fetch('https://br-backend-server.vercel.app/api/job/get-all-jobs', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  const data = await response.json();
  return data;
});



// Search Jobs in Database Action
export const searchJobsInDB = createAsyncThunk('jobs/searchJobsInDB', async ({ term, location ,country}) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/search-jobs?term=${term}&location=${location}&country=${country}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  const data = await response.json();
  return data;
});





const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
      token:"",
      jobs:[],
      sharedJobs: [],
      loading: false,
      isSuccess:false,
      error: null,
      status: 'idle',
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      searchResults: [],
      searchStatus: 'idle',
      searchError: null,
    },
    reducers: {
  
    
    
      // You can add additional reducers here if needed
    },
    extraReducers: (builder) => {
      builder
  
     
      // Fetch All Articles //
      .addCase(fetchJobs.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchJobs.fulfilled, (state, action) => {
          // console.log('Fulfilled Action:', action);
          state.loading = false;
          state.jobs = action.payload.job;
          state.totalItems = action.payload.totalItems;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        })
        .addCase(fetchJobs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
                 // Add Articles //
        .addCase(addJob.pending, (state) => {
          state.loading = true;
        })
        .addCase(addJob.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.loading = false;
          state.jobs.push(action.payload);
        })
        .addCase(addJob.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
  
  
                })



                .addCase(searchJobsInDB.pending, (state) => {
                  state.searchStatus = 'loading';
                })
                .addCase(searchJobsInDB.fulfilled, (state, action) => {
                  state.searchStatus = 'succeeded';
                  state.searchResults = action.payload;
                })
                .addCase(searchJobsInDB.rejected, (state, action) => {
                  state.searchStatus = 'failed';
                  state.searchError = action.error.message;
                })








                .addCase(searchJobs.pending, (state) => {
                  state.searchStatus = 'loading';
                })
                .addCase(searchJobs.fulfilled, (state, action) => {
                  state.searchStatus = 'succeeded';
                  state.searchResults = action.payload;
                })
                .addCase(searchJobs.rejected, (state, action) => {
                  state.searchStatus = 'failed';
                  state.searchError = action.error.message;
                })        






                .addCase(getAllJobs.pending, (state) => {
                  state.searchStatus = 'loading';
                })
                .addCase(getAllJobs.fulfilled, (state, action) => {
                  state.searchStatus = 'succeeded';
                  state.jobs = action.payload;
                })
                .addCase(getAllJobs.rejected, (state, action) => {
                  state.searchStatus = 'failed';
                  state.searchError = action.error.message;
                })






                 
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const deletedJobId = action.payload.id;
        state.jobs = state.jobs.filter((job) => job.id !== deletedJobId);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  
  

   
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const updatedJob = action.payload;
        const index = state.jobs.findIndex((job) => job.id === updatedJob.id);
        if (index !== -1) {
          state.jobs[index] = updatedJob;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      


      .addCase(likeJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeJob.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const likedJob = action.payload;
        const index = state.jobs.findIndex((job) => job._id === likedJob.jobId);
        console.log('log3',state.jobs.filter((job) => job._id === likedJob.jobId),index)
        console.log(shareJob.jobId)
        console.log(likeJob)
        if (index !== -1) {
          state.jobs[index].likes = likedJob.likes;
          state.jobs[index].likedBy = likedJob.likedBy;
        }
      })
      .addCase(likeJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



// Like Comment //
.addCase(likeComment.pending, (state) => {
  state.loading = true;
})

.addCase(likeComment.fulfilled, (state, action) => {
  state.loading = false;
  state.isSuccess = true;
  // Update the liked comment in the state
  const { jobId, commentId, likes, likedBy } = action.payload;
  const job = state.jobs.find((job) => job._id === jobId);
  if (job) {
    const comment = job.comments.find((comment) => comment._id === commentId);
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




// Comment Job
.addCase(commentJob.pending, (state) => {
state.loading = true;
})
.addCase(commentJob.fulfilled, (state, action) => {
state.loading = false;
state.isSuccess = true;
// Update article comments in the state
const { jobId, comment } = action.payload;
const jobIndex = state.jobs.findIndex(job => job._id === jobId);
if (jobIndex !== -1) {
state.jobs[jobIndex].comments.push(comment);
}
})
.addCase(commentJob.rejected, (state, action) => {
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
state.jobs.forEach((job) => {
// Find the comment to edit in the article's comments array
const commentIndex = job.comments.findIndex((comment) => comment._id === commentId);

// If the comment exists in the article, update its text
if (commentIndex !== -1) {
job.comments[commentIndex].text = newText;
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
  state.jobs.forEach((job) => {
    job.comments = job.comments.filter((comment) => comment._id !== commentId);
  });
})
.addCase(deleteComment.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})




// .addCase(shareJob.pending, (state) => {
//   state.status = 'loading';
// })
// .addCase(shareJob.fulfilled, (state, action) => {
//   debugger
//   state.loading = false;
//   state.status = 'succeeded';
//   state.sharedJobs.push(action.payload);
//   console.log('log3', action.payload.sharedJob)
//   console.log('log2', action.payload)
//   // console.log('test2')
//   const articleIndex = state.jobs.findIndex((job) => job._id === action.payload.sharedJob._id);
//   console.log(articleIndex,'log4')
//   if (articleIndex !== -1) {
//     state.jobs[articleIndex].shares = action.payload.sharedJob;
 
    
//   }




// })



// .addCase(shareJob.rejected, (state, action) => {
//   state.status = 'failed';
//   state.error = action.error.message;
// })


// .addCase(shareJob.pending, (state) => {
//   state.status = 'loading';
// })
// .addCase(shareJob.fulfilled, (state, action) => {
//   state.loading = false;
//   state.status = 'succeeded';
//   state.sharedJobs.push(action.payload);
//   const jobIndex = state.jobs.findIndex((job) => job._id === action.meta.arg.jobId);
//   if (jobIndex !== -1) {
//     state.jobs[jobIndex].shares = action.payload.sharedJob;
//   }
// })
// .addCase(shareJob.rejected, (state, action) => {
//   state.status = 'failed';
//   state.error = action.error.message;
// })


.addCase(shareJob.pending, (state) => {
  state.status = 'loading';
})

.addCase(shareJob.fulfilled, (state, action) => {
  state.loading = false;
  state.status = 'succeeded';
  state.sharedJobs.push(action.payload.sharedJob);
  console.log(action.payload.sharedJob,'test')
  const jobIndex = state.jobs.findIndex((job) => job._id === state.sharedJobs.jobId);
  console.log(jobIndex)
  if (jobIndex !== -1) {
    state.jobs[jobIndex].shares = action.payload.sharedJob;
  }


})
.addCase(shareJob.rejected, (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
})





  
  
    },
  });
  
  export default jobSlice.reducer;
  