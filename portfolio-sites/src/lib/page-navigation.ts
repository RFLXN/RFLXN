import { formatPageIndex, getPageId, homePageId } from "@/lib/page-id";
import pageDefinitions from "@/pages/registry";

const pageIndicators = pageDefinitions.map(page => ({
  id: getPageId(page.index),
  index: formatPageIndex(page.index),
  label: page.label ?? page.title
}));
const homeJumpItems = pageIndicators.slice(1);

export { formatPageIndex, getPageId, homeJumpItems, homePageId, pageIndicators };
