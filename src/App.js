import { useEffect, useState } from "react";

function App() {
  const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState();
  // const [price, setPrice] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCoins(json);
        setLoding(false);
      });
  }, []);

  const onSubmit = (e) => {
    console.log(e.target.value);
    const obj = JSON.parse(e.target.value);
    setSelected(obj);
  };

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
          <select
            onChange={(e) => {
              onSubmit(e);
            }}
          >
            {coins.map((coin, idx) => (
              <option key={idx} value={JSON.stringify(coin)}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <button>입력하기</button>
      </div>
      <hr />

      <div>
        {selected?.name} :{selected?.quotes?.USD?.price * value}
      </div>
    </div>
  );
}

export default App;
