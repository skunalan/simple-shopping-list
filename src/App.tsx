import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import JSConfetti from "js-confetti";
import { nanoid } from "nanoid";

const jsConfetti = new JSConfetti();

interface ShopParams {
  id: string;
  name: string;
}

interface CategoryParams {
  id: string;
  name: string;
}

interface ProductParams {
  id: string;
  name: string;
  shop: string;
  category: string;
  isBought: boolean;
}

const shop: ShopParams[] = [
  { id: "1", name: "Migros" },
  { id: "2", name: "Şok" },
  { id: "3", name: "Çağdaş" },
  { id: "4", name: "Teknosa" },
  { id: "5", name: "Mediamarkt" },
];

const category: CategoryParams[] = [
  { id: "1", name: "Şarküteri" },
  { id: "2", name: "Bakliyat" },
  { id: "3", name: "Kasap" },
  { id: "4", name: "Kozmetik" },
  { id: "5", name: "Elektronik" },
];

function App() {
  const [selectedShop, setSelectedShop] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productInput, setProductInput] = useState<string>("");
  const [product, setProduct] = useState<ProductParams[]>([]);

  const addProduct = (event: React.FormEvent) => {
    event.preventDefault();

    if (!productInput || !selectedShop || !selectedCategory) {
      alert("Lütfen tüm alanları doldurunuz!..");
      return;
    }

    const newProduct: ProductParams = {
      id: nanoid(),
      name: productInput,
      shop: selectedShop,
      category: selectedCategory,
      isBought: false,
    };
    console.log(newProduct.id);
    setProduct([...product, newProduct]);
    setProductInput("");
    setSelectedShop("");
    setSelectedCategory("");
  };

  const toggleBought = (id: string) => {
    setProduct((prevProduct) => {
      const updatedProduct = prevProduct.map((p) =>
        p.id === id ? { ...p, isBought: !p.isBought } : p
      );

      if (
        updatedProduct.length > 0 &&
        updatedProduct.every((p) => p.isBought)
      ) {
        jsConfetti.addConfetti();
      }
      return updatedProduct;
    });
  };

  const removeProduct = (id: string) => {
    setProduct((prevProduct) => prevProduct.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="row">
          <h1 style={{color: "#6B5ACD"}}
            className="text-center display-5 fw-bolder
      "
          >
            Alışveriş Listesi
          </h1>
          <div className="bg-light shadow mt-4">
            <Form className="mt-3" onSubmit={addProduct}>
              <Form.Select
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
                className="mb-3"
              >
                <option value="" disabled>
                  Market...
                </option>
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
                <option value="" disabled>
                  Kategori...
                </option>
                {category.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
              <InputGroup className="mb-3">
                <Form.Control
                  value={productInput}
                  onChange={(e) => setProductInput(e.target.value)}
                  type="text"
                  placeholder="Ürün Giriniz..."
                />
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="btn-lg"
                >
                  Ekle
                </Button>
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="mt-5 w-75 text-center">
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
                      onClick={() => {
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
