import image1 from "../assets/img/cover/1.jpg";
import image2 from "../assets/img/cover/2.jpg";
import image3 from "../assets/img/cover/3.jpg";
import image4 from "../assets/img/cover/4.jpg";
import image5 from "../assets/img/cover/5.jpg";

const getRandomImage = () => {
  const images = [image1, image2, image3, image4, image5];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

export default getRandomImage;
