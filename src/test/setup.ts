import '@testing-library/jest-dom/vitest';
// Mesmo motivo do main.tsx: componentes com useTranslation esperam o i18next
// já configurado — aqui isso vale para toda a suíte.
import '@/i18n/config';
