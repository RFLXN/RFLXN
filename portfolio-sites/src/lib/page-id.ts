const homePageIndex = 1;

const getPageId = (index: number) => `page-${index}`;
const formatPageIndex = (index: number) => index.toString().padStart(2, "0");
const homePageId = getPageId(homePageIndex);

export { formatPageIndex, getPageId, homePageId, homePageIndex };
