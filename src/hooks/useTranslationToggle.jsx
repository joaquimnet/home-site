import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Actions } from '../state/Actions';
import { ReactComponent as pt } from '../assets/pt.svg';
import { ReactComponent as en } from '../assets/en.svg';

export const useTranslationToggle = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const currentLang = i18n.language;
  const otherLang = currentLang === 'en' ? 'pt' : 'en';
  const CurrentFlag = en;
  const OtherFlag = currentLang === 'en' ? pt : en;

  const toggleLang = () => {
    let lang = 'en';
    if (i18n.language === 'en') lang = 'pt';
    dispatch({ type: Actions.CHANGE_LANGUAGE, payload: lang });
    return i18n.changeLanguage(lang);
  };

  return { toggleLang, currentLang, otherLang, CurrentFlag: CurrentFlag, OtherFlag };
};
