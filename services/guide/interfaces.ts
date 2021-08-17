export interface IGuideVerification {
  // guideVerificationPhotoLink: string;
  panNumber: string;
  reEnterPanNumber: string;
  panCardImageLink: string;
  aadharNumber: string;
  reEnterAadharNumber: string;
  frontAadharImageLink: string;
  backAadharImageLink: string;
  tourGuideLicenseImageLink: string;
}
export interface IGuideVerificationDataInDB {
  panNumber: string;
  panCardImageLink: string;
  aadharNumber: string;
  frontAadharImageLink: string;
  backAadharImageLink: string;
  tourGuideLicenseImageLink: string;
}

export type imageContentType = 'image/png' | 'image/jpg' | 'image/jpeg';
export interface IUploadPhoto {
  contentType: imageContentType;
  format: 'jpg' | 'png' | 'jpeg';
}

export interface ISignedPhotoResponse {
  type: string;
  signed_url: string;
  photo_url: string;
}

export interface IGuide {
  email: string;
  mobileNumber: string;
  fullName: string;
  // guideVerificationPhotoLink: string;
  // panNumber: string;
  // panCardImageLink: string;
  // aadharNumber: string;
  // frontAadharImageLink: string;
  // backAadharImageLink: string;
  // tourGuideLicenseImageLink: string;
}

export interface IGuideBasicDetails {
  email: string;
  mobileNumber: string;
  fullName: string;
}
export interface IGuideRaw {
  ID: string;
  guideID: string;
  basicDetails: IGuideBasicDetails;
  verificationData?: IGuideVerificationDataInDB;
  profileData?: IGuideProfileData;
}

export interface IGuideProfileData {
  langauagesSpoken?: string[];
  areaOfOperation?: string[];
  attractions?: string[];
  applicationStatus?: 'pending' | 'failed';
  verified?: boolean;
}
