// 返回搜素信息
import { Item } from "Typings/service.d";
export const flatData: Item[] = [
  {
      id: 1,
      pid: 0,
      level: 1,
      name: '瓷砖',
      unit: ['片', 'm²']
  },
  {
      id: 2,
      pid: 0,
      level: 1,
      name: '卫浴',
      unit: ['个','套', 'm²'],
  },
  {
      id: 3,
      pid: 0,
      level: 1,
      name: '地板',
      unit: ['m²'],
  },
  {
      id: 4,
      pid: 1,
      level: 2,
      name: '马桶',
      unit: ['个','套'],
  },
  {
      id: 5,
      pid: 1,
      level: 2,
      name: '淋浴房',
      unit: ['套', 'm²'],
  },
  {
      id: 6,
      pid: 1,
      level: 2,
      name: '浴室柜',
      unit: ['个','套'],
  },
  {
      id: 7,
      pid: 1,
      level: 2,
      name: '花洒',
      unit: ['个','套'],
  },
  {
      id: 8,
      pid: 1,
      level: 2,
      name: '其它',
      unit: ['个','套'],
  }
];