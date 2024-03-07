export const handleHeaderClick = (header, sort, setSort) => {
    setSort(prevSort => ({
      keyToSort: header,
      direction:
        header === prevSort.keyToSort
          ? prevSort.direction === "asc"
            ? "desc"
            : "asc"
          : "desc",
    }));
  };

export const sortColumn = (stats, sort) => {
  if (sort.direction === "asc") {
    return stats.sort((a, b) => {
      const valueA = isNaN(a[sort.keyToSort])
        ? a[sort.keyToSort]
        : +a[sort.keyToSort];
      const valueB = isNaN(b[sort.keyToSort])
        ? b[sort.keyToSort]
        : +b[sort.keyToSort];
      if (valueA > valueB) return 1;
      if (valueA < valueB) return -1;
      return 0;
    });
  } else {
    return stats.sort((a, b) => {
      const valueA = isNaN(a[sort.keyToSort])
        ? a[sort.keyToSort]
        : +a[sort.keyToSort];
      const valueB = isNaN(b[sort.keyToSort])
        ? b[sort.keyToSort]
        : +b[sort.keyToSort];
      if (valueA < valueB) return 1;
      if (valueA > valueB) return -1;
      return 0;
    });
  }
};
