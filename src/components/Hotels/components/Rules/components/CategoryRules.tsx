import { ICategory, IFilters } from "..";
import "./../style.css";

interface IFilter {
  catId: string;
  filter: IFilters[];
  categoriesIds: string[];
  getCategoriesIds: (categories: string[]) => Promise<void>;
}

export const CategoryRules = ({
  catId,
  filter,
  categoriesIds,
  getCategoriesIds,
}: IFilter) => {
  const { categories = [], title = "" } = filter[0] || "";
  return (
    <div className="category-rule">
      <span className="filter-title ">{title}</span>
      {categories.map(({ name, id, count, from, to }: ICategory) => (
        <div className="rule-checkbox" key={id}>
          <input
            type="checkbox"
            className="custom-checkbox"
            id={id}
            onChange={(e) => {
              const val = e.target.id;
              if (e.target.checked) getCategoriesIds([...categoriesIds, val]);
              if (!e.target.checked) {
                const arr = [...categoriesIds].filter((elem) => elem !== val);
                getCategoriesIds(arr);
              }
            }}
          />
          <label htmlFor={id} className="checkbox-text">
            {catId === "price_category"
              ? `${Math.ceil(from * 21.44)} руб. ${
                  to ? `- ${Math.ceil(to * 21.44)} руб.` : ""
                }`
              : name}
          </label>
          <span className="filter-count">{count ? count : ""}</span>
        </div>
      ))}
    </div>
  );
};
