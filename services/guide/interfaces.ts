export interface IGuideVerification {
  ID: string;
  email: string;
  mobileNumber: string;
  fullName: string;
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
  ID: string;
  email: string;
  mobileNumber: string;
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
