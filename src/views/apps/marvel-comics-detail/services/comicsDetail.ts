import axios from "axios";
import md5 from "crypto-js/md5";
import { ref } from "vue";

export const data = ref([]);

/**
 * Verilen bir giriş değerinin MD5 hash'ini hesaplar.
 *
 * @param input - Hash değeri hesaplanacak giriş değeri
 * @returns Hesaplanan MD5 hash değeri
 */
export const calculateHash = (input: string): string => {
  return md5(input).toString();
};

/**
 * Verilen bir comic ID'si için Marvel API'den comic detaylarını getirir.
 *
 * @param id - Getirilecek comic'in ID değeri
 */
export const getComicsDetail = async (id: number) => {
  const publicKey = "6cdf7ee71931cf5b41f644190b2d6568";
  const privateKey = "c8f161df870faf7c50e4b808c54158a28c36fa6f";
  const timestamp = Date.now().toString();
  const hash = calculateHash(timestamp + privateKey + publicKey);
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
  } catch (error) {
    console.error(error);
  }
};
