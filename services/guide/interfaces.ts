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
