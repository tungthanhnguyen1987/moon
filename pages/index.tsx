import { IProduct } from "boundless-api-client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ProductsList from "../components/ProductsList";
import MainLayout from "../layouts/Main";
import { apiClient } from "../lib/api";
import { makeAllMenus } from "../lib/menu";
import { IMenuItem } from "../@types/components";
import bgImg from "../assets/cover-bg.jpeg";
import bgPortraitImg from "../assets/cover-bg-portrait.jpg";
import CoverTextInCenter from "../components/CoverTextInCenter";
import ProductsSliderByQuery from "../components/ProductsSliderByQuery";

export default function IndexPage({
	products,
	mainMenu,
	footerMenu,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<MainLayout
			mainMenu={mainMenu}
			footerMenu={footerMenu}
			classes={{ layoutMain: "pt-0" }}
		>
			<CoverTextInCenter
				showChevronDown
				img={bgImg.src}
				imgPortrait={bgPortraitImg.src}
				content={{
					intro: "Thịt lợn giao ngay",
					head: "Dinh dưỡng từ thịt!",
					subHead: "Thịt lợn giúp phát triển thể chất, tăng sức bền cho cơ bắp",
				}}
				shadow={{
					opacity: 0.5,
					backgroundColor: "#000",
				}}
				link={"https://google.com"}
			/>
			<div className="container">
				<h1 className="page-heading page-heading_h1  page-heading_m-h1">
					Heo Fast
				</h1>
				<ProductsList products={products} query={{}} />
				<h2 className="page-heading page-heading_h1  page-heading_m-h1">
					Danh mục sản phẩm
				</h2>
				<ProductsSliderByQuery
					query={{ collection: ["main-page"], sort: "in_collection" }}
					wrapperClassName="page-block"
				/>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<
	IIndexPageProps
> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({
		menu: "category",
	});
	const { products } = await apiClient.catalog.getProducts({
		collection: ["main-page"],
		sort: "in_collection",
	});

	const menus = makeAllMenus({ categoryTree });

	return {
		props: {
			products,
			...menus,
		},
	};
};

interface IIndexPageProps {
	products: IProduct[];
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}
