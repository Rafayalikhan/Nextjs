// articleSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Add your API endpoints for article CRUD operations
// const API_URL = 'http://localhost:7000/api/articles';



export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({ page, limit }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/get-article?page=${page}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();
  return data;
});

// export const fetchArticles = createAsyncThunk('get-article', async () => {
//     const response = await fetch('http://localhost:7000/api/post/get-article', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },

  
//     });
  
//     const data = await response.json();


//     console.log(data);
//     return data;
//   });



export const addArticle = createAsyncThunk('create-article', async (articleData) => {
  
  console.log('test2')
  const formData = new FormData();
  formData.append('text', articleData.text);
  formData.append('file', articleData.file);
 
  const response = await fetch('https://br-backend-server.vercel.app/api/post/create-article', {
    method: 'POST',
    headers: {
     Authorization: `Bearer ${localStorage.getItem('token')}`,
    
    },
    body: formData,
   
  });
  
  const data = await response.json();
 
  return data;
});

export const updateArticle = createAsyncThunk('articles/updateArticle', async ({ id, articleData }) => {
  const formData = new FormData();
  formData.append('text', articleData.text);
 

  const response = await fetch(`https://br-backend-server.vercel.app/api/post/update-article/${id}`, {
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

export const deleteArticle = createAsyncThunk('delete-article', async (id) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/delete-article/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();
  return data;
});


export const likeArticle = createAsyncThunk('articles/likeArticle', async ({articleId}) => {
  const token = localStorage.getItem('token');
  // const queryParams = new URLSearchParams({ articleId }).toString();
  // const url = `http://localhost:7000/api/post/articles/${queryParams}`;
  const url = `https://br-backend-server.vercel.app/api/post/articles/${articleId}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
 
  return data;
});




export const likeComment  = createAsyncThunk('articles/likeComment', async ({articleId,commentId  }) => {
  const token = localStorage.getItem('token');

  const url = `https://br-backend-server.vercel.app/api/post/articles/${articleId}/comments/${commentId}/like`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
 
  return data;
});




export const commentArticle = createAsyncThunk('articles/commentArticle', async ({ articleId, text }) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/articles/${articleId}/comment`, {
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
export const editComment = createAsyncThunk('articles/editComment', async ({ articleId,commentId, newText }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/articles/${articleId}/${commentId}/update`, {
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
export const deleteComment = createAsyncThunk('articles/deleteComment', async ({articleId,commentId}) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/articles/${articleId}/${commentId}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();
  return data; // Return the deleted comment ID along with the response data
});

export const editReply = createAsyncThunk('articles/editReply', async ({ articleId, commentId, replyId, newText }) => {
  
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/articles/${articleId}/comments/${commentId}/${replyId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ newText }),
  });

  const data = await response.json();
  return data;
});

export const deleteReply = createAsyncThunk('articles/deleteReply', async ({ articleId, commentId, replyId }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/articles/${articleId}/comments/${commentId}/${replyId}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();
  return data;
});

export const likeReply = createAsyncThunk('articles/likeReply', async ({ articleId, commentId, replyId }) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/articles/${articleId}/comments/${commentId}/${replyId}/like`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
});






export const replyComment = createAsyncThunk('articles/replyToComment', async ({ articleId,commentId, text }) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/articles/comments/${commentId}/${articleId}/replies`, {
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


// Share Article Thunk
export const shareArticle = createAsyncThunk(
  'articles/shareArticle',
  async ({ articleId, userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://br-backend-server.vercel.app/api/post/articles/${articleId}/share`, {
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
    












const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    token:"",
    articles:[],
    sharedArticles: [],
    loading: false,
    isSuccess:false,
    error: null,
    status: 'idle',
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {

  
    // updateArticles: (state, action) => {
    //   state.articles = action.payload;
    // },
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder

   
    // Fetch All Articles //
    .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        console.log('Fulfilled Action:', action);
        state.loading = false;
        state.articles = action.payload.article;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
               // Add Articles //
      .addCase(addArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.loading = false;
        state.articles.push(action.payload);
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;


              })





              .addCase(shareArticle.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(shareArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.sharedArticles.push(action.payload);
                console.log(action.payload)
                const articleIndex = state.articles.findIndex((article) => article._id === shareArticle.articleId);
                console.log(articleIndex)
                if (articleIndex !== -1) {
                  state.articles[articleIndex].shares = action.payload.sharedArticle;
                }
              
              
              })
              .addCase(shareArticle.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
              })









      // Updates Articles //
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const updatedArticle = action.payload;
        const index = state.articles.findIndex((article) => article.id === updatedArticle.id);
        if (index !== -1) {
          state.articles[index] = updatedArticle;
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
     
      // Like Article //
      .addCase(likeArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const likedArticle = action.payload;
        const index = state.articles.findIndex((article) => article._id === likedArticle.articleId);
        if (index !== -1) {
          state.articles[index].likes = likedArticle.likes;
          state.articles[index].likedBy = likedArticle.likedBy;
        }
      })
      .addCase(likeArticle.rejected, (state, action) => {
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
              const { articleId, commentId, likes, likedBy } = action.payload;
              const article = state.articles.find((article) => article._id === articleId);
              if (article) {
                const comment = article.comments.find((comment) => comment._id === commentId);
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
      



        // Comment Article
        .addCase(commentArticle.pending, (state) => {
          state.loading = true;
        })
        .addCase(commentArticle.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          // Update article comments in the state
          const { articleId, comment } = action.payload;
          const articleIndex = state.articles.findIndex(article => article._id === articleId);
          if (articleIndex !== -1) {
            state.articles[articleIndex].comments.push(comment);
          }
        })
        .addCase(commentArticle.rejected, (state, action) => {
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
  state.articles.forEach((article) => {
    // Find the comment to edit in the article's comments array
    const commentIndex = article.comments.findIndex((comment) => comment._id === commentId);
    
    // If the comment exists in the article, update its text
    if (commentIndex !== -1) {
      article.comments[commentIndex].text = newText;
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
  state.articles.forEach((article) => {
    article.comments = article.comments.filter((comment) => comment._id !== commentId);
  });
})
.addCase(deleteComment.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})











        // Add Case for Handling Reply Comment in Extra Reducers
.addCase(replyComment.pending, (state) => {
  state.loading = true;
})
.addCase(replyComment.fulfilled, (state, action) => {
  state.loading = false;
  state.isSuccess = true;
  const { commentId, reply } = action.payload;
  const articleIndex = state.articles.findIndex(article => article.comments.some(comment => comment._id === commentId));
  if (articleIndex !== -1) {
    const commentIndex = state.articles[articleIndex].comments.findIndex(comment => comment._id === commentId);
    if (commentIndex !== -1) {
      state.articles[articleIndex].comments[commentIndex].replies.push(reply);
    }
  }
})
.addCase(replyComment.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})

      



    .addCase(editReply.pending, (state) => {
        state.loading = true;
      })
      
      
      
     
      .addCase(editReply.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const { articleId, commentId, replyId, newText } = action.payload;
        console.log(action.payload)

        const article = state.articles.find((article) => article._id === articleId);
        if (article) {
          const comment = article.comments.find((comment) => comment._id === commentId);
          if (comment) {
            const reply = comment.replies.find((reply) => reply._id === replyId);
            if (reply) {
              reply.text = newText;
            }
          }
        }
      })
      

      .addCase(editReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const { articleId, commentId, replyId } = action.payload;
        const article = state.articles.find((article) => article._id === articleId);
        if (article) {
          const comment = article.comments.find((comment) => comment._id === commentId);
          if (comment) {
            comment.replies = comment.replies.filter((reply) => reply._id !== replyId);
          }
        }
      })
      .addCase(deleteReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(likeReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeReply.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const { articleId, commentId, replyId, likes, likedBy } = action.payload;
        const article = state.articles.find((article) => article._id === articleId);
        if (article) {
          const comment = article.comments.find((comment) => comment._id === commentId);
          if (comment) {
            const reply = comment.replies.find((reply) => reply._id === replyId);
            if (reply) {
              reply.likes = likes;
              reply.likedBy = likedBy;
            }
          }
        }
      })
      .addCase(likeReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })











      
                  // Delete Articles //     
      
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const deletedArticleId = action.payload.id;
        state.articles = state.articles.filter((article) => article.id !== deletedArticleId);
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default articleSlice.reducer;
