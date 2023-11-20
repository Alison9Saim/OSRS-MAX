//gets the button by ID from your HTML element
const themeBtn = document.getElementById("theme-btn");
//when you click that button
themeBtn.onclick = () => {
//the default class "fa-moon" switches to "fa-sun" on toggle
  themeBtn.classList.toggle("fa-sun");
//after the switch on toggle, if your button contains "fa-sun" class
  if (themeBtn.classList.contains("fa-sun")) {
//onclicking themeBtn, the changeTheme styling will be applied to the body of your HTML
    document.body.classList.add("changeTheme");
  } else {
// onclicking themeBtn, applied changeTheme styling will be removed
    document.body.classList.remove("changeTheme");
  }
}

console.log("This is the other JS fiel");