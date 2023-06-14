import axios from "axios";
import md5 from "crypto-js/md5";
import { ref } from "vue";

export const data = ref([]);

export const calculateHash = (input: string): string => {
  return md5(input).toString();
};

export const getComicsDetail = async (id: number) => {
  const publicKey = "6cdf7ee71931cf5b41f644190b2d6568";
  const privateKey = "c8f161df870faf7c50e4b808c54158a28c36fa6f";
  console.log(id, "idddd");
  const timestamp = Date.now().toString();
  const hash = calculateHash(timestamp + privateKey + publicKey);
  console.log("CLAISTII");
  try {
    const response = await axios.get(
      "https://gateway.marvel.com/v1/public/comics",
      {
        params: {
          id: id,
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
