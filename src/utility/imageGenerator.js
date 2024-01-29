const image1 = "https://i.postimg.cc/Dw7T5y2g/1.jpg";
const image2 = "https://i.postimg.cc/vBVkbpYT/2.jpg";
const image3 = "https://i.postimg.cc/BvVfqT2Y/3.jpg";
const image4 = "https://i.postimg.cc/7YDdrspP/4.jpg";
const image5 = "https://i.postimg.cc/8Pm8FQhr/5.jpg";

const getRandomImage = () => {
  const images = [image1, image2, image3, image4, image5];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

export default getRandomImage;
