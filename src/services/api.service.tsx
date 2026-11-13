import axios from "axios";
import "dot-env";
import { Navigate } from "react-router-dom";
import { HOST } from "../data/envVariables";

let accessToken: string = localStorage.getItem("accessToken") || "";

export class ApiService {
  async get(url: string){
    accessToken = localStorage.getItem("accessToken") || "";

    try {
      const response = await axios.get(
        HOST+url,
        {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      return response.data;
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.status == 401) {
          await this.refesh();
        }
      }

      try{
        const response = await axios.get(
          HOST+url,
          {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            }
          }
        );
        return response.data;
      } catch (error) {
        if(axios.isAxiosError(error)){
          console.log(error.response)
        }
        throw error;
      }
    }
  }

  async refesh(){
    try{
      const response = await axios.get(
        HOST+"auth/refresh", 
        {withCredentials: true}
      );

    accessToken = response.data.accessToken;
    localStorage.setItem("accessToken", accessToken);

      console.log("Refreshed")
      return response;
    } catch (error) {
      if(axios.isAxiosError(error)){
        if(error.status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          return <Navigate to="/login"/>;
        }
      }
    }
  }

  async logout(){
    try{
      await axios.get(
        HOST+"auth/logout", 
        {withCredentials: true}
      );
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("accessToken")
    window.location.reload();
  }

  async post(url: string, data: object) {
    accessToken = localStorage.getItem("accessToken") || "";
    const send = () => axios.post(
      HOST + url,
      { ...data },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    try {
      return (await send()).data;
    } catch (error) {
      if (!axios.isAxiosError(error) || error.response?.status !== 401) throw error;
      await this.refesh();
      return (await send()).data;
    }
  }

  async login(url: string, data: object) {
    const response = await axios.post(
      HOST+url, 
      data,
      {withCredentials: true,}
    );

    return response.data;
  }

  async validateEmail(token:string) {
    const response = await axios.get(HOST+"auth/validate-email/"+token);
    return response.data;
  }
}
