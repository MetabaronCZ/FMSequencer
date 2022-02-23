import { TFunction } from 'react-i18next';
import { paths } from 'ui/paths';

interface MenuItem {
    readonly title: string;
    readonly path: string;
}
export const getMenuItems = (t: TFunction): MenuItem[] => [
    { title: t('sequence'), path: paths.SEQUENCES },
    { title: t('pattern'), path: paths.PATTERNS },
    { title: t('song'), path: paths.SONG },
    { title: t('instrument'), path: paths.INSTRUMENTS },
    { title: t('master'), path: paths.MASTER },
    { title: t('project'), path: paths.PROJECT },
];
