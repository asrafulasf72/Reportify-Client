import axios from "axios";

export const upLoadImage=async(imgData)=>{
         const fromData=new FormData();
      fromData.append('image', imgData)

      const {data}= await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,fromData)
      return data?.data?.url
}