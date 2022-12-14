import { Routes, Route } from 'react-router-dom';
import SignInPage from './routes/sign-in-page/sign-in-page.component';

import SignUpPage from './routes/sign-up-page/sign-up-page.component'

function App() {
  return (
    <Routes>
      <Route path='sign-up' element={ <SignUpPage /> }/>
      <Route path='sign-in' element={ <SignInPage /> }/>
    </Routes>
  );
}

export default App;


// 2 sections: hero image and sign up form

// Sign up form: header, normal text, email input, password input, confirm password input, sign up button
// Log in through Google and Log in through Metamask connection