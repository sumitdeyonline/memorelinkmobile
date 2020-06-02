//import { Timestamp } from "@google-cloud/firestore";

export interface PostJobc {
    id? : string;
    objectID? : string;
    JobTitle? : string;
    JobDesc? : string;
    Skills? : string;
    Company?: string;
    CompanyLogoURL?: string;
    ApplyToEmail? : string;
    CCToEmail? : string;
    ApplyToURL? : string;
    JobCity? : string;
    JobState? : string;
    JobCountry? : string;
    JobZip? : string;
    EmploymentTypes? : string;
    JobPayRate? : string;
    Compensation? : string;
    JobLength? : string;
    TravelRequirements? : string;
    isTeleComute? : boolean;
    isSearchable? : boolean;
    CreatedDate? : Date;
    CreatedBy? : string;
    LastModifiedBy? : string;
    LastModifiedDate? : Date;
  }
