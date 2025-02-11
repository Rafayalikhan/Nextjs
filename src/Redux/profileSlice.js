import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MdTitle } from 'react-icons/md';

// API endpoint for profile CRUD operations


export const fetchAllProfiles = createAsyncThunk('profiles/fetchAllProfiles', async () => {
  const response = await fetch('https://br-backend-server.vercel.app/api/user/all-profiles', {

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();
  return data.profiles;  // Extract profiles list
});




export const fetchUserProfile = createAsyncThunk('profiles/fetchUserProfile', async (userId) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/user/profile/${userId}`,{

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },


  })
  
  const data = await response.json();
  return data.userProfile;
});








export const fetchProfile = createAsyncThunk('profile', async () => {
  const response = await fetch('https://br-backend-server.vercel.app/api/user/profile', {
    headers: {
      'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    },


  });

  const data = await response.json();


  console.log(data);
  return data;
});


export const fetchSharedArticles = createAsyncThunk('fetchSharedArticles', async (userId) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/profiles/${userId}/shared-articles`, {
    headers: {
      'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    },


  });

  const data = await response.json();


  console.log(data);
  return data;
});




export const fetchSharedJobs = createAsyncThunk('fetchSharedJobs', async (userId) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/profiles/${userId}/shared-jobs`, {
    headers: {
      'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    },


  });

  const data = await response.json();


  console.log(data);
  return data;
});








export const deleteSharedArticle = createAsyncThunk('deleteSharedArticle', async ({ userId, articleId }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/profiles/${userId}/shared-articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return { articleId };
});





export const deleteSharedJobs = createAsyncThunk('deleteSharedJob', async ({ userId, jobId }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/profiles/${userId}/shared-jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return { jobId };
});





export const deleteSharedIssue = createAsyncThunk('deleteSharedIssue', async ({ userId, issueId }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/profiles/${userId}/shared-issues/${issueId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return { issueId };
});







export const deleteSharedLearn = createAsyncThunk('deleteSharedLearn', async ({ userId, learnId }) => {
  const response = await fetch(`https://br-backend-server.vercel.app/api/post/profiles/${userId}/shared-learns/${learnId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return { learnId };
});




export const updateProfile = createAsyncThunk('update/profile', async ({ profileId, profileData }) => {
  const jsonObject = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    company: profileData.company,
    location: profileData.location,
    designation: profileData.designation,
    experience: profileData.experience,
    education: profileData.education
  };

  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonObject),
  };

  const response = await fetch(`https://br-backend-server.vercel.app/api/user/edit-profile/${profileId}`, requestOptions);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data;
});



// Thunk action to create a new profile
export const createProfile = createAsyncThunk('profile/createProfile', async (profileData, { getState }) => {
  try {
    const token = getState().auth.token;
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});



// Thunk action to delete a profile
export const deleteProfile = createAsyncThunk('profile/deleteProfile', async (id, { getState }) => {
  try {
    const token = getState().auth.token;
    const response = await fetch(`${''}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});




export const uploadProfilePicture = createAsyncThunk('profile/uploadProfilePicture', async ({ profileId, file }) => {
  const formData = new FormData();
  formData.append('profilePicture', file);

  const response = await fetch(`https://br-backend-server.vercel.app/api/post/profile/upload-picture/${profileId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data.profile; // Returning the updated profile
});










const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    profiles:[],
    allProfiles: [], 
    userProfile: {}, // For all user profiles
    sharedArticles: [],
    sharedJobs: [],
    sharedIssues:[],
    token:"",
    loading: false,
    error: null,
    isSuccess:false,
    status: 'idle',
  },
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.profiles = action.payload.userProfile;
                // state.profiles = action.payload.profile;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })






      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.userProfile = action.payload; 
                // state.profiles = action.payload.profile;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(fetchAllProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProfiles = action.payload;
      })
      .addCase(fetchAllProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })





      .addCase(createProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles.push(action.payload);
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        
        const updatedProfile = action.payload.userProfile;
      console.log (updatedProfile);
      
        if (updatedProfile.education && updatedProfile.experience) {
          state.profiles = updatedProfile;
        } else {
          const index = state.profiles.findIndex((userProfile) => userProfile._id === updatedProfile._id);
          if (index !== -1) {
            const updatedProfiles = [...state.profiles];
            updatedProfiles[index] = updatedProfile;
            state.profiles = updatedProfiles;
      
            // Education aur experience ko bhi update karenge
            state.profiles[index].education = updatedProfile.education;
            state.profiles[index].experience = updatedProfile.experience;
          }
        }
      })
      
      


      .addCase(fetchSharedArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSharedArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sharedArticles = action.payload.sharedArticles
        console.log('sharedarticle')
        state.sharedArticles = Array.isArray(action.payload) ? action.payload : [];
        

        console.log(action.payload)
      })
      .addCase(fetchSharedArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })




      .addCase(fetchSharedJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSharedJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sharedJobs = action.payload.sharedJobs
        state.sharedJobs = Array.isArray(action.payload) ? action.payload : [];
        

        console.log(action.payload)
      })
      .addCase(fetchSharedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })





      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload; // Update the profile with the new profile picture
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })




      .addCase(deleteSharedArticle.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteSharedArticle.fulfilled, (state, action) => {
        state.sharedArticles = state.sharedArticles.filter(
          article => article._id !== action.payload.articleId
        );
      })
      .addCase(deleteSharedArticle.rejected, (state, action) => {
        state.error = action.error.message;
      })



      
      .addCase(deleteSharedLearn.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteSharedLearn.fulfilled, (state, action) => {
        state.sharedLearns = state.sharedLearns.filter(
          learn => learn._id !== action.payload.learnId
        );
      })
      .addCase(deleteSharedLearn.rejected, (state, action) => {
        state.error = action.error.message;
      })






      
      .addCase(deleteSharedJobs.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteSharedJobs.fulfilled, (state, action) => {
        state.sharedJobs = state.sharedJobs.filter(
          job => job._id !== action.payload.jobId
        );
      })
      .addCase(deleteSharedJobs.rejected, (state, action) => {
        state.error = action.error.message;
      })





      .addCase(deleteSharedIssue.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteSharedIssue.fulfilled, (state, action) => {
        state.sharedIssues = state.sharedIssues.filter(
          issue => issue._id !== action.payload.issueId
        );
      })
      .addCase(deleteSharedIssue.rejected, (state, action) => {
        state.error = action.error.message;
      })


      

        .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.loading = false;
        const deletedProfileId = action.payload.id;
        state.profiles = state.profiles.filter((profile) => profile.id !== deletedProfileId);
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;







// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { getState }) => {
//   const token = getState().auth.token;
//   const response = await fetch('http://localhost:7000/api/profile', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   return data;
// });

// export const updateProfile = createAsyncThunk('profile/updateProfile', async ({ profileData }) => {

//   console.log('Updating profile...');
//   // console.log('Profile ID:', id);
//   console.log('Profile data:', profileData);
//   const formData = new FormData();
//   formData.append('firstName', profileData.firstName);
//   formData.append('lastName', profileData.lastName);
//   formData.append('lastName', profileData.company);
//   formData.append('lastName', profileData.location);
//   formData.append('lastName', profileData.designation);
//   // formData.append('lastName', profileData.experience);
//   // formData.append('lastName', profileData.education);
//   formData.append('experience', JSON.stringify(profileData.experience));
//   formData.append('education', JSON.stringify(profileData.education));


//  const response = await fetch('http://localhost:7000/api/user/edit-profile', {
//       method: 'PUT',
//       headers: {
       
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify(formData),
//     });
  
//     if (!response.ok) {
//       // Handle non-OK responses (e.g., validation errors) here
//       const errorData = await response.json();
//       throw new Error(errorData.message);
//     }
  
//     const data = await response.json();
//     return data;
//   });




//   const profileSlice = createSlice({
//     name: 'profile',
//     initialState: {
//       token: "",
//       profiles: {}, // Updated to an object
//       loading: false,
//       error: null,
//       isSuccess: false,
//     },
//     reducers: {
//       // You can add additional reducers here if needed
//     },
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchProfile.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(fetchProfile.fulfilled, (state, action) => {
//           state.loading = false;
//           state.profiles = action.payload; // Updated to profiles object
//         })
//         .addCase(fetchProfile.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//         })
//         .addCase(updateProfile.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(updateProfile.fulfilled, (state, action) => {
//           state.loading = false;
//           state.isSuccess = true;
//           const updatedProfile = action.payload;
//           // Check if profile id exists
//           if (updatedProfile && updatedProfile.id) {
//             // Update profile in the profiles object
//             state.profiles[updatedProfile.id] = updatedProfile;
//           }
//         })
//         .addCase(updateProfile.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//         });
//     },
//   });
  


// export default profileSlice.reducer;



// // // profileSlice.js

// // import { createSlice } from '@reduxjs/toolkit';

// // const initialState = {
// //   profile: null, // Initial state to hold profile data
// //   loading: false,
// //   error: null,
// // };

// // const profileSlice = createSlice({
// //   name: 'profile',
// //   initialState,
// //   reducers: {
// //     fetchProfileStart(state) {
// //       state.loading = true;
// //       state.error = null;
// //     },
// //     fetchProfileSuccess(state, action) {
// //       state.loading = false;
// //       state.profile = action.payload;
// //     },
// //     fetchProfileFailure(state, action) {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },
// //     updateProfileStart(state) {
// //       state.loading = true;
// //       state.error = null;
// //     },
// //     updateProfileSuccess(state, action) {
// //       state.loading = false;
// //       state.profile = action.payload;
// //     },
// //     updateProfileFailure(state, action) {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },
// //   },
// // });

// // export const {
// //   fetchProfileStart,
// //   fetchProfileSuccess,
// //   fetchProfileFailure,
// //   updateProfileStart,
// //   updateProfileSuccess,
// //   updateProfileFailure,
// // } = profileSlice.actions;

// // // Thunk action to update profile
// // export const updateProfile = (formData) => async (dispatch) => {
// //   try {
// //     dispatch(updateProfileStart());
// //     const response = await fetch('your-backend-api-endpoint', {
// //       method: 'PUT',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         // Add any required headers here
// //       },
// //       body: JSON.stringify(formData),
// //     });
// //     const data = await response.json();
// //     dispatch(updateProfileSuccess(data.profile));
// //     return data;
// //   } catch (error) {
// //     dispatch(updateProfileFailure(error.message));
// //     throw error;
// //   }
// // };

// // export default profileSlice.reducer;