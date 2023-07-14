import axios from "axios";
const options = {
  method: "GET",
  url: "https://api.freecurrencyapi.com/v1/latest?apikey=XoVu0NKJFzhII2GKPosKibptUIKMTveaohvPBYkJ",
  // url: "https://api.freecurrencyapi.com/v1/latest?apikey=XoVu0NKJFzhII2GKPosKibptUIKMTveaohvPBYkJ&currencies=EUR%2CUSD%2CCAD",
  params: {
    // currencies: ["EUR", "USD", "RUB"]
  }
};

async function Changer(amount) {
  try {
    const response = await axios.request(options);
    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default Changer;
