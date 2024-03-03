import { FC, useEffect } from 'react';
import {
  Button,
  Label,
  Picker,
  Radio,
  RadioGroup,
  View,
} from '@tarojs/components';
import { AtFloatLayout } from 'taro-ui';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { Item } from 'Typings/service';
import enquiry from './store';
import './index.scss';

const enquiryCreate: FC = () => {
  const enquiryCreateStore = useLocalObservable(() => enquiry);
  useEffect(() => {
    enquiryCreateStore.initStore();
  }, []);

  return (
    <Observer>
      {() => (
        <View className="enquiry-container">
          <View className="enquiry-form">
            {enquiryCreateStore.currentBrand?.children && (
              <View className="form-item">
                <Label className="form-item__label">子品类</Label>
                <View
                  className="form-item__select"
                  onClick={enquiryCreateStore.setIsPopShow.bind(null, true)}
                >
                  {enquiryCreateStore.categoryName}
                </View>
              </View>
            )}
            <View className="form-item">
              <Label className="form-item__label">计价单位</Label>
              <RadioGroup
                className="form-item__radio"
                onChange={(e) =>
                  enquiryCreateStore.onChangeUnit(e.detail.value)
                }
              >
                {enquiryCreateStore.unitList.map((item: string) => {
                  return (
                    <Label className="radio-list__label" for={item} key={item}>
                      <Radio className="radio-list__radio" value={item} checked={item === enquiryCreateStore.enquiryParams.quotationUnit}>
                        {item}
                      </Radio>
                    </Label>
                  );
                })}
              </RadioGroup>
            </View>
            <View className="form-item">
              <Label className="form-item__label">计划购买时间</Label>
              <View className="form-item__select">
                <Picker value={enquiryCreateStore.enquiryParams.purchasePlanTime || ''} mode="date" onChange={(e) => enquiryCreateStore.onChangeDate(e.detail.value)}>
                  <View className="picker">{enquiryCreateStore.enquiryParams.purchasePlanTime || '请设置商品的计划购买时间'}</View>
                </Picker>
              </View>
            </View>
          </View>
          <View className="enquiry-footer">
            <Button className="enquiry-footer__btn" onClick={enquiryCreateStore.onSubmit}>发布询价</Button>
          </View>
          <AtFloatLayout
            isOpened={enquiryCreateStore.isPopShow}
            title=""
            onClose={enquiryCreateStore.setIsPopShow.bind(null, false)}
          >
            <View className="category-list">
              {enquiryCreateStore.currentBrand?.children?.map((item: Item) => (
                <Button
                  className="category-list__btn"
                  key={item.id}
                  onClick={enquiryCreateStore.setCategory.bind(null, item)}
                >
                  {item.name}
                </Button>
              ))}
            </View>
          </AtFloatLayout>
        </View>
      )}
    </Observer>
  );
};

export default enquiryCreate;
