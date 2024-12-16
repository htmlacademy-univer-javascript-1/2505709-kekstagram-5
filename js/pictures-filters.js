const filtersBox = document.querySelector('.img-filters');
const filterForm = filtersBox.querySelector('form');
const defaultFilterBtn = filterForm.querySelector('#filter-default');
const randomFilterBtn = filterForm.querySelector('#filter-random');
const discussedFilterBtn = filterForm.querySelector('#filter-discussed');


const makeFilterActive = (activeFilter) =>{
  if (activeFilter.classList.contains('img-filters__button--active')){
    return;
  }
  Array.from(filterForm.children).forEach((filter) => {
    if (filter.classList.contains('img-filters__button--active') && filter !== activeFilter){
      filter.classList.remove('img-filters__button--active');
      activeFilter.classList.add('img-filters__button--active');
    }
  });
};

const setDefaultFilterClick = (cb) =>{
  defaultFilterBtn.addEventListener('click', () => {
    makeFilterActive(defaultFilterBtn);
    cb();
  });
};

const setRandomFilterClick = (cb) => {
  randomFilterBtn.addEventListener('click', () => {
    makeFilterActive(randomFilterBtn);
    cb();
  });
};

const setDiscussedFilterClick = (cb) => {
  discussedFilterBtn.addEventListener('click', () => {
    makeFilterActive(discussedFilterBtn);
    cb();
  });
};

const showFilters = () => {
  filtersBox.classList.remove('img-filters--inactive');

};
export {showFilters, setDefaultFilterClick, setRandomFilterClick, setDiscussedFilterClick};
