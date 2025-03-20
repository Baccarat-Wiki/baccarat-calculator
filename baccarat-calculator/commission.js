const commForm = document.getElementById('comm-form');
const commFormAmount = document.getElementById('comm-amount');
const commFormCommission = document.getElementById('comm-commission');
const commResultCommission = document.getElementById('comm-commission-amount');
const commResultWinning = document.getElementById('comm-net-winning');

const formatCommissionAmount = (betAmount, commissionPercentage) => `<span class="tiled-label">$${betAmount} × (${commissionPercentage} / ${betAmount}) =</span><span id="prob-value" class="tiled-value">$${betAmount * commissionPercentage / 100}</span>`;

const formatNetWinning = (betAmount, commissionPercentage) => `<span class="tiled-label">$${betAmount} + ($${betAmount} - $${betAmount * commissionPercentage / 100}) =</span><span id="prob-value" class="tiled-value">$${betAmount * 2 - betAmount * commissionPercentage / 100}</span>`;

const sanitizeValue = (value) => {
    const val = parseInt(value || 0);
    return isNaN(val) ? 0 : val
}

const onChange = (e) => {
    const betAmount = sanitizeValue(commFormAmount.value);
    const commissionPercentage = sanitizeValue(commFormCommission.value);
    commResultCommission.innerHTML = formatCommissionAmount(betAmount, commissionPercentage);
    commResultWinning.innerHTML = formatNetWinning(betAmount, commissionPercentage);
}

[commFormAmount, commFormCommission].forEach((el) => {
    el.addEventListener('input', onChange);
});

onChange();