'use client';
import { WilmaAuthProvider } from '@wilma/auth';
export default function ClientAuthProvider({ children, }) {
    return <WilmaAuthProvider>{children}</WilmaAuthProvider>;
}
