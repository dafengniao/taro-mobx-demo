import { Item } from 'src/typings/service';

// 格式化品牌、分类、单位
export const buildTree = (data: Item[], parentId = 0): Item[] => {
  const tree: Item[] = [];
  for (const item of data) {
    if (item.pid === parentId) {
      const children = buildTree(data, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      tree.push(item);
    }
  }
  return tree;
};

export const isUndefined = (obj: { [x: string]: any; }) => {
  for (let key in obj) {
    if (typeof obj[key] === 'undefined') {
      return true;
    }
  }
  return false;
};
