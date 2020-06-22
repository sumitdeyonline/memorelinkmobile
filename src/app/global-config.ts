

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
    faqQueryString: {'fields.pageName':'FAQ', 'fields.pageBlockName':'FAQS', 'fields.publishOnThePage':true},
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
    EmploymentTypes:'EmploymentTypes',
    State: 'State',
    UserRoles: 'UserRole',
    AlphabetNumerology: 'AlphabetNumerology',
    AlphabetJobPrediction: 'AlphabetJobPrediction',
    WorkAuthorization: 'WorkAuthorization',
    SequenceNumber: 'SequenceNumber',
    SaveJob:'SaveJob',
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
    ApplyJobSucess: 'You have successfully applied for this job',
    CountryCreate: 'Country has been sucessfully created/updated',
    StateCreate: 'State has been sucessfully created/updated',
    SEQUENCENUMBER_ID:'O7TvY8yrEsJY0UHonBDr'
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
    LIST_JOB_DESC_WIDTH: 150,
    LIST_JOB_DESC_STATUS: 200,
    LIST_JOB_DESI_POSITION_SKILLSET: 150,
    PAGE_SIZE: 10,
    CURRENT_PAGE: 1,
    // ZIPCODE_API_URL: 'https://www.zipcodeapi.com/rest/',
    // ZIPCODE_API: 'GNSZy5dfcTtnYL78PeldQR4eyam3IzVMply2lWLfDsuu3WmpED29mn7x6DC87Ccv',
    //GEODB_API_URL: 'http://geodb-free-service.wirefreethought.com/v1/geo/cities', // Free
    GEODB_API_URL: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities', //paid
    GEODB_API_HOST: 'wft-geo-db.p.rapidapi.com',
    GEODB_API_KEY: '8c1c06616cmsh2bba6f77a4816bfp17c015jsn71bcba1596e9',
    GEODB_COUNTRY_ID: 'US',
    //GET_CITY_WITH_ZIP: 'http://api.zippopotam.us/us/' GET_CITY_WITH_ZIP: 'http://api.zippopotam.us/us/' // http://api.zippopotam.us/us/94551
    GET_CITY_WITH_ZIP: 'https://ziptasticapi.com/', //http://ziptasticapi.com/94551
    MAX_CHARACTER_TYPE_AHEAD: 3,
    MAX_CHARACTER_TYPE_AHEAD_ZIPCODE: 5,
    MAX_LIMIT_CITY_SEARCH: 20,
    MAX_LIMIT_REDIUS_SEARCH: 100,
    MAX_CHARACTER_ADMIN_SEARCH: 2,
    NO_OF_DAYS_RESULT: 5,
    FIRST_PAGE_RECORD_LIMIT: 15,
    MORE_PAGE_RECORD_LIMIT: 30,
    ALL_PAGE_RECORD_LIMIT: 500,
    ALL_RECORDS: 'All Records',
    LAST_10_DAYS: 'Last 10 Days',
    LAST_30_DAYS: 'Last 30 Days'

}

export const CKEDITOR_CONF = {
    ITEMS: [
        'heading',
        '|',
        'bold',
        'italic',       
        'link',          
        '|',
        'bulletedList',
        'numberedList',
        '|',
        // 'increaseindent',
        // 'decreaseindent',
        // 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify',          
        // '|',  
        'blockquote',          
        'insertTable',
        '|',
        'undo',
        'redo'
      ],
      TOOLBAR: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ],
      CONTENT_TOOLBAR: [ 'tableColumn', 'tableRow', 'mergeTableCells' ],
      LANGUAGE: 'en'

}

interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string,
    audience: string,
    //redirectUri: string,
    redirectUriAuth:string,
    //redirectUriemployee:string,
    responseType : string,
    scope: string,
    connection: string,
    sighupURL: string,
    forgetPasswordURL: string,
    userURL: string,
    idToekn: string,
    // adminClient_id:string,
    // adminClientSecret:string,
    // adminAudience:string,
    // admingrantType:string,
    adminTokenURL: string,
    authErrorMeg: string,
    adminTokenBody:string
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
    //callbackURL: 'http://localhost:4200/callback',
    
    audience: 'https:/memorelink.auth0.com/userinfo',


    //redirectUri: 'http://macgain.com/dist/',       // production
    //redirectUri: 'https://career.macgain.com/',       // production
    //redirectUri: 'https://memorelink.com/',       // production

    //redirectUri: 'http://localhost:4200/',
    //redirectUriAuth: 'http://localhost:4200/authlandingpage/', 
    redirectUriAuth: 'https://memorelink.com/authlandingpage/', // Production


    responseType: 'token id_token',
    authErrorMeg: 'authErrorMeg',
    //scope: 'openid profile',
    scope: 'openid profile read:messages write:messages',
    connection: 'Username-Password-Authentication' ,
    sighupURL: 'https://memorelink.auth0.com/dbconnections/signup',
    forgetPasswordURL: 'https://memorelink.auth0.com/dbconnections/change_password',
    userURL:'https://memorelink.auth0.com/api/v2/users/',
    idToekn: 'idToekn', //'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik4wSkVSRVU0UmpreE16RXpRVEJFTWtaQlFrSkdSakUxTVRVNE9FTTNRVGhDT0VZME1UVkJPUSJ9.eyJpc3MiOiJodHRwczovL21lbW9yZWxpbmsuYXV0aDAuY29tLyIsInN1YiI6Ik5WYVNKTWpUSkZpNzA3VVMxVzFBNTVuZjY0WGg2OE1DQGNsaWVudHMiLCJhdWQiOiJodHRwczovL21lbW9yZWxpbmsuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1OTA1NTU2MDcsImV4cCI6MTU5MDY0MjAwNywiYXpwIjoiTlZhU0pNalRKRmk3MDdVUzFXMUE1NW5mNjRYaDY4TUMiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.RNy0oVOI6v8mkDmdbfG3Pgv5ppmwunti7kWlrnfx2LUSElRhW_cEmcDjss6b_ZOQYs2Jbzzhlz-Wj11VkYMZ9ErM3gRgDC9VOqIol7jmsXCzauMA5EVDc9qqrH7bBUMqPuZmTuI70Luk6NDEG5qDEuTnN_fV7EFbiR0xdQ6CwVCf-LO96GBkcRYZrI0xLJIcKRh2uyajAvNLTlhMtJTUvwmRS1gdWRrxSdklfKnqsQhcNnczbV8TfuBNOeBXoy6qmsB0Ma1ewu8zwz6UMG80KwiMz0Guc-g04p_7YNZ-rj6A_6e8cYVxAo-31xbyuHa86vialKECagrX3iBbKi3U-A'
    // adminClient_id:'NVaSJMjTJFi707US1W1A55nf64Xh68MC',
    // adminClientSecret:'9N0M0ao77gwE9xcO3UpEV7eL9o0DGFdeECGHDDZD7raunugOQs8UHWlHHbwUwsds',
    // adminAudience:'https://memorelink.auth0.com/api/v2/',
    // admingrantType:'client_credentials',
    adminTokenURL:'https://memorelink.auth0.com/oauth/token',
    adminTokenBody:'{"client_id":"NVaSJMjTJFi707US1W1A55nf64Xh68MC","client_secret":"9N0M0ao77gwE9xcO3UpEV7eL9o0DGFdeECGHDDZD7raunugOQs8UHWlHHbwUwsds","audience":"https://memorelink.auth0.com/api/v2/","grant_type":"client_credentials"}'


}

export const JOBPREDICTION_CONFIG = {
    EXECELLENT_MATCH : "Excellent Match",
    EXECELLENT_MATCH_PERCENTAGE: 90,
    GOOD_MATCH : 'Good Match',
    GOOD_MATCH_PERCENTAGE: 80,
    AVERAGE_MATCH : 'Average Match',
    AVERAGE_MATCH_PERCENTAGE: 50,
    BAD_MATCH : 'Bad Match',
    BAD_MATCH_PERCENTAGE: 49,  
}

export const EMAIL_CONFIG = {
    SecureToken : "ec8ee562-1f2a-43ae-a674-7fab7e9903cc",
    EmailFrom : 'support@memorelink.com',
    SecureTokenJobs : "7e8c09e7-771a-4e0a-9351-520c0367bfb1",
    EmailFromJobs : 'jobs@memorelink.com',
    HelpEmail : 'help@memorelink.com',
};

export const HOME_CONFIG = {
    BannerRandomNumber : 2,
    //SEARCH_RESUME_PLACEHOLDER: 'Java AWS Azure Snapdragon Linux iTunes Developer Architect Google Facebook ...',
    SEARCH_RESUME_PLACEHOLDER: 'Skills, Position or Company',
    SEARCH_POST_PLACEHOLDER: 'Job Title, Skills or Company'
};