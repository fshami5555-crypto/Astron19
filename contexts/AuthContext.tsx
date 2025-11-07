import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User as FirebaseUser, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  signup: (phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Helper to create a dummy email from a phone number, with robust normalization for Saudi formats.
const formatEmailFromPhone = (phone: string): string => {
    // 1. Remove all non-numeric characters from the input.
    const digits = phone.trim().replace(/\D/g, '');

    // 2. Handle the special admin phone number.
    if (digits === '0000000000') {
        return `admin@astren.com`;
    }

    // 3. Identify and normalize Saudi mobile numbers.
    // The core of a Saudi mobile number is the last 9 digits, which must start with '5'.
    if (digits.length >= 9) {
        const coreNumber = digits.slice(-9);
        if (coreNumber.startsWith('5')) {
            // This canonical format handles 05..., 5..., 9665..., +9665... etc.
            return `966${coreNumber}@astren.com`;
        }
    }
    
    // 4. For any other number format (non-Saudi, landlines, or old formats),
    // use the cleaned digits as the identifier. This acts as a fallback.
    return `${digits}@astren.com`;
};


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUser({ id: userDoc.id, ...userDoc.data() } as User);
          } else {
             console.error("User profile not found in Firestore, but user exists in Auth.");
             // This case might happen if Firestore document creation fails after Auth user creation.
             // We can try to create it here as a fallback.
             const userProfileData: Omit<User, 'id'> = {
                 phone: firebaseUser.email!.split('@')[0], // Extract phone from dummy email
                 role: 'user',
                 loyaltyBalance: 0
             };
             await setDoc(userDocRef, userProfileData);
             setUser({ id: firebaseUser.uid, ...userProfileData });
          }
        } catch (e) {
            console.error("Error fetching user profile:", e);
            setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (phone: string, password: string) => {
    const cleanedPhone = phone.trim().replace(/\D/g, '');

    // Special handling for admin login to ensure backwards compatibility
    if (cleanedPhone === '0000000000') {
        // Try new format first
        try {
            await signInWithEmailAndPassword(auth, 'admin@astren.com', password);
            return; // Success
        } catch (error: any) {
            if (error.code !== 'auth/invalid-credential') {
                // It's a different error (e.g., too-many-requests), so throw it immediately.
                 if (error.code === 'auth/too-many-requests') {
                    throw new Error('errorTooManyRequests');
                }
                throw new Error('authError');
            }
            // If it was 'invalid-credential', we proceed to try the legacy format.
        }

        // Try legacy format
        try {
            await signInWithEmailAndPassword(auth, '0000000000@astren.com', password);
            return; // Success
        } catch (error: any) {
            // If the legacy attempt also fails, throw the final error.
            if (error.code === 'auth/invalid-credential') {
                throw new Error('errorWrongPassword');
            }
             if (error.code === 'auth/too-many-requests') {
                throw new Error('errorTooManyRequests');
            }
            throw new Error('authError');
        }
    }
      
    // Standard login for regular users
    const canonicalEmail = formatEmailFromPhone(phone);
    try {
        await signInWithEmailAndPassword(auth, canonicalEmail, password);
    } catch (error: any) {
        if (error.code === 'auth/invalid-credential') {
            throw new Error('errorWrongPassword');
        }
        if (error.code === 'auth/too-many-requests') {
            throw new Error('errorTooManyRequests');
        }
        throw new Error('authError'); // Generic error
    }
  };

  const signup = async (phone: string, password: string) => {
    try {
        const email = formatEmailFromPhone(phone);
        // For the special admin phone number, enforce a specific password during creation.
        const finalPassword = phone === '0000000000' ? '123456' : password;

        const userCredential = await createUserWithEmailAndPassword(auth, email, finalPassword);
        const newUser = userCredential.user;

        // Create user profile in Firestore
        const userProfile: Omit<User, 'id'> = {
            phone: phone, // Store the original phone number
            role: phone === '0000000000' ? 'admin' : 'user',
            loyaltyBalance: 0
        };
        await setDoc(doc(db, "users", newUser.uid), userProfile);
        
    } catch (error: any) {
        console.error("Signup error:", error);
        if (error.code === 'auth/weak-password') {
            throw new Error('errorWeakPassword');
        } else if (error.code === 'auth/email-already-in-use') {
            throw new Error('errorEmailExists');
        } else if (error.code === 'auth/too-many-requests') {
            throw new Error('errorTooManyRequests');
        }
        throw new Error('authError'); // Generic error
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
