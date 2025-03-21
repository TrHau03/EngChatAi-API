export interface LoginRequestDTO {
  idToken: string;
}

export interface LoginResponseDTO {
  access_token: string;
  refresh_token: string;
}
