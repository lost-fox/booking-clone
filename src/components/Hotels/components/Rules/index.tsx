/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AppDispatch,
  AppState,
  getCategories,
  getCategoriesIds,
} from "../../../../store";
import { CategoryRules } from "./components/CategoryRules";

interface StateProps {
  locationId: string;
  checkInDate: string;
  checkOutDate: string;
  adultsNum: number;
  childNum: number;
  rooms: number;
  categories: any;
  categoriesIds: string[];
}
interface DispatchProps {
  getCategories: (request: any) => Promise<void>;
  getCategoriesIds: (categories: string[]) => Promise<void>;
}

export interface ICategory {
  count: number;
  id: string;
  name: string;
  selected: number;
  from: number;
  to: number;
}

export interface IFilters {
  id: string;
  categories: ICategory[];
  title: string;
}

type RulesComponentProps = StateProps & DispatchProps;

const filterIds = [
  "price_category",
  "facility",
  "free_cancellation",
  "class",
  "distance",
  "mealplan",
  "reviewscorebuckets",
  "room_facility",
  "twin_double_bed",
];

const getFiltersById = (filters: IFilters[], filterId: string) =>
  filters.filter(({ id }: IFilters) => id === filterId);

const RulesComponent: React.FC<RulesComponentProps> = (props) => {
  const {
    locationId,
    checkInDate,
    checkOutDate,
    adultsNum,
    childNum,
    rooms,
    categories,
    categoriesIds,
    getCategories,
    getCategoriesIds,
  } = props;
  const [openFilters, setOpenFilters] = useState(false);
  useEffect(() => {
    getCategories({
      locationId,
      checkInDate,
      checkOutDate,
      adultsNum,
      childNum,
      rooms,
    });
  }, []);
  return (
    <>
      {openFilters ? (
        filterIds.map((filter, index) => {
          const filtersData = getFiltersById(categories, filter);
          return filtersData ? (
            <CategoryRules
              filter={filtersData}
              categoriesIds={categoriesIds}
              getCategoriesIds={getCategoriesIds}
              key={index}
              catId={filter}
            />
          ) : (
            ""
          );
        })
      ) : getFiltersById(categories, "popular") ? (
        <CategoryRules
          filter={getFiltersById(categories, "popular")}
          categoriesIds={categoriesIds}
          getCategoriesIds={getCategoriesIds}
          catId="popular"
        />
      ) : (
        ""
      )}
      <Button
        onClick={() => {
          setOpenFilters(!openFilters);
        }}
      >
        {!openFilters ? "Больше фильтров" : "Скрыть фильтры"}
      </Button>
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  locationId: state.hotelsData.locationId,
  checkInDate: state.filtersData.checkInDate,
  checkOutDate: state.filtersData.checkOutDate,
  adultsNum: state.filtersData.adultsNum,
  childNum: state.filtersData.childNum,
  rooms: state.filtersData.rooms,
  categories: state.filtersData.categories,
  categoriesIds: state.filtersData.categoriesIds,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getCategories: (request) => dispatch(getCategories(request)),
  getCategoriesIds: (categories) => dispatch(getCategoriesIds(categories)),
});

export const Rules = connect(
  mapStateToProps,
  mapDispatchToProps
)(RulesComponent);
