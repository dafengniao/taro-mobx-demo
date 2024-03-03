import { FC } from 'react';
import { AtFloatLayout, AtSearchBar, AtList, AtListItem } from 'taro-ui';
import { Button, View, Text } from '@tarojs/components';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import brand from 'Store/brand.store';
import { Item } from 'Typings/service';
import './index.scss';

const Index: FC = () => {
  const brandStore = useLocalObservable(() => brand);
  return (
    <Observer>
      {() => (
        <View className="container index">
          <Button
            className="enquiry-btn"
            onClick={brandStore.setIsPopShow.bind(null, true)}
          >
            <Text className="title">+ 发起询价</Text>
            <Text className="description">提交商品型号和照片,即可发起询价</Text>
          </Button>
          <AtFloatLayout
            isOpened={brandStore.isPopShow}
            title="发起询价"
            onClose={brandStore.setIsPopShow.bind(null, false)}
          >
            <AtSearchBar
              placeholder="输入要询价品牌的关键字"
              value={brandStore.brandValue}
              onChange={(e: string) => brandStore.getBrand(e)}
            />
            <View className="brand-list">
              <AtList>
                {brandStore.brandTree.map(({ id, name }: Item) => (
                  <AtListItem
                    key={id}
                    title={`${brandStore.brandValue}${name}`}
                    arrow="right"
                    onClick={brandStore.setBrandInfo.bind(null, id)}
                  />
                ))}
              </AtList>
            </View>
          </AtFloatLayout>
        </View>
      )}
    </Observer>
  );
};

export default Index;
