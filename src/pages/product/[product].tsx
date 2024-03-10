import { fetcher } from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduct from "@/views/DetailProduct";
import { productType } from "@/types/product.type";

const DetailProductPage = ({ product }: { product: productType }) => {
  const { query } = useRouter();
  // const { data, error, isLoading } = useSWR(
  //   `/api/product/${query.id}`,
  //   fetcher
  // );
  // console.log(data);

  return (
    <div>
      {/* <DetailProduct product={isLoading ? {} : data.data} /> */}
      {/* Server-side & Static-sida */}
      <DetailProduct product={product} />;
    </div>
  );
};
export default DetailProductPage;

// SERVER
// export async function getServerSideProps({
//   params,
// }: {
//   params: { product: string };
// }) {
//   // console.log(params.product);
//   const res = await fetch(
//     `http://localhost:3000/api/product/${params.product}`
//   );
//   const response = await res.json();

//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }

// STATIC
export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();

  const paths = response.data.map((product: productType) => ({
    params: { product: product.id },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({
  params,
}: {
  params: { product: string };
}) {
  const res = await fetch(
    `http://localhost:3000/api/product/${params.product}`
  );
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
}
