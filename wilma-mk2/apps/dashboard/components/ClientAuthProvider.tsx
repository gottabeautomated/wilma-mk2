'use client'

import { WilmaAuthProvider } from '@wilma/auth'

export default function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <WilmaAuthProvider>{children}</WilmaAuthProvider>
}
