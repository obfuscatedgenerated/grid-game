import styles from "./MuseText.module.css";

type MuseProps = {children: string};

function MuseText(props: MuseProps) {
    return <p className={styles.muse}>{props.children}</p>;
}

export default MuseText;
