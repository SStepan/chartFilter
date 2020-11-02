$(document).ready(() => {
  // Filters result
  let result = {
    direction: 'exit',
    tac: 'tac-total',
    booked: 'booked-split',
    firm: true,
    splitValue: {
      'booked-fzk': true,
      'booked-bfzk': true,
      'booked-dzk': true
    },
    interruptible: true,
    "reduced-tac": true,
    cmp: true,
    "physical-flow": true,
    nomination: true
  }

  // Default values
  let filters = {
    direction: 'exit',
    tac: 'tac-total',
    booked: 'booked-split'
  };

  // Filters
  let filterDirection = $('.filter-direction .value');
  let filterTac = $('.filter-tac .value');
  let filterBooked = $('.filter-booked .value');

  let firmCheckbox = $('#firm');
  let fzkCheckbox = $('#booked-fzk');
  let bfzkCheckbox = $('#booked-bfzk');
  let dzkCheckbox = $('#booked-dzk');

  let interruptibleCheckbox = $('#interruptible');
  let reducedTacCheckbox = $('#reduced-tac');
  let cmpCheckbox = $('#cmp');
  let physicalFlowCheckbox = $('#physical-flow');
  let nominationCheckbox = $('#nomination');

  // Set default values

  for (let i in filters) {
    $(`.filter-${i} #${filters[i]}`).addClass('active');
  }

  // Click func
  filterDirection.click(changeFilterDirection);
  filterTac.click(changeFilterTac);
  filterBooked.click(changefilterBooked);
  
  firmCheckbox.click(toggleFirmCheckbox);
  fzkCheckbox.click(toggleSplitCheckbox);
  bfzkCheckbox.click(toggleSplitCheckbox);
  dzkCheckbox.click(toggleSplitCheckbox);

  interruptibleCheckbox.click(toggleCheckbox);
  reducedTacCheckbox.click(toggleCheckbox);
  cmpCheckbox.click(toggleCheckbox);
  physicalFlowCheckbox.click(toggleCheckbox);
  nominationCheckbox.click(toggleCheckbox);

  function changeFilterDirection(event) {
    filterDirection.removeClass('active');
    $(event.currentTarget).addClass('active');
    result.direction = event.currentTarget.id;
    console.log(result);
  }
  
  function changeFilterTac(event) {
    let tacId = event.currentTarget.id;
    let checkboxes = $('.filter-booked  .filter-values > .value input');

    filterTac.removeClass('active');
    $(event.currentTarget).addClass('active');
    result.tac = tacId;
    if (tacId !== 'tac-total') {
      checkboxes.each((index, checkbox) => {
        if (checkbox.id != tacId.replace('firm', 'booked')) {
          $(checkbox).attr('disabled', 'disabled');
          $(checkbox).prop('checked', false);
          result.splitValue[checkbox.id.replace('firm', 'booked')] = false;
        } else {
          $(checkbox).prop('checked', true);
          $(checkbox).removeAttr('disabled');
          result.splitValue[checkbox.id.replace('firm', 'booked')] = true;
        }
      });
    } else {
      checkboxes.removeAttr('disabled');
      checkboxes.prop("checked", true);
      result.splitValue = {
        ['booked-fzk']: true,
        ['booked-bfzk']: true,
        ['booked-dzk']: true
      };
    }
    console.log(result);
  }
  
  function changefilterBooked(event) {
    if (result.firm) {
      filterBooked.removeClass('active');
      $(event.currentTarget).addClass('active');
      result.booked = event.currentTarget.id;
      console.log(result);
    }
  }

  function toggleFirmCheckbox(event) {
    $('.filter-booked').toggleClass('disabled');
    let checkboxes = $('.filter-booked  .filter-values > .value input');
    result.firm = event.currentTarget.checked;
    if (!result.firm) {
      checkboxes.prop("checked", false);
      result.splitValue = {
          ['booked-fzk']: false,
          ['booked-bfzk']: false,
          ['booked-dzk']: false
      };
      checkboxes.attr('disabled', 'disabled');
    } else {
      if (result.tac === 'tac-total' && result.firm) {
        checkboxes.removeAttr('disabled');
        checkboxes.prop("checked", true);
        result.splitValue = {
            ['booked-fzk']: true,
            ['booked-bfzk']: true,
            ['booked-dzk']: true
        };
      } else {
        checkboxes.each((index, el) => {
          if (el.id === result.tac.replace('firm', 'booked')) {
            $(el).removeAttr('disabled');
            $(el).prop("checked", true);
            result.splitValue[result.tac.replace('firm', 'booked')] = true;
          }
        });
      }
    }
    console.log(result)
  }

  function toggleSplitCheckbox(event) {
    event.stopPropagation();
    result.splitValue[event.currentTarget.id] = event.currentTarget.checked;
    console.log(result);
  }

  function toggleCheckbox(event) {
    result[event.currentTarget.id] = event.currentTarget.checked;
    console.log(result);
  }
});