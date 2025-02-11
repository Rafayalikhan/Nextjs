

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Add your API endpoints for article CRUD operations
// const API_URL = 'http://localhost:7000/api/articles';



export const fetchLearns = createAsyncThunk('get-learns', async ({ page, limit }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/learn?page=${page}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  const data = await response.json();
  return data;
});


export const searchLearns = createAsyncThunk('learns/searchLearns', async (query) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/search-learn/${query}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include authorization header if required
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch learns');
  }
  const data = await response.json();
  return data.results;
});










// export const fetchLearns = createAsyncThunk('get-learns', async () => {
//     const response = await fetch('http://localhost:7000/api/post/learn', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },

  
//     });
  
//     const data = await response.json();


//     console.log(data);
//     return data;
//   });



export const addLearn = createAsyncThunk('create-learn', async (learnData) => {
  
  console.log('test2')
  const formData = new FormData();
  formData.append('text', learnData.text);
  formData.append('file', learnData.file);
 
  const response = await fetch('https://br-backend-server.vercel.app/api/post/create-learn', {
    method: 'POST',
    headers: {
     Authorization: `Bearer ${localStorage.getItem('token')}`,
    
    },
    body: formData,
   
  });
  
  const data = await response.json();
 
  return data;
});

export const updateLearn = createAsyncThunk('learns/updateLearn', async ({ id, learnData }) => {
  const formData = new FormData();
  formData.append('text', learnData.text);
 

  const response = await fetch(`https://br-backend-server.vercel.app/api/post/update-learn/${id}`, {
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

export const deleteLearn = createAsyncThunk('delete-learn', async (id) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/delete-learn/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();
  return data;
});


export const likeLearn = createAsyncThunk('learns/likeLearn', async ({learnId}) => {
  const token = localStorage.getItem('token');
  // const queryParams = new URLSearchParams({ articleId }).toString();
  // const url = `http://localhost:7000/api/post/articles/${queryParams}`;
  const url = `https://br-backend-server.vercel.app/api/post/learns/${learnId}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
 
  return data;
});




export const likeComment  = createAsyncThunk('learns/likeComment', async ({learnId,commentId  }) => {
  const token = localStorage.getItem('token');

  const url = `https://br-backend-server.vercel.app/api/post/learns/${learnId}/comments/${commentId}/like`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
 
  return data;
});




export const commentLearn = createAsyncThunk('learns/commentLearn', async ({ learnId, text }) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/learns/${learnId}/comment`, {
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
export const editComment = createAsyncThunk('learns/editComment', async ({ learnId,commentId, newText }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/learns/${learnId}/${commentId}/update`, {
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
export const deleteComment = createAsyncThunk('learns/deleteComment', async ({learnId,commentId}) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/learns/${learnId}/${commentId}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();
  return data; // Return the deleted comment ID along with the response data
});



// // Share Learn Thunk
export const shareLearn = createAsyncThunk(
  'learns/shareLearn',
  async ({ learnId, userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://br-backend-server.vercel.app/api/post/learns/${learnId}/share`, {
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
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
    












const learnSlice = createSlice({
  name: 'learns',
  initialState: {
    token:"",
    learns:[],
    sharedLearns: [],
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

  
    // updateArticles: (state, action) => {
    //   state.articles = action.payload;
    // },
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder

   

    .addCase(fetchLearns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLearns.fulfilled, (state, action) => {
        console.log('Fulfilled Action:', action);
        state.loading = false;
        state.learns = action.payload.learn;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchLearns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(addLearn.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLearn.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.loading = false;
        state.learns.push(action.payload);
      })
      .addCase(addLearn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;


              })







              .addCase(searchLearns.pending, (state) => {
                state.searchStatus = 'loading';
              })
              .addCase(searchLearns.fulfilled, (state, action) => {
                state.searchStatus = 'succeeded';
                state.searchResults = action.payload;
              })
              .addCase(searchLearns.rejected, (state, action) => {
                state.searchStatus = 'failed';
                state.searchError = action.error.message;
              })


              .addCase(shareLearn.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(shareLearn.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.sharedLearns.push(action.payload);
                console.log(action.payload)
                const learnIndex = state.learns.findIndex((learn) => learn._id === state.sharedLearns.learnId);
               
                if (learnIndex !== -1) {
                  state.learns[learnIndex].shares = action.payload.sharedLearns;
                }
              
              
              })
              .addCase(shareLearn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
              })









      // Updates Learn //
      .addCase(updateLearn.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLearn.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const updatedLearn = action.payload;
        const index = state.learns.findIndex((learn) => learn.id === updatedLearn.id);
        if (index !== -1) {
          state.learns[index] = updatedLearn;
        }
      })
      .addCase(updateLearn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
     
    //   // Like Learn //
      .addCase(likeLearn.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeLearn.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const likedLearn = action.payload;
        const index = state.learns.findIndex((learn) => learn._id === likedLearn.learnId);
        if (index !== -1) {
          state.learns[index].likes = likedLearn.likes;
          state.learns[index].likedBy = likedLearn.likedBy;
        }
      })
      .addCase(likeLearn.rejected, (state, action) => {
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
              const { learnId, commentId, likes, likedBy } = action.payload;
              const learn = state.learns.find((learn) => learn._id === learnId);
              if (learn) {
                const comment = learn.comments.find((comment) => comment._id === commentId);
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
      



//         // Comment Learn
        .addCase(commentLearn.pending, (state) => {
          state.loading = true;
        })
        .addCase(commentLearn.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          // Update article comments in the state
          const { learnId, comment } = action.payload;
          const learnIndex = state.learns.findIndex(learn => learn._id === learnId);
          if (learnIndex !== -1) {
            state.learns[learnIndex].comments.push(comment);
          }
        })
        .addCase(commentLearn.rejected, (state, action) => {
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
  state.learns.forEach((learn) => {
    // Find the comment to edit in the article's comments array
    const commentIndex = learn.comments.findIndex((comment) => comment._id === commentId);
    
    // If the comment exists in the article, update its text
    if (commentIndex !== -1) {
        learn.comments[commentIndex].text = newText;
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
  state.learns.forEach((learn) => {
    learn.comments = learn.comments.filter((comment) => comment._id !== commentId);
  });
})
.addCase(deleteComment.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})


















      
                  // Delete Learns //     
      
      .addCase(deleteLearn.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLearn.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const deletedLearnId = action.payload.id;
        state.learns = state.learns.filter((learn) => learn.id !== deletedLearnId);
      })
      .addCase(deleteLearn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default learnSlice.reducer;
