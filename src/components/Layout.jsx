import { Suspense } from 'react';
import AppBar from './Header/AppBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<p>Loading...</p>}>
        <main className="container w-screen px-4 my-6 md:my-10">
          {children}
        </main>
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
