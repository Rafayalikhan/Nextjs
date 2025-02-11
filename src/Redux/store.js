// store.js






import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import articleSlice from './articleSlice';
import profileSlice from './profileSlice';
import notificationSlice from './notificationSlice';
import jobSlice from './jobSlice';
import issueSlice from './issueSlice';
import learnSlice from './learnSlice';
import libarySlice from './libarySlice';
import jobApiSlice from './jobApiSlice';
import feedbackSlice from './feedbackSlice';

// import { userSignup, userLogin } from './authThunks';

const store = configureStore({
  reducer: {
    user:authSlice,
    articles: articleSlice,
    profiles:profileSlice,
    notifications:notificationSlice,
    jobs:jobSlice,
    issues:issueSlice,
    learns:learnSlice,
    libarys:libarySlice,
    apijobs:jobApiSlice,
    feedback:feedbackSlice
  },
});



export default store;
