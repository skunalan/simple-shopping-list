import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

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

    if (!productInput.trim() || !selectedShop || !selectedCategory) {
      alert("Lütfen tüm alanları doldurunuz!..");
      return;
    }

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

  const toggleBought = (id: number) => {
    setProduct((prevProduct) =>
      prevProduct.map((p) =>
        p.id === id ? { ...p, isBought: !p.isBought } : p
      )
    );
  };

  const removeProduct = (id: number) => {
    setProduct((prevProduct) => prevProduct.filter((p) => p.id !== id));
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
          <Form className="mt-3" onSubmit={addProduct}>
            <Form.Select
              value={selectedShop}
              onChange={(e) => setSelectedShop(e.target.value)}
              className="mb-3"
            >
              <option value="" disabled>Market...</option>
              {shop.map((shop) => (
                <option key={shop.id} value={shop.name}>
                  {shop.name}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mb-3"
            >
              <option value="" disabled>Kategori...</option>
              {category.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>

            <Form.Control
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
              className="mb-3"
              type="text"
              placeholder="Ürün Giriniz..."
            />
            <Button variant="primary" type="submit">
              Ekle
            </Button>
          </Form>
        </div>

        <div className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Market</th>
                <th>Kategori</th>
                <th>Durum</th>
                <th>Sil?</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => toggleBought(product.id)}
                  style={{
                    textDecoration: product.isBought ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  <td>{product.name}</td>
                  <td>{product.shop}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.isBought ? "Satın Alındı" : "Satın Alınmadı"}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        removeProduct(product.id);
                      }}
                    >
                      Sil
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
