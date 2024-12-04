import axios from "axios";

export const ProvincesApi = async () => {
  let result = null;
  try {
    result = (await axios.get('https://provinces.open-api.vn/api/?depth=2')).data;
  } catch (e) {
    console.log(" API error: " + e);
  }
  return result;
}

export const getProvince = async () => {
  let result = null;
  try {
    result = (await axios.get("https://vapi.vnappmob.com/api/province/")).data;
  } catch (e) {
    console.log(" API error: " + e);
  }
  return result;
}
export const getDistrict = async (province_id) => {
  let result = null;
  try {
    result = (await axios.get(`https://vapi.vnappmob.com/api/province/district/${province_id}`)).data;
  } catch (e) {
    console.log(" API error: " + e);
  }
  return result;
}
export const getWard = async (district_id) => {
  let result = null;
  try {
    result = (await axios.get(`https://vapi.vnappmob.com/api/province/ward/${district_id}`)).data;
  } catch (e) {
    console.log(" API error: " + e);
  }
  return result;
}
