import { AxiosResponse } from "axios";
import { onMounted, ref } from "vue";

type Fetcher = (page: number) => Promise<AxiosResponse<Resources<Tag>>>;
export const useTags = (fetcher: Fetcher) => {
  const page = ref(0);
  const hasMore = ref(false);
  const tags = ref<Tag[]>([]);
  const fetchTags = async () => {
    const resp = await fetcher(page.value);
    const { pager, resources } = resp.data;
    tags.value.push(...resources);
    page.value += 1;
    hasMore.value =
      (pager.page - 1) * pager.per_page + resources.length < pager.count;
  };
  onMounted(fetchTags);
  return {
    page,
    hasMore,
    tags,
    fetchTags,
  };
};
