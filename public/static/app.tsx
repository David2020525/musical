import React, { useEffect, useState } from 'react'
import { Layout } from '../../src/components/Layout'
import { Home } from '../../src/pages/Home'
import { Browse } from '../../src/pages/Browse'
import { Login } from '../../src/pages/Login'
import { Forum } from '../../src/pages/Forum'
import { Blog } from '../../src/pages/Blog'
import { Dashboard } from '../../src/pages/Dashboard'
import { Admin } from '../../src/pages/Admin'
import { getLocaleFromPath } from '../../src/lib/i18n'

function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Remove locale prefix for routing
  const cleanPath = currentPath.replace(/^\/(en|tr)/, '') || '/'

  let Page = Home

  if (cleanPath.startsWith('/browse')) {
    Page = Browse
  } else if (cleanPath.startsWith('/login')) {
    Page = Login
  } else if (cleanPath.startsWith('/forum')) {
    Page = Forum
  } else if (cleanPath.startsWith('/blog')) {
    Page = Blog
  } else if (cleanPath.startsWith('/dashboard')) {
    Page = Dashboard
  } else if (cleanPath.startsWith('/admin')) {
    Page = Admin
  }

  return (
    <Layout currentPath={currentPath}>
      <Page />
    </Layout>
  )
}

export default function App() {
  return <Router />
}
