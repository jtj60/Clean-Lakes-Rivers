'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import {
  admin,
  changeEmail,
  changePassword,
  getSession,
  requestPasswordReset,
  resetPassword,
  sendVerificationEmail,
  signIn,
  signOut,
  signUp,
  updateUser,
  verifyEmail,
} from '../authClient'

export const useGetSession = () => {
  const {
    data: session,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data, error } = await getSession()
      if (error) throw new Error(error.message)
      return data
    },
    refetchInterval: 10000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return {
    user: session?.user,
    session: session?.session,
    error,
    isPending,
    refetch,
  }
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: { name?: string; image?: string }) => updateUser(userData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
  })
}

export const useChangeEmail = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newEmail: string) =>
      changeEmail({
        newEmail,
        callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/change-email`,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
  })
}

export const useSignUp = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (userData: { email: string; password: string; name: string }) =>
      signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-email`,
        role: 'user',
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
  })
}

export const useSignIn = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async ({
      email,
      password,
      rememberMe,
    }: {
      email: string
      password: string
      rememberMe: boolean
    }) => signIn.email({ email, password, rememberMe }),
    onSettled: async () => {
      queryClient.clear()
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
    onSuccess: async () => {
      router.replace('/')
    },
  })
}

export const useSignOut = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      await signOut()
    },
    onSuccess: async () => {
      router.replace('/')
    },
  })
}

export const useGoogleSignIn = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async () =>
      signIn.social({
        provider: 'google',
        callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
      }),
    onSettled: async () => {
      queryClient.clear()
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
    onSuccess: async () => {
      router.replace('/')
    },
  })
}

export const useRequestPasswordReset = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (email: string) =>
      requestPasswordReset({ email, redirectTo: '/reset-password' }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
  })
}

export const useResetPassword = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ newPassword, token }: { newPassword: string; token: string }) =>
      resetPassword({ newPassword, token }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
  })
}

export const useChangePassword = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      newPassword,
      currentPassword,
    }: {
      newPassword: string
      currentPassword: string
    }) =>
      changePassword({
        newPassword: newPassword,
        currentPassword: currentPassword,
        revokeOtherSessions: true,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
  })
}

export const useVerifyEmail = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (token: string) => verifyEmail({ query: { token } }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
  })
}

export const useSendVerifyEmail = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (email: string) => sendVerificationEmail({ email }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
    },
  })
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async ({ email, name }: { email: string; name: string }) => {
      const newUser = await admin.createUser({
        email: email,
        password: crypto.randomUUID(),
        name: name,
        role: 'user',
      })

      await signIn.magicLink({
        email,
        callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login`,
      })

      return newUser
    },
  })
}

export const useImpersonateUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ user_id }: { user_id: string }) => {
      queryClient.removeQueries()
      const user_impersonating = await admin.impersonateUser({
        userId: user_id,
      })
      return user_impersonating
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
      router.replace('/')
    },
  })
}

export const useStopImpersonation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      queryClient.removeQueries()
      await admin.stopImpersonating()
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['session'], refetchType: 'active' })
      router.replace('/admin')
    },
  })
}
