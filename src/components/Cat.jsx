import { useState, useEffect } from "react";
import Loader from "../loading/111.svg";

export default function Cat() {
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState({
    topText:"",
    bottomText: "",
    randomImage: "https://media.tenor.com/y4Ie8h0H-TwAAAAC/cat-typing.gif",
  });


const [catGifUrls, setCatGifUrls] = useState([]);

useEffect(() => {
  const apiKey = import.meta.env.VITE_APP_CAT_API_KEY;
  fetch( 
    "https://api.thecatapi.com/v1/images/search?mime_types=gif&limit=50",
    {
      headers: {
        "x-api-key": apiKey,
      },
    }
  )
      .then((res) => res.json())    
      .then((data) => {
        const newCatGifUrls = data.map ((item) => item.url);
        setCatGifUrls(newCatGifUrls);
        setLoading(false);
      })
      .catch((error) => console.log(error));

  }, []);

  function getCatImage() {
    const randomNumber = Math.floor(Math.random() * catGifUrls.length);
    const url = catGifUrls[randomNumber];
    setCat((prevCat) => ({
      ...prevCat,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setCat((prevCat) => ({
      ...prevCat,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input 
          type="text" 
          placeholder="Texto acima"
          className="form--input"
          name="topText"
          value={cat.topText}
          onChange={handleChange}
        />
        <input 
          type="text"
          placeholder="Texto abaixo"
          className="form--input"
          name="bottomText"
          value={cat.bottomText}
          onChange={handleChange}
        />

        <button
          className="form--buttom"
          onClick={getCatImage}
          disabled={loading}
        >
          Nova imagem de gatinhos🐱
        </button>
      </div>

      <div className="cat">
        {loading && <img src={Loader} alt="Loading.." className="loading" />}
        {!loading && <img src={cat.randomImage} className="cat--image" />}

      <h2 className="meme--text top"> {cat.topText}</h2>
      <h2 className="meme--text bottom"> {cat.bottomText}</h2>
      </div>
    </main>
  );
}