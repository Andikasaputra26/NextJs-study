import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <img src="/404.svg" alt="404" className={styles.error} />
      <h1 className="font-bold text-2xl"> 404 | Halaman Tidak Di temukan</h1>
    </div>
  );
};

export default Custom404;
