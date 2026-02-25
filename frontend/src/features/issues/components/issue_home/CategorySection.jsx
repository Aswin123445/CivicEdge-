import CategoryCard from "./CategoryCard";
import useIssueHomePageService from "../../hooks/home_page_service";
import {civicIconMap} from '../../../../utils/civicIconMap';
import CategoryCardSkeleton from "../../ui/skeltons/CategoryCardSkeleton ";

export default function CategorySection() {
  const { categoryData, categoryFetching, categoryLoading } = useIssueHomePageService();
  
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">What would you like to report?</h2>
        <p className="text-slate-500 mt-2">Select a category to begin.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {categoryFetching || categoryLoading ? (
            <CategoryCardSkeleton/>
          ) : (
            categoryData?.map(({ id, name, icon}) => {
              const Icon = civicIconMap[icon];
              return (
                <CategoryCard key={id} icon={<Icon />} label={name} />
              )
            })
          )}
        </div>
      </div>
    </section>
  );
}
