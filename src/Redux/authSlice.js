// authSlice.js

import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';



const initialState = {

  user:"",
  userId:"",
  token:"",
  loading:false,
  error:"",
  msg:"",
  isAuthenticated: false,
}


export const signUpUser = createAsyncThunk('signupuser',async(body)=>{

const res = await fetch ("https://br-backend-server.vercel.app/api/user/register-user",{
    method:"post",
    headers:{
      'Content-Type':"application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body:JSON.stringify(body)

})
const data = await res.json();

    if (res.status === 200) {
      // Registration successful
      return data;
    } else if (res.status === 409) {
      // User with the same email already exists
      throw new Error('User with the same email already exists');
    } else {
      // Other error status codes
      throw new Error('Unexpected error during registration');
    }
  


});

// export const loginUser = createAsyncThunk('loginuser', async (body) => {
//   try {
//     const res = await fetch('http://localhost:7000/api/user/login-user', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });
//     console.log('Login response:', res);
//     const data = await res.json();


   

//     if (res.status === 200) {
//       // Check if login is successful and email/password match
//       if (data.token) {
//         return data.token; // Return the token if login is successful
//       } else {
//         throw new Error('Invalid credentials');
//       }
//     } else {
//       // Login failed, return an error
//       throw new Error(data.error || 'Login failed');
//     }
//   } catch (error) {
//     throw new Error('Error during login');
//   }
// });

export const loginUser = createAsyncThunk('loginuser', async (body) => {
  try {
    const res = await fetch('https://br-backend-server.vercel.app/api/user/login-user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
     
    const data = await res.json();
    console.log('msg',data)
    if (res.status === 200) {
      // Login successful, return the token
      const { token } = data;
     
      localStorage.setItem('token', token); // Save token to localStorage
      return token;
    } else {
      // Login failed, return an error
      throw new Error(data.error || 'Login failed');
    }
  } catch (error) {
    throw new Error('Error during login');
  }
});


// export const loginUser = createAsyncThunk('loginuser', async (body) => {
//   try {
//     const res = await fetch('http://localhost:7000/api/user/login-user', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify(body),
//     });
     
//     const data = await res.json();
   

    
//     if (res.status === 200) {
//       // Login successful, return the token
//       return data.token;
//     } else {
//       // Login failed, return an error
//       throw new Error(data.error || 'Login failed');
//     }
//   } catch (error) {
//     throw new Error('Error during login');
//   }
// });


export const logoutUser = createAsyncThunk('logoutuser', async () => {
  try {
    const res = await fetch('https://br-backend-server.vercel.app/api/user/logout-user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.status === 200) {
      return { success: true };
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    throw new Error('Error during logout');
  }
})










const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Add any additional reducers you need
    setToken: (state, action) => {
      state.token = localStorage.getItem("token");
      // state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("token");
    },
    logout: (state, action) => {
      state.token=null;
      state.user = '';
      state.isAuthenticated = false;
     localStorage.clear()
    },
  },
  extraReducers:{
  [signUpUser.pending]: (state,action)=>{
    state.loading = true
  },

  [signUpUser.fulfilled]: (state,{payload:{error,}})=>{
    state.loading = false
    if(error){
      state.error= error;
     }
  },

  [signUpUser.rejected]: (state,action)=>{
    state.loading = true
  },


  [loginUser.pending]: (state) => {
    state.loading = true;
    state.error = ''; // Clear any previous errors
  },
  [loginUser.fulfilled]: (state, action) => {
    state.loading = false;
    const { error, msg, token, user } = action.payload;
    if(error){
      state.error=error
    }else{
      state.msg=msg;
      state.token=token;
      state.user=user;
      state.isAuthenticated = true;  // Set isAuthenticated to true
        localStorage.setItem('isAuthenticated', 'true');  // Store in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
      // localStorage.setItem('msg',msg);
      // localStorage.setItem('token',token);
      // localStorage.setItem('user',JSON.stringify(user))
}
  },
  [loginUser.rejected]: (state) => {
    state.loading = false;
    state.error = 'Login failed. Please try again.';
  },


  }

})
export const { setToken ,logout,addUser} = authSlice.actions;
export default authSlice.reducer

