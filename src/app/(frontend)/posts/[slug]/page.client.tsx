'use client'
import { Fragment } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'


const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme: _setHeaderTheme } = useHeaderTheme()

  return <Fragment />
}

export default PageClient
