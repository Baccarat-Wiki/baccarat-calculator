const $oddsForm = document.getElementById('odds-form');
const $decksSelect = document.getElementById('odds-form-decks');
const $cardsCount = document.getElementById('cards-count');

const cards = [
    {
        label: '10/F',
        value: '10',
        amtPerDeck: 16
    },
    {
        label: 'Aces',
        value: 'A',
        amtPerDeck: 4
    },
    {
        label: '2s',
        value: '2',
        amtPerDeck: 4
    },
    {
        label: '3s',
        value: '3',
        amtPerDeck: 4
    },
    {
        label: '4s',
        value: '4',
        amtPerDeck: 4
    },
    {
        label: '5s',
        value: '5',
        amtPerDeck: 4
    },
    {
        label: '6s',
        value: '6',
        amtPerDeck: 4
    },
    {
        label: '7s',
        value: '7',
        amtPerDeck: 4
    },
    {
        label: '8s',
        value: '8',
        amtPerDeck: 4
    },
    {
        label: '9s',
        value: '9',
        amtPerDeck: 4
    },
];

const countItemTpl = (card) => `
    <div class="card-count--element">
        <div class="card-count--label">${card.label}</div>
        <div class="card-count--count" data-value="${card.value}">${card.amtPerDeck * $decksSelect.value}</div>
    </div>
`;

const outputCards = () => {
    $cardsCount.innerHTML = cards.map(countItemTpl).join('');
};

$decksSelect.addEventListener('change', outputCards);

outputCards();

