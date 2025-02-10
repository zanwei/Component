// 移除未使用的 React 导入
// import React from 'react';  

import { FunctionComponent, SVGProps } from 'react';

// 统一使用 ?react 方式导入所有图标
import BackwardIcon from './backward.svg?react';
import BagIcon from './bag.svg?react';
import BaseballIcon from './baseball.svg?react';
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

// 定义 SVG 组件类型
export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

// 导出图标对象
export const icons = {
    backward: BackwardIcon,
    bag: BagIcon,
    baseball: BaseballIcon,
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
    movie: MovieIcon,
} as const;

export type IconName = keyof typeof icons; 