import axios from 'axios';

const URL = 'http://localhost:3000/api/' 

const setUser = (params) =>
  axios.post(URL + 'Seller' , params);

const getUser = (user) =>
    axios.get(URL + `Seller/${user}`);

const getAllItems = ()=>
  axios.get(URL + `Item`);


const generateItems = (params)=>
  axios.post(URL + 'AssetGeneration',params)

const generateUserQr = (params)=>
  axios.post('http://localhost:5000/generateUser',params)

const generateQr = (params)=>
  axios.post('http://localhost:5000/generateQr',params)

export {
    setUser,getUser,getAllItems, generateItems, generateUserQr, generateQr
}
