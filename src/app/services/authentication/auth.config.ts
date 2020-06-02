interface AuthSessionConfiguration {
    accessToken: string,
    idToken: string,
    expireAt: string,
    profile: string,
    scope: string,
    admin: string,
    PostJobRole: string,
    ResumeSearchRole: string,
    AdminRole: string,
    UserRole: string
}

export const SESSION_CONFIG: AuthSessionConfiguration = {
    accessToken: 'access_token',
    idToken: 'id_token',
    expireAt: 'expires_at',
    profile: 'profile',
    scope: 'scopes',
    admin: 'admin',
    PostJobRole: 'PostJobRole',
    ResumeSearchRole: 'ResumeSearchRole',
    AdminRole: 'AdminRole',
    UserRole: 'UserRole'
};