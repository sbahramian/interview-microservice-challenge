import { MetaPaginationInterface } from '../interfaces';

export class PageSizePaginationUtil {
  static preparePaginationParams(page: number, size: number): number {
    return (page - 1) * size;
  }

  static prepareMetaPage(count: number, page: number, size: number): MetaPaginationInterface {
    const total = count;
    const per_page = Number(size);

    let current_page = Number(page);
    let count_page = 0;
    let next_page = null as number | null;
    let previous_page = null as number | null;
    let from = ((page - 1) * size + 1) as number | null;
    let to = (page * size) as number | null;

    if (to) {
      if (to > count) to = count;
      if (to < total) next_page = current_page + 1;
    }
    if (from) {
      if (from > 1) previous_page = current_page - 1;
      if (from > count || from === null) {
        from = null;
        to = null;
        next_page = null;
        previous_page = null;
      }
    }
    if (total > 0) {
      count_page = parseInt(`${total / per_page}`);
      if (count_page % per_page > 0) count_page++;
      if (count_page == 0 && total > 0) count_page = 1;
    } else {
      count_page = 0;
      current_page = 0;
    }

    const data: MetaPaginationInterface = {
      count_page: count_page,
      current_page: current_page,
      next_page: next_page,
      previous_page: previous_page,
      per_page: per_page,
      from: from,
      to: to,
      total: total,
    };

    return data;
  }
}
