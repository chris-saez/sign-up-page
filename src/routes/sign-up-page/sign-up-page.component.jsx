import { useState} from 'react';

import heroImage01 from '../../assets/hero-image.png';
import './sign-up-page.styles.css';

const defaultForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpPage = () => {
    const [formField, setFormField] = useState(defaultForm);

    const userInput = (event) => { // User inputs into the form field are stored into an object
        const input = event.target.value;
        const name = event.target.name;

        setFormField({...formField, [name]: input});
    }

    return(
        <div className='sign-up-page-container'>
            <div className='sign-up-form-container'>
                <h2>Sign Up</h2>
                <p>Browse through thousands of collections on multiple chains</p>

                <form>
                    <input required type='text' placeholder='Username' name='username' onChange={ userInput }></input>
                    <input required type='email' placeholder='Email' name='email' onChange={ userInput }></input>
                    <input required type='password' placeholder='Password' name='password' onChange={ userInput }></input>
                    <input required type='password' placeholder='Confirm Password' name='confirmPassword' onChange={ userInput }></input>
                    <button type='submit'>Sign Up</button>
                </form>

                <p>or</p>

                <button>Sign up with Google</button>
                <button>Sign up with Metamask</button>
                <p>Already signed up? Sign in here</p>
            </div>

            <img src={heroImage01}/>
        </div>
    )
};

export default SignUpPage;