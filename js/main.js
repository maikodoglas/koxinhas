$(function () {
    $leftWheel = $(".slot-wheel-left");
    buildSlotWheels($leftWheel);
});

const title = "🍗🔥 koxinhas first player 🔥🍗";
const participants = [
    "adrieldf",
    "maikodoglas",
    "marks"
];

var colorList = [
    "#FEFFBF",
    "#D1FFBA",
    "#B8CBFF",
    "#FFBDEB",
    "#FFC08B",
    "#FFFBA2",
    "#D2FFBC",
    "#C2F1FF",
    "#DF8B76",
    "#DDA576",
    "#D496FF",
    "#DFC575",
    "#DFDA75",
    "#CEDF74",
    "#9CC2CB",
    "#1ABB9C",
    "#3498DB",
    "#F7996E",
    "#AE9CD6",
    "#FFAEAE",
    "#8BB9D4",
    "#A6CFA1",
    "#DAD6A1",
    "#E1B298",
    "#E59CA0",
    "#D3FFCE",
    "#7FFFD4",
    "#F08080",
    "#FFF68F",
    "#66CDAA",
    "#BADA55",
    "#C0D6E4",
];

var spinParametersList = [
    [43000, "easeInOutQuart", 12000, "piao.mp3"],
    [42000, "easeOutQuad", 0, "piao.remix.mp3"],
    [153000, "easeOutBack", 0, "piao-extended.mp3"],
    [42000, "easeInOutQuart", 0, "piao-denovo.mp3"],
    [49000, "easeInOutQuart", 0, "piao-strikes-back.mp3"],
    [36800, "easeInBounce", 0, "piao-galvao.mp3"],
    [38700, "easeOutBack", 0, "piao-ultimo.mp3"],
    [48000, "easeInOutQuart", 0, "piao-hero.mp3"],
    [11000, "easeInOutQuart", 8000, "silvio-triggered.mp3"],
    [10000, "easeOutQuad", 0, "piao-storm.mp3"]
]

let itemsListCount = 0;
let lastSpinNumber = 0;

function buildSlotWheels($container) {
    let itemsArray = [];
    itemsArray.push(title);
    const amount = 2800;

    for (let i = 0; i < amount; i++) {
        for (let participant of participants) {
            itemsArray.push(participant);
        }
    }

    itemsListCount = itemsArray.length;
    $items = itemsArray.map(buildSlotItem);
    $container.append($items);
}

function buildSlotItem(imgURL) {
    return $(
        '<li class="item" style="background-color: ' +
        colorList[randomItemIndex(colorList.length - 1)] +
        '"><div style="padding-top: 245px; font-size: 100px">' +
        imgURL +
        "</div></li>"
    );
}

function playSong(songName) {
    song = new Audio(songName);

    song.play();
}

function rodaRoda() {
    spinStart();

    var randomSpinNumber = randomItemIndex(9);

    while(lastSpinNumber === randomSpinNumber)
        randomSpinNumber = randomItemIndex(9);

    var spinParameters = spinParametersList[randomSpinNumber];

    spin(spinParameters[0], spinParameters[1], spinParameters[2], spinParameters[3]);

    lastSpinNumber = randomSpinNumber;
}

function spinStart() {
    togglePride();
    document.getElementById("btnRodaRoda").innerText = "Rodando, rodando...";
}

function spin(spinDuration, easing, cooldown, songName) {
    playSong(songName);

    var leftWheelIndex = randomItemIndex(itemsListCount - 1);

    $leftWheel.animate(
        {
            top: -leftWheelIndex * 600,
        },
        spinDuration,
        easing,
        () => spinEnd(cooldown)
    );
}

function spinEnd(cooldownTime = 0) {
    party.screen();
    togglePride();
    setTimeout(() => {
        document.getElementById("btnRodaRoda").innerText = "Sortear";
    }, cooldownTime);
}

function togglePride() {
    document.getElementById('pride').classList.toggle("pride");
    document.getElementById('btnRodaRoda').classList.toggle("pride");
}

function randomItemIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
}