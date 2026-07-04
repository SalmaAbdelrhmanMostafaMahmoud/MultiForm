const backBtn = document.querySelector(".btn-back");
const nexttBtn = document.querySelector(".btn-next");
const stepSection = document.querySelectorAll(".step-section");
let sideBar = document.querySelectorAll(".flex_steps");
let currentpage = 0;
const planCard = document.querySelectorAll(".plan-card");
const toggleSwitch = document.getElementById("billingToggle");
const labelYearly = document.getElementById("label-yearly");
const labelMonthly = document.getElementById("label-monthly");
const addonsContainer = document.querySelector(".addons-container");
const addonCards = addonsContainer.querySelectorAll(".addon-card");
const checkBox = document.getElementById("addon-storage");
const summaryPlanInfo = document.querySelector(".selected-plan-info");
const summaryPlan = summaryPlanInfo.querySelector('#summaryPlanInfo');
let activeCard = document.querySelector(".plan-card.active") || planCard[0];
const summaryPlanPrice = document.getElementById("summary-plan-price");
const summaryAddonList = document.getElementById("summary-addons-list")
// buttons
nexttBtn.addEventListener("click", () => {
    if (!validation()) {
        return
    }
    if (currentpage < stepSection.length - 1) {
        stepSection[currentpage].classList.remove('active');
        if (sideBar[currentpage]) {
            sideBar[currentpage].classList.remove('active');
        }
        currentpage++;
        stepSection[currentpage].classList.add('active');
        if (sideBar[currentpage]) {
            sideBar[currentpage].classList.add('active');
        } else {
            sideBar[sideBar.length - 1].classList.add('active');
        }
    }
    updateStepIndicator()
    updateNxtBtn()
})
function updateNxtBtn() {
    console.log("currentpage :" ,currentpage);
    console.log("step 4 :",stepSection.length - 2)
    if (currentpage === stepSection.length - 2) {
        nexttBtn.textContent = "Confirm";
        nexttBtn.style.backgroundColor = "#6a60ef";
        nexttBtn.style.color = "#fff"
    } else {
        nexttBtn.textContent = "Next Step";
        nexttBtn.style.backgroundColor = "var(--fontcolor)";
        nexttBtn.style.color = "#fff"
    }
}
backBtn.addEventListener("click", () => {
    console.log("currentpage when back clicked:", currentpage)
    if (currentpage > 0) {
        stepSection[currentpage].classList.remove('active');
        if (sideBar[currentpage]) {
            sideBar[currentpage].classList.remove('active');
        }
        currentpage--;
         updateNxtBtn()
        stepSection[currentpage].classList.add('active');
        if (sideBar[currentpage]) {
            sideBar[currentpage].classList.add('active');
        }
    }
    updateStepIndicator()
})
function updateStepIndicator() {
    console.log("Checking page number:", currentpage);
    if (currentpage === 0) {
        backBtn.style.display = 'none';
        nexttBtn.style.display = 'block'
    } else if (currentpage === stepSection.length - 1) {
        nexttBtn.style.display = 'none';
        backBtn.style.display = 'none';
    } else {
        nexttBtn.style.display = 'block';
        backBtn.style.display = 'block';
    }
}
// validation 1st step
function validation() {
    const currentStep = stepSection[currentpage];
    const inputs = currentStep.querySelectorAll('input');
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    const numberRegex = /^[0-9]+$/;
    inputs.forEach(input => {
        const errorMessage = input.nextElementSibling;
        if (input.value.trim() === "") {
            isValid = false
            if (errorMessage && errorMessage.classList.contains("error-message")) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "This field is required";
                input.style.borderColor = "red"
                input.style.marginBottom = "0.5rem"
            }
        }
        else if (input.type === "email" && emailRegex.test(input.value.trim()) === false) {
            isValid = false;
            if (errorMessage && errorMessage.classList.contains("error-message")) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Please enter a valid email address";
                input.style.borderColor = "red"
                input.style.marginBottom = "0.5rem"
            }
        }
        else if (input.type === "text" && nameRegex.test(input.value.trim()) === false) {
            isValid = false;
            if (errorMessage && errorMessage.classList.contains("error-message")) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Please enter a valid name";
                input.style.borderColor = "red"
                input.style.marginBottom = "0.5rem"
            }
        }
        else if (input.type === "number" && numberRegex.test(input.value.trim()) === false) {
            isValid = false;
            if (errorMessage && errorMessage.classList.contains("error-message")) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Please enter a valid number";
                input.style.borderColor = "red"
                input.style.marginBottom = "0.5rem"
            }
        }
        else {
            if (errorMessage && errorMessage.classList.contains("error-message")) {
                errorMessage.style.display = "none";
                input.style.borderColor = "none"
            }
        }
    })
    return isValid
}
// 2nd step
function updatePlanPrice() {
    planCard.forEach(card => {
        const planPrice = card.querySelector(".plan-price");
        let yearlyBonus = card.querySelector(".yearly-bonus");
        if (!yearlyBonus || !planPrice) {
            return
        }
        if (toggleSwitch.checked) {
            console.log("selectedYear")
            planPrice.textContent = planPrice.getAttribute('data-yearly');
            yearlyBonus.style.display = "block";
            yearlyBonus.style.color = "var(--fontcolor)";
            labelYearly.style.color = "var(--fontcolor)";
            labelMonthly.style.color = "var(--paragraph)";
            yearlyBonus.style.fontWeight = "500";
            yearlyBonus.style.opacity = "1";
            yearlyBonus.style.visibility = "visible";
        } else {
            yearlyBonus.style.display = "none"
            planPrice.textContent = planPrice.getAttribute('data-monthly');
            labelYearly.style.color = "var(--paragraph)";
            labelMonthly.style.color = "var(--fontcolor)";
            yearlyBonus.style.opacity = "0";
            yearlyBonus.style.visibility = "hidden";
        }
    })

}
updatePlanPrice();
updateSummary();
calculation()
toggleSwitch.addEventListener("change", () => {
    updatePlanPrice();
    updateSummary();
})
planCard.forEach(card => {
    card.addEventListener('click', () => {
        planCard.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        activeCard = card
        updateSummary();
        calculation()
    });
});
// 3rd step
function updateAddonPrice() {
    addonCards.forEach(card => {
        const addonPrice = card.querySelector(".addon-price");
        if (!addonPrice) {
            return
        }
        if (toggleSwitch.checked) {
            addonPrice.textContent = addonPrice.getAttribute('data-yearly')
        } else {
            addonPrice.textContent = addonPrice.getAttribute('data-monthly')
        }

    })
    calculation()
}
updateAddonPrice()
toggleSwitch.addEventListener("change", updateAddonPrice)
//  4th step
function updateSummary() {
    if (!activeCard) {
        return
    }
    const planName = activeCard.querySelector('h3').textContent;
    const planPrice = activeCard.querySelector(".plan-price").textContent;
    if (toggleSwitch.checked) {
        summaryPlan.textContent = `${planName} (Yearly)`;
        summaryPlanPrice.textContent = `${planPrice}`
    } else {
        summaryPlan.textContent = `${planName} (Monthly)`;
        summaryPlanPrice.textContent = `${planPrice}`
    }
    summaryAddonList.innerHTML = "";
    addonCards.forEach(card => {
        const addonTitle = card.querySelector('h3').textContent;
        const addonPrice = card.querySelector(".addon-price").textContent;
        const checkBox = card.querySelector("input[type=checkbox]")
        if (checkBox.checked) {
            card.classList.add('active')
            summaryAddonList.innerHTML += `<div class="summary-addon-row">
            <div class="addon-name">${addonTitle}</div>
            <div class="addon-price">${addonPrice}</div>
        </div>`
        } else {
            card.classList.remove('active')
        }
    })

}
updateSummary()
calculation()
toggleSwitch.addEventListener("change", () => {
    updateSummary()
    calculation()
})
addonCards.forEach(card => {
    const checkBox = card.querySelector("input[type=checkbox]");
    if (checkBox) {
        checkBox.addEventListener("change", () => {
            updateSummary()
            calculation()
        })
    }
})

const changeBtn = document.getElementById('change-plan-btn');
changeBtn.addEventListener("click", () => {
    const summaryPage = document.getElementById("step-4")
    if (summaryPage) summaryPage.classList.remove('active');
    if (sideBar && sideBar[3]) {
        sideBar[3].classList.remove('active')
    }
    const planCardPage = document.getElementById("step-2")
    if (planCardPage) planCardPage.classList.add('active')
    if (sideBar && sideBar[1]) sideBar[1].classList.add('active')
    if (typeof currentpage !== 'undefined') {
        currentpage = 1
    }
    updateSummary()
    calculation()
    updateNxtBtn()

})
function calculation() {
    let total = 0;
    const planPrice = activeCard.querySelector(".plan-price");
    let currentplanPriceText = toggleSwitch.checked ? planPrice.getAttribute('data-yearly') : planPrice.getAttribute('data-monthly');
    total = parseInt(currentplanPriceText.replace(/[^0-9]/g, '')) || 0;
    addonCards.forEach(card => {
        const checkBox = card.querySelector('input[type=checkbox]')
        const addonPrice = card.querySelector('.addon-price');
        let currentPriceText = toggleSwitch.checked ? addonPrice.getAttribute('data-yearly') : addonPrice.getAttribute('data-monthly');
        let priceNumber = currentPriceText;
        console.log(`Card Addon: ${priceNumber} | Is Checked?: ${checkBox.checked}`);
        if (checkBox.checked) {
            let addonPriceClean = parseInt(priceNumber.replace(/[^0-9]/g, '')) || 0;
            total += addonPriceClean;
            console.log("Added to total! New Total is:", total);
        }
    })
    const isYearly = toggleSwitch.checked;
    const durationLabel = isYearly ? "(per year)" : "(per month)";
    const priceFormat = isYearly ? `$${total}/yr` : `$${total}/mo`;
    document.getElementById('total-final-price').innerHTML = `<span id="total-label">Total ${durationLabel} </span>
    <span class="total-price">${priceFormat}</span>`
}



