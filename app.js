let CURRENT_PLAYER = null;
let players = {
	player1: { toss: null, wins: 0 },
	player2: { toss: null, wins: 0 },
};

const selectPlayer = (e) => {
	const elem = e.target;
	const options = document.getElementsByClassName("option")[0].children;
	CURRENT_PLAYER = elem.getAttribute("data-key");

	for (const option of options) {
		if (option.nodeName !== "P") {
			option.setAttribute("disabled", true);
		}
	}
};

const selectSide = (val) => {
	const triggers = document.getElementsByClassName("btn")[0].children;

	if (CURRENT_PLAYER) {
		Object.entries(players).forEach(([value, data]) => {
			const isHeads = val === "heads";
			data.toss = value === `player${CURRENT_PLAYER}` ? isHeads : !isHeads;
		});
	} else {
		alert("Select Any Player");
	}
	for (const btns of triggers) {
		btns.setAttribute("disabled", true);
	}
	renderTossedValues();
};

const renderTossedValues = () => {
	Object.entries(players).forEach(([value, data]) => {
		document.getElementById(value).firstElementChild.innerHTML = `you get ${
			data.toss ? "heads" : "tails"
		}`;
	});
};

let Tossed = 0;
const handleToss = () => {
	const toss = Math.floor(Math.random() * 2);
	const tossed_value = toss === 0 ? true : false;

	Tossed++;

	Object.entries(players).forEach(([value, data]) => {
		if (data.toss === tossed_value) {
			++data.wins;
			document.getElementById(value).lastElementChild.innerHTML = "player win :" +data.wins;
		}
	});

	document.getElementById("tossed_value").innerHTML = tossed_value
		? "heads"
		: "tails";

	if (Tossed === 2) {
		checkIfGameIsOver();
	}
};

const checkIfGameIsOver = () => {
	document
		.getElementsByClassName("toss-btn")[0]
		.lastElementChild.setAttribute("disabled", true);

	if (players.player1.wins > players.player2.wins) {
		alert("Player 1 wins");
	} else if (players.player1.wins < players.player2.wins) {
		alert("Player 2 wins");
	} 
    else {
		alert("Game Draw");
	}

	window.location.reload();
};
