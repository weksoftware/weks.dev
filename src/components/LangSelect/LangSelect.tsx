import { useState } from 'react';
import { useTranslation } from "react-i18next";
import Select, { StylesConfig } from 'react-select';

import styles from './LangSelect.module.css';
import it_flag from './../../assets/images/it.svg';
import ru_flag from './../../assets/images/ru.svg';
import gb_flag from './../../assets/images/gb.svg';


function LangSelect() {
    const { i18n } = useTranslation('common');

    const [currentLang, setCurrentLang] = useState<string>(i18n.language);

    const images = {
        ru: ru_flag,
        en: gb_flag,
        it: it_flag,
    }

    const getImage = (lang: any) => {
        console.log(lang)
        if (lang.value === 'en') {
            return images['en'];
        }
        if (lang.value === 'ru') {
            return images['ru'];
        }
        if (lang.value === 'it') {
            return images['it'];
        }
        return images['en'];
    };

    const selectorStyles: StylesConfig = {
        control: (baseStyles, _state) => ({
            ...baseStyles,
            backgroundColor: '#232324',
            border: 0,
            boxShadow: "none",
        }),
        dropdownIndicator: (baseStyles, _state) => ({
            ...baseStyles,
            paddingLeft: 0,
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? '#161617' : state.isFocused ? '#202020' : '#232324',
            cursor: 'pointer',
        }),
        menu: (baseStyles, _state) => ({
            ...baseStyles,
            backgroundColor: '#232324',
        }),
    }

    const onLangChange = (e: any) => {
        setCurrentLang(e.value)
        i18n.changeLanguage(e.value)
    }
    
    return (
        <div className={styles.container}>
            <Select
                className={styles.select}
                options={[
                    { value: 'en' },
                    { value: 'ru' },
                    { value: 'it' },
                ]}
                defaultValue={{ value: currentLang }}
                formatOptionLabel={lang => (
                    <div className={styles.imgContainer}>
                        <img src={getImage(lang)} />
                    </div>
                )}
                components={{  IndicatorSeparator: () => null }}
                isSearchable={ false }
                styles={selectorStyles}
                value={{ value: currentLang }}
                onChange={onLangChange}
            />
        </div>
    );
}

export default LangSelect;