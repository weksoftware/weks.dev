import { useTranslation } from 'react-i18next';

import styles from './Footer.module.css';
import { getRandomDrinkEmoji, getRandomFoodEmoji } from '../../tools';

function Footer() {
    const { t } = useTranslation('common');
    
    return (
        <div className={styles.footer}>
            {t('footer', { food_emoji: getRandomFoodEmoji(), drink_emoji: getRandomDrinkEmoji() })}
        </div>
    )
}

export default Footer;