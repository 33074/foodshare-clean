import React, { useEffect } from 'react'; // Ensure React is imported if needed elsewhere, though not directly used here
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth(); 

  useEffect(() => {
    console.log("LoginSuccessPage mounted. Checking for token..."); // Log 1

    const token = searchParams.get('token');

    if (token) {
      console.log("OAuth token FOUND in URL:", token); // Log 2
      try {
        console.log("Attempting to save token using login()..."); // Log 3
        login(token); // Save the token using your Auth context function
        console.log("Token potentially saved. AuthContext should update."); // Log 4
        
        // Add a small delay before navigating to ensure state update potentially settles
        setTimeout(() => {
          console.log("Attempting to navigate to /browse..."); // Log 5
          navigate('/browse', { replace: true }); // Redirect to the main browse page
        }, 100); // 100ms delay

      } catch (error) {
         console.error("Error during login() or navigate():", error); // Log Error
         // Redirect to login even if saving fails
         setTimeout(() => navigate('/login', { replace: true }), 100); 
      }
    } else {
      console.error("OAuth token NOT FOUND in URL. Redirecting to /login."); // Log Error if no token
      // Redirect to login page if no token is found in the URL
      navigate('/login', { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // IMPORTANT: Changed dependencies to [] to run only once on mount

  // You can show a simple loading message
  return <div>Logging you in... Please wait.</div>;
};

export default LoginSuccessPage;
