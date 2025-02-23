import Categories from "@/components/categories/index";
// import LatestPost from "@/components/latest-post";
import SearchBar from "@/components/search";
import { getCategories } from "@/lib/queries";



export default async function Home() {

  const categories = await getCategories()
  // const { nodes, pageInfo } = await getAllPosts()

  // const latestPostProps = {nodes,pageInfo}

  return (
    <>
      <div className="flex flex-col p-1">
        <div className="w-full flex justify-center mb-3">
          <div className="w-5/6 h-60 bg-[url(/images/bg2.jpg)] bg-no-repeat bg-cover bg-center"></div>
        </div>

        <div className="my-6">
          <Categories categories={categories} />
        </div>

        <div className="w-auto p-2">
          <SearchBar />
        </div>

        {/* <div>
          <LatestPost latestPostProps={latestPostProps} />
        </div> */}
      </div>
    </>
  );
}
