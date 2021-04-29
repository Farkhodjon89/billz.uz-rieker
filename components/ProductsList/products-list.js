import s from "./products-list.module.scss";
import Product from "../Product/product";

const ProductsList = ({ products, related, catalogMod }) => (
  <div className={s.list}>
    <div className="row">
      {products.map((product) => (
        <Product product={product} catalogMod={catalogMod} related={related} />
      ))}
    </div>
  </div>
);

export default ProductsList;
