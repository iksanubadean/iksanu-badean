import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={`${styles.wrapper} ${centered ? styles.centered : ""}`}>
      {subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.underline}></div>
    </div>
  );
}
