$(document).ready(() => {
  let filters = {
    direction: 'exit',
    tac: 'tac-total',
    // booked: 'booked-total'
  };

  for(let i in filters) {
    $(`.filter-${i} #${filters[i]}`).addClass('active');
  }
  
  // Filters
  let filterDirection = $('.filter-direction .value');
  let filterTac = $('.filter-tac .value');
  // let filterBooked = $('.filter-booked .value');

  filterDirection.click(changeFilterDirection);
  filterTac.click(changeFilterTac);
  filterBooked.click(changefilterBooked);

  function changeFilterDirection(event) {
    filterDirection.removeClass('active');
    $(event.currentTarget).addClass('active');
    filters.direction = event.currentTarget.id;
    console.log(filters);
  }
  
  function changeFilterTac(event) {
    filterTac.removeClass('active');
    $(event.currentTarget).addClass('active');
    filters.tac = event.currentTarget.id;
    console.log(filters);
  }
  
  // function changefilterBooked(event) {
  //   filterBooked.removeClass('active');
  //   $(event.currentTarget).addClass('active');
  //   filters.booked = event.target.innerText;
  //   console.log(filters);
  // }
});