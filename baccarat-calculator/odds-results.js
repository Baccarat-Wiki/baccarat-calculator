const decks = (new URLSearchParams(window.location.search)).get('decks');
const noDecksErrorMessage = 'Something goes wrong...';

const numberFormat = new Intl.NumberFormat("en-US");

// Overview tab
const $overviewTableBody = document.getElementById('overview-table').getElementsByTagName("tbody")[0];
const $probPlayerHandSelect = document.getElementById('prob-player-hand');
const $probBankerHandSelect = document.getElementById('prob-banker-hand');
const $probValue = document.getElementById('prob-value');

// Numbers tab
const $numbersTableBody = document.getElementById('numbers-table').getElementsByTagName("tbody")[0];
const $numbersTotal = document.getElementById('numbers-total');

// Details tab
const $detailedPlayerHandSelect = document.getElementById('detailed-player-hand');
const $detailedBankerHandSelect = document.getElementById('detailed-banker-hand');
const $detailedNaturalField = document.getElementById('detailed-natural');
const $detailedCombinationsField = document.getElementById('detailed-combinations');
const $detailedProbabilityField = document.getElementById('detailed-probability');


const toPercents = (num) => parseFloat((num * 100).toFixed(4)) + '%';

// Overview tab
if (decks) {
    // Overview Table
    let overviewOutput = '';
    for (let row of data.overview[decks]) {
        overviewOutput += '<tr>';
        for (let i = 0, li = row.length; i < li; i++) {
            if (i == 1) continue; //skip combinations

            let item = row[i];
            // for this table we have only percents and strings
            let itemValue = isNaN(item) ? item : toPercents(item);
            overviewOutput += `<td>${itemValue}</td>`;
        }
        overviewOutput += '</tr>';
    }
    $overviewTableBody.innerHTML = overviewOutput;

    // Overview Hands Probabilities
    const probabilities = data.probabilities[decks];
    
    const outputHandsProbability = () => {
        $probValue.innerText = toPercents(
            probabilities[
                parseInt($probPlayerHandSelect.value, 10)
            ][
                parseInt($probBankerHandSelect.value, 10)
            ]
        );
    }
    
    $probPlayerHandSelect.addEventListener('change', outputHandsProbability);
    $probBankerHandSelect.addEventListener('change', outputHandsProbability);
    outputHandsProbability();

} else {
    $overviewTableBody.innerHTML = `<tr><td colspan="6">${noDecksErrorMessage}</td></tr>`;
    $probPlayerHandSelect.disabled = true;
    $probBankerHandSelect.disabled = true;
    $probValue.parentNode.classList.add('disabled');
    $probValue.parentNode.innerText = noDecksErrorMessage;
}

// Numbers tab
if (decks) {
    // Numbers Table
    let numbersOutput = '';
    for (let row of data.numbers[decks].combinations) {
        numbersOutput += '<tr>';
        for (let i = 0, li = row.length; i < li; i++) {
            let item = row[i];
            // for this table we have only percents and strings
            let itemValue;
            if (i == 3) { // combinations
                itemValue = numberFormat.format(item);
            } else if (i == 4) { // probability
                itemValue = toPercents(item);
            } else {
                itemValue = item;
            }
            numbersOutput += `<td>${itemValue}</td>`;
        }
        numbersOutput += '</tr>';
    }
    $numbersTableBody.innerHTML = numbersOutput;

    // Numbers Total Combinations
    $numbersTotal.innerText = numberFormat.format(data.numbers[decks].total);

} else {
    $numbersTableBody.innerHTML = `<tr><td colspan="5">${noDecksErrorMessage}</td></tr>`;
    $numbersTotal.innerText = noDecksErrorMessage;
}

// Details tab
if (decks) {
    let details = data.details[decks].combinations;

    const outputHandsResult = () => {
        const playerHand = parseInt($detailedPlayerHandSelect.value, 10);
        const bankerHand = parseInt($detailedBankerHandSelect.value, 10);
        const result = details.filter((row) => (
            row[0] == bankerHand &&
            row[1] == playerHand
        ))[0];

        $detailedNaturalField.innerText = result[2];
        $detailedCombinationsField.innerText = numberFormat.format(result[3]);
        $detailedProbabilityField.innerText = toPercents(result[4]);
    }

    $detailedPlayerHandSelect.addEventListener('change', outputHandsResult);
    $detailedBankerHandSelect.addEventListener('change', outputHandsResult);
    outputHandsResult();

} else {
    $detailedPlayerHandSelect.disabled = true;
    $detailedBankerHandSelect.disabled = true;
    $detailedProbabilityField.parentNode.classList.add('disabled');
    $detailedProbabilityField.parentNode.innerText = noDecksErrorMessage;
}