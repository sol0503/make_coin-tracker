import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState("");
  const [price, setPrice] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = () => {};
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoding(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins!{loading ? "" : `(${coins.length})`} </h1>
      <div>
        <input
          value={value}
          placeholder="금액을 입력하시오"
          onChange={onChange}
        />
      </div>
      <div>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select>
            {coins.map((coin, rank) => (
              <option id={rank}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <button onClick={onSubmit}>입력하기</button>
      </div>
      <hr />
      <div>
        {coins.map((coin) => (
          <option>
            {coin.name}으로 환전한 값은? ${value * coin.quotes.USD.price}
          </option>
        ))}
      </div>
    </div>
  );
}

export default App;
