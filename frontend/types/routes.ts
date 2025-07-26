export type RouteConfig = {
  path: string
  roles: string[]
  desktopLabel: string
  mobileLabel: string
  desktopDisplay: boolean
  mobileDisplay: boolean
  footerDisplay: boolean
}

export const protectedRoutes: Record<string, RouteConfig> = {
  authentication: {
    path: '/authentication',
    roles: [],
    desktopLabel: 'Authentication',
    mobileLabel: 'Authentication',
    desktopDisplay: false,
    mobileDisplay: false,
    footerDisplay: false,
  },
  termsAndCondtions: {
    path: '/terms-and-conditions',
    roles: [''],
    desktopLabel: 'Terms and Conditions',
    mobileLabel: 'Terms and Conditions',
    desktopDisplay: false,
    mobileDisplay: false,
    footerDisplay: false,
  },
  privacyPolicy: {
    path: '/privacy-policy',
    roles: [''],
    desktopLabel: 'Privacy Policy',
    mobileLabel: 'Privacy Policy',
    desktopDisplay: false,
    mobileDisplay: false,
    footerDisplay: false,
  },
  changeEmail: {
    path: '/change-email',
    roles: ['user', 'admin'],
    desktopLabel: 'Change Email',
    mobileLabel: 'Change Email',
    desktopDisplay: false,
    mobileDisplay: false,
    footerDisplay: false,
  },
  changePassword: {
    path: '/change-password',
    roles: ['admin', 'user'],
    desktopLabel: 'Change Password',
    mobileLabel: 'Change Password',
    desktopDisplay: false,
    mobileDisplay: false,
    footerDisplay: false,
  },
  resetPassword: {
    path: '/reset-password',
    roles: ['user', 'admin'],
    desktopLabel: 'Reset Password',
    mobileLabel: 'Reset Password',
    desktopDisplay: false,
    mobileDisplay: false,
    footerDisplay: false,
  },
  verifyEmail: {
    path: '/verify-email',
    roles: ['user', 'admin'],
    desktopLabel: 'Verify Email',
    mobileLabel: 'Verify Email',
    desktopDisplay: false,
    mobileDisplay: false,
    footerDisplay: false,
  },
  verifyLogin: {
    path: '/verify-login',
    roles: ['user', 'admin'],
    desktopLabel: 'Verify Login',
    mobileLabel: 'Verify Login',
    desktopDisplay: false,
    mobileDisplay: false,
    footerDisplay: false,
  },
  images: {
    path: '/images',
    roles: ['admin'],
    desktopLabel: 'Images',
    mobileLabel: 'Images',
    desktopDisplay: false,
    mobileDisplay: false,
    footerDisplay: false,
  },
}
