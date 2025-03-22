import { LinkButtonProps } from '../../types';
import styles from './LinkButton.module.css';

function LinkButton({ props }: { props: LinkButtonProps }) {
    return (
        <a className={styles.link} href={props.url} target="_blank" rel="noreferrer">
            {props.icon}
        </a>
    )
}

export default LinkButton;