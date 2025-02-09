import { Suspense } from 'react';
import AppBar from './Header/AppBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<p>Loading...</p>}>
        <main
          className="container w-screen my-6 md:my-10 mx-auto p-4"
          style={{ minHeight: 'calc(100vh - 10rem)' }}
        >
          {children}
        </main>
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
