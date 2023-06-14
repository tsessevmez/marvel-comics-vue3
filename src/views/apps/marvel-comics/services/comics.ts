import axios from "axios";
import { MD5 } from "crypto-js";
import { ref } from "vue";

export const data = ref([]);

export const calculateHash = (input: string): string => {
  return MD5(input).toString();
};

export const getComics = async () => {
  const publicKey = "6cdf7ee71931cf5b41f644190b2d6568";
  const privateKey = "c8f161df870faf7c50e4b808c54158a28c36fa6f";

  const timestamp = Date.now().toString();
  const hash = calculateHash(timestamp + privateKey + publicKey);

  try {
    const response = await axios.get(
      "https://gateway.marvel.com/v1/public/comics",
      {
        params: {
          ts: timestamp,
          apikey: publicKey,
          hash: hash,
        },
      }
    );

    data.value = response.data.data.results;
    console.log(data.value);
  } catch (error) {
    console.error(error);
  }
};
