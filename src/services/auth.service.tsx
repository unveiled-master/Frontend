import axios from "axios";

const HOST = "http://localhost:5050/api/v1/auth/"

export class AuthService {
  async register(url: string, data: object) {
    try {
      const response = await axios.post(HOST+url, data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
      }
      return error;
    }
  }

  async validateEmail(token:string) {
    const response = await axios.get(HOST+"validate-email/"+token);
    return response.data;
  }
}