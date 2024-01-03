const form = document.querySelector('#myForm');
const cityInput = document.querySelector("#cityInput");
const cityOptionsList = document.querySelector("#cityOptionsList");
const cityOptions = document.getElementsByClassName("option-city");
const langOptions = document.getElementsByClassName("option-lang");
const languageInput = document.querySelector("#languageInput");
const languageList = document.querySelector("#languageList");
const startDateInput = document.querySelector("#startDate");
const endDateInput = document.querySelector("#endDate");
const resultInput = document.querySelector("#result");
////////////////////////////////
// handel filter citys selection  
////////////////////////////////
//  1 -helper fun to filter opstions
const filterList = (input, options) => {
    const filterValue = input.value.toLowerCase();
    // Loop through all options and show/hide based on filter
    for (let i = 0; i < options.length; i++) {
        console.log(options[i]);
        const option = options[i];
        const optionValue = option.getAttribute("data-value").toLowerCase();

        if (optionValue.includes(filterValue)) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    }
};
// 2- helper fun to select opstion
const selectOpstion = (target, input, list) => {
    if (target.classList.contains("option")) {
        const selectedValue = target.getAttribute("data-value");
        input.value = target.innerText;
    }
    list.style.display = "none";
}
// 3 - Add event listener to the filter input field
// filter citys
cityInput.addEventListener("input", () => { filterList(cityInput, cityOptions) });
// filter languages
languageInput.addEventListener("input", () => {
    filterList(languageInput, langOptions)
});
// 4- Add event listener to select an option
// when select city
cityOptionsList.addEventListener("click", (event) => {

    const target = event.target;
    selectOpstion(target, cityInput, cityOptionsList)
});
// when select language
languageList.addEventListener("click", (event) => {
    const target = event.target;
    selectOpstion(target, languageInput, languageList)
});

// Close the dropdown when clicking outside
document.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.closest(".dropdown")) {
        cityOptionsList.style.display = "none";
        languageList.style.display = "none";
    }
});

// Show/hide options when clicking on the input field
cityInput.addEventListener("click", () => {
    cityOptionsList.style.display = "block";
});
languageInput.addEventListener("click", () => {
    console.log("SSS");
    languageList.style.display = "block";
});
////////////////////////////////////
// calc for start date and end date
////////////////////////////////////
// update night when change checkIn and CheckOut
const updateResult = () => {
    let startDate = new Date(startDateInput.value);
    let endDate = new Date(endDateInput.value);
    // console.log(startDate);
    // console.log(endDate);
    if (startDate && endDate && startDate <= endDate) {
        let timeDifference = endDate.getTime() - startDate.getTime();
        let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        resultInput.value = daysDifference;
    } else {
        resultInput.value = "";
    }
}
// change CheckOut when change nights
const updateEndDate = () => {
    let startDate = new Date(startDateInput.value);
    let result = parseInt(resultInput.value, 10);

    if (startDate && !isNaN(result) && result > 0) {
        let endDate = new Date(startDate.getTime() + result * 24 * 60 * 60 * 1000);
        let endDateString = endDate.toISOString().split("T")[0];
        endDateInput.value = endDateString;
    } else {
        endDateInput.value = "";
    }
}
startDateInput.addEventListener("change", updateResult);
endDateInput.addEventListener("change", updateResult);
resultInput.addEventListener("change", updateEndDate);
// ////////////////////
// dialog 
// ////////////////////
const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const popup = document.getElementById("popup");

openPopupBtn.addEventListener("click", () => {
    popup.classList.add("open");
});

closePopupBtn.addEventListener("click", () => {
    popup.classList.remove("open");
});