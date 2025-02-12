// 移除未使用的 React 导入
// import React from 'react';  

import { FunctionComponent, SVGProps } from 'react';

// 使用 ?react 后缀导入所有图标
import BackwardIcon from './backward.svg?react';
import BagIcon from './bag.svg?react';
import BasketballIcon from './basketball.svg?react';
import BitcoinIcon from './bitcoin.svg?react';
import BookIcon from './book.svg?react';
import CalendarIcon from './calendar.svg?react';
import CameraIcon from './camera.svg?react';
import CardIcon from './card.svg?react';
import Cart2Icon from './cart-2.svg?react';
import CartIcon from './cart.svg?react';
import CategoryIcon from './category.svg?react';
import ChartIcon from './chart.svg?react';
import ChatIcon from './chat.svg?react';
import ChemicalIcon from './chemical.svg?react';
import CircleIcon from './circle.svg?react';
import Cloudy2Icon from './cloudy-2.svg?react';
import CloudyIcon from './cloudy.svg?react';
import CodeIcon from './code.svg?react';
import CoinIcon from './coin.svg?react';
import CollectIcon from './collect.svg?react';
import ColorIcon from './color.svg?react';
import Computer2Icon from './computer-2.svg?react';
import MovieIcon from './movie.svg?react';
import SearchIcon from './search.svg?react';
import ComputerIcon from './computer.svg?react';

// 修改这些图标的导入
import DataIcon from './data.svg?react';
import Data2Icon from './data-2.svg?react';
import DirectionIcon from './direction.svg?react';
import DirectionSignIcon from './direction sign.svg?react';
import DirectionSign2Icon from './direction sign-2.svg?react';
import DirectionSign3Icon from './direction sign-3.svg?react';
import DirectionSign4Icon from './direction sign-4.svg?react';
import EyeIcon from './eye.svg?react';
import DrinkIcon from './drink.svg?react';
import Drink2Icon from './drink-2.svg?react';
import FlowerIcon from './flower.svg?react';
import FolderIcon from './folder.svg?react';
import Folder2Icon from './folder-2.svg?react';
import Folder3Icon from './folder-3.svg?react';
import HeartIcon from './heart.svg?react';
import LiftIcon from './lift.svg?react';
import LightIcon from './light.svg?react';
import MailIcon from './mail.svg?react';
import MailboxIcon from './mailbox.svg?react';
import MapIcon from './map.svg?react';
import MathIcon from './math.svg?react';
import MicIcon from './mic.svg?react';
import LockIcon from './lock.svg?react';
import LongSleeveIcon from './long sleeve.svg?react';
import HamburgerIcon from './hamburger.svg?react';
import HappyIcon from './happy.svg?react';
import HideIcon from './hide.svg?react';
import HomeIcon from './home.svg?react';
import HighHeelIcon from './high heel.svg?react';

// 定义 SVG 组件类型
export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

// 导出图标对象
export const icons = {
    backward: BackwardIcon,
    bag: BagIcon,
    basketball: BasketballIcon,
    bitcoin: BitcoinIcon,
    book: BookIcon,
    calendar: CalendarIcon,
    camera: CameraIcon,
    card: CardIcon,
    cart2: Cart2Icon,
    cart: CartIcon,
    category: CategoryIcon,
    chart: ChartIcon,
    chat: ChatIcon,
    chemical: ChemicalIcon,
    circle: CircleIcon,
    cloudy2: Cloudy2Icon,
    cloudy: CloudyIcon,
    code: CodeIcon,
    coin: CoinIcon,
    collect: CollectIcon,
    color: ColorIcon,
    computer2: Computer2Icon,
    computer: ComputerIcon,
    movie: MovieIcon,
    data: DataIcon,
    data2: Data2Icon,
    direction: DirectionIcon,
    directionSign: DirectionSignIcon,
    directionSign2: DirectionSign2Icon,
    directionSign3: DirectionSign3Icon,
    directionSign4: DirectionSign4Icon,
    eye: EyeIcon,
    drink: DrinkIcon,
    drink2: Drink2Icon,
    flower: FlowerIcon,
    folder: FolderIcon,
    folder2: Folder2Icon,
    folder3: Folder3Icon,
    heart: HeartIcon,
    lift: LiftIcon,
    light: LightIcon,
    mail: MailIcon,
    mailbox: MailboxIcon,
    map: MapIcon,
    math: MathIcon,
    mic: MicIcon,
    lock: LockIcon,
    longSleeve: LongSleeveIcon,
    hamburger: HamburgerIcon,
    happy: HappyIcon,
    hide: HideIcon,
    home: HomeIcon,
    highHeel: HighHeelIcon,
} as const;

export type IconName = keyof typeof icons;
export { SearchIcon };  // 单独导出 SearchIcon 