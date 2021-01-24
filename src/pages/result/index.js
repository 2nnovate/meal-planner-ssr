import { useContext, useState } from 'react';
import { Select } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

import { mealPlanConfigContext } from '../../contexts/mealPlanConfigContext';

import Layout from '../layout';

import styles from './index.module.scss';

const { Option } = Select;

const mockTotalCalorie = 2222;
const mockOptions = {
  carbohydrateOptions: [{
    id: 1,
    label: '고구마 100g',
    type: 'carbohydrate',
    calorie: 500,
  }, {
    id: 2,
    label: '고구마 200g',
    type: 'carbohydrate',
    calorie: 1000,
  }],
  proteinOptions: [{
    id: 3,
    label: '닭가슴살 200g',
    type: 'protein',
    calorie: 600,
  }, {
    id: 4,
    label: '닭가슴살 400g',
    type: 'protein',
    calorie: 1200,
  }],
  fatOptions: [{
    id: 5,
    label: '달걀 노른자 1개',
    type: 'fat',
    calorie: 200,
  }],
};
const mockResult = [[
  mockOptions.carbohydrateOptions[0],
  mockOptions.proteinOptions[0],
  mockOptions.fatOptions[0],
], [
  mockOptions.carbohydrateOptions[0],
  mockOptions.proteinOptions[1],
  mockOptions.fatOptions[0],
], [
  mockOptions.carbohydrateOptions[1],
  mockOptions.proteinOptions[1],
  mockOptions.fatOptions[0],
]];

const getMealOrderByIndex = (index) => {
  switch (index) {
    case 0: return '첫 번째 식사';
    case 1: return '두 번째 식사';
    case 2: return '세 번째 식사';
    case 3: return '네 번째 식사';
    default: return '? 번째 식사';
  }
};

const getTypeInKorean = (type) => {
  switch(type) {
    case 'carbohydrate': return '탄수화물';
    case 'protein': return '단백질';
    case 'fat': return '지방';
    default: return '';
  }
};

const ResultPage = ({ options }) => {
  const [mealPlan, setMealPlan] = useState(mockResult);
  const totalCalorie = mockTotalCalorie;

  return (
    <Layout>
      <div>
        <div className={styles["result-page-header"]}>
          <h3 className={styles["result-page-header-sub-title"]}>
            하루 식단
          </h3>
          <h1>권장 칼로리</h1>
          <h2 className={styles["result-page-header-total-calorie"]}>
            총 {totalCalorie}Kcal
          </h2>
        </div>
        <div className={styles["result-page-content"]}>
          {mealPlan.map((mealInfo, index) => {
            const totalCaloriePerMeal = mealInfo.reduce((acc, cur) => {
              const { calorie: curCalorie } = cur;
              return acc + curCalorie;
            }, 0);

            return (
              <div
                className={styles["result-page-content-item"]}
                key={`meal-item-${index}`}
              >
                <h3 className={styles["result-page-content-item-title"]}>
                  {getMealOrderByIndex(index)} {totalCaloriePerMeal}Kcal
                </h3>
                {mealInfo.map(({ id, label, type }, mealInfoIndex) => {
                  const typeOption = options ? options[`${type}Options`] : [];

                  return (
                    <div
                      key={`meal-info-${id}`}
                      className={styles["result-page-content-item-detail"]}
                    >
                      <div>{getTypeInKorean(type)}</div>
                      <Select
                        value={id}
                        onChange={(selectedId) => {
                          const newMealPlan = [...mealPlan];
                          newMealPlan[index][mealInfoIndex] = typeOption.find(({ id }) => id === selectedId);
                          setMealPlan(newMealPlan);
                        }}
                      >
                        {typeOption.map(({ id: optionId, label }) => (
                          <Option value={optionId} key={optionId}>
                            {label}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className={styles["result-page-share-section"]}>
          <h4>결과 공유하기</h4>
          <div className={styles["result-page-share-section-list"]}>
            <LinkOutlined />
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default ResultPage;
