import Taro from '@tarojs/taro';
import { makeAutoObservable, toJS } from 'mobx';
import store from 'Store/brand.store';
import { Item } from 'Typings/service';
import { isUndefined } from 'Utils';

interface ParamsType {
  brand: number | undefined;
  category: number | undefined;
  quotationUnit: string | undefined;
  purchasePlanTime: string | undefined;
}

class enquiryCreateStore {
  enquiryParams: ParamsType = {
    brand: store.currentBrand?.id,
    category: undefined,
    quotationUnit: undefined,
    purchasePlanTime: undefined,
  };
  isPopShow: boolean = false;
  unitList: string[] = store.currentBrand?.unit || [];

  // 获取选中品牌
  get currentBrand() {
    return store.currentBrand;
  }

  // 获取分类名称
  get categoryName() {
    return (
      store.currentBrand?.children?.find(
        (item: Item) => item.id === this.enquiryParams.category
      )?.name || '请选择'
    );
  }

  constructor() {
    makeAutoObservable(this);
  }

  setIsPopShow = (visible: boolean) => {
    this.isPopShow = visible;
  };

  // 设置分类
  setCategory = (item: Item) => {
    this.unitList = item.unit;
    this.enquiryParams.category = item.id;
    this.enquiryParams.quotationUnit = undefined;
    this.isPopShow = false;
  };

  // 切换单位
  onChangeUnit = (value: string) => {
    this.enquiryParams.quotationUnit = value;
  };

  // 切换日期
  onChangeDate = (value: string) => {
    this.enquiryParams.purchasePlanTime = value;
  };

  // 提交
  onSubmit = () => {
    const enquiryParams = this.enquiryParams;
    if (!store.currentBrand?.children?.length) {
      delete enquiryParams.category;
    }
    if (isUndefined(enquiryParams)) {
      Taro.showToast({
        title: '您有必填项未填写',
        icon: 'none',
      });
    } else {
      console.log(toJS(enquiryParams));
    }
  };

  // 初始化数据
  initStore = () => {
    this.enquiryParams = {
      brand: store.currentBrand?.id,
      category: undefined,
      quotationUnit: undefined,
      purchasePlanTime: undefined,
    };
    this.unitList = store.currentBrand?.unit || [];
  };
}

export default new enquiryCreateStore();
