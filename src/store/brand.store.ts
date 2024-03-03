import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { buildTree } from 'Utils';
import { Item } from 'Typings/service.d';
import { flatData } from './config';

class brandStore {
  public isPopShow: boolean = false;
  public brandValue: string = '';
  public brandTree: Item[] | [] = [];
  public currentBrand: Item | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setIsPopShow = (visible: boolean) => {
    this.isPopShow = visible;
  };

  // 搜素获取品牌
  getBrand = (value: string) => {
    this.brandValue = value;
    this.brandTree = value.length ? buildTree(flatData) : [];
  };

  // 设置选中品牌
  setBrandInfo = (id: number) => {
    Taro.navigateTo({
      url: '/pages/enquiryCreate/index',
    });
    this.currentBrand = this.brandTree.find((item: Item) => item.id === id) || null;
    setTimeout(() => {
      runInAction(() => {
        this.brandTree = [];
        this.brandValue = '';
        this.isPopShow = false;
      });
    }, 200);
  };
}

export default new brandStore();
