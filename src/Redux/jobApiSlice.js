import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




// Search Jobs in Database Action
export const searchJobsInDB = createAsyncThunk('jobs/searchJobsInDB', async ({ term, location }) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/search-jobs?term=${term}&location=${location}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await response.json();
    return data.data;
  });
  



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


  export const fetchApiJobs = createAsyncThunk('jobs', async ({page,limit}) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/getJobs-api?page=${page}&limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },

  
    });
  
    const data = await response.json();


    // console.log(data,'c');
    return data;
  });






  

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
  







  const apijobSlice = createSlice({
    name: 'apijobs',
    initialState: {
      token:"",
      apijobs:[],
     
      loading: false,
      isSuccess:false,
      error: null,
      status: 'idle',
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      searchApiResults: [],
      searchStatus: 'idle',
      searchError: null,
    },
    reducers: {
  
    
    
      // You can add additional reducers here if needed
    },
    extraReducers: (builder) => {
      builder
  
     
   


                .addCase(searchJobsInDB.pending, (state) => {
                  state.searchStatus = 'loading';
                })
                .addCase(searchJobsInDB.fulfilled, (state, action) => {
                  state.searchStatus = 'succeeded';
           
                  console.log(action.payload)
                  state.searchResults = action.payload;
                })
                .addCase(searchJobsInDB.rejected, (state, action) => {
                  state.searchStatus = 'failed';
                  state.searchError = action.error.message;
                })




                

        .addCase(fetchApiJobs.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchApiJobs.fulfilled, (state, action) => {
          // console.log('Fulfilled Action:', action);
          state.loading = false;
          state.apijobs = action.payload.jobapi;
          state.totalItems = action.payload.totalItems;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        })
        .addCase(fetchApiJobs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
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









  
  
    },
  });
  
  export default apijobSlice.reducer;
  