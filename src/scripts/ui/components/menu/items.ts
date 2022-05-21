import { TFunction } from 'react-i18next';
import { paths } from 'ui/paths';

interface MenuItem {
    readonly title: string;
    readonly path: string;
}
export const getMenuItems = (t: TFunction): MenuItem[] => [
    { title: t('home'), path: paths.HOME },
];
