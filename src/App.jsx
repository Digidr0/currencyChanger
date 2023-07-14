import { useState, useEffect } from "react";
import {
  Layout,
  Space,
  InputNumber,
  Card,
  Button,
  Skeleton,
  Select,
  Grid,
} from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
const { Footer, Content } = Layout;
import { SelectOptions } from "./currencies";
import Changer from "./changer";
import "./App.css";

function App() {
  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "20px",
    display: "flex",
    flexDirection: "column",
    color: "#fff",
    backgroundColor: "#108ee9",
  };
  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
  };
  const [currencies, setCurrencies] = useState(["RUB", "EUR", "GBP"]);
  const [liveCurrencies, setliveCurrencies] = useState(0.0);
  const [oldCurrency, setOldCurrency] = useState(0.2);
  const [searchStatus, setSearchStatus] = useState(true);
  const [difference, setDifference] = useState(0);
  const [amount, setAmount] = useState(1);

  function UpdateCurrencies() {
    setOldCurrency(liveCurrencies);
    Changer(amount)
      .then((responseData) => setliveCurrencies(responseData.data))
      .then(console.log("currencies updated"))
      .catch((error) => console.error(error));
  }

  const addCurrency = (value) => {
    if (currencies.find((el) => el === value)) {
      setSearchStatus(false);
    } else {
      setSearchStatus(true);
      setCurrencies((oldCur) => [...oldCur, value]);
    }
  };
  useEffect(() => {
    UpdateCurrencies();
  }, []);
  return (
    <>
      <Layout>
        <Content style={contentStyle}>
          <div className="tools">
            <Space direction="horizontal" size={16}>
              <Button onClick={() => UpdateCurrencies()}>Update</Button>
            </Space>
            <Space direction="horizontal" size={16}>
              <Select
                showSearch
                onChange={addCurrency}
                placeholder="Select a currency"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                status={searchStatus ? "success" : "error"}
                options={SelectOptions}
              ></Select>
              <InputNumber
                size="large"
                min={0}
                defaultValue={amount}
                onChange={(value) => {
                  setAmount(value);
                }}
              />
              <h2>USD dollar is:</h2>
            </Space>
          </div>

          <div className="grid">
            {currencies.map((cur) => (
              <Card key={cur}>
                {liveCurrencies ? (
                  <h2>
                    {(liveCurrencies[cur] * amount)?.toFixed(2)} {cur}
                  </h2>
                ) : (
                  <Skeleton.Input size="small" />
                )}
                <p>Current: {liveCurrencies[cur]}</p>
                <p>Old: {oldCurrency?.[cur]}</p>
                <p
                  style={{
                    color: Math.sign(difference) >= 0 ? "green" : "red",
                  }}
                >
                  difference:
                  {Math.sign(difference) >= 0 ? (
                    <CaretUpOutlined />
                  ) : (
                    <CaretDownOutlined />
                  )}{" "}
                  {Math.abs(difference.toFixed(2))}
                </p>
              </Card>
            ))}
          </div>
        </Content>
        <Footer style={footerStyle}>power up by Digidro in 2023</Footer>
      </Layout>
    </>
  );
}

export default App;
