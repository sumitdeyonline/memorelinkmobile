interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string,
    audience: string,
    redirectUri: string,
    responseType : string,
    scope: string,
    connection: string,
    sighupURL: string,
    forgetPasswordURL: string
}

export const CONTENT_CONFIG = {
    url: 'https://cdn.contentful.com/spaces/',
    //Authorization: 'Bearer 05300429693296150805e8fe5f4f93d6214159d7ee5c448a57e0e0b8029479a1',
    CntentType: 'application/json',
    // space: 'c9x3vp5xw3hj',
    // accessToken: 'cac67210ab3dcd35af8516e76d25f4288f057b4c12de71d1e40dc3d63704ed7e',

    space: '850nhrejbail',
    accessToken: '70xwbJ5eY-CabRyWvntxVigCyLyTjF6W6Gg2w_MLFy4', 
    environment:'master',

    PageBlockSectionFields: 'fields.mainHeader,fields.subHeader,fields.pageText,fields.pageImageUrl,fields.pageImageUrlCaption,fields.detailPageUrl',
    //PageBlockSectionFields: 'fields.mainHeader,fields.bodyTextHomePage,fields.homePageImageUrl,fields.homePageImageUrlCaption,fields.moreUrl',
    PageBlockSectionFieldsDetailsFields: 'fields.mainHeader,fields.subHeader,fields.detailText,fields.detailPageImageUrl,fields.detailPageImageCaption',

    publishQueryString: {'fields.publishOnThePage': true},
    //imageQueryString: {'fields.showField': true, 'fields.pageName':'HOME', 'fields.pageBlockName':'IMAGESECTION'},
    imageQueryString: {'fields.pageName':'HOME', 'fields.pageBlockName':'IMAGESECTION', 'fields.publishOnThePage':true},
    techNewsQueryString: {'fields.pageName':'HOME', 'fields.pageBlockName':'TECHNEWS', 'fields.publishOnThePage':true},
    advertiseQueryString: {'fields.pageName':'HOME', 'fields.pageBlockName':'ADVERTISE', 'fields.publishOnThePage':true},
    aboutQueryString: {'fields.pageName':'ABOUT', 'fields.pageBlockName':'ABOUTUS', 'fields.publishOnThePage':true},
    recruitersQueryString: {'fields.pageName':'RECRUITERS', 'fields.pageBlockName':'SOLUTION', 'fields.publishOnThePage':true},
    recruiterFollowingsQueryString: {'fields.pageName':'RECRUITERS', 'fields.pageBlockName':'FOLLOWINGS', 'fields.publishOnThePage':true},
    resumeserviceQueryString: {'fields.pageName':'SERVICE', 'fields.pageBlockName':'RESUME', 'fields.publishOnThePage':true},
    salaryPredictorQueryString: {'fields.pageName':'SERVICE', 'fields.pageBlockName':'SALARYPREDICTOR', 'fields.publishOnThePage':true},

    contentTypeIds: {
        PageBlockSection:'pageBlockSection'
      }

}

export const FIREBASE_CONFIG = {
    URL: '/PostJob',
    PostJob: 'PostJob',
    UserDetails: 'UserDetails',
    UserProfile: 'UserProfile',
    UploadResume: 'UploadResume',
    ApplyJob: 'ApplyJob',
    Country: 'Country',
    State: 'State',
    UserRoles: 'UserRole',
    OrderByPostJob: 'JobTitle',
    AddedSucessfully: 'Added Successfully',
    UpdatedSucessfully: 'Updated Successfully',
    DeletedSucessfully: 'Deleted Successfully',
    PostJobId: 'id',
    NewUpdatePostJob: '/newupdatePostJob',
    UploadPath: '/uploads',
    TempResume: '/TempResume',
    TotalFile: '10000000',
    EmployerPostJob: 'EmployerPostJob',
    EmployerResumeSearch: 'EmployerResumeSearch',
    EmployerPowerUser: 'EmployerPowerUser',
    UserRole: 'User',
    AdminRole: 'Admin',
    ApplyJobSucess: 'Job has been sucessfully Applied.',
    CountryCreate: 'Country has been sucessfully created/updated',
    StateCreate: 'State has been sucessfully created/updated'
}

export const SEARCH_CONFIG = {
    Keyword: 'keyword',
    Location: 'location',
    ALGOLIA_APP_ID: '4KKVOYPW3F',
    //ALGOLIA_API_KEY: '1d24f4e002cb6048feefe790ac54d731',
    ALGOLIA_API_KEY: '3f85d3567c8395f34b39a77ec472c0ed',

    
    INDEX_NAME: 'PostJob',
    INDEX_NAME_PROFILE: 'UserProfile',
    PROTOCOLS:'https:',
    //ALGOLIA_FUNCTION_URL: 'https://us-central1-jobsite-c8333.cloudfunctions.net/addFirestorePostJobDataToAlgolia',
    LIST_JOB_DESC_WIDTH: 120,
    LIST_JOB_DESC_STATUS: 400,
    PAGE_SIZE: 10,
    CURRENT_PAGE: 1,
    ZIPCODE_API_URL: 'https://www.zipcodeapi.com/rest/',
    ZIPCODE_API: 'GNSZy5dfcTtnYL78PeldQR4eyam3IzVMply2lWLfDsuu3WmpED29mn7x6DC87Ccv'
}

export const AUTH_CONFIG: AuthConfiguration = {
    clientID: 'DLg6j3y9Uv7c3TEhaOkfOi6G5aw0mmVi',
    domain: 'memorelink.auth0.com',

    //clientID: '6I0zQ4RDSfcIx1u6jQSpviVcuxkfr5DP',
    //domain: 'sumitdey.auth0.com',

    // You may need to change this!
    //callbackURL: 'http://macgain.com/dist/callback',  // production
    //callbackURL: 'https://career.macgain.com/callback',  // production
    callbackURL: 'https://memorelink.com/callback',  // production
    // callbackURL: 'http://localhost:4200/callback',

    audience: 'https:/memorelink.auth0.com/userinfo',


    //redirectUri: 'http://macgain.com/dist/',       // production
    //redirectUri: 'https://career.macgain.com/',       // production
    redirectUri: 'https://memorelink.com/',       // production
    // redirectUri: 'http://localhost:4200/',


    responseType: 'token id_token',
    //scope: 'openid profile',
    scope: 'openid profile read:messages write:messages',
    connection: 'Username-Password-Authentication' ,
    sighupURL: 'https://memorelink.auth0.com/dbconnections/signup',
    forgetPasswordURL: 'https://memorelink.auth0.com/dbconnections/change_password'
}
export const EMAIL_CONFIG = {
    SecureToken : "ec8ee562-1f2a-43ae-a674-7fab7e9903cc",
    EmailFrom : 'support@memorelink.com',
    HelpEmail : 'help@memorelink.com',
};
