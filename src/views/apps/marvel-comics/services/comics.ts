import axios from "axios";
import { MD5 } from "crypto-js";
import { ref } from "vue";

export const data = ref([]);

/**
 * Girilen bir metnin hash değerini hesaplar.
 * @param input - Hash hesaplanacak metin
 * @returns Hesaplanan hash değeri
 */
export const calculateHash = (input: string): string => {
  return MD5(input).toString();
};

/**
 * Marvel Comics API üzerinden Comics verilerini alır.
 * @returns Comics verileri
 */
export const getComics = async () => {
  // API anahtarları
  const publicKey = "6cdf7ee71931cf5b41f644190b2d6568";
  const privateKey = "c8f161df870faf7c50e4b808c54158a28c36fa6f";

  // API isteği için gerekli zaman damgası ve hash değeri hesaplanır
  const timestamp = Date.now().toString();
  const hash = calculateHash(timestamp + privateKey + publicKey);

  try {
    // Marvel Comics API'ye GET isteği yapılır
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

    // API yanıtındaki marvel verileri güncellenir
    data.value = response.data.data.results;
  } catch (error) {
    console.error(error);
  }
};
