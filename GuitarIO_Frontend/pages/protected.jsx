import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedPage() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    if (!token) {
      router.push('/login'); // Redirect to login page if not logged in
      return;
    }

    // Retrieve user data from session storage
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      router.push('/login'); // Redirect to login page if user data not found
      return;
    }

    // Parse user data and set the user's name
    const user = JSON.parse(userData);
    console.log(user.email)
    setUserName(user.lastname);
  }, []);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('user');
    // Clear token cookie (you may need to adjust this based on your cookie handling)
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <div>
         <section class="home section" id="home">
							<div class="shape__small"></div>
							<div class="shape__big"></div>
            	<div class="home__container container grid">
            		<div class="home__data">
            			<h1 class="home__title">
            				<span>Welcome!
								
							
								
								</span>          
								     
            			</h1>
									<p class="home__description">

										555
									</p>
									<a href="#" class="button">Explore Now!!</a>
            		</div>
                <img src="/Heart.png" alt="home image"class="home__img"></img>
                <img src="/Heart.png" alt="home image" class="home__tree-1"/>
								<img src="/skull.png" alt="home image" class="home__tree-2"/>
            	</div>
            </section>
      <h1>Welcome, {userName}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
