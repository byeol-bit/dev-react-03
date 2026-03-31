import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

type TLayoutProps = {
  children: React.ReactNode;
}

const Layout = ({ children }: TLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout