import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchNotifications = createAsyncThunk('notifications', async (userId) => {
    const response = await fetch(`https://br-backend-server.vercel.app/api/post/notifications/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
  
  
    });
  
    const data = await response.json();
  
  
    console.log(data);
    return data;
  });
  



  const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
      notifications:[],
      
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
        .addCase(fetchNotifications.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchNotifications.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload)
          
          state.notifications = action.payload.notification;
                  // state.profiles = action.payload.profile;
        })
        .addCase(fetchNotifications.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
 
    },
  });
  export default notificationSlice.reducer;