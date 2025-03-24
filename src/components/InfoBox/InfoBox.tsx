import { useTranslation } from 'react-i18next';
import InfoSection from '../InfoSection/InfoSection';
import styles from './InfoBox.module.css';

function InfoBox() {
    const { t } = useTranslation('common');

    return (
        <div className={styles.infoBox}>
            <InfoSection props={{
                title: 'Denis',
                description: t('about.denis'),
                website_url: 'https://d.weks.dev',
                github_url: 'https://github.com/DenisBasmanow',
                telegram_url: 'https://t.me/denis_wsdev',
                email: 'denis@weks.dev',
            }} />

            <InfoSection props={{
                title: 'mrwek',
                description: t('about.mrwek'),
                github_url: 'https://github.com/Mister-Wek',
                telegram_url: 'https://t.me/mrwek',
                email: 'michele@weks.dev',
            }} />

            <InfoSection props={{
                title: 'weksoftware',
                description: t('about.weksoftware'),
                website_url: 'https://weksoftware.ru',
                github_url: 'https://github.com/weksoftware',
                telegram_url: 'https://t.me/weksoftware',
                email: 'help@weks.dev',
            }} />
        </div>
    )
}

export default InfoBox;