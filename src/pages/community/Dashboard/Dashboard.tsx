import styles from './Dashboard.module.scss';

export function Dashboard() {
  const code = 'foac88';

  return (
    <div className={styles.root}>
      <h1>Dashboard</h1>
      <div className={styles.divider} />
      <p className={styles.share}>
        Share Your Community Code <span>{code}</span> with vendors.
      </p>
      <div className={styles.text}>
        <p className={styles.earning}>Monthly Earnings</p>
        <p className={styles.vendors}>Your Vendors</p>
        <p>
          Vendors who use your community code for signup will be displayed in
          this area.
        </p>
      </div>
    </div>
  );
}
