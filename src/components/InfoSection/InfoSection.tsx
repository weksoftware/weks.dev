import { InfoSectionProps } from "../../types";
import LinkButton from "../LinkButton/LinkButton";
import styles from './InfoSection.module.css';
import GithubIcon from "../GithubIcon/GithubIcon";
import TelegramIcon from "../TelegramIcon/TelegramIcon";
import WebsiteIcon from "../WebsiteIcon/WebsiteIcon";


function InfoSection({ props }: { props: InfoSectionProps }) {
    return (
        <div className={styles.section}>
            <div className={styles.title}>
                {props.title}
            </div>

            <div className={styles.description}>
                {props.description}
            </div>

            <div className={styles.email}> 
                <a className={styles.email} href={`mailto:${props.email}`} target="_blank">{props.email}</a>
            </div>

            <div className={styles.links}>
                {
                    props.website_url &&
                    <LinkButton props={{
                        url: props.website_url,
                        icon: <WebsiteIcon />,
                    }} />
                }
                
                {
                    props.github_url &&
                    <LinkButton props={{
                        url: props.github_url,
                        icon: <GithubIcon />,
                    }} />
                }

                {
                    props.telegram_url &&
                    <LinkButton props={{
                        url: props.telegram_url,
                        icon: <TelegramIcon />,
                    }} />
                }
            </div>

            
        </div>
    )
}

export default InfoSection;