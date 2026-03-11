import type React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import SearchResult from "../../components/result/SearchResult";

const SearchResultPage: React.FC = () => {
  return (
    <HomeLayout>
      <main className="flex-grow flex flex-col">
        <SearchResult />
      </main>
    </HomeLayout>
  );
};
export default SearchResultPage;
