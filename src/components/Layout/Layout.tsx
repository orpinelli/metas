import React from 'react'
import * as S from './Layout.styled'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('../Nav/Navbar'), { ssr: false })

export default function Layout({ children }: any) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
