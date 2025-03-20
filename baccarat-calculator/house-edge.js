//https://www.beatingbonuses.com/baccarat_calc.htm

const heForm = document.getElementById('he-form');
const heCommissionInput = document.getElementById('he-commission');
const heResult = document.getElementById('he-result');
const heResultTableBody = document.getElementById('he-result-table').querySelector('tbody');

const toPercents = (num) => parseFloat((num * 100).toFixed(2)) + '%';
const normalizeScore = (score) => score >= 10 ? score - 10 : score;
const heTableRow = (bet, he, winProb) => `<tr><td>${bet}</td><td>${he}</td><td>${winProb}</td></tr>`;

const sanitizeValue = (value) => {
    const val = parseInt(value || 0);
    return isNaN(val) ? 0 : val
}

function cardIndex(card) {
    if (card == "A" || card == "a")
        return 1;
    else
        return Number(card);
}

function score(card1, card2, card3) {
    let output = card1 + card2 + card3;
    if (output < 12 && (card1 == 1 || card2 == 1 || card3 == 1))
        output += 10;
    return output;
}

function hit(banker, player) {
    let output = 0;
    if (banker <= 2)
        output = 1;
    else if (banker == 3 && player != 8)
        output = 1;
    else if (banker == 4 && (player == 2 || player == 3 || player == 4 || player == 5 || player == 6 || player == 7))
        output = 1;
    else if (banker == 5 && (player == 4 || player == 5 || player == 6 || player == 7))
        output = 1;
    else if (banker == 6 && (player == 6 || player == 7))
        output = 1;

    return output;
}

function count2(in1, in2) {
    let output = 0;
    if (in1 == in2)
        output++;
    return output;
}

function count3(in1, in2, in3) {
    let output = 0;
    if (in1 == in2)
        output++;
    if (in1 == in3)
        output++;
    return output;
}

function count4(in1, in2, in3, in4) {
    let output = 0;
    if (in1 == in2)
        output++;
    if (in1 == in3)
        output++;
    if (in1 == in4)
        output++;
    return output;
}

function count5(in1, in2, in3, in4, in5) {
    let output = 0;
    if (in1 == in2)
        output++;
    if (in1 == in3)
        output++;
    if (in1 == in4)
        output++;
    if (in1 == in5)
        output++;
    return output;
}

function count6(in1, in2, in3, in4, in5, in6) {
    let output = 0;
    if (in1 == in2)
        output++;
    if (in1 == in3)
        output++;
    if (in1 == in4)
        output++;
    if (in1 == in5)
        output++;
    if (in1 == in6)
        output++;
    return output;
}


function calculate() {
    let decks = sanitizeValue(heForm.decks.value);
    let commission = sanitizeValue(heForm.commission.value);
    let tiepays = sanitizeValue(heForm.tiepays.value);

    let dealerCard1 = 0;
    let dealerCard2 = 0;
    let playerCard1 = 0;
    let playerCard2 = 0;
    let boardCard = 0;
    let boardCard1 = 0;
    let dealerSum = 0;
    let playerSum = 0;
    let dealerSum1 = 0;
    let playerSum1 = 0;

    let tie = 0;
    let banker = 0;
    let player = 0;
    let netTie = 0;
    let netBanker = 0;
    let netPlayer = 0;
    let playerHit = 0;
    let dealerHit = 0;

    let total = 0;
    let total_i = 0;
    let total_i2 = 0;
    let total_j = 0;
    let total_j2 = 0;
    let total_k = 0;
    let total_k2 = 0;

    let decks4 = 4 * decks;
    let mult = 52 * decks;
    let divisor = mult * (mult - 1) * (mult - 2) * (mult - 3) * (mult - 4) * (mult - 5);

    for (let i = 0; i <= 9; i++) {
        boardCard = i;		     

        for (let i2 = 0; i2 <= 9; i2++) {
            boardCard1 = i2;		     

            for (let j = 0; j <= 9; j++) {
                playerCard1 = j;

                for (var k = 0; k <= 9; k++) {
                    dealerCard1 = k;

                    playerSum = normalizeScore(boardCard + playerCard1);
                    dealerSum = normalizeScore(boardCard1 + dealerCard1);

                    if (playerSum <= 5 && dealerSum <= 7)
                        playerHit = 1;
                    else
                        playerHit = 0;

                    for (var j2 = 0; j2 <= 9; j2++) {
                        playerCard2 = j2;

                        if (playerHit == 1) {
                            playerSum1 = normalizeScore(playerSum + playerCard2);
                        } else
                            playerSum1 = playerSum;

                        if (((playerHit == 1) && (hit(dealerSum, playerCard2) == 1)) ||
                            ((playerHit == 0) && (playerSum <= 7 && dealerSum <= 5)))
                            dealerHit = 1;
                        else
                            dealerHit = 0;

                        for (var k2 = 0; k2 <= 9; k2++) {
                            dealerCard2 = k2;

                            if (dealerHit == 1) {
                                dealerSum1 = normalizeScore(dealerSum + dealerCard2);
                            } else
                                dealerSum1 = dealerSum;

                            player = 0;
                            banker = 0;
                            tie = 0;
                            if (playerSum1 == dealerSum1)
                                tie = 1;
                            else if (dealerSum1 > playerSum1)
                                banker = 1;
                            else
                                player = 1;

                            total_i = decks4;
                            if (i == 0)
                                total_i *= 4;

                            total_i2 = decks4;
                            if (i2 == 0)
                                total_i2 *= 4;
                            total_i2 -= count2(i2, i);

                            total_j = decks4;
                            if (j == 0)
                                total_j *= 4;
                            total_j -= count3(j, i, i2);

                            total_k = decks4;
                            if (k == 0)
                                total_k *= 4;
                            total_k -= count4(k, i, i2, j);

                            total_j2 = decks4;
                            if (j2 == 0)
                                total_j2 *= 4;
                            total_j2 -= count5(j2, i, i2, j, k);
                            if (total_j2 < 0)
                                total_j2 = 0;

                            total_k2 = decks4;
                            if (k2 == 0)
                                total_k2 *= 4;
                            total_k2 -= count6(k2, i, i2, j, k, j2);
                            if (total_k2 < 0)
                                total_k2 = 0;

                            total = total_i * total_i2 * total_j * total_j2 * total_k * total_k2;
                            tie *= total;
                            player *= total;
                            banker *= total;

                            netTie += tie;
                            netBanker += banker;
                            netPlayer += player;

                        }
                    }
                }
            }
        }
    }

    netTie = netTie / (divisor);
    netBanker = netBanker / (divisor);
    netPlayer = netPlayer / (divisor);

    //
    heResult.classList.add('visible');
    heResultTableBody.innerHTML = [
        heTableRow(
            'Player',
            toPercents(netBanker - netPlayer),
            toPercents(netPlayer)
        ),
        heTableRow(
            'Banker',
            toPercents(netPlayer - netBanker * (1 - commission / 100)),
            toPercents(netBanker)
        ),
        heTableRow(
            'Tie',
            toPercents((1 - netTie) - netTie * tiepays),
            toPercents(netTie)
        ),
    ].join('\n');

}

heForm.addEventListener('change', (e) => {
    e.preventDefault();
    calculate();
});
heCommissionInput.addEventListener('input', calculate);
calculate();
