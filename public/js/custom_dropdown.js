var selectedAll = document.querySelectorAll(".wrapper-dropdown");

selectedAll.forEach((selected) => {
    console.log("something else");
  var optionsContainer = selected.children[2];
  debugger;
  var optionsList = selected.querySelectorAll("div.wrapper-dropdown li");

  selected.addEventListener("click", () => {
    var arrow = selected.children[1];

    if (selected.classList.contains("active")) {
      handleDropdown(selected, arrow, false);
    } else {
      var currentActive = document.querySelector(".wrapper-dropdown.active");

      if (currentActive) {
        var anotherArrow = currentActive.children[1];
        handleDropdown(currentActive, anotherArrow, false);
      }

      handleDropdown(selected, arrow, true);
    }
  });

  // update the display of the dropdown
  for (var o of optionsList) {
    o.addEventListener("click", () => {
      selected.querySelector(".selected-display").innerHTML = o.innerHTML;
    });
  }
});

// check if anything else ofther than the dropdown is clicked
window.addEventListener("click", function (e) {
    console.log("other click");
  if (e.target.closest(".wrapper-dropdown") === null) {
    closeAllDropdowns();
  }
});

// close all the dropdowns
function closeAllDropdowns() {
  var selectedAll = document.querySelectorAll(".wrapper-dropdown");
  selectedAll.forEach((selected) => {
    var optionsContainer = selected.children[2];
    var arrow = selected.children[1];

    handleDropdown(selected, arrow, false);
  });
}

// open all the dropdowns
function handleDropdown(dropdown, arrow, open) {
    debugger;
    console.log("clicked");
  if (open) {
    arrow.classList.add("rotated");
    dropdown.classList.add("active");
  } else {
    arrow.classList.remove("rotated");
    dropdown.classList.remove("active");
  }
}
