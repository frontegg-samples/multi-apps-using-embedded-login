import './App.css';
import { useAuthUser } from "@frontegg/react";

function App() {
    const logout = () => {
        window.location.href =  `${window.location}account/logout`;
    }

    let redirectUrl = new URLSearchParams(window.location.search).get('redirectUrl');
    if (redirectUrl) {
        console.log('got redirectUrl', redirectUrl);
        localStorage.setItem('redirectUrl', redirectUrl);
    }

    // This will redirect to login
    const user = useAuthUser();
    console.log('user', user);

    redirectUrl = localStorage.getItem('redirectUrl');
    if (user?.id &&  redirectUrl) {
        localStorage.removeItem('redirectUrl');
        console.log('redirecting to', redirectUrl);
        window.location.href = redirectUrl;
        return null;
    }

    return (
        <div className="App">
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name} />
            <span>{user?.name}</span>
          </div>
            <div>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </div>
      );
}

export default App;
