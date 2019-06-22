import axios from 'axios';

const URL = 'http://192.168.137.97:3000/api/' 

const setUser = (params) =>
  axios.post(URL + 'Seller' , params);

const getUser = (user) =>
    axios.get(URL + `Seller/${user}`);

const getAllItems = ()=>
  axios.get(URL + `Item`);


const generateItems = (params)=>
  axios.post(URL + 'AssetGeneration',params)

const generateUserQr = (params)=>
  axios.post('http://192.168.137.97:5000/generateUser',params)

const generateQr = (params)=>
  axios.post('http://192.168.137.97:5000/generateQr',params)

const sellItem = (params)=>
  axios.post(URL + '/Sell',params)

const batchItems = (params)=>
  axios.post(URL + '/BatchingBox',params)

export {
    setUser,getUser,getAllItems, generateItems, generateUserQr, generateQr, sellItem, batchItems
}
