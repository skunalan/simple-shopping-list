import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface ShopParams {
  id: number;
  name: string;
}

interface CategoryParams {
  id: number;
  name: string;
}

interface ProductParams {
  id: number;
  name: string;
  shop: string;
  category: string;
  isBought: boolean;
}

const shop: ShopParams[] = [
  { id: 1, name: "Migros" },
  { id: 2, name: "Şok" },
  { id: 3, name: "Çağdaş" },
  { id: 4, name: "Teknosa" },
  { id: 5, name: "Mediamarkt" },
];

const category: CategoryParams[] = [
  { id: 1, name: "Şarküteri" },
  { id: 2, name: "Bakliyat" },
  { id: 3, name: "Kasap" },
  { id: 4, name: "Kozmetik" },
  { id: 5, name: "Elektronik" },
];

function App() {
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productInput, setProductInput] = useState("");
  const [product, setProduct] = useState<ProductParams[]>([]);

  const addProduct = (event: React.FormEvent) => {
    event.preventDefault();

    const newProduct: ProductParams = {
      id: product.length + 1,
      name: productInput,
      shop: selectedShop,
      category: selectedCategory,
      isBought: false,
    };
    setProduct([...product, newProduct]);
    setProductInput("");
    setSelectedShop("");
    setSelectedCategory("");
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <h1
            className="text-center
      "
          >
            Alışveriş Listesi
          </h1>
          <Form className="mt-3">
            <Form.Select className="mb-3">
              <option>Market...</option>
              {shop.map((shop) => (
                <option key={shop.id} value={shop.name}>
                  {shop.name}
                </option>
              ))}
            </Form.Select>

            <Form.Select className="mb-3">
              <option>Kategori...</option>
              {category.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>

            <Form.Control
              onSubmit={addProduct}
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
              className="mb-3"
              type="text"
              placeholder="Ürün Giriniz..."
            />
            <Button variant="primary" type="submit">Ekle</Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default App;
