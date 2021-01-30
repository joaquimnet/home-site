import React from 'react';
import { HiTranslate } from 'react-icons/hi';

import { useTranslationToggle } from '../../hooks/useTranslationToggle';

export const TranslateButton = ({ scroll }) => {
  const { toggleLang } = useTranslationToggle();

  const toggle = () =>
    toggleLang().then(() => {
      if (scroll) window.scrollTo(0, 0);
    });

  return <HiTranslate size={32} style={{ cursor: 'pointer' }} onClick={toggle} />;
};
